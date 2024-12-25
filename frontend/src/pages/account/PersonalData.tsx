import { CheckOutlined, EditOutlined, EyeInvisibleOutlined, ProfileOutlined } from "@ant-design/icons"
import ContentTitle from "./components/ContentTitle"
import { useDispatch, useSelector } from "react-redux"
import { selectUserEditErrors, selectUserFromUserState } from "../../state/user/user-selector"
import AccountDataItem from "./components/AccountDataItem"
import { Button, Form } from "antd"
import { updateUserInfo } from "../../state/user/user-thunk"
import { useEffect, useState } from "react"
import { resetInputForm } from "../../state/user/user-slice"
import FormInput from "../../components/FormInput"

interface PersonalFormData {
  firstName: string;
  lastName: string;
  city: string;
  address: string;
  phoneNumber: string;
  postIndex: string;
}

const PersonalData = () => {
  const dispatch = useDispatch<any>();
  const [form] = Form.useForm();
  const userData = useSelector(selectUserFromUserState)
  const errors = useSelector(selectUserEditErrors)
  const { firstNameError, lastNameError } = errors;
  const [showUserForm, setShowUserForm] = useState<boolean>(false);

  const onClickShowUserForm = (): void => {
    setShowUserForm(prev => !prev)
  }

  const onFormSubmit = (data: PersonalFormData): void => {
    dispatch(updateUserInfo({ id: userData?.id, ...data }));
  }

  useEffect(() => {
    dispatch(resetInputForm());

    if (userData) {
      form.setFieldsValue(userData)
    }
  }, [])

  return (
    <div>
      <ContentTitle title="My Account" icon={<ProfileOutlined/>}/>
      <div className="flex gap-x-8">
        <div className="basis-1/2">
          <AccountDataItem title="Email" text={userData?.email}/>
          <AccountDataItem title="First name" text={userData?.firstName}/>
          <AccountDataItem title="Last name" text={userData?.lastName}/>
          <AccountDataItem title="City" text={userData?.city}/>
          <AccountDataItem title="Address" text={userData?.address}/>
          <AccountDataItem title="Phone number" text={userData?.phoneNumber}/>
          <AccountDataItem title="Post index" text={userData?.postIndex}/>
          <Button className="rounded-none h-10 bg-primary text-white"
            onClick={onClickShowUserForm}
          >
            {showUserForm ? <EyeInvisibleOutlined/> : <EditOutlined/>}
            {showUserForm ? "Hide" : "Edit"}
          </Button>
        </div>
        <div className="basis-1/2">
          <div className={showUserForm ? 'visible': 'invisible'}>
            <Form onFinish={onFormSubmit} form={form}>
              <FormInput
                title="First name:" name="firstName" error={firstNameError}
              />
              <FormInput
                title="Last name:" name="lastName" error={lastNameError}
              />
              <FormInput
                title="City:" name="city"
              />
              <FormInput
                title="Address:" name="address"
              />
              <FormInput
                title="Phone number:" name="phoneNumber"
              />
                <FormInput
                title="Post index:" name="postIndex"
              />
              <Button htmlType="submit" className="rounded-none h-10 bg-primary text-white">
                {<CheckOutlined/>}
                Save
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalData
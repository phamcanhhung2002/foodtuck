import { Form, Input } from "antd"
import { FC, ReactNode } from "react";

type PropsType = {
  placeholder: string;
  name: string;
  error?: string;
  icon: ReactNode
  inputPassword?: boolean
}

const FormInput: FC<PropsType> = ({
  error,
  placeholder,
  icon,
  name,
  inputPassword
}) => {
  return (
    <Form.Item name={name} help={error} validateStatus={error && "error"}>
      {inputPassword ? (
        <Input.Password placeholder={placeholder} className='rounded-none h-11' prefix={icon}/>
      ): (
        <Input placeholder={placeholder} className='rounded-none h-11' prefix={icon}/>
      )
      }
    </Form.Item>
  )
}

export default FormInput
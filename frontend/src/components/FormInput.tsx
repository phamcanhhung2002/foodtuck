import { Form, Input } from "antd";
import { FC } from "react";

type PropsType = {
  title: string;
  name: string;
  error?: string;
  disabled?: boolean;
  inputPassword?: boolean;
}

const FormInput: FC<PropsType> = ({
  title,
  name,
  error,
  disabled,
  inputPassword
}) => {
  return (
    <div className="flex mb-6 items-center">
      <div className="basis-1/4">
        {title}
      </div>
      <div className="basis-3/4">
        <Form.Item name={name} help={error} validateStatus={error && "error"} className="mb-0">
          {inputPassword ? (
            <Input.Password disabled={disabled} className='rounded-none h-8'/>
          ) : (
            <Input disabled={disabled} className='rounded-none h-8'/>
          )}
        </Form.Item>
      </div>
    </div>
  )
}

export default FormInput
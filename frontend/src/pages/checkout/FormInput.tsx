import { Form, Input } from 'antd';
import { FC } from 'react'

type PropsType = {
  title: string;
  name: string;
  error?: string;
  disabled?: boolean;
}

const FormInput: FC<PropsType> = ({
  title,
  name,
  error,
  disabled
}) => {
  return (
    <div>
      <p className='text-base mb-2'>{title}</p>
        <Form.Item name={name} help={error} validateStatus={error && "error"}>
          <Input disabled={disabled} className='rounded-none h-14'/>
        </Form.Item>
    </div>
  )
}

export default FormInput
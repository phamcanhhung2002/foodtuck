import { FC } from 'react'

type PropsType = {
  title: string,
  text?: string | number;
}

const AccountDataItem: FC<PropsType> = ({ title, text }) => {
  return (
    <div className='flex mb-3'>
      <div className='basis-1/3 font-bold'>{title}</div>
      <div className='basis-2/3'>
        <div className='break-all'>
          {text}
        </div>
      </div>
    </div>
  )
}

export default AccountDataItem
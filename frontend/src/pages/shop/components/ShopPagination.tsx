import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'
import { FC } from 'react'

type PropsType = {
  currentPage: number,
  pageSize: number,
  totalElements: number,
  onChange: (page: number) => void
}

const ShopPagination: FC<PropsType> = ({ currentPage, pageSize, totalElements, onChange }) => {
  const pageCounts = Math.ceil(totalElements / pageSize);

  return (
    <div className='flex gap-x-3 mt-14 mb-28'>
        <div className='h-10 w-10 border-2 border-[#f2f2f2] flex items-center justify-center hover:border-primary cursor-pointer'
          onClick={() => currentPage > 1 && onChange(currentPage - 1)}
        >
          <DoubleLeftOutlined className='text-primary'/>
        </div>
          {
            Array(pageCounts).fill(0).map((_, index) => (
                <div className={`border-2 border-[#f2f2f2] w-10 h-10 flex items-center justify-center hover:border-primary cursor-pointer
                ${currentPage === index + 1 && 'bg-primary border-primary text-white'}`}
                  onClick={() => currentPage !== index + 1 && onChange(index + 1)} key={index}
                >
                  {index + 1}
                </div>
            ))
          }
        <div className='h-10 w-10 border-2 border-[#f2f2f2] flex items-center justify-center hover:border-primary cursor-pointer'
          onClick={() => currentPage < pageCounts && onChange(currentPage + 1)}
        >
          <DoubleRightOutlined className='text-primary'/>
        </div>
    </div>
  )
}

export default ShopPagination
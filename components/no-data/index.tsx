import Image from "next/image"

import IMAGE_NO_DATA from "@/public/assets/images/empty-data/no-data-image.jpg"

const NoData = () => {
  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <div className='aspect-[200/200] relative w-[200px] h-[200px]'>
        <Image
          src={/* "/assets/images/empty-data/no-data-image.jpg" */IMAGE_NO_DATA}
          alt={"no-data"}
          fill
          className='object-cover rounded-[4px]'
          sizes='(max-width: 200px)'
        />
      </div>
      <h2 className='text-center font-bold text-base uppercase'>Không có sản phẩm nào được trưng bày</h2>
    </div>
  )
}

export default NoData
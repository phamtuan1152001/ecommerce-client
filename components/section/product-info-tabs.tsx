'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductInfoTabsProps {
  content: string
}

export const ProductInfoTabs = ({content}: ProductInfoTabsProps) => {
  return (
    <div>
      <Tabs defaultValue='info'>
        <TabsList className='w-full justify-start p-0 bg-transparent border-b-2 border-b-[#D8B68D] rounded-none space-x-6'>
          <TabsTrigger
            value='info'
            className='px-0 py-2 text-sm leading-normal text-[#676767] data-[state=active]:shadow-none data-[state=active]:font-bold data-[state=active]:text-[#003966] relative after:absolute after:top-full after:left-0 after:right-0 after:h-1 after:inline-block after:bg-transparent -after:translate-y-1/2 data-[state=active]:after:bg-[#3F3F3F]'
          >
            Thông tin sản phẩm
          </TabsTrigger>
          {/* <TabsTrigger
            value='description'
            className='px-0 py-2 text-sm leading-normal text-[#676767] data-[state=active]:shadow-none data-[state=active]:font-bold data-[state=active]:text-[#003966] relative after:absolute after:top-full after:left-0 after:right-0 after:h-1 after:inline-block after:bg-transparent -after:translate-y-1/2 data-[state=active]:after:bg-[#3F3F3F]'
          >
            Mô tả sản phẩm
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value='info' className='mt-4 space-y-2'>
          <div
            dangerouslySetInnerHTML={{
              __html: content
            }}
          />
          {/* <div className='flex items-center text-sm font-medium leading-normal'>
            <p className='max-w-[200px] w-full text-[#637381]'>Giới tính:</p>
            <p className='text-black'>Nữ</p>
          </div>

          <div className='flex items-center text-sm font-medium leading-normal'>
            <p className='max-w-[200px] w-full text-[#637381]'>
              Xuất sứ thương hiệu:
            </p>
            <p className='text-black'>Ks Green, Ks Pink</p>
          </div>

          <div className='flex items-center text-sm font-medium leading-normal'>
            <p className='max-w-[200px] w-full text-[#637381]'>Màu sắc:</p>
            <p className='text-black'>Mỹ / USA</p>
          </div>

          <div className='flex items-center text-sm font-medium leading-normal'>
            <p className='max-w-[200px] w-full text-[#637381]'>Chất liệu:</p>
            <p className='text-black'>Da cao cấp</p>
          </div>

          <div className='flex items-center text-sm font-medium leading-normal'>
            <p className='max-w-[200px] w-full text-[#637381]'>Kích thước:</p>
            <p className='text-black'>14h x24.1w x3.17d (cm)</p>
          </div> */}
        </TabsContent>
        {/* <TabsContent
          value='description'
          className='text-[#202020] text-sm leading-normal mt-4'
        >
          <p>Chất liệu: 100% nylon tái chế với smooth leather trim</p>
          <p>Lớp lót polyester tái chế 100%</p>
          <p>Ví có khóa kéo trên cùng</p>
          <p>Ví có ngăn nhỏ bên trong</p>
          <p>Dây đeo có thể đeo kẹp hoặc đeo cổ tay</p>
          <p>Plaque logo</p>
          <p>Kích thước: 14h x 24.1w x 3.17d (cm)</p>
          <p>Kiểu #kb233</p>
          <p>Xuất xứ: Phi-líp-pin</p>
          <p>HDSD & CB: Luôn để ở nơi khô thoáng. Không để tiếp xúc với lửa</p>
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

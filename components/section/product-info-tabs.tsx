'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductInfoTabsProps {
  description: string
}

export const ProductInfoTabs = ({ description }: ProductInfoTabsProps) => {
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
        </TabsList>

        <TabsContent value='info' className='mt-4 space-y-2'>
          <div
            dangerouslySetInnerHTML={{
              __html: description
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

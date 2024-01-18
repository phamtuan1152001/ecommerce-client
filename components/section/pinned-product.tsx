import { ProductTitle, ProductFinalPrice } from '@/components/product/product';
import { Button } from '@/components/ui/button';

export default function PinnedProduct() {
  return (
    <div className='shadow-3xl'>
      <div className='p-4 space-y-2 text-center'>
        <ProductTitle className='text-sm leading-normal'>
          Ví cầm tay Kate Spade New York Sam Icon KSNYL mini (Ks Green)
        </ProductTitle>

        <div className='text-[#333] text-sm leading-normal'>
          <p>Giới tính: Nữ</p>
          <p>Màu sắc: Xanh lá cây</p>
          <p>Chất liệu: Da cao cấp</p>
        </div>

        <ProductFinalPrice className='text-2xl leading-tight'>
          1.234.000đ
        </ProductFinalPrice>

        <div className='space-y-3'>
          <Button className='w-full text-base font-semibold bg-[#333] h-12'>
            Mua ngay
          </Button>

          <Button
            asChild
            variant='outline'
            className='w-full h-12 text-[#00508F] border-current text-base font-semibold'
          >
            <a href='tel:0909102010'>Gọi đặt mua: 0909102010</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

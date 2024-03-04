import { notFound } from 'next/navigation';

import { Container } from '@/components/ui/container';
import DetailProductBody from '@/components/section/detail-product-body';
import BreadcrumbComponent from '@/components/bread-crumd';

// @api
import { getDetailProduct } from '@/lib/api/product';

// @utility
import { nameCate } from '@/utility/common';

interface PageProps {
  params: {
    slug: string,
    detailProduct: string
  };
}

export default async function Page({ params }: PageProps) {  
  const { detailProduct } = params || {}
  
  const detail = await getDetailProduct(detailProduct)
  const {id, name, regularPrice, salePrice, images, content, quantity, attributes, onSale, description} = detail?.data || {}
  
  if (!detail) {
    notFound()
  }
  // console.log("detailProduct", detail);
  
  return (
    <div className='bg-[#F5F5F5] p-6 max-[768px]:p-0'>
      <div className="max-[768px]:hidden">
        <Container>
          <BreadcrumbComponent breadcrumbs={[
              {
                title: "Trang chủ",
                to: "/"
              },
              {
                title: nameCate(params.slug),
                to: `/${params.slug}`
              },
              {
                title: `${name}`,
                to: `/${params.detailProduct}`
              }
            ]} />
        </Container>
      </div>
      
      <Container className='max-[768px]:p-0'>
        <div className='min-[1280px]:space-y-5'>
          {/* Detail Product Body */}
          <DetailProductBody
            name={name}
            regularPrice={regularPrice}
            salePrice={salePrice}
            images={images}
            content={content}
            quantity={quantity}
            attributes={attributes}
            productId={id}
            onSale={onSale}
            description={description}
          />
          {/* End */}
        </div>
      </Container>
    </div>
  )
}
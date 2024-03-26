import { notFound } from 'next/navigation';

import { Container } from '@/components/ui/container';
import DetailProductBody from '@/components/section/detail-product-body';
import BreadcrumbComponent from '@/components/bread-crumd';

// @api
import { getDetailProduct } from '@/lib/api/product';

// @utility
import { nameCate } from '@/utility/common';

// @type
import { ProductType } from '@/types';

interface PageProps {
  params: {
    slug: string,
    detailProduct: string
  };
}

export default async function Page({ params }: PageProps) {
  const { slug, detailProduct } = params || {}

  const detail: {
    retCode: number,
    retData: ProductType,
    retText: string
  } = await getDetailProduct(slug, detailProduct)

  if (!detail) {
    notFound()
  }
  // console.log("detailProduct", detail);

  return (
    <div className='bg-[#F5F5F5] p-6 max-[1024px]:p-0'>
      <div className="max-[1024px]:hidden">
        <Container>
          <BreadcrumbComponent breadcrumbs={[
            {
              title: "Home page",
              to: "/"
            },
            {
              title: nameCate(params.slug),
              to: `/${params.slug}`
            },
            {
              title: `${detail.retData.name}`,
              to: `/${params.detailProduct}`
            }
          ]} />
        </Container>
      </div>

      <Container className='max-[1024px]:p-0'>
        <div className='min-[1280px]:space-y-5'>
          {/* Detail Product Body */}
          <DetailProductBody
            name={detail.retData.name}
            regularPrice={detail.retData.regularPrice}
            salePrice={detail.retData.salePrice}
            images={detail.retData.images}
            description={detail.retData.description}
            quantity={detail.retData.quantity}
            productId={detail.retData._id}
            onSale={detail.retData.onSale}
          />
          {/* End */}
        </div>
      </Container>
    </div>
  )
}
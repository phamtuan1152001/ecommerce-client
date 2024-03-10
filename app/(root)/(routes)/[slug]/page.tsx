import { notFound } from 'next/navigation';

// @api
import { getCategories } from '@/lib/api';

// @components
import ProductsBody from '@/components/page/products';

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params || {}

  const listCategories = await getCategories()

  const isExistInCate = listCategories?.retData?.find((item: any) => item.slug === slug)

  if (!isExistInCate) {
    notFound()
  }

  return <ProductsBody slug={slug} />;
}

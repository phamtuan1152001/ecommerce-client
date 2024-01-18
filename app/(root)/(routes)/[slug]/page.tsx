import { notFound } from 'next/navigation';

// @api
import { getAllCategories } from '@/lib/api';

// @components
import ProductsBody from '@/components/page/products';

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params || {}
  
  const listCategories = await getAllCategories()
  const isExistInCate = listCategories?.data?.items?.find((item: { slug: string; }) => item.slug === slug)
  
  if (!isExistInCate) {
    notFound()
  }

  return <ProductsBody slug={slug} />;
}

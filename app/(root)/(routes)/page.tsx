import { Banners } from '@/components/section/banners';
import { Testimonial } from '@/components/section/testimonial';
import { SellProduts } from '@/components/section/sell-products';
import { FeaturedCategories } from '@/components/section/featured-categories';
import { ProductsByCategory } from '@/components/section/products-by-category';
import { ViewedProducts } from '@/components/section/viewed-products';

// @api
import { getCategories } from '@/lib/api';
import { getProducts } from '@/lib/api/product';

// @types
import { ProductType, CategoryType } from '@/types';

export default async function Home() {
  const listCategories: {
    retCode: number,
    retData: CategoryType[],
    retText: string
  } = await getCategories();

  const listBestSellerProducts: {
    retCode: number,
    retData: {
      currentPage: number,
      products: ProductType[],
      totalItems: number,
      totalPages: number
    },
    retText: string
  } = await getProducts()

  // console.log("listCategories", listCategories);

  return (
    <div>
      <Banners />

      <Testimonial />

      <SellProduts
        listBestSellerProducts={listBestSellerProducts.retData.products}
      />

      <FeaturedCategories listCategories={listCategories.retData} />

      <ProductsByCategory listCategories={listCategories.retData} />

      {/* <ViewedProducts /> */}
    </div>
  );
}

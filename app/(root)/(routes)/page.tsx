import { Banners } from '@/components/section/banners';
import { Testimonial } from '@/components/section/testimonial';
import { SellProduts } from '@/components/section/sell-products';
import { FeaturedCategories } from '@/components/section/featured-categories';
import { ProductsByCategory } from '@/components/section/products-by-category';
import { RegisterOffer } from '@/components/section/register-offer';
import { ViewedProducts } from '@/components/section/viewed-products';
import { Brands } from '@/components/section/brands';

// @api
import { getAllBrands, getAllCategories } from '@/lib/api';
import { getBestSellerProducts } from '@/lib/api/product';

export default async function Home() {
  const listCategories = await getAllCategories()
  const listBrands = await getAllBrands()
  const listBestSellerProducts = await getBestSellerProducts()

  return (
    <div>
      <Banners />

      <Testimonial />

      <SellProduts listBestSellerProducts={listBestSellerProducts} />

      <FeaturedCategories listCategories={listCategories?.data} />

      <Brands />

      <ProductsByCategory />

      {/* <ViewedProducts /> */}

      {/* <RegisterOffer /> */}
    </div>
  );
}

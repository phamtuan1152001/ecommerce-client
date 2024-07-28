import { Banners } from '@/components/section/banners';
import { Testimonial } from '@/components/section/testimonial';
import { SellProduts } from '@/components/section/sell-products';
import { FeaturedCategories } from '@/components/section/featured-categories';
import { ProductsByCategory } from '@/components/section/products-by-category';
import { ViewedProducts } from '@/components/section/viewed-products';

// @api
import { getCategories } from '@/lib/api';
import { getProducts, getRankingProducts } from '@/lib/api/product';

// @types
import { ProductType, CategoryType } from '@/types';
import { ACTION_USER, PAGE_LIMIT, PAGE_NUMBER } from '@/constants';

export default async function Home() {
  const listCategories: {
    retCode: number,
    retData: CategoryType[],
    retText: string
  } = await getCategories();

  const listViewedProducts: {
    retCode: number,
    retData: {
      currentPage: number,
      rankProducts: {
        _id: number,
        productId: string,
        product: ProductType,
        countReview: number
      }[],
      totalItems: number,
      totalPages: number
    },
    retText: string
  } = await getRankingProducts(PAGE_NUMBER, PAGE_LIMIT, ACTION_USER.REVIEW)

  const listPurchasedProducts: {
    retCode: number,
    retData: {
      currentPage: number,
      rankProducts: {
        _id: number,
        productId: string,
        product: ProductType,
        countBuy: number
      }[],
      totalItems: number,
      totalPages: number
    },
    retText: string
  } = await getRankingProducts(PAGE_NUMBER, PAGE_LIMIT, ACTION_USER.BUY)

  const listPopularProducts: {
    retCode: number,
    retData: {
      currentPage: number,
      rankProducts: {
        _id: number,
        productId: string,
        product: ProductType,
        countSave: number
      }[],
      totalItems: number,
      totalPages: number
    },
    retText: string
  } = await getRankingProducts(PAGE_NUMBER, PAGE_LIMIT, ACTION_USER.SAVE)

  // console.log("listViewedProducts", listPurchasedProducts.retData.rankProducts);

  return (
    <div>
      <Banners />

      <Testimonial />

      {listViewedProducts.retData.rankProducts.length > 0 && (
        <SellProduts
          title={"Most viewed products"}
          listItems={listViewedProducts.retData.rankProducts.filter(item => !!item.product)}
          type={ACTION_USER.REVIEW}
        />
      )}

      <FeaturedCategories listCategories={listCategories.retData} />

      {listPurchasedProducts.retData.rankProducts.length > 0 && (
        <SellProduts
          title={"Most purchased products"}
          listItems={listPurchasedProducts.retData.rankProducts.filter(item => !!item.product)}
          type={ACTION_USER.BUY}
        />
      )}

      <ProductsByCategory listCategories={listCategories.retData} />

      {/* {listPopularProducts.retData.rankProducts.length > 0 && (
        <SellProduts
          title={"Most popular product"}
          listItems={listPopularProducts.retData.rankProducts}
          type={ACTION_USER.SAVE}
        />
      )} */}

      {/* <ViewedProducts /> */}
    </div>
  );
}

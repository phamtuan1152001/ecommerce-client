
import { Container } from '@/components/ui/container';
import ProductsByCategoryItem from './products-by-category-item';

// @api
import { getProducts } from '@/lib/api/product';

// @constants
import { PAGE_NUMBER, PAGE_LIMIT, LANGUAGE_VI, SUCCESS } from '@/constants';

// @type
import { CategoryType, ProductType } from '@/types';

interface ProductsByCategoryProps {
  listCategories: CategoryType[]
}

export const ProductsByCategory = async ({
  listCategories
}: ProductsByCategoryProps) => {

  const listData = listCategories.map(async (item) => {
    try {
      const listProducts: {
        retCode: number,
        retData: {
          currentPage: number,
          products: ProductType[],
          totalItems: number,
          totalPages: number
        },
        retText: string
      } = await getProducts(PAGE_NUMBER, PAGE_LIMIT, item._id, "")
      if (listProducts.retCode === 0) {
        return {
          name: item.name,
          imageUrl: item.imageUrl,
          slug: item.slug,
          products: listProducts.retData.products
        }
      }
    } catch (err) {
      console.log("FETCHING FAIL", err)
    }
  })
  const resolvedPromises = await Promise.all(listData);
  const resultData = resolvedPromises;
  // console.log("test", resultData);

  return (
    <section>
      <Container className='max-[768px]:px-0'>
        <div>
          {resultData.map((item, index) => (
            <ProductsByCategoryItem key={index} item={item} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

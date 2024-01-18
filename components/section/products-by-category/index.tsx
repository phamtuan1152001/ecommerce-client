import { Container } from '@/components/ui/container';
import { ProductCard } from '@/components/product/product-card';

import { PRODUCTS_BY_CATEGORIES } from './data';
import ProductsByCategoryItem from './products-by-category-item';

// @api
import { getAllProducts } from '@/lib/api/product';

// @constants
import { PAGE_NUMBER, PAGE_LIMIT, LANGUAGE_VI } from '@/constants';

export const ProductsByCategory = async () => {

  const LIST_FASHION = await getAllProducts(
    PAGE_NUMBER,
    PAGE_LIMIT,
    LANGUAGE_VI,
    true,
    "thoi-trang"
  )
  const LIST_PERFUME = await getAllProducts(
    PAGE_NUMBER,
    PAGE_LIMIT,
    LANGUAGE_VI,
    true,
    "nuoc-hoa"
  )
  const LIST_SHOE = await getAllProducts(
    PAGE_NUMBER,
    PAGE_LIMIT,
    LANGUAGE_VI,
    true,
    "giay"
  )
  const LIST_BAG = await getAllProducts(
    PAGE_NUMBER,
    PAGE_LIMIT,
    LANGUAGE_VI,
    true,
    "tui-xach"
  )
  const LIST_COSMETIC = await getAllProducts(
    PAGE_NUMBER,
    PAGE_LIMIT,
    LANGUAGE_VI,
    true,
    "my-pham"
  )
  
  const listData = [
    { 
      name: 'Thời trang nam',
      imageUrl: '/assets/images/products-by-category/thoi-trang-nam.jpeg',
      slug: "thoi-trang",
      products: LIST_FASHION?.data?.items
    },
    { 
      name: 'Nước hoa',
      imageUrl: '/assets/images/products-by-category/nuoc-hoa.jpeg',
      slug: "nuoc-hoa",
      products: LIST_PERFUME?.data?.items,
    },
    { 
      name: 'Giày dép',
      imageUrl: '/assets/images/products-by-category/giay-dep.png',
      slug: "giay",
      products: LIST_SHOE?.data?.items
    },
    { 
      name: 'Túi xách',
      imageUrl: '/assets/images/products-by-category/tui-xach.jpeg',
      slug: "tui-xach",
      products: LIST_BAG?.data?.items
    },
    { 
      name: 'Mỹ phẩm',
      imageUrl: '/assets/images/products-by-category/my-pham.jpeg',
      slug: "my-pham",
      products: LIST_COSMETIC?.data?.items
    },
  ]  
  
  return (
    <section>
      <Container className='max-[768px]:px-0'>
        <div>
          {listData.map((item, index) => (
            <ProductsByCategoryItem key={index} item={item} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

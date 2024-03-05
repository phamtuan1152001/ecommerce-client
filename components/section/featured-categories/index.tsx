import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { FeaturedCategory } from '@/components/category/featured-category';

// @type
import { CategoryType } from '@/types';

interface FeaturedCategoriesProps {
  listCategories: CategoryType[]
}

export const FeaturedCategories = ({ listCategories }: FeaturedCategoriesProps) => {
  return (
    <section>
      <div className='py-12 max-[768px]:pt-0 max-[768px]:pb-10'>
        <Container className='max-[768px]:px-3'>
          <div>
            <Heading
              title='DANH MỤC NỔI BẬT'
              description={`${listCategories?.length}+ Danh mục nổi bật`}
              className='mb-3 max-[768px]:mb-4'
            />
          </div>

          <div className='grid grid-cols-6 gap-x-4 gap-y-6 max-[768px]:grid-cols-2 max-[768px]:gap-3'>
            {listCategories?.map((item: CategoryType, index: number) => (
              <FeaturedCategory key={`${item._id}-${index}`} item={item} />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
};

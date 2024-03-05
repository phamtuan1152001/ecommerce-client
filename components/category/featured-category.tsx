import Link from 'next/link';
import Image from 'next/image';

// @type
import { CategoryType } from '@/types';

interface FeaturedCategoryProps {
  item: CategoryType;
}

export const FeaturedCategory = ({ item }: FeaturedCategoryProps) => {

  return (
    <div className='px-2.5 pb-5'>
      <Link href={item.slug ?? "/"}>
        <div className='aspect-[160/254] relative w-full rounded-[124px] overflow-hidden flex items-center justify-center'>
          <Image
            src={item.imageUrl}
            alt={item.slug}
            fill
            className='object-cover object-center'
            sizes="(max-width: 768px)"
          />

          <h3 className='text-xl font-bold text-[#333] capitalize py-1 px-4 inline-block bg-white relative rounded-[25px] text-center max-w-[90%]'>
            {item.name}
          </h3>
        </div>
      </Link>
    </div>
  );
};

import Link from 'next/link';
import Image from 'next/image';

// @type
import { CategoryType } from '@/types';
import { ACTION_USER } from '@/constants';
import { createRankingProducts } from '@/lib/api/product';

interface FeaturedCategoryProps {
  item: CategoryType;
}

export const FeaturedCategory = ({ item }: FeaturedCategoryProps) => {
  const handleDetecActionUser = async (id: string) => {
    try {
      const req: {
        productId: string,
        product: string,
        actionBuy: number,
        countBuy: number,
        actionReview: number,
        countReview: number,
        // "actionRate": 0,
        // "countRate": 0,
        actionIntroduce: number,
        countIntroduce: number,
        actionSave: number,
        countSave: number,
        type: number
      } = {
        productId: id,
        product: id,
        actionBuy: 0,
        countBuy: 0,
        actionReview: 1,
        countReview: 0,
        // "actionRate": 0,
        // "countRate": 0,
        actionIntroduce: 2,
        countIntroduce: 0,
        actionSave: 3,
        countSave: 0,
        type: ACTION_USER.REVIEW // Chi can thay doi field theo type
      }
      return await createRankingProducts(req)
    } catch (err) {
      console.log("FETCHING FAIL!")
    }
  }

  return (
    <div className='px-2.5 pb-5'>
      <Link href={item.slug ?? "/"} scroll={true}>
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

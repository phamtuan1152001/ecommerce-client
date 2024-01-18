import Link from 'next/link';
import Image from 'next/image';

interface FeaturedCategoryProps {
  item: {
    displayName: string;
    imageUrl: string;
    slug: string;
  };
}

export const FeaturedCategory = ({ item }: FeaturedCategoryProps) => {
  const { displayName, imageUrl, slug } = item;

  return (
    <div className='px-2.5 pb-5'>
      <Link href={slug ?? "/"}>
        <div className='aspect-[160/254] relative w-full rounded-[124px] overflow-hidden flex items-center justify-center'>
          <Image
            src={imageUrl}
            alt={slug}
            fill
            className='object-cover object-center'
          />

          <h3 className='text-xl font-bold text-[#333] capitalize py-1 px-4 inline-block bg-white relative rounded-[25px] text-center max-w-[90%]'>
            {displayName}
          </h3>
        </div>
      </Link>
    </div>
  );
};

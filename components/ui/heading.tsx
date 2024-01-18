import { cn } from '@/lib/utils';

interface HeadingProps {
  title: string;
  description?: string;
  className?: string;
}

export const Heading = ({ title, description, className }: HeadingProps) => {
  return (
    <div className={cn('mb-6 space-y-2 text-center', className)}>
      <h2 className='text-[1.625rem] leading-normal text-[#022A64] font-bold uppercase'>
        {title}
      </h2>

      {description && (
        <p className='text-base text-[#777]'>{description}</p>
      )}
    </div>
  );
};

import type { FC } from 'react'
import cn from 'clsx'

// @css
import s from './CustomPagination.module.css'

// @components
import PageLink from './components/PageLink'

export type Props = {
  data: any,
  currentPage: number
  lastPage: number
  maxLength: number
  pageNums: number[]
  onChange: (page: number) => void
  onPrev: (page: number) => void
  onNext: (page: number) => void
}

const CustomPagination: FC<Props> = ({
  data,
  currentPage,
  lastPage,
  maxLength,
  pageNums,
  onChange,
  onPrev,
  onNext,
}: Props) => {
  return (
    <div className='flex flex-col space-y-6 items-center max-[768px]:space-y-4'>
      <nav className={cn(s.pagination)} aria-label="Pagination">
        <PageLink
          disabled={currentPage === 1}
          onClick={() => onPrev(currentPage - 1)}
          className='border border-[#D9D9D9]'
        >
          Previous
        </PageLink>
        {pageNums?.map((pageNum, idx) => (
          <PageLink
            key={idx}
            active={currentPage === pageNum}
            disabled={isNaN(pageNum)}
            onClick={() => onChange(pageNum)}
          >
            {!isNaN(pageNum) ? pageNum : '...'}
          </PageLink>
        ))}
        <PageLink
          disabled={currentPage === lastPage}
          onClick={() => onNext(currentPage + 1)}
          className='border border-[#D9D9D9]'
        >
          Next
        </PageLink>
      </nav>
    </div>
  )
}

export default CustomPagination

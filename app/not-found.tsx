import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/container'
export default function NotFound() {
  return (
    <div className='py-6'>
      <Container className='h-full'>
        <div className="flex flex-col justify-center items-center">
          <div>
            <Image
              alt='404-image'
              src='/assets/images/page-not-found.jpg'
              width={640}
              height={200}
              className='object-cover object-center rounded-[8px]'
            />
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <h2 className='text-lg font-bold uppercase'>404</h2>
            <span className='text-lg font-semibold'>Ối!! Trang không được tìm thấy</span>
            <p className='text-base'>
              Xin lỗi nhưng trang bạn đang tìm kiếm không tồn tại, đã được
              LOẠI BỎ. tên đã thay đổi hoặc tạm thời không có
            </p>
            <Link href="/" className='text-base uppercase font-bold' scroll={true}>
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
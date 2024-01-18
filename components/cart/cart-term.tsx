import { Box } from '@/components/ui/box';

export const CartTerm = () => {
  return (
    <Box className='px-0 pb-0'>
      <p className='text-base text-[#202020]'>
        * Khi nhấn nút Đặt hàng nghĩa là bạn đã đọc và đồng ý với các{' '}
        <a
          href='#'
          target='_blank'
          rel='noopener noreferrer'
          className='underline text-[#745B3E]'
        >
          điều khoản, chính sách bán hàng và bảo mật
        </a>{' '}
        của chúng tôi tại Website
      </p>
    </Box>
  );
};

import { Box } from "@/components/ui/box"

const CheckoutTerm = () => {
  return (
    <Box className='px-0 pb-0'>
      <p className='text-base text-[#202020]'>
        * When you click the Order button, it means you have read and agreed to the terms{' '}
        <a
          href='#'
          target='_blank'
          rel='noopener noreferrer'
          className='underline text-[#745B3E]'
        >
          terms, sales policy and privacy
        </a>{' '}
        our at Website
      </p>
    </Box>
  )
}

export default CheckoutTerm
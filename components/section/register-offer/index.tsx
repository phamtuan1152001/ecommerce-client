import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';

import { RegisterOfferForm } from './register-offer-form';

export const RegisterOffer = () => {
  return (
    <section>
      <div className='py-[50px] border-t border-b border-[#818181]/20 bg-register-offer max-[768px]:bg-register-offer-mobile bg-no-repeat bg-left bg-cover'>
        <Container>
          <div className='text-center'>
            <Heading title='ĐĂNG KÝ ĐỂ NHẬN ƯU ĐÃI' />

            <RegisterOfferForm />
          </div>
        </Container>
      </div>
    </section>
  );
};

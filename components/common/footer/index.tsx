import Link from 'next/link';
import Image from 'next/image';
import { IconType } from 'react-icons';

import { FOOTER_MENU } from '@/constants/footer';
import { Container } from '@/components/ui/container';
import { PAYMENT_METHODS } from '@/constants/footer';

export const Footer = () => {
  return (
    <footer className='bg-[#181818]'>
      <div className='p-16 grid grid-cols-3 gap-14 max-[768px]:grid-cols-1 max-[768px]:gap-6 max-[768px]:py-6 max-[768px]:px-3'>
        <div>
          {!!FOOTER_MENU['info'] && (
            <div className='space-y-6'>
              {FOOTER_MENU['info']['logo'] && (
                <Link href='/'>
                  <Image
                    src={FOOTER_MENU['info']['logo']['imgUrl']}
                    alt={FOOTER_MENU['info']['logo']['alt']}
                    width={103}
                    height={74}
                  />
                </Link>
              )}

              {FOOTER_MENU['info']['children'].length > 0 && (
                <ul className='space-y-4'>
                  {FOOTER_MENU['info']['children'].map(
                    ({
                      label,
                      icon: Icon,
                    }: {
                      label: string;
                      icon: IconType;
                    }) => (
                      <li key={label}>
                        <p className='space-x-2 flex items-center'>
                          <Icon
                            size={24}
                            className='text-[#BA7F23] flex-shrink-0'
                          />
                          <span className='body-text-normal text-[#CCCFDB]'>
                            {label}
                          </span>
                        </p>
                      </li>
                    )
                  )}
                </ul>
              )}

              <p className='body-text-normal text-[#CCCFDB]'>
                {FOOTER_MENU['info']['description']}
              </p>
            </div>
          )}
        </div>

        <div className='flex flex-row justify-around items-center max-[768px]:justify-between'>
          <div>
            {!!FOOTER_MENU['about'] && (
              <div className='space-y-4'>
                <h5 className='body-text-normal font-bold text-[#FBFBFB]'>
                  {FOOTER_MENU['about']['title']}
                </h5>

                {FOOTER_MENU['about']['children'].length > 0 && (
                  <ul className='space-y-4'>
                    {FOOTER_MENU['about']['children'].map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className='body-text-normal text-[#CCCFDB] inline-block'
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div>
            {!!FOOTER_MENU['customer_care'] && (
              <div className='space-y-4'>
                <h5 className='body-text-normal font-bold text-[#FBFBFB]'>
                  {FOOTER_MENU['customer_care']['title']}
                </h5>

                {FOOTER_MENU['customer_care']['children'].length > 0 && (
                  <ul className='space-y-4'>
                    {FOOTER_MENU['about']['children'].map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className='body-text-normal text-[#CCCFDB] inline-block'
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className='space-y-6'>
            {!!FOOTER_MENU['certified_by'] && (
              <div className='space-y-4'>
                <h5 className='body-text-normal font-bold text-[#FBFBFB]'>
                  {FOOTER_MENU['certified_by']['title']}
                </h5>

                {FOOTER_MENU['certified_by']['children'].length > 0 && (
                  <ul className='space-x-3 flex items-start'> {/* items-center */}
                    {FOOTER_MENU['certified_by']['children'].map(
                      ({ imgUrl, alt, href }) => (
                        <li key={imgUrl}>
                          <a
                            href={href}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-block'
                          >
                            <Image
                              src={imgUrl}
                              alt={alt}
                              width={150}
                              height={48}
                            />
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            )}

            {!!FOOTER_MENU['social_network'] && (
              <div className='space-y-4'>
                <h5 className='body-text-normal font-bold text-[#FBFBFB]'>
                  {FOOTER_MENU['social_network']['title']}
                </h5>

                {FOOTER_MENU['social_network']['children'].length > 0 && (
                  <ul className='space-x-3 flex items-center'>
                    {FOOTER_MENU['social_network']['children'].map(
                      ({
                        label,
                        icon: Icon,
                        href,
                      }: {
                        label: string;
                        icon: IconType;
                        href: string;
                      }) => (
                        <li key={label}>
                          <a
                            href={href}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#676767]'
                          >
                            <Icon size={16} className='text-white' />
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='px-16 pb-8 flex items-center justify-between max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-6 max-[768px]:pl-3 max-[768px]:pb-8 max-[768px]:pr-16'>
        <p className='body-text-normal font-bold text-[#FBFBFB]'>
          Phương thức thanh toán
        </p>

        <div className='flex items-center gap-3 max-[768px]:flex-wrap'>
          {PAYMENT_METHODS.map((item) => (
            <Image
              key={item.name}
              src={item.imgUrl}
              alt={item.name}
              width={!!item.large ? 86 : 47}
              height={27}
            />
          ))}
        </div>
      </div>

      <div className='py-3.5 bg-[#333131]'>
        <Container>
          <p className='text-sm leading-normal text-[#C1C1C1] text-center'>
            Copyright © 2023 Công Ty THHH Shop Vũ Hoàng. Mã số doanh nghiệp
            129128911 do Sở Kế hoạch Đầu tư Đồng Nai cấp lần 1 ngày 18/8/2018
          </p>
        </Container>
      </div>
    </footer>
  );
};

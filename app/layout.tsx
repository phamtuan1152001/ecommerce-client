import { Toaster } from 'sonner';
import type { Metadata } from 'next';
import { Mulish } from 'next/font/google';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';
import { RegisterOffer } from '@/components/section/register-offer';
import SlideInModal from '@/components/slide-in-modal';
import ProviderComponents from './components/provider';
import './globals.css';

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['1000', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-mulish',
});

export const metadata: Metadata = {
  title: 'Shop Vũ Hoàng',
  description: 'Shop Vũ Hoàng',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${mulish.variable}`}>
        <ProviderComponents>
          <Header />
          {children}
          <SlideInModal />
          <Toaster position='top-right' />
          <RegisterOffer/>
          <Footer />
        </ProviderComponents>
      </body>
    </html>
  );
}

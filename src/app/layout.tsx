import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/common/footer';
import NextTopLoader from 'nextjs-toploader';
import { CartProvider } from '@/context/cart-context';
import { Toaster } from '@/components/ui/toaster';
import { CartSheetProvider } from '@/context/cart-sheet-context';
import { Suspense } from 'react';
import ScrollToTopButton from '@/components/common/scroll-to-top';
import WhatsAppFloatingButton from '@/components/common/floating-whatsapp';
import { GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import OfferPopup from '@/components/offer-popup';
import { urbanist } from './fonts';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import BottomNavigationWrapper from '@/components/layout/BottomNavigationWrapper';
import AuthModal from '@/modules/auth/auth-modal';

export const metadata: Metadata = {
  title:
    'TechStudio BD: Electronics & Tech Gadgets Store in Bangladesh | Smartwatches, Headphones, Power Banks',
  description:
    'Shop electronics & gadgets in Bangladesh: Wireless Headphones, Smartwatches, Powerbanks, Chargers, Trimmers & more. Best prices, fast delivery, and 100% secure payments. 🎧 Free Shipping Available! ',
  icons: {
    icon: [{ url: '/favicon.ico' }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-5HH43QFS" />
      <body className={`${urbanist.className} antialiased`}>
        <Suspense>
          <CartProvider>
            <CartSheetProvider>
              <NextTopLoader color="#1878FF" />
              <div className="hidden md:block">
                <TopBar />
              </div>
              <Header />
              <OfferPopup />
              {children}
              <Toaster />
              <Footer />
              <ScrollToTopButton />
              <WhatsAppFloatingButton />
              <BottomNavigationWrapper />
            </CartSheetProvider>
          </CartProvider>
          <AuthModal />
        </Suspense>
        <SpeedInsights />
      </body>
    </html>
  );
}

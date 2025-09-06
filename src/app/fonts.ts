import { Noto_Serif_Bengali, Urbanist } from 'next/font/google';

export const urbanist = Urbanist({
  weight: ['300', '400', '700', '100', '200', '500', '600', '800', '900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});
export const notoSherif = Noto_Serif_Bengali({
  weight: ['300', '400', '700', '100', '200', '500', '600', '800', '900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

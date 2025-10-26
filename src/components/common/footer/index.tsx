import { socialLinks } from '@/utils/links';
import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Warranty Policy', href: '/warranty-policy' },
  { name: 'Terms & Conditions', href: '/terms' },
  { name: 'Refund Policy', href: '/refund-policy' },
  { name: 'Return Policy', href: '/return-policy' },
  { name: 'Delivery Policy', href: '/delivery-policy' },
];

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Offers', href: '/offers' },
  { name: 'Brands', href: '/brands' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
];

const footerLinks = [
  {
    title: 'Find It Fast',
    links: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Warranty Policy', href: '/warranty-policy' },
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Delivery Policy', href: '/delivery-policy' },
    ],
  },
  {
    title: 'Useful Links',
    links: [
      { name: 'Refund Policy', href: '/refund-policy' },
      { name: 'Return Policy', href: '/return-policy' },
      { name: 'Customer Support', href: '/customer-support' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Outlets', href: '/outlets' },
      { name: 'Contact Us', href: '/contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mb-0 mt-auto bg-slate-900 text-white md:mb-0">
      {/* Main Footer Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12 pb-6 md:pb-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info with Full Logo */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <picture>
                <img
                  src="/logo-full.svg"
                  alt="TechStudio Full Logo"
                  width={200}
                  height={60}
                  className="h-full w-40 xl:w-64"
                />
              </picture>
            </div>
            <p className="mb-6 max-w-md text-sm text-slate-300">
              Your one-stop destination for the latest gadgets, mobiles, and
              tech accessories. Quality products, competitive prices, and
              exceptional service.
            </p>
            <div className="mb-6 flex space-x-4">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  className="text-gray-300 hover:text-white"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="size-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks?.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-300 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Download App & QR Code */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Follow us</h3>
            <p className="mb-4 text-sm text-slate-300">
              Scan QR code to follow us on facebook
            </p>
            <div className="mb-4">
              <picture>
                <img
                  src="/qr_code.png"
                  alt="Download App QR Code"
                  className="h-full w-32 rounded-lg bg-white p-2"
                />
              </picture>
            </div>
          </div>
        </div>

        {/* Contact & Legal Section */}
        <div className="mt-8 grid grid-cols-1 gap-8 border-t border-slate-700 pt-8 md:grid-cols-2">
          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Get in Touch</h3>
            <div className="flex flex-col space-y-3 text-sm">
              <Link href={'tel:+8801670957108'} className="inline-block">
                <span className="flex items-center space-x-3">
                  <Phone className="size-4 text-slate-400" />
                  <span className="text-slate-300">01670957108</span>
                </span>
              </Link>
              <Link
                href={
                  'mailto:support@techstudio.com.bd?subject=Inquiry&body=Hello, I have a question...'
                }
                className="inline-block"
              >
                <span className="flex items-center space-x-3">
                  <Mail className="size-4 text-slate-400" />
                  <span className="text-slate-300">
                    support@techstudio.com.bd
                  </span>
                </span>
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              {legalLinks?.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-300 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 bg-slate-800 pb-20 md:pb-0">
        <div className="container mx-auto p-4 pb-2 md:pb-4">
          <div className="flex flex-col items-center justify-between text-sm text-slate-400 md:flex-row">
            <div>© 2025 TechStudio. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

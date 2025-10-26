import { Mail, Phone, Facebook, Instagram, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - TechStudio Bangladesh',
  description:
    "Founded in 2020, TechStudio has become one of Bangladesh's most trusted gadget retailers. Learn about our mission, vision, and commitment to quality.",
  keywords:
    'TechStudio Bangladesh, buy gadgets online BD, premium gadget store, authentic tech accessories, best gadget shop in Bangladesh, after-sales service BD, trusted gadget seller',
};

function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-6xl px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            About TechStudio
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Your Trusted Gadget Destination Since 2020
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-16 rounded-xl bg-white p-8 shadow-sm">
          <p className="mb-4 text-lg leading-relaxed text-gray-700">
            Founded in 2020, <strong>TechStudio</strong> has become one of
            Bangladesh&apos;s most trusted and customer-focused gadget
            retailers. We specialize exclusively in{' '}
            <strong>
              premium gadgets, accessories, and lifestyle tech products
            </strong>
            —bringing you quality, authenticity, and expert support every step
            of the way.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Whether you shop online or visit our outlet, you&apos;ll experience
            the same commitment to{' '}
            <strong>
              authentic products, fast delivery, and exceptional after-sales
              service.
            </strong>
          </p>
        </section>

        {/* Mission & Vision */}
        <div className="mb-16 grid gap-8 md:grid-cols-2">
          {/* Mission */}
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-3">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="leading-relaxed text-gray-700">
              Our mission is simple — to make quality gadgets more{' '}
              <strong>accessible, affordable, and enjoyable</strong> for
              everyone in Bangladesh. We aim to redefine gadget shopping through
              expert recommendations, honest service, and community engagement.
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-purple-100 p-3">
                <svg
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="leading-relaxed text-gray-700">
              To become the{' '}
              <strong>most reliable gadget brand in Bangladesh</strong>,
              connecting people to technology that enhances everyday life —
              while maintaining transparency, authenticity, and customer-first
              values.
            </p>
          </div>
        </div>

        {/* Why Choose TechStudio */}
        <section className="mb-16 rounded-xl bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">
            Why Choose TechStudio?
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            At TechStudio, we do more than sell gadgets — we help you choose
            smarter. Our team consists of passionate tech enthusiasts who{' '}
            <strong>research, test, and recommend</strong> products that truly
            add value to your daily life. By focusing only on gadgets—not phones
            or unrelated electronics—we provide{' '}
            <strong>specialized expertise</strong> and a{' '}
            <strong>curated product range</strong> that you can trust.
          </p>

          <h3 className="mb-4 text-xl font-semibold text-gray-900">
            Our Promises
          </h3>
          <ul className="space-y-3">
            {[
              '100% authentic and verified products',
              'Fast nationwide delivery',
              'Reliable warranty and after-sales support',
              'Expert guidance from real tech users',
              'Hassle-free online shopping experience',
            ].map((promise, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg
                  className="mt-1 h-5 w-5 flex-shrink-0 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700">{promise}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Our Story */}
        <section className="mb-16 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 shadow-sm">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">Our Story</h2>
          <p className="mb-4 leading-relaxed text-gray-700">
            Starting from a small online store in 2020, TechStudio has grown
            into a recognized name among gadget lovers in Bangladesh. Over the
            years, we&apos;ve built a loyal customer community who rely on us
            for their favorite tech gear and accessories.
          </p>
          <p className="leading-relaxed text-gray-700">
            Every purchase is backed by our passion for technology and
            dedication to customer satisfaction.
          </p>
        </section>

        {/* Official Channels */}
        <section className="mb-16 rounded-xl bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">
            Official Channels
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">
                Connect With Us
              </h3>
              <div className="space-y-3">
                <Link
                  href="https://www.facebook.com/techstudio.com.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-700 transition-colors hover:text-blue-600"
                >
                  <Facebook className="h-5 w-5" />
                  <span>facebook.com/techstudio.com.bd</span>
                </Link>
                <Link
                  href="https://www.instagram.com/techstudioofficialbd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-700 transition-colors hover:text-pink-600"
                >
                  <Instagram className="h-5 w-5" />
                  <span>instagram.com/techstudioofficialbd</span>
                </Link>
                <Link
                  href="https://www.facebook.com/share/g/1FvDHijTY9/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-700 transition-colors hover:text-blue-600"
                >
                  <Users className="h-5 w-5" />
                  <span>Community Group</span>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Contact Info</h3>
              <div className="space-y-3">
                <Link
                  href="tel:01670957108"
                  className="flex items-center gap-3 text-gray-700 transition-colors hover:text-green-600"
                >
                  <Phone className="h-5 w-5" />
                  <span>01670957108</span>
                </Link>
                <Link
                  href="mailto:support@techstudio.com.bd"
                  className="flex items-center gap-3 text-gray-700 transition-colors hover:text-blue-600"
                >
                  <Mail className="h-5 w-5" />
                  <span>support@techstudio.com.bd</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Authenticity Notice */}
        <section className="rounded-xl border-2 border-red-200 bg-red-50 p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-red-900">
            Authenticity & Safety Notice
          </h2>
          <p className="leading-relaxed text-red-800">
            We are{' '}
            <strong>
              not affiliated with any other website, Facebook page, or
              marketplace
            </strong>{' '}
            beyond the official channels listed above. Any transactions made
            outside these channels are not our responsibility. Always verify
            before you buy — your safety matters to us.
          </p>
        </section>

        {/* Footer tagline */}
        <div className="mt-12 text-center">
          <p className="text-2xl font-bold text-gray-900">
            TechStudio – Where Gadgets Meet Trust.
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Trade License No: TRAD/255926605190007412
          </p>
        </div>
      </main>
    </div>
  );
}

export default AboutUsPage;

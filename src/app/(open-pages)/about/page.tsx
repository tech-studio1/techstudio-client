import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { redirect } from 'next/navigation';
import React from 'react';

function AboutUsPage() {
  redirect('/');
  // return (
  //   <div className="min-h-screen bg-gray-50">
  //     <main className="mx-auto max-w-6xl px-4 py-16">
  //       {/* Section 1: Who We Are */}
  //       <section className="mb-24 flex flex-col items-center gap-12 md:flex-row">
  //         <div className="flex-1">
  //           <picture>
  //             <img
  //               src="/outlet/munshiganj.jpg"
  //               alt="TechStudio store"
  //               className="h-[400px] w-full rounded-lg object-cover shadow-lg"
  //             />
  //           </picture>
  //         </div>
  //         <div className="flex-1 space-y-6">
  //           <h2 className="text-4xl font-bold text-gray-900">Who We Are</h2>
  //           <h3 className="text-2xl font-semibold text-indigo-600">
  //             Bangladesh&apos;s Premier Electronics Destination
  //           </h3>
  //           <p className="text-gray-600">
  //             At TechStudio, we power your digital life with cutting-edge
  //             electronics and genuine accessories. Since 2015, we&apos;ve been
  //             committed to bringing the latest tech innovations to your
  //             doorstep, offering everything from smartphones to smart home
  //             devices at competitive prices.
  //           </p>
  //           <ul className="space-y-3">
  //             <li className="flex items-center gap-2">
  //               <svg
  //                 className="size-5 text-indigo-600"
  //                 fill="none"
  //                 stroke="currentColor"
  //                 viewBox="0 0 24 24"
  //               >
  //                 <path
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth="2"
  //                   d="M5 13l4 4L19 7"
  //                 />
  //               </svg>
  //               <span>Authentic products with warranty</span>
  //             </li>
  //             <li className="flex items-center gap-2">
  //               <svg
  //                 className="size-5 text-indigo-600"
  //                 fill="none"
  //                 stroke="currentColor"
  //                 viewBox="0 0 24 24"
  //               >
  //                 <path
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth="2"
  //                   d="M5 13l4 4L19 7"
  //                 />
  //               </svg>
  //               <span>Nationwide delivery within 3-5 days</span>
  //             </li>
  //             <li className="flex items-center gap-2">
  //               <svg
  //                 className="size-5 text-indigo-600"
  //                 fill="none"
  //                 stroke="currentColor"
  //                 viewBox="0 0 24 24"
  //               >
  //                 <path
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth="2"
  //                   d="M5 13l4 4L19 7"
  //                 />
  //               </svg>
  //               <span>Expert technical support team</span>
  //             </li>
  //           </ul>
  //         </div>
  //       </section>

  //       {/* Section 2: Our Services */}
  //       <section className="mb-24">
  //         <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">
  //           Our Services
  //         </h2>
  //         <div className="grid grid-cols-1 gap-8 2xl:grid-cols-2">
  //           <Accordion type="single" collapsible className="w-full space-y-4">
  //             <AccordionItem value="item-1" className="rounded-lg border">
  //               <AccordionTrigger className="px-4 py-2 font-bold transition-colors duration-300 hover:no-underline data-[state=open]:text-secondary">
  //                 Genuine Products Guarantee
  //               </AccordionTrigger>
  //               <AccordionContent className="px-4 pb-2">
  //                 All products come with official manufacturer warranties and
  //                 7-day return policy. We source directly from authorized
  //                 distributors.
  //               </AccordionContent>
  //             </AccordionItem>
  //             <AccordionItem value="item-2" className="rounded-lg border">
  //               <AccordionTrigger className="px-4 py-2 font-bold transition-colors duration-300 hover:no-underline data-[state=open]:text-secondary">
  //                 Nationwide Delivery
  //               </AccordionTrigger>
  //               <AccordionContent className="px-4 pb-2">
  //                 Fast and reliable delivery to all districts via SSL, Sundarban
  //                 Courier, and eCourier. Dhaka metro area same-day delivery
  //                 available.
  //               </AccordionContent>
  //             </AccordionItem>
  //             <AccordionItem value="item-3" className="rounded-lg border">
  //               <AccordionTrigger className="px-4 py-2 font-bold transition-colors duration-300 hover:no-underline data-[state=open]:text-secondary">
  //                 Installation Support
  //               </AccordionTrigger>
  //               <AccordionContent className="px-4 pb-2">
  //                 Free basic setup for smart devices and home electronics in
  //                 Dhaka, Chittagong, and Sylhet regions.
  //               </AccordionContent>
  //             </AccordionItem>
  //           </Accordion>

  //           <Accordion type="single" collapsible className="w-full space-y-4">
  //             <AccordionItem value="item-1" className="rounded-lg border">
  //               <AccordionTrigger className="px-4 py-2 font-bold transition-colors duration-300 hover:no-underline data-[state=open]:text-secondary">
  //                 EMI Options
  //               </AccordionTrigger>
  //               <AccordionContent className="px-4 pb-2">
  //                 Flexible payment plans through bKash, Nagad, and major bank
  //                 credit cards with 0% interest for 3-12 months.
  //               </AccordionContent>
  //             </AccordionItem>
  //             <AccordionItem value="item-2" className="rounded-lg border">
  //               <AccordionTrigger className="px-4 py-2 font-bold transition-colors duration-300 hover:no-underline data-[state=open]:text-secondary">
  //                 Corporate Solutions
  //               </AccordionTrigger>
  //               <AccordionContent className="px-4 pb-2">
  //                 Special pricing and bulk order arrangements for businesses,
  //                 educational institutions, and government organizations.
  //               </AccordionContent>
  //             </AccordionItem>
  //             <AccordionItem value="item-3" className="rounded-lg border">
  //               <AccordionTrigger className="px-4 py-2 font-bold transition-colors duration-300 hover:no-underline data-[state=open]:text-secondary">
  //                 Repair Services
  //               </AccordionTrigger>
  //               <AccordionContent className="px-4 pb-2">
  //                 Authorized service center partnerships for smartphones,
  //                 laptops, and other electronics with pickup/drop-off service.
  //               </AccordionContent>
  //             </AccordionItem>
  //           </Accordion>
  //         </div>
  //       </section>

  //       {/* Section 3: Why Choose Us */}
  //       <section>
  //         <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">
  //           Why TechStudio?
  //         </h2>
  //         <div className="flex flex-col items-center gap-12 md:flex-row md:items-start">
  //           <div className="flex-1">
  //             <Accordion type="single" collapsible className="w-full space-y-4">
  //               <AccordionItem value="item-1" className="rounded-lg border">
  //                 <AccordionTrigger className="px-4 py-2 font-bold transition-colors duration-300 hover:no-underline data-[state=open]:text-secondary">
  //                   Largest Electronics Inventory
  //                 </AccordionTrigger>
  //                 <AccordionContent className="px-4 pb-2">
  //                   15,000+ products across 50+ brands with real-time stock
  //                   updates and pre-order options for upcoming launches.
  //                 </AccordionContent>
  //               </AccordionItem>
  //               <AccordionItem value="item-2" className="rounded-lg border">
  //                 <AccordionTrigger className="px-4 py-2 font-bold transition-colors duration-300 hover:no-underline data-[state=open]:text-secondary">
  //                   Price Match Guarantee
  //                 </AccordionTrigger>
  //                 <AccordionContent className="px-4 pb-2">
  //                   Found it cheaper? We&apos;ll match any authorized
  //                   dealer&apos;s price plus give 5% extra discount.
  //                 </AccordionContent>
  //               </AccordionItem>
  //               <AccordionItem value="item-3" className="rounded-lg border">
  //                 <AccordionTrigger className="px-4 py-2 font-bold transition-colors duration-300 hover:no-underline data-[state=open]:text-secondary">
  //                   Tech Experts On Call
  //                 </AccordionTrigger>
  //                 <AccordionContent className="px-4 pb-2">
  //                   Free consultation with our certified technicians via phone,
  //                   chat, or in-store visit.
  //                 </AccordionContent>
  //               </AccordionItem>
  //               <AccordionItem value="item-4" className="rounded-lg border">
  //                 <AccordionTrigger className="px-4 py-2 font-bold transition-colors duration-300 hover:no-underline data-[state=open]:text-secondary">
  //                   Secure Shopping
  //                 </AccordionTrigger>
  //                 <AccordionContent className="px-4 pb-2">
  //                   SSL encrypted payments and cash-on-delivery option with
  //                   complete order protection.
  //                 </AccordionContent>
  //               </AccordionItem>
  //             </Accordion>
  //           </div>
  //           <div className="flex-1">
  //             <picture>
  //               <img
  //                 src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
  //                 alt="TechStudio warehouse"
  //                 className="h-[500px] w-full rounded-lg object-cover shadow-lg"
  //               />
  //             </picture>
  //           </div>
  //         </div>
  //       </section>
  //     </main>
  //   </div>
  // );
}

export default AboutUsPage;

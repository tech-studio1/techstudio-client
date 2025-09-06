import { notoSherif } from '@/app/fonts';
import React from 'react';

const page = () => {
  return (
    <main className="mx-auto max-w-6xl">
      <div className="my-10 p-2">
        <picture>
          <img src="/delivery.webp" alt="" className="h-auto w-[500px]" />
        </picture>
        <div className="my-10">
          <h2 className="mb-4 text-xl font-bold">
            Delivery & Shipping Process:
          </h2>
          <ul className={`space-y-2 ${notoSherif.className} font-medium`}>
            <li className="flex items-center">
              <span className="mr-2 flex size-5 shrink-0 items-center justify-center rounded-sm bg-blue-500 text-white">
                ✓
              </span>
              ঢাকার মধ্যে ক্যাশ অন ডেলিবারি (৬০ টাকা ডেলিভারি চার্জ।
            </li>
            <li className="flex items-center">
              <span className="mr-2 flex size-5 shrink-0 items-center justify-center rounded-sm bg-blue-500 text-white">
                ✓
              </span>
              ঢাকার বাহিরে ১২০ টাকা ডেলিভারি চার্জ অগ্রিম প্রদান করতে হবে,
              প্রোডাক্টসের মূল্য ক্যাশ অন ডেলিভারি|
            </li>
            <li className="flex items-center">
              <span className="mr-2 flex size-5 shrink-0 items-center justify-center rounded-sm bg-blue-500 text-white">
                ✓
              </span>
              অর্ডার প্রক্রিয়ার জন্য ২৪ ঘন্টা সময় লাগতে পারে।
            </li>
            <li className="flex items-center">
              <span className="mr-2 flex size-5 shrink-0 items-center justify-center rounded-sm bg-blue-500 text-white">
                ✓
              </span>
              ঢাকার মধ্যে ২৪-৩৬ ঘন্টা সময় লাগতে পারে ডেলিভারি হতে।
            </li>
            <li className="flex items-center">
              <span className="mr-2 flex size-5 shrink-0 items-center justify-center rounded-sm bg-blue-500 text-white">
                ✓
              </span>
              ঢাকার বাহিরে ২-৪ দিন সময় লাগতে পারে ডেলিভারি হতে।
            </li>
            <li className="flex items-center">
              <span className="mr-2 flex size-5 shrink-0 items-center justify-center rounded-sm bg-blue-500 text-white">
                ✓
              </span>
              গ্রাহক সেলার এর সাথে কথা বলে ডেলিভারি ব্যাক্তির সামনে পন্যটি চেক
              করতে পারবেন।
            </li>
            <li className="flex items-center">
              <span className="mr-2 flex size-5 shrink-0 items-center justify-center rounded-sm bg-blue-500 text-white">
                ✓
              </span>
              আনবক্সিং ভিডিও রাখতে হবে ওয়ারেন্টি ক্লাইম করার জন্য।
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default page;

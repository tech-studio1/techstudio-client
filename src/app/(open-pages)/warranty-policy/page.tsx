import { notoSherif } from '@/app/fonts';

export default function WarrantyPolicyPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-8 p-6 text-gray-600">
      <div className="my-10">
        <h2 className="mb-4 text-xl font-bold">Warranty Policy:</h2>
        <ul className={`${notoSherif.className} space-y-2 md:text-lg`}>
          <li className="flex items-center">
            <span className="mr-2 flex size-5 shrink-0 items-center justify-center rounded-sm bg-blue-500 text-white">
              ✓
            </span>
            আমাদের সাধারণত ৩দিনের রিপ্লেসমেন্ট ওয়ারেন্টি রয়েছে।
          </li>
          <li className="flex items-center">
            <span className="mr-2 flex size-5 shrink-0 items-center justify-center rounded-sm bg-blue-500 text-white">
              ✓
            </span>
            মেনুফেকচার থেকে কোনো ধরনের সম্যাসা পেলে সাথে সাথে আমাদের কাছে
            যোগাযোগ করতে হবে, অবশ্যই ৩দিনের মধ্যে জানাতে হবে। ৩দিনের পর কোনো
            অবস্থায় ওয়ারেন্টি ক্লাইম করা যাবে না।
          </li>
          <li className="flex items-center">
            <span className="mr-2 flex size-5 shrink-0 items-center justify-center rounded-sm bg-blue-500 text-white">
              ✓
            </span>
            ওয়ারেন্টি ক্লেইম এর জন্য প্রোডাক্ট আমাদের শপে নিয়ে আসতে হবে ক্যাশ
            মেমো, প্রোডাক্ট প্যাকিজিং সহ। অথবা ডেলিভারি ম্যান দিয়ে পাঠাতে পারবে
            এক্ষেত্রে আসা-যাওয়ার ডেলিভারি চার্জ কাস্টমারকে বহন করতে হবে।
          </li>
          <li className="flex items-center">
            <span className="mr-2 flex size-5 shrink-0 items-center justify-center rounded-sm bg-blue-500 text-white">
              ✓
            </span>
            সাধারন ওয়ারেন্টির জন্য ২-৩ দিন অপেক্ষা করতে হবে।
          </li>
          <li className="flex items-center">
            <span className="mr-2 flex size-5 shrink-0 items-center justify-center rounded-sm bg-blue-500 text-white">
              ✓
            </span>
            ব্র্যান্ড ওয়ারেন্টির জন্য ৩-৪ সপ্তাহ সময় অপেক্ষা করতে হবে।
          </li>
          <li className="flex items-center">
            <span className="mr-2 flex size-5 shrink-0 items-center justify-center rounded-sm bg-blue-500 text-white">
              ✓
            </span>
            ওয়ারেন্টি ক্লেইম করতে হলে অবশ্যই বক্স,ক্যাশ-মেমো,বক্সের ভেতর
            এক্সোসোরিজ,ওয়ারেন্টি ষ্টিকার অবশ্যই সাথে নিয়ে আসতে হবে অথবা কুরিয়ার
            করতে হবে।
          </li>
        </ul>
      </div>
      <div className="pb-10">
        <h2 className="mb-4 mt-6 text-xl font-bold">
          How To Do Warranty Claim:
        </h2>
        <ul className={`${notoSherif.className} space-y-2 md:text-lg`}>
          <li className="flex items-center">
            <span className="mr-2 flex size-5 shrink-0 items-center justify-center rounded-sm bg-blue-500 text-white">
              ✓
            </span>
            আমাদের ফেইসবুকের অফিশিয়াল পেইজে মেসেজ
          </li>
          <li className="flex items-center">
            <span className="mr-2 flex size-5 shrink-0 items-center justify-center rounded-sm bg-blue-500 text-white">
              ✓
            </span>
            আমাদের WhatsApp (01670957108) এ জানাতে পারেন।
          </li>
          <li className="flex items-center">
            <span className="mr-2 flex size-5 shrink-0 items-center justify-center rounded-sm bg-blue-500 text-white">
              ✓
            </span>
            সরাসরি কল দিয়ে জানাতে পারবেন(অফিস টাইমে)
          </li>
        </ul>
      </div>
    </main>
  );
}

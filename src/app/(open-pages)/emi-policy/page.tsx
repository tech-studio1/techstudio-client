import { Card, CardContent } from '@/components/ui/card';
import { Calculator, Shield, Clock, FileText } from 'lucide-react';
import { redirect } from 'next/navigation';

const banks = [
  { name: 'Al-Arafah Islami Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'Bank Asia', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'Brac Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'City Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'Community Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'Dhaka Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'Dutch Bangla Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'Eastern Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'Exim Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'Jamuna Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'Lankabangla Finance', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'Mercantile Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'Meghna Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'Midland Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'Mutual Trust Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'NCC Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'NRB Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'NRB Commercial Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'One Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'Prime Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'SBAC Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'Shahjalal Islami Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'Southeast Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'Standard Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  {
    name: 'Standard Chartered Bank',
    months: ['4%', '5.50%', '8.00%', '10.50%'],
  },
  { name: 'Trust Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
  { name: 'United Commercial Bank', months: ['3%', '4.50%', '6.50%', '8.50%'] },
];

const cardCharges = [
  { channel: 'ABBANKIB', tdr: '2.5%' },
  { channel: 'ABDIRECT', tdr: '2.5%' },
  { channel: 'AMEX', tdr: '3.5%' },
  { channel: 'BANKASIA', tdr: '2.5%' },
  { channel: 'BKASH', tdr: '2.5%' },
  { channel: 'CITY BANKIB', tdr: '2.5%' },
  { channel: 'DBBL MOBILEB', tdr: '2.5%' },
  { channel: 'IBBL', tdr: '2.5%' },
  { channel: 'ITCL', tdr: '2.5%' },
  { channel: 'MASTER', tdr: '2.5%' },
  { channel: 'MobileMoney', tdr: '2.5%' },
  { channel: 'MTBL', tdr: '2.5%' },
  { channel: 'MYCASH', tdr: '2.5%' },
  { channel: 'NAGAD', tdr: '2.5%' },
  { channel: 'NEXUS', tdr: '2.5%' },
  { channel: 'UCash', tdr: '2.5%' },
  { channel: 'UNIONPAY', tdr: '2.5%' },
  { channel: 'UPay', tdr: '2.0%' },
  { channel: 'VISA', tdr: '2.5%' },
  { channel: 'ACC', tdr: '1.5%' },
  { channel: 'CellFin', tdr: '1.5%' },
  { channel: 'CF', tdr: '2.5%' },
  { channel: 'CMA-CELLFIN', tdr: '2.5%' },
  { channel: 'Dmoney', tdr: '2.5%' },
  { channel: 'IPay', tdr: '2.5%' },
  { channel: 'MEGHNA', tdr: '2.5%' },
  { channel: 'NPSB', tdr: '1.5%' },
  { channel: 'Okwallet', tdr: '2.5%' },
  { channel: 'Rainbow', tdr: '2.5%' },
  { channel: 'SureCash', tdr: '2.5%' },
  { channel: 'TAPNPAY', tdr: '2.5%' },
];
export default function EmiPolicy() {
  redirect('/');
  // return (
  //   <main className="mx-auto max-w-6xl px-4 py-12 text-gray-600 sm:px-6 lg:px-8">
  //     <div className="my-10">
  //       <h2 className="mb-4 text-center text-xl font-bold">EMI CONDITIONS:</h2>
  //       <ul className="list-disc space-y-2 pl-5 text-lg text-gray-700">
  //         <li>
  //           Only Credit cardholder is eligible for EMI transaction. Debit card
  //           is not allowed.
  //         </li>
  //         <li>Only AMEX card is eligible for City Bank Cardholder.</li>
  //         <li>
  //           Customer have to bear EMI charges according to the preferred
  //           installment month.
  //         </li>
  //       </ul>
  //     </div>
  //     <h2 className="mb-4 mt-6 text-xl font-bold">
  //       List of Banks and EMI Charges:
  //     </h2>
  //     <table className="w-full border-collapse border border-gray-300">
  //       <thead>
  //         <tr className="bg-gray-200">
  //           <th className="border p-2">SL No</th>
  //           <th className="border p-2">Bank</th>
  //           <th className="border p-2">3 Months</th>
  //           <th className="border p-2">6 Months</th>
  //           <th className="border p-2">9 Months</th>
  //           <th className="border p-2">12 Months</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {banks.map((bank, index) => (
  //           <tr key={index} className="border">
  //             <td className="border p-2 text-center">{index + 1}</td>
  //             <td className="border p-2">{bank.name}</td>
  //             {bank.months.map((charge, i) => (
  //               <td key={i} className="border p-2 text-center">
  //                 {charge}
  //               </td>
  //             ))}
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //     <h2 className="mb-4 mt-6 text-xl font-bold">Card Charges</h2>
  //     <table className="w-full border-collapse border border-gray-300">
  //       <thead>
  //         <tr className="bg-gray-200">
  //           <th className="w-16 border p-2">Sl no</th>
  //           <th className="border p-2">Channel Type</th>
  //           <th className="border p-2">TDR</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {cardCharges.map((charge, index) => (
  //           <tr key={index} className="border">
  //             <td className="w-16 border p-2">{index + 1}</td>
  //             <td className="border p-2">{charge.channel}</td>
  //             <td className="border p-2 text-center">{charge.tdr}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </main>
  // );
}

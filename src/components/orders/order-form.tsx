'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

// Define the schema using Zod
const orderSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  mobile: z
    .string()
    .min(10, { message: 'Mobile number must be at least 10 digits long' })
    .max(15, { message: 'Mobile number cannot exceed 15 digits' }),
  location: z
    .string()
    .min(5, { message: 'Location must be at least 5 characters long' }),
  paymentMethod: z.enum(['cash', 'card', 'mobilePayment'], {
    required_error: 'Payment method is required',
  }),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  email: z
    .string()
    .email({ message: 'Enter a valid email address' })
    .optional(),
  notes: z.string().optional(),
});

// Infer form values type from the schema
type OrderFormValues = z.infer<typeof orderSchema>;

const cartItems = [
  { id: 1, name: 'Item 1', quantity: 2, price: 200 },
  { id: 2, name: 'Item 2', quantity: 1, price: 150 },
];

export default function OrderForm() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: '',
      mobile: '',
      location: '',
      paymentMethod: 'cash',
      email: '',
      notes: '',
    },
  });

  const onSubmit = (data: OrderFormValues) => {
    // console.log('Order submitted:', data);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );

  return (
    <div className="flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 xl:px-0">
      {/* Cart Item Summary */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Cart Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="ml-2 bg-white text-sm text-muted-foreground">
                    (x{item.quantity})
                  </span>
                </div>
                <span className="font-semibold">
                  ${item.quantity * item.price}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <div className="flex w-full justify-between font-semibold">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>
        </CardFooter>
      </Card>

      {/* Order Form */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div className="relative">
              <Input id="name" placeholder=" " {...register('name')} />
              <Label
                htmlFor="name"
                className="pointer-events-none absolute -top-2 left-3 bg-white px-1 text-sm text-muted-foreground transition-transform"
              >
                Your Name
              </Label>
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Mobile Field */}
            <div className="relative">
              <Input id="mobile" placeholder=" " {...register('mobile')} />
              <Label
                htmlFor="mobile"
                className="pointer-events-none absolute -top-2 left-3 bg-white px-1 text-sm text-muted-foreground transition-transform"
              >
                Mobile Number
              </Label>
              {errors.mobile && (
                <p className="text-sm text-red-600">{errors.mobile.message}</p>
              )}
            </div>

            {/* Location Field */}
            <div className="relative">
              <Input id="location" placeholder=" " {...register('location')} />
              <Label
                htmlFor="location"
                className="pointer-events-none absolute -top-2 left-3 bg-white px-1 text-sm text-muted-foreground transition-transform"
              >
                Location
              </Label>
              {errors.location && (
                <p className="text-sm text-red-600">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Payment Method */}
            <div className="relative">
              <Label htmlFor="paymentMethod" className="text-sm">
                Payment Method
              </Label>
              <Select
                onValueChange={setPaymentMethod}
                defaultValue={paymentMethod}
              >
                <SelectTrigger id="paymentMethod">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash on Delivery</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="mobilePayment">Mobile Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Card Payment Fields */}
            {paymentMethod === 'card' && (
              <>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    placeholder=" "
                    {...register('cardNumber')}
                  />
                  <Label
                    htmlFor="cardNumber"
                    className="pointer-events-none absolute -top-2 left-3 bg-white px-1 text-sm text-muted-foreground transition-transform"
                  >
                    Card Number
                  </Label>
                </div>
                <div className="relative">
                  <Input
                    id="expiryDate"
                    placeholder=" "
                    {...register('expiryDate')}
                  />
                  <Label
                    htmlFor="expiryDate"
                    className="pointer-events-none absolute -top-2 left-3 bg-white px-1 text-sm text-muted-foreground transition-transform"
                  >
                    Expiry Date
                  </Label>
                </div>
                <div className="relative">
                  <Input id="cvv" placeholder=" " {...register('cvv')} />
                  <Label
                    htmlFor="cvv"
                    className="pointer-events-none absolute -top-2 left-3 bg-white px-1 text-sm text-muted-foreground transition-transform"
                  >
                    CVV
                  </Label>
                </div>
              </>
            )}

            {/* Email Field */}
            <div className="relative">
              <Input id="email" placeholder=" " {...register('email')} />
              <Label
                htmlFor="email"
                className="pointer-events-none absolute -top-2 left-3 bg-white px-1 text-sm text-muted-foreground transition-transform"
              >
                Email (Optional)
              </Label>
            </div>

            {/* Notes Field */}
            <div className="relative">
              <Textarea id="notes" placeholder=" " {...register('notes')} />
              <Label
                htmlFor="notes"
                className="pointer-events-none absolute -top-2 left-3 bg-white px-1 text-sm text-muted-foreground transition-transform"
              >
                Additional Notes (Optional)
              </Label>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="mt-4 w-full">
              Submit Order
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

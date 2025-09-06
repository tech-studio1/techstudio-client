'use client';

import {
  CreditCard,
  Truck,
  MapPin,
  CheckCircle,
  LoaderCircle,
} from 'lucide-react';
import { useForm, useFormContext, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { paymentSchema, type PaymentFormValues } from './schema';
import { useCart } from '@/context/cart-context';
import { useEffect, useState } from 'react';
import { PhoneInput } from '@/components/ui/phone-picker';
import { useHydration } from '@/hooks/use-hydration';
import DistrictSelectForm from './district-select-form';
import AreaSelectForm from './area-select-form';
import area_data from '@/lib/area.json';
import district_data from '@/lib/districts.json';
import { handlePostOrder } from '@/app/actions/order';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRouter } from 'nextjs-toploader/app';
import { Textarea } from '@/components/ui/textarea';
import { Profile } from '../user/profile/user';
import { trackBeginCheckout, trackPurchase } from '@/lib/gtm';

// Mock data for cart items

const AddressFields = ({
  prefix,
}: {
  prefix: 'billingAddress' | 'shippingAddress';
}) => {
  //   const form = useFormContext();
  const form = useFormContext<PaymentFormValues>();
  return (
    <div className={`grid grid-cols-2 gap-4`}>
      <FormField
        control={form.control}
        name={`${prefix}.firstName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <span className="text-sm text-gray-700">First Name</span>
              <span className="text-sm text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="first name" {...field} />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`${prefix}.lastName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <span className="text-sm text-gray-700">Last Name</span>
              <span className="text-sm text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="last name" {...field} />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`${prefix}.mobile`}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>
              <span className="text-sm text-gray-700">Phone Number</span>
              <span className="text-sm text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <PhoneInput
                defaultCountry="BD"
                placeholder="1XXXXXXXXX"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      <DistrictSelectForm
        className="col-span-2 md:col-span-1"
        label="district"
        name={`${prefix}.district`}
        options={district_data}
        option_field="district_name"
      />
      {form.watch(`${prefix}.district`) === 'Dhaka' ? (
        <AreaSelectForm
          label="area"
          name={`${prefix}.city`}
          options={area_data}
          districtSelectValue={form.watch(`${prefix}.district`)}
          cityIdFieldName={
            prefix === 'billingAddress' ? 'city_id' : 'shipping_city_id'
          }
        />
      ) : (
        <FormField
          control={form.control}
          name={`${prefix}.city`}
          render={({ field }) => (
            <FormItem className="col-span-2 -mt-1 md:col-span-1">
              <FormLabel>
                <span className="text-sm text-gray-700">Area</span>
                <span className="text-sm text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="subdistrict/area/station" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name={`${prefix}.address`}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>
              <span className="text-sm text-gray-700">Address</span>
              <span className="text-sm text-destructive">*</span>
            </FormLabel>
            <FormControl className="overflow-hidden overflow-y-auto">
              <Textarea
                placeholder="Full Address"
                className="h-fit max-h-[60px] min-h-9"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default function CheckoutForm({ user }: { user: Profile }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { items, clearCart } = useCart();
  const router = useRouter();
  const isHydrated = useHydration();
  const cartItems = items;
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: 'COD',
      sameAsBilling: true,
      billingAddress: {
        firstName: user?.first_name || '',
        lastName: user?.last_name || '',
        address: '',
        mobile: '',
        city: '',
        district: '',
      },
      shippingAddress: {
        firstName: '',
        lastName: '',
        address: '',
        mobile: '',
        city: '',
        district: '',
      },
      city_id: undefined,
      shipping_city_id: undefined,
      bkashNumber: '',
      bkashTransactionId: '',
    },
  });
  const { watch, setValue, getValues, resetField } = form;
  const sameAsBilling = watch('sameAsBilling');
  const billingAddress = watch('billingAddress');
  const billing_district = useWatch({
    control: form.control,
    name: `billingAddress.district`, // Corrected spelling
  });
  const shipping_district = useWatch({
    control: form.control,
    name: `shippingAddress.district`, // Corrected prefix and spelling
  });
  const billing_city_id = useWatch({
    control: form.control,
    name: 'city_id',
  });
  const shipping_city_id = useWatch({
    control: form.control,
    name: 'shipping_city_id',
  });

  // console.log(shipping_district);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.selectedVariant.compareAtPrice * item.quantity,
    0,
  );
  const getShippingCost = () => {
    if (sameAsBilling) {
      // Use billing address for shipping calculation
      if (billing_district === 'Dhaka') {
        if (billing_city_id === 1) return 60;
        if (billing_city_id === 2) return 100;
        return 120;
      }
      return 120;
    } else {
      // Use shipping address for calculation
      if (shipping_district === 'Dhaka') {
        if (shipping_city_id === 1) return 60;
        if (shipping_city_id === 2) return 100;
        return 120;
      }
      return 120;
    }
  };

  const shipping = getShippingCost();
  const total = subtotal + shipping;

  // onSubmit
  const onSubmit = async (data: PaymentFormValues) => {
    setLoading(true);
    const processedData = {
      ...data,

      billingAddress: {
        ...data?.billingAddress,
        area: data?.billingAddress?.address,
      },
      shippingAddress: data.sameAsBilling
        ? { ...data.billingAddress, area: data?.billingAddress?.address }
        : { ...data.shippingAddress, area: data?.shippingAddress?.address },
    };
    const order_items = items.map((item) => {
      return {
        id: item.id ? item.id.split(':')[1] : '',
        quantity: item.quantity,
        title: item?.title || '',
        image: item?.selectedVariant?.medias?.[0] || item?.medias?.[0] || '',
        costPerItem: {
          costPerItem: item.selectedVariant.costPerItem,
          compareAtPrice: item.selectedVariant.compareAtPrice,
          price: item.selectedVariant.price,
        },
        variantInfo: item.selectedVariant,
      };
    });
    // Check if order is outside Dhaka and needs payment_info
    const isDhaka = data.billingAddress.district === 'Dhaka';
    const hasCityId = data.city_id;
    const isOutsideDhaka = !isDhaka || (isDhaka && !hasCityId);

    const body = {
      client_info: processedData,
      order_items,
      pricing: { shipping, items_cost: subtotal, total_cost: total },
      ...(isOutsideDhaka && {
        payment_info: {
          bkashNumber: data.bkashNumber,
          bkashTransactionId: data.bkashTransactionId || '',
        },
      }),
    };

    // Handle form submission
    try {
      const result = await handlePostOrder(body);

      setLoading(false);
      setIsSuccess(true);
      trackPurchase(result?.data, cartItems);
      form.reset();
      setTimeout(() => {
        router.push('/');
        clearCart();
      }, 10000);
    } catch (error) {
      setLoading(false);
      toast({ title: `Failed!` });
    }
  };
  useEffect(() => {
    trackBeginCheckout(cartItems, total);
  }, [cartItems, total]);

  useEffect(() => {
    if (sameAsBilling) {
      // Set shippingAddress to undefined to skip validation
      setValue('shippingAddress', undefined, { shouldValidate: true });
    } else {
      // Reset to empty structure to allow user input
      resetField('shippingAddress', {
        defaultValue: {
          firstName: '',
          lastName: '',
          address: '',
          mobile: '',
          city: '',
          district: '',
        },
      });
    }
  }, [sameAsBilling, setValue, resetField]);

  // Clear billing area when billing district changes
  useEffect(() => {
    setValue('billingAddress.city', '');
    setValue('city_id', undefined);
  }, [billing_district, setValue]);

  // Clear shipping area when shipping district changes
  useEffect(() => {
    if (!sameAsBilling) {
      setValue('shippingAddress.city', '');
      setValue('shipping_city_id', undefined);
    }
  }, [shipping_district, setValue, sameAsBilling]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen pb-12 pt-8">
        <div className="mx-auto max-w-6xl px-4 xl:px-0">
          <div className="flex items-center justify-center py-12">
            <LoaderCircle className="size-8 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12 pt-8">
      <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
        <DialogTrigger className="hidden"></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Order Placed Successfully</DialogTitle>
            <DialogDescription>
              Your order has been successfully placed. Thank you for shopping
              with us!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center rounded-lg border border-green-200 bg-green-50 p-6">
            {/* Success Icon */}
            <CheckCircle className="mb-4 size-12 text-green-600" />
            {/* Success Message */}
            <h3 className="text-lg font-semibold text-green-800">
              Order Confirmed
            </h3>
            <p className="mt-2 text-center text-sm text-green-600">
              Your order will be delivered soon.
            </p>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => {
                router.push('/');
                clearCart();
              }}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Continue Shopping
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="mx-auto max-w-6xl px-4 xl:px-0">
        {/* <h1 className="mb-8 text-3xl font-bold">Checkout Summary</h1> */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-8 lg:grid-cols-2"
          >
            {/* Order Summary Section */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <h2 className="mb-4 text-xl font-semibold text-gray-800">
                    Order Summary
                  </h2>
                  <span className="text-xs font-light">
                    <strong>Delivery: </strong>Dhaka City ৳ 60, Dhaka Sub-city ৳
                    100,
                    <br /> Outside Dhaka ৳ 120
                  </span>
                </div>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedVariant.color_name}`}
                      className="flex gap-3 rounded-lg border bg-white p-3 shadow-sm"
                    >
                      <div className="overflow-hidden">
                        <picture>
                          <img
                            src={
                              item?.selectedVariant &&
                              item?.selectedVariant?.medias &&
                              item?.selectedVariant?.medias.length > 0
                                ? item?.selectedVariant?.medias[0]
                                : item?.medias && item?.medias.length > 0
                                  ? item.medias[0]
                                  : '/product_place_holder.gif'
                            }
                            alt={item?.title?.split(' ')[0]}
                            className="size-16 rounded-md object-cover"
                          />
                        </picture>
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          {item.title}
                        </h3>
                        <div className="grid grid-cols-2 gap-y-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="size-3 rounded-full border"
                              style={{
                                backgroundColor:
                                  item.selectedVariant.color_code,
                              }}
                            />
                            <span className="text-xs text-gray-500">
                              {item.selectedVariant.color_name}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm">
                            Price: ৳{' '}
                            {Math.floor(
                              item.selectedVariant.compareAtPrice *
                                item.quantity,
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>৳ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>৳ {shipping.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>৳ {total.toFixed(2)}</span>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <CreditCard className="size-5" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Payment Method
                  </h2>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex size-4 items-center justify-center rounded-full border-2 border-primary bg-primary">
                    <div className="size-2 rounded-full bg-white"></div>
                  </div>
                  <Label className="text-sm text-gray-700">
                    Cash on Delivery
                  </Label>
                </div>
              </Card>
            </div>

            {/* Payment Section */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <MapPin className="size-5" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Billing Address
                  </h2>
                </div>

                <AddressFields prefix="billingAddress" />
              </Card>

              {/* Advance Payment for Outside Dhaka */}
              {(billing_district !== 'Dhaka' ||
                (billing_district === 'Dhaka' && !billing_city_id)) && (
                <Card className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <picture>
                      <img
                        src="/bkash_logo.png"
                        alt="bKash"
                        className="h-8 w-auto"
                      />
                    </picture>
                    <h2 className="text-lg font-semibold text-gray-800 md:text-xl">
                      ৳120 Advance Payment (Outside Dhaka)
                    </h2>
                  </div>

                  <div className="mb-4 rounded-lg border border-orange-200 bg-orange-50 p-4">
                    <p className="mb-3 text-sm text-orange-800">
                      <strong>
                        ঢাকার বাহিরে অর্ডার কনফার্ম করার জন্যে অগ্রিম ১২০ টাকা
                        এডভান্স পেমেন্ট করতে হবে। প্রোডাক্টের অবশিষ্ট টাকা আপনি
                        “ক্যাশ অন ডেলিভারি“ তে পরিশোধ করবেন।
                      </strong>
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center rounded-lg border bg-white p-3">
                        <picture>
                          <img
                            src="/make_payment.png"
                            alt="Make Payment"
                            className="mb-2 h-12 w-auto"
                          />
                        </picture>
                        <p className="text-center text-xs text-gray-600">
                          <strong>Make Payment:</strong>
                          <br />
                          Go to bKash → Make Payment → Enter:{' '}
                          <strong>01636196613</strong> → Amount: 120
                        </p>
                      </div>
                      <div className="flex flex-col items-center rounded-lg border bg-white p-3">
                        <picture>
                          <img
                            src="/send_money.png"
                            alt="Send Money"
                            className="mb-2 h-12 w-auto"
                          />
                        </picture>
                        <p className="text-center text-xs text-gray-600">
                          <strong>Send Money:</strong>
                          <br />
                          Go to bKash → Send Money → Enter:{' '}
                          <strong>01924752175</strong> → Amount: 120
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="bkashNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <span className="text-sm text-gray-700">
                              Your bKash Number
                            </span>
                            <span className="text-sm text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <PhoneInput
                              defaultCountry="BD"
                              placeholder="1XXXXXXXXX"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bkashTransactionId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <span className="text-sm text-gray-700">
                              bKash Transaction ID
                            </span>
                            <span className="ml-1 text-xs text-gray-500">
                              (optional)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter transaction ID if available"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>
              )}

              <Button
                id="order"
                type="submit"
                disabled={loading}
                className="w-full py-6 text-base font-semibold"
                onClick={() => {
                  // Trigger validation on click to show errors
                  form.trigger();
                }}
              >
                {loading ? (
                  <LoaderCircle className="animate-spin transition-all duration-500 ease-in-out" />
                ) : (
                  `Place Order - ৳${total.toFixed(2)}`
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

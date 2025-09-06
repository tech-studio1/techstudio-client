import * as z from 'zod';

const cardExpiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

const phoneRegex = /^(\+8801|01)[3-9]\d{8}$/;

export const addressSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  address: z.string().min(5, 'Street address is required'),
  mobile: z.string().regex(phoneRegex, 'Please enter a valid mobile number'),
  city: z.string().min(2, 'Area is required'),
  district: z.string().min(2, 'District is required'),
});

export const paymentSchema = z
  .object({
    paymentMethod: z.enum(['COD']).default('COD'),

    billingAddress: addressSchema,
    sameAsBilling: z.boolean().default(true),
    shippingAddress: addressSchema.optional(),
    city_id: z.number().optional(), // For billing address Dhaka areas
    shipping_city_id: z.number().optional(), // For shipping address Dhaka areas

    // bKash fields for outside Dhaka advance payment
    bkashNumber: z
      .string()
      .regex(phoneRegex, 'Please enter a valid bkash number')
      .optional()
      .or(z.literal('')),
    bkashTransactionId: z.string().optional(),
  })
  .refine(
    (data) => {
      // Check if bkash fields are required (outside Dhaka)
      const isDhaka = data.billingAddress.district === 'Dhaka';
      const hasCityId = data.city_id;

      if (!isDhaka || (isDhaka && !hasCityId)) {
        // Outside Dhaka, bkash number is required
        if (!data.bkashNumber || data.bkashNumber.trim() === '') {
          return false;
        }
      }
      return true;
    },
    {
      message: 'bKash number is required for outside Dhaka orders',
      path: ['bkashNumber'],
    },
  )
  .refine(
    (data) => {
      if (!data.sameAsBilling && !data.shippingAddress) {
        return false;
      }
      return true;
    },
    {
      message: 'Shipping address is required when not same as billing',
      path: ['shippingAddress'],
    },
  );

export type AddressFormValues = z.infer<typeof addressSchema>;
export type PaymentFormValues = z.infer<typeof paymentSchema>;

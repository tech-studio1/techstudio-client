'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React, { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { PasswordField } from '@/components/ui/password-field';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useToast } from '@/hooks/use-toast';
import { parsePhoneNumber } from 'react-phone-number-input';
import { handleSignUp } from '@/app/actions/auth';
import { passwordSchema } from '@/lib/schemas';
import { PhoneInput } from '@/components/ui/phone-picker';
import { useRouter } from 'nextjs-toploader/app';

const FormSchema = z
  .object({
    firstName: z.string({
      required_error: 'First name is required',
    }),
    lastName: z.string({
      required_error: 'Last name is required',
    }),
    mobile: z.string({
      required_error: 'Mobile Number is required',
    }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ['confirmPassword'],
    message: "Password didn't match.",
  });

interface SignupProps {
  isModal?: boolean;
}

function Signup({ isModal = false }: SignupProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      mobile: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data);
    const parsedNumber = parsePhoneNumber(data?.mobile);
    const countryCode = parsedNumber ? parsedNumber.countryCallingCode : '';
    const nationalNumber = parsedNumber ? parsedNumber.nationalNumber : '';
    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      confirmPassword: data.confirmPassword,
      mobile: nationalNumber,
      countryCode: countryCode,
    };

    setLoading(true);

    const result = await handleSignUp(body);
    // console.log(result);
    const api_data = result && result?.data?.[0]?.result;
    if (result?.success && api_data?.token) {
      if (isModal) {
        router.replace(`?auth=account-verification&token=${api_data?.token}`);
      } else {
        router.push(`/account-verification?token=${api_data?.token}`);
      }
    } else {
      setLoading(false);
      toast({
        title: result?.message ?? 'Something went wrong.',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  }

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader className="flex h-16 items-center justify-between border-b">
          <CardTitle className="text-center">
            Enter your information to Signup
          </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <CardContent className="max-h-[600px] space-y-2">
              {currentStep === 1 ? (
                <>
                  <div className="mt-10 grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            Your First Name
                          </FormLabel>
                          <Input placeholder="First name" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            Your Last Name
                          </FormLabel>
                          <Input placeholder="Last name" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Mobile</FormLabel>
                        <FormControl>
                          <PhoneInput
                            defaultCountry="BD"
                            placeholder="1XXXXXXXXX"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                <>
                  <PasswordField name="password" label="Your password" />
                  <PasswordField
                    name="confirmPassword"
                    label="Confirm your password"
                  />
                </>
              )}
            </CardContent>
            <CardFooter className="mt-4 flex-col space-y-6">
              <div className="flex w-full items-center justify-between space-x-2">
                {currentStep === 1 ? (
                  <Button
                    type="button"
                    className="w-full font-semibold"
                    onClick={async () => {
                      const isValid = await form.trigger([
                        'firstName',
                        'lastName',
                        'mobile',
                      ]);
                      if (isValid) {
                        setCurrentStep(2);
                      }
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <div className="flex w-full gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full font-semibold"
                      onClick={() => setCurrentStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full font-semibold"
                    >
                      {loading && (
                        <ReloadIcon className="mr-2 size-4 animate-spin" />
                      )}
                      Submit
                    </Button>
                  </div>
                )}
              </div>
              <p className="text-center text-sm text-slate-600">
                By continuing, you agree to TechStudio’s{' '}
                <Link className="text-primary" href="/terms">
                  Terms
                </Link>{' '}
                and and acknowledge the{' '}
                <Link
                  className="text-primary"
                  target="_blank"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </Link>
                .
              </p>
              <Separator />
              <p className="text-center text-sm text-slate-600">
                Already have an account?
                <Link href={isModal ? "?auth=login" : "/login"} className="font-semibold text-primary">
                  &nbsp;Login
                </Link>
                .
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}

export default Signup;

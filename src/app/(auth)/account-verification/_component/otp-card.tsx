'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { ToastAction } from '@/components/ui/toast';
import { handleVerifyOtp } from '@/app/actions/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

interface InputOTPFormCardProps {
  token: string;
  isModal?: boolean;
}

export function InputOTPFormCard({ token, isModal = false }: InputOTPFormCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (token) {
      const body = {
        code: data?.pin,
        token: token,
      };
      try {
        const result = await handleVerifyOtp(body);
        if (result?.success) {
          toast({
            title: 'Success!',
            description: 'Successfully Verified Account',
          });
          if (isModal) {
            // Close modal and redirect to login modal
            router.replace('?auth=login');
          } else {
            router.push('/login');
          }
        }
      } catch (error) {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
          action: (
            <ToastAction onClick={() => router.refresh()} altText="Try again">
              Try again
            </ToastAction>
          ),
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        action: (
          <ToastAction
            onClick={() => isModal ? router.replace('?auth=signup') : router.push('/signup')}
            altText="Try again"
          >
            Try again
          </ToastAction>
        ),
        variant: 'destructive',
      });
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        {/* <p className="text-center text-muted-foreground"> */}
        <CardTitle className="text-center">
          Enter OTP to Verify Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center space-y-6 pt-6"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel className="text-lg font-semibold">
                    One-Time Password
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to your phone.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

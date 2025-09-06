'use client';
import { SignIn } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PhoneInput } from '@/components/ui/phone-picker';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { PasswordField } from '@/components/ui/password-field';

const FormSchema = z.object({
  identifier: z
    .string()
    .min(6, { message: 'Identifier mustbe at least 6 characters long' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

interface LoginModuleProps {
  isModal?: boolean;
}

const LoginModule = ({ isModal = false }: LoginModuleProps) => {
  const { toast } = useToast();
  const [isErr, setIsErr] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const body = {
      identifier: data?.identifier?.replace('+', ''),
      password: data?.password,
    };
    setIsLoading(true);
    try {
      const result = await SignIn(body);
      // console.log(result);
      if (result?.error) {
        setIsErr(true);
        setIsLoading(false);
        toast({
          title: 'Login Unsuccessful',
          description: result.error || 'Invalid username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Login successful',
          description: 'You are now logged in.',
        });
        // Don't change loading state immediately to prevent UI flash
        if (isModal) {
          // Close modal and refresh page for auth state
          setTimeout(() => {
            const url = new URL(window.location.href);
            url.searchParams.delete('auth');
            window.location.replace(url.pathname + url.search);
          }, 500);
        } else {
          router.push('/user/profile');
          setIsLoading(false);
        }
      }
    } catch (error) {
      // console.log(error);
      setIsErr(true);
      setIsLoading(false);
      toast({
        title: 'Login Unsuccessful',
        description: 'Invalid username or password',
        variant: 'destructive',
      });
    }
  };
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        {/* <p className="text-center text-muted-foreground"> */}
        <CardTitle className="text-center">
          Enter your credentials to Login
        </CardTitle>

        {/* </p> */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <CardContent className="max-h-[600px] space-y-2">
              <FormField
                control={form.control}
                name="identifier"
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

              <PasswordField
                // description={
                //   <Link href="/forgot-password">Forgot Password</Link>
                // }
                name="password"
                label="Your Password"
              />
              {isErr && (
                <p className="text-xs text-destructive">Something Went Wrong</p>
              )}
            </CardContent>
            <CardFooter className="mt-4 flex-col space-y-6">
              <div className="flex w-full items-center justify-between space-x-2">
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="w-full font-semibold"
                >
                  {!isLoading ? null : (
                    <ReloadIcon className="mr-2 size-4 animate-spin" />
                  )}
                  Continue
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link
            href={isModal ? "?auth=signup" : "/signup"}
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginModule;

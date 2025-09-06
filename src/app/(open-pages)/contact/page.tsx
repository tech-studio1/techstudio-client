'use client';

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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, LoaderCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { handleContacEmail } from '@/app/actions/resend';
import { useState } from 'react';
import Link from 'next/link';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    details: '+880 1670 957108',
    action: 'Call now',
    href: 'tel:+8801670957108',
  },
  {
    icon: Mail,
    title: 'Email',
    details: 'info@techstudio.com.bd',
    action: 'Send email',
    href: 'mailto:info@techstudio.com.bd',
  },
  {
    icon: MapPin,
    title: 'Address',
    details:
      'Shop no 22, Moon Tower(Shundorban Courier office),Munshiganj Sadar, Munshiganj',
    action: 'Get directions',
    href: 'https://maps.app.goo.gl/K8mgYyBHSvjHKG398',
  },
  {
    icon: Clock,
    title: 'Hours',
    details: 'Sat-Thu: 10AM-9PM',
    action: 'View schedule',
    href: '/outlets',
  },
];

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

export default function Contact() {
  const [isloading, setIsLoading] = useState(false);
  const { toast } = useToast();
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const result = await handleContacEmail(values);
      if (result) {
        toast({
          title: 'Success!',
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: 'Failed!',
      });
    }
    form.reset();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Get in touch with our team for any inquiries or support
        </p>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {contactInfo.map((info) => (
          <Card key={info.title}>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <info.icon className="size-12 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{info.title}</h3>
              <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">
                {info.details}
              </p>
              <Button variant="link" className="mt-4" asChild>
                <Link target="_blank" href={info.href}>
                  {info.action}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold">Send us a message</h2>
            <p className="mt-2 text-muted-foreground">
              Fill out the form below and we&apos;ll get back to you as soon as
              possible.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="How can we help?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us more about your inquiry..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isloading} type="submit">
                {isloading ? (
                  <LoaderCircle className="animate-spin transition-all duration-500 ease-in-out" />
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </Form>
        </div>

        <div className="overflow-hidden rounded-lg">
          <iframe
            title="Tech Studio Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58501.34140231945!2d90.46653904001215!3d23.592357417050042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755adb16b59619b%3A0x9515657fe2e10e01!2sTechStudio!5e0!3m2!1sen!2sbd!4v1738368443506!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '400px' }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

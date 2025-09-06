'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

// Define the schema for the form using Zod
const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  question: z.string().min(1, { message: 'Question is required.' }),
});

export function QAForm() {
  // Set up the form with react-hook-form and Zod validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      question: '',
    },
  });

  // Handle form submission
  const onSubmit = (data: { name: string; question: string }) => {
    // console.log('Form submitted:', data);
  };

  return (
    <div className="my-10 space-y-6">
      <h2 className="mb-20 text-xl font-semibold">Reviews</h2>
      <h2 className="text-xl font-semibold">Questions & Answers</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 rounded-md bg-white p-6 shadow-md"
        >
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Question Field */}
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Question</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your question here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" variant={'secondary'}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

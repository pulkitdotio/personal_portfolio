'use client';

import { profile } from '@/config/site';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Chat from '@/components/icons/social/Chat';
import { Textarea } from '@/components/ui/textarea';
import Container from '@/components/layouts/Container';
import SectionHeading from '../common/SectionHeading';

import Link from 'next/link';
import RepeatSeparator from '../ui/repeat-separator';

// Zod validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 characters.' })
    .regex(/^[+]?[1-9][\d]{0,15}$/, {
      message: 'Please enter a valid phone number.',
    }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(1000, { message: 'Message must not exceed 1000 characters.' }),
});

export default function Contact() {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = (data: z.infer<typeof contactFormSchema>) => {
    const subject = encodeURIComponent('Portfolio inquiry from ' + data.name);
    const body = encodeURIComponent(
      'Name: ' + data.name + '\nEmail: ' + data.email + '\nPhone: ' + data.phone + '\n\n' + data.message
    );
    window.location.href = `mailto:${profile.email}?subject=` + subject + '&body=' + body;
  };

  return (
    <Container>
      <RepeatSeparator cn="dark:opacity-40" />

      <div>
        <div>
          <SectionHeading
            as="p"
            classname=" text-neutral-400 dark:text-neutral-500 font-medium "
            heading="Contact"
          />
          <h1 className="screen-line-bottom px-4 text-3xl font-semibold tracking-tight text-balance">
            Let’s talk about your next project
          </h1>
        </div>
        <div className="flex items-center justify-between screen-line-top screen-line-bottom p-2">
          <Link
            data-slot="button"
            data-variant="link"
            data-size="sm"
            className="group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 decoration-1 underline-offset-3 active:scale-none rounded-[min(var(--radius-lg),10px)] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 h-7 gap-2 border-none px-0 text-muted-foreground hover:text-foreground hover:no-underline"
            href="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left"
              aria-hidden="true"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back
          </Link>
          <span className="text-xs sm:text-sm text-muted-foreground font-medium border border-border px-3 py-1 rounded-full bg-muted/30">
            Open to opportunities
          </span>
        </div>
      </div>
      <RepeatSeparator cn="dark:opacity-40" />

      <Card className="border-none bg-transparent shadow-none my-40">
        <CardHeader>
          <CardTitle><h2>Send me a message</h2></CardTitle>
          <CardDescription>
            Open an email draft with the form below, or email me at{' '}
            <a href={`mailto:${profile.email}`} className="underline underline-offset-2">{profile.email}</a>. You can also connect on{' '}
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">LinkedIn</a>.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input autoComplete="name" required placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Phone *</FormLabel>
                      <FormControl>
                        <Input type="tel" autoComplete="tel" required placeholder="+911234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" autoComplete="email" required placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Message *</FormLabel>
                    <FormControl>
                      <Textarea
                        required
                        placeholder="Tell me about your project or just say hello..."
                        className="min-h-30 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-fit">
                <Chat className="mr-2 h-4 w-4" />
                Open email draft
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Container>
  );
}

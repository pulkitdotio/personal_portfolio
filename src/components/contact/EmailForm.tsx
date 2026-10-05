'use client';

import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createEmailDraft, emailDraftSchema, type EmailDraft } from '@/lib/email-draft';

export default function EmailForm() {
  const id = useId();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailDraft>({
    resolver: zodResolver(emailDraftSchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const fieldId = (name: keyof EmailDraft) => `${id}-${name}`;
  const fieldProps = (name: keyof EmailDraft) => ({
    id: fieldId(name),
    required: true,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${fieldId(name)}-error` : undefined,
    ...register(name),
  });
  const error = (name: keyof EmailDraft) =>
    errors[name] && (
      <p id={`${fieldId(name)}-error`} role="alert" className="text-destructive text-sm">
        {errors[name]?.message}
      </p>
    );

  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => {
        window.location.href = createEmailDraft(data);
      })}
      className="space-y-5"
      aria-label="Email Pulkit Sharma"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <Label htmlFor={fieldId('name')}>Name</Label>
          <Input
            {...fieldProps('name')}
            autoComplete="name"
            maxLength={100}
            placeholder="Your name"
          />
          {error('name')}
        </div>
        <div className="min-w-0 space-y-2">
          <Label htmlFor={fieldId('email')}>Email</Label>
          <Input
            {...fieldProps('email')}
            type="email"
            autoComplete="email"
            maxLength={254}
            placeholder="you@example.com"
          />
          {error('email')}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={fieldId('subject')}>Subject</Label>
        <Input
          {...fieldProps('subject')}
          maxLength={150}
          placeholder="What would you like to discuss?"
        />
        {error('subject')}
      </div>
      <div className="space-y-2">
        <Label htmlFor={fieldId('message')}>Message</Label>
        <Textarea
          {...fieldProps('message')}
          rows={4}
          maxLength={1000}
          className="[field-sizing:fixed] min-h-28 resize-y"
          placeholder="Tell me about your idea or say hello…"
        />
        {error('message')}
      </div>
      <div className="space-y-3">
        <p id={`${id}-draft-help`} className="text-muted-foreground text-sm">
          All fields are required. Opens your email app with a draft for you to review and send.
        </p>
        <Button type="submit" aria-describedby={`${id}-draft-help`}>
          Send Email
        </Button>
      </div>
    </form>
  );
}

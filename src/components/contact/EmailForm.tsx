'use client';

import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
    defaultValues: { message: '' },
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
          Message is required. Opens your email app with a draft for you to review and send.
        </p>
        <Button type="submit" aria-describedby={`${id}-draft-help`}>
          Send Email
        </Button>
      </div>
    </form>
  );
}

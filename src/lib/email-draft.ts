import { profile } from '@/config/site';
import { z } from 'zod';

export const emailDraftSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name (at least 2 characters).')
    .max(100, 'Name must not exceed 100 characters.'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .max(254, 'Email address is too long.'),
  subject: z
    .string()
    .trim()
    .min(1, 'Please enter a subject.')
    .max(150, 'Subject must not exceed 150 characters.'),
  message: z
    .string()
    .trim()
    .min(1, 'Please enter a message.')
    .max(1000, 'Message must not exceed 1000 characters.'),
});

export type EmailDraft = z.infer<typeof emailDraftSchema>;

export function createEmailDraft({ name, email, subject, message }: EmailDraft) {
  const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

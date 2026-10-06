import { profile } from '@/config/site';
import { z } from 'zod';

export const emailDraftSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, 'Please enter a message.')
    .max(1000, 'Message must not exceed 1000 characters.'),
});

export type EmailDraft = z.infer<typeof emailDraftSchema>;

export function createEmailDraft({ message }: EmailDraft) {
  return `mailto:${profile.email}?body=${encodeURIComponent(message)}`;
}

import { z } from 'zod'
import { zPhoneNumber } from '@/lib/zod/zPhoneNunmber'

export const FORMATS = [
  'доповідь',
  'дискусія',
  'панель',
  'клуб',
  'Інше'
] as const

export const formSchema = z
  .object({
    fullName: z.string().min(3).max(50),
    contact: z
      .string()
      .refine(
        (data) =>
          data.includes('@')
            ? z.string().email().safeParse(data).success
            : zPhoneNumber.safeParse(data).success,
        {
          message: 'Please enter a valid contact'
        }
      ),
    format: z.enum(FORMATS),
    customFormat: z.string().min(3).max(50).optional(),
    topic: z.string().min(3).max(50),
    description: z.string().max(400).optional()
  })
  .refine(
    (data) => {
      if (data.format === 'Інше')
        return data.customFormat && data.customFormat.length > 3
      return true
    },
    {
      message: 'Please enter a valid format',
      path: ['customFormat']
    }
  )

export type CallForPapersFormData = z.infer<typeof formSchema>

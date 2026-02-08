import { z } from 'zod'
import type { FormField } from './formSchema'

export const buildValidationSchema = (fields: FormField[]) => {
  const shape: Record<string, z.ZodTypeAny> = {}

  fields.forEach((field) => {
    let validator: z.ZodTypeAny

    switch (field.type) {
      case 'email': {
        const v = z.string().trim().email('Invalid email address')
        validator = field.required
          ? v.min(1, `${field.label} is required`)
          : v.optional()
        break
      }

      case 'tel': {
        const v = z
          .string()
          .trim()
          .regex(
            /^\+?[1-9]\d{1,14}$/,
            'Enter a valid phone number'
          )
        validator = field.required
          ? v.min(1, `${field.label} is required`)
          : v.optional()
        break
      }

      case 'date': {
        const v = z.date()
        validator = field.required ? v : v.optional()
        break
      }

      case 'textarea':
      case 'text':
      default: {
        const v = z.string().trim()
        validator = field.required
          ? v.min(1, `${field.label} is required`)
          : v.optional()
        break
      }
    }

    shape[field.name] = validator
  })

  return z.object(shape)
}

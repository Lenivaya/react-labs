import parsePhoneNumber from 'libphonenumber-js'
import { z } from 'zod'

/**
 * Zod schema that validates a phone number using `libphonenumber-js`.
 * Attempts to parse the provided value with a default country of `UA`.
 *
 * If the phone number is valid, the schema transforms the phone number into
 * an international format (e.g. `+380401234567`).
 */
export const zPhoneNumber = z.string().transform((value, ctx) => {
  const phoneNumber = parsePhoneNumber(value, {
    defaultCountry: 'UA'
  })

  if (!phoneNumber?.isValid()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid phone number'
    })
    return z.NEVER
  }

  return phoneNumber.formatInternational()
})

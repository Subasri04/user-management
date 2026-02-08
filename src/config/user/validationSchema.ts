import z from 'zod';

export const userValidationSchema = z.object({
    firstName: z.string().min(1, 'First Name is required'),
    lastName: z.string().min(1, 'Last Name is required'),
    email: z.email('Invalid email address'),
    phoneNumber: z
        .string()
        .trim()
        .regex(/^\+?[1-9]\d{1,14}$/, 'Enter a valid phone number with country code'),
});

export type UserFormValues = z.infer<typeof userValidationSchema>;

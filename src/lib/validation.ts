import { z } from 'zod';

// Customer form validation schema
export const customerFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
  phone: z
    .string()
    .regex(/^[+]?[\d\s\-()]{10,15}$/, 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits')
});

export type CustomerFormData = z.infer<typeof customerFormSchema>;

// Payment validation schema
export const paymentDataSchema = z.object({
  amount: z.number().min(1, 'Amount must be greater than 0'),
  currency: z.string().min(2, 'Currency must be specified'),
  customerData: customerFormSchema
});

export type PaymentData = z.infer<typeof paymentDataSchema>;

// Sanitize user input to prevent XSS
export const sanitizeString = (input: string): string => {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/[<>'"]/g, (char) => {
      const charMap: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;'
      };
      return charMap[char] || char;
    });
};

// Validate and sanitize form data
export const validateAndSanitizeCustomerForm = (data: any): CustomerFormData => {
  const parsed = customerFormSchema.parse(data);
  
  return {
    name: sanitizeString(parsed.name),
    email: sanitizeString(parsed.email.toLowerCase()),
    phone: sanitizeString(parsed.phone)
  };
};
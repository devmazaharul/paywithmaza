import { systemConfigaration } from '@/constant/default.config';
import { z } from 'zod';

const {
  form_validation: { name, address, pin },
} = systemConfigaration;

export const Registerschema = z.object({
  name: z
    .string()
    .min(name.min, `Name must be at least ${name.min} characters`)
    .max(name.max, `Name max ${name.max} characters`),
  email: z.string().email('Invalid email address'),
  address: z
    .string()
    .min(address.min, `Address must be at least ${address.min} characters`)
    .max(address.max, `Address max ${address.max} characters`),
  pin: z
    .string()
    .min(pin.min, `Pin minimum ${pin.min} digit`)
    .max(pin.max, `Pin max ${pin.max} digit`),
});

export const Loginschema = z.object({
  email: z.string().email('Invalid email address'),
  pin: z.string().min(1, 'PIN is required '),
});
export const Resetschema = z.object({
  email: z.string().email('Invalid email address'),
});


export const SendMoneyschema = z.object({
  email: z.string().email('Invalid email address'),
  amount: z
    .number()
    .min(1, 'Amount is required')
    .max(50000, 'Amount must be less than 50,000'),
  message: z.string().optional(),
});
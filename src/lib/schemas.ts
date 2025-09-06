import { z } from 'zod';

export const passwordSchema = z
  .string({
    required_error: 'Password can not be empty.',
  })
  .regex(/^.{6,20}$/, {
    message: 'Minimum 6 and maximum 20 characters.',
  })
  .regex(/(?=.*[A-Z])/, {
    message: 'At least one uppercase character.',
  })
  .regex(/(?=.*[a-z])/, {
    message: 'At least one lowercase character.',
  })
  .regex(/(?=.*\d)/, {
    message: 'At least one digit.',
  });

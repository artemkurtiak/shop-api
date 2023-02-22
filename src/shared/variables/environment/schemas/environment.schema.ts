import { z } from 'zod';

export const EnvironmentSchema = z
  .object({
    NODE_ENV: z.enum(['PROD', 'DEV']),
    PORT: z.coerce.number().positive(),
    API_PREFIX: z.string().startsWith('/'),
    ALLOWED_ORIGINS: z.string(),
    BCRYPT_SALT: z.coerce.number(),
    ACCESS_JWT_SECRET: z.string().min(1),
    ACCESS_JWT_EXPIRES_IN: z.coerce.number(),
    REFRESH_JWT_SECRET: z.string().min(1),
    REFRESH_JWT_EXPIRES_IN: z.coerce.number(),
    MAILJET_SENDER_MAIL: z.string().email(),
    MAILJET_SENDER_NAME: z.string().min(1),
    MAILJET_API_KEY: z.string().min(1),
    MAILJET_SECRET: z.string().min(1),
    EMAIL_ACTIVATION_TEMPLATE_ID: z.coerce.number().positive(),
    DATABASE_HOST: z.string().min(1),
    DATABASE_PORT: z.coerce.number().positive(),
    DATABASE_USER: z.string().min(1),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string().min(1),
  })
  .superRefine((environment, ctx) => {
    environment.ALLOWED_ORIGINS.split(';').forEach((origin) => {
      const result = z.string().url(`Invalid origin url(${origin})`).safeParse(origin);

      if (result.success === false) {
        ctx.addIssue({ ...result.error.errors[0], path: ['ALLOWED_ORIGINS'] });
      }
    });
  });

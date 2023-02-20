import { Injectable, Logger } from '@nestjs/common';

import { ZodIssue } from 'zod';

@Injectable()
export class ValidationService {
  // validate data using zod schema
  static validateWithZod<T>(
    schema: Zod.Schema<T>,
    data: unknown,
    exitProcessOnError = true,
  ): T | ZodIssue[] | never {
    const result = schema.safeParse(data);

    if (result.success === false) {
      result.error.errors.forEach((error) => {
        const [field] = error.path;

        Logger.error(`${field}(${error.message})`, ValidationService.name);
      });

      if (exitProcessOnError) process.exit(0);

      return result.error.errors;
    }

    return result.data;
  }
}

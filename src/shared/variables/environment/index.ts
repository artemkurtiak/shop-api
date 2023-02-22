import { Logger } from '@nestjs/common';

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { z } from 'zod';

import { ValidationService } from '@shared/validation/validation.service';

import { EnvironmentSchema } from './schemas/environment.schema';

import { EnvironmentType } from './types';

const expanded = dotenvExpand.expand(dotenv.config()).parsed;

export const Environment = ValidationService.validateWithZod(
  EnvironmentSchema,
  expanded,
) as EnvironmentType;

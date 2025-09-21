import { boolean, object } from 'yup';

export const argsSchema = object().shape({
  "y": boolean().default(false),
  "d": boolean().default(false),
}).stripUnknown();

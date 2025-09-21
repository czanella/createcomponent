import { boolean, object } from 'yup';

export const argsSchema = object().shape({
  "y": boolean().default(false),
}).stripUnknown();

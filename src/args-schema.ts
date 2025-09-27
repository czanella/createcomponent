import { boolean, object, string } from 'yup';

export const COMPONENT_NAME = /^\s*[A-Z][a-zA-Z0-9]*\s*$/;
export const COMPONENT_NAME_ERROR = 'Component name must start with an uppercase letter and have letters and numbers only';

export const argsSchema = object().shape({
  "y": boolean().default(false),
  "name": string().default('').matches(COMPONENT_NAME, { message: COMPONENT_NAME_ERROR }),
}).stripUnknown();

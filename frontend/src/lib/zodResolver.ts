import { Resolver } from 'react-hook-form';
import { z } from 'zod';

export const makeZodResolver = <TSchema extends z.ZodTypeAny>(schema: TSchema): Resolver<z.infer<TSchema>> => async (values) => {
  const result = schema.safeParse(values);

  if (result.success) {
    return { values: result.data, errors: {} };
  }

  const formErrors = result.error.formErrors.fieldErrors;
  const errors = Object.entries(formErrors).reduce(
    (acc, [key, messages]) => {
      if (messages?.length) {
        acc[key as keyof typeof acc] = { type: 'validation', message: messages[0] };
      }
      return acc;
    },
    {} as Record<string, { type: string; message: string }>,
  );

  return { values: {}, errors };
};

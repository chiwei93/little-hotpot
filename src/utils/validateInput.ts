import { z } from "zod";

export const validateInput = <T, K>(schema: z.ZodType<T>, value: K) => {
  try {
    const result = schema.parse(value);

    return { data: result, errors: null };
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errors = new Map<string, string>();
      err.issues.forEach((issue) => {
        errors.set(issue.path[0] as string, issue.message);
      });
      return { data: null, errors };
    }

    return { data: null, errors: new Map<string, string>() };
  }
};

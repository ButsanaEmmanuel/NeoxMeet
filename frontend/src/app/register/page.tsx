'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { saveTokens, saveDisplayName } from '../../lib/auth';
import { makeZodResolver } from '../../lib/zodResolver';
import { AuthApiError, RegisterRequest, authApiClient } from '../../shared/api/auth-api.client';

const passwordPolicyMessage = 'Use at least 8 characters with upper, lower, and a number.';

const schema = z.object({
  fullName: z.string().trim().min(1, { message: 'Full name is required.' }),
  email: z.string().trim().email({ message: 'Enter a valid email address.' }),
  password: z
    .string()
    .min(8, { message: passwordPolicyMessage })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, { message: passwordPolicyMessage }),
});

type FormData = z.infer<typeof schema>;

const resolveErrorMessage = (error: unknown): string => {
  if (error instanceof AuthApiError) {
    if (error.status === 409) {
      return 'Email already in use';
    }
    if (error.status === 400) {
      return 'Please check your details and try again';
    }
    if (error.status && error.status >= 500) {
      return 'Unexpected error, try again';
    }
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Registration failed';
};

export default function RegisterPage(): JSX.Element {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({ resolver: makeZodResolver(schema) });
  const onSubmit = async (data: RegisterRequest): Promise<void> => {
    setError(null);
    try {
      const response = await authApiClient.register(data);
      saveTokens(response.accessToken, response.refreshToken);
      saveDisplayName(response.user.fullName);
      router.push('/dashboard');
    } catch (err) {
      setError(resolveErrorMessage(err));
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="max-w-md space-y-4">
        <h1 className="text-2xl font-semibold">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-1">
            <label className="text-sm">Full name</label>
            <input
              className="w-full rounded border border-slate-700 bg-slate-900 p-2"
              type="text"
              {...register('fullName')}
            />
            {errors.fullName?.message && <p className="text-sm text-red-400">{errors.fullName.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm">Email</label>
            <input className="w-full rounded border border-slate-700 bg-slate-900 p-2" type="email" {...register('email')} />
            {errors.email?.message && <p className="text-sm text-red-400">{errors.email.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm">Password</label>
            <input
              className="w-full rounded border border-slate-700 bg-slate-900 p-2"
              type="password"
              {...register('password')}
            />
            {errors.password?.message && <p className="text-sm text-red-400">{errors.password.message}</p>}
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded bg-indigo-500 px-4 py-2 font-semibold disabled:opacity-50"
          >
            {isSubmitting ? 'Creating account...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

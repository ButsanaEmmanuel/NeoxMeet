'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../../lib/api';
import { saveTokens, saveDisplayName } from '../../lib/auth';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      const response = await api.post('/auth/login', data);
      saveTokens(response.data.accessToken, response.data.refreshToken);
      const me = await api.get('/auth/me');
      if (me.data?.name) {
        saveDisplayName(me.data.name);
      }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm">Email</label>
          <input className="w-full rounded border border-slate-700 bg-slate-900 p-2" type="email" {...register('email')} />
        </div>
        <div className="space-y-1">
          <label className="text-sm">Password</label>
          <input className="w-full rounded border border-slate-700 bg-slate-900 p-2" type="password" {...register('password')} />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-indigo-500 px-4 py-2 font-semibold disabled:opacity-50"
        >
          {isSubmitting ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

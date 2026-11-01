'use client'

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from './actions';

export default function LoginPage() {
    const [state, formAction, pending] = useActionState(signIn, null);

    return (
        <div className="flex flex-1 items-center justify-center p-5 bg-linear-to-br from-gray-700 to-gray-200">
            <form
                action={formAction}
                className="flex w-full max-w-sm flex-col gap-5 rounded-xl p-6 bg-white/10 backdrop-blur-lg shadow-2xl border border-white/10"
            >
                <h1 className="text-lg font-bold text-cyan-400 text-center">Sign in to MGS Portal</h1>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input id="email" name="email" type="email" autoComplete="email" required className="bg-white" />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <Input id="password" name="password" type="password" autoComplete="current-password" required className="bg-white" />
                </div>

                {state?.error && (
                    <p role="alert" className="text-sm font-semibold text-red-300">{state.error}</p>
                )}

                <Button type="submit" disabled={pending}>
                    {pending ? 'Signing in...' : 'Sign in'}
                </Button>
            </form>
        </div>
    );
}

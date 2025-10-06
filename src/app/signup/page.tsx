"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpSchema } from "~/validation/auth";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpSchema) => {
    setError(null);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.message ?? "Unable to create account");
        return;
      }
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/home",
      });
    } catch {
      setError("Unexpected error. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-800">
      <div className="w-full max-w-xl px-6">
        <div className="mb-8 flex items-center space-x-3">
          <div className="h-6 w-6 rounded-sm"/>
          <img src="/barbellLogo.png" alt="TrackWork" className="h-8 w-auto"/>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-300">Welcome to TrackWork</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-200">Work email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="name@company.com"
                {...register("email")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-slate-500 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">⚙️</div>
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-200">Password</label>
            <input
              type="password"
              placeholder="At least 8 characters"
              {...register("password")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-slate-500 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-200">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-slate-500 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer block w-full rounded-md border border-gray-300 bg-white/10 px-10 py-2 text-center text-sm no-underline transition text-zinc-200 hover:bg-white/30"
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="my-6 text-center text-sm text-gray-500">or</div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/home" })}
            className="cursor-pointer block w-full rounded-md border border-gray-300 px-4 py-2 text-center text-sm text-zinc-200 bg-white/10 hover:bg-white/30"
          >
            <span className="mr-2">🟢</span> Continue with <span className="font-medium">Google</span>
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-600">
          By creating an account, you agree to the <a className="underline" href="#">Terms of Service</a> and <a className="underline" href="#">Privacy Policy</a>.
        </p>

        <label className="mt-3 flex items-start space-x-2 text-xs text-gray-600">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-gray-300"
          />
          <span>
            By checking this box, you agree to receive marketing and sales communications about Airtable products, services, and events. You understand that you can manage your preferences at any time by following the instructions in the communications received.
          </span>
        </label>

        <p className="mt-6 text-sm text-gray-600">
          Already have an account? <Link href="/signin" className="underline">Sign in</Link>
        </p>

        {error && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
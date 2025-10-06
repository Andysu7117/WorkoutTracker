"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  // const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    
    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("An error occurred during sign in. Please try again.");
      }
    } else if (result?.ok) {
      window.location.href = "/home";
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

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-200">Work email</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">⚙️</div>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-200">Password</label>
            <input
              type="password"
              required
              minLength={8}
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer block w-full rounded-md border border-gray-300 bg-white/10 px-10 py-2 text-center text-sm no-underline transition text-zinc-200 hover:bg-white/30"
          >
            Sign In
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

        {error && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
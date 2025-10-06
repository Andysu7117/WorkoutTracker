import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import Header from "~/app/_components/header";

export default async function LandingPage() {
  return (
    <HydrateClient>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-800 text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Track<span className="text-zinc-500">Work</span>
          </h1>
          <div>
            <p className="text-2xl text-white">
              Welcome to TrackWork, the ultimate workout tracker.
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Link href="#"
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              Sign In
            </Link>
            <Link href="#"
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}

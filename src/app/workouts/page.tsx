import Header from "~/app/_components/header";
import { HydrateClient } from "~/trpc/server";

export default async function Workouts() {
    return <HydrateClient>
        <Header />
        <main className="flex min-h-screen flex-col bg-gradient-to-b from-zinc-900 to-zinc-800 text-white">
            <h1>This is the workouts page</h1>
        </main>
    </HydrateClient>
}

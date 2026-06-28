import Link from "next/link";
import { signOutAction } from "../actions/user-actions";
import { requireUser } from "../lib/session";

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-gray-950">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between border-b border-gray-300 pb-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600">
              You are signed in as {user.name ?? user.email ?? user.id}.
            </p>
          </div>

          <form action={signOutAction}>
            <button
              type="submit"
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Sign out
            </button>
          </form>
        </div>

        <section className="rounded-lg border border-gray-300 bg-white p-5">
          <h2 className="text-lg font-semibold">Session check</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div>
              <dt className="font-semibold">User ID</dt>
              <dd className="break-all text-gray-700">{user.id}</dd>
            </div>
            <div>
              <dt className="font-semibold">Name</dt>
              <dd className="text-gray-700">{user.name ?? "None"}</dd>
            </div>
            <div>
              <dt className="font-semibold">Email</dt>
              <dd className="text-gray-700">{user.email ?? "None"}</dd>
            </div>
          </dl>
        </section>

        <Link
          href="/"
          className="mt-6 inline-block text-sm font-semibold text-blue-800"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}

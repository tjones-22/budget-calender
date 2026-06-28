import Link from "next/link";
import { signInWithGoogleAction } from "../actions/user-actions";
import LoginFormCredentials from "../components/LoginFormCredentials";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900 px-4 text-gray-950">
      <section className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center">Log in</h1>
        </div>


        <div className="my-6 h-px bg-gray-200" />

        <LoginFormCredentials />

        <form action={signInWithGoogleAction}
        className="mt-4">
          <button
            type="submit"
            className="w-full rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-900 hover:bg-gray-100"
          >
            Continue with Google
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Need an account?{" "}
          <Link href="/signup" className="font-semibold text-blue-800">
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
}

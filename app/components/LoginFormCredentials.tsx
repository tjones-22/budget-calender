"use client";

import { signInWithCredentialsAction } from "../actions/user-actions";
import { useActionState } from "react";

export default function LoginFormCredentials() {
  const [state, formAction] = useActionState(signInWithCredentialsAction, {});

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {state.error}
        </p>
      )}

      <label className="block">
        <span className="text-sm font-medium">Username</span>
        <input
          name="username"
          type="text"
          required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-700"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Password</span>
        <input
          name="password"
          type="password"
          required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-700"
        />
      </label>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-950 px-4 py-2 font-semibold text-yellow-300 hover:bg-blue-900"
      >
        Log in
      </button>
    </form>
  );
}

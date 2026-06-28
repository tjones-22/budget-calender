"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import type { AuthFormState, BankFormState } from "../../types/types";
import { requireUser } from "../lib/auth/session";
import {
  signUpWithUserCredentials,
  updateBankStartingBalanceByUserId,
} from "../lib/db/user-db";

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

export async function signInWithGoogleAction() {
  await signIn("google", {
    redirectTo: "/dashboard",
  });
}

export async function signUpWithGoogleAction() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await signIn("google", {
    redirectTo: "/signup/addbankinfo",
  });
}

export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}

export async function signUpWithCredentialsAction(formData: FormData) {
    await new Promise((resolve) => setTimeout(resolve, 3000));

  const email = getStringValue(formData, "email");
  const name = getStringValue(formData, "name");
  const username = getStringValue(formData, "username");
  const password = getStringValue(formData, "password");

  if (!username || !password) {
    redirect("/signup?error=missing-fields");
  }

  const result = await signUpWithUserCredentials({
    email: email || undefined,
    name: name || undefined,
    username,
    password,
  });

  if ("error" in result) {
    redirect(
      `/signup?error=${encodeURIComponent(result.error ?? "signup-failed")}`,
    );
  }

  await signIn("credentials", {
    username,
    password,
    redirectTo: "/signup/addbankinfo",
  });
}

export async function signInWithCredentialsAction(
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const username = getStringValue(formData, "username");
  const password = getStringValue(formData, "password");

  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid username or password" };
    }

    throw error;
  }

  return {};
}

export async function loginAction(formUsername: string, formPassword: string) {
  const formData = new FormData();

  formData.set("username", formUsername);
  formData.set("password", formPassword);

  return signInWithCredentialsAction({}, formData);
}

export async function updateBankStartingBalanceAction(
  _previousState: BankFormState,
  formData: FormData,
): Promise<BankFormState> {
  const user = await requireUser();
  const startingBalanceValue = getStringValue(formData, "startingBalance");
  const startingBalance = Number(startingBalanceValue);

  if (!startingBalanceValue || Number.isNaN(startingBalance)) {
    return { error: "Enter a valid starting balance" };
  }

  await updateBankStartingBalanceByUserId({
    userId: user.id,
    startingBalance,
  });

  return { success: "Starting balance updated" };
}

export async function updateBankStartingBalanceFormAction(formData: FormData) {
  const result = await updateBankStartingBalanceAction({}, formData);

  if (result.error) {
    redirect(`/signup/addbankinfo?error=${encodeURIComponent(result.error)}`);
  }

  redirect("/dashboard");
}

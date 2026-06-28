// app/lib/user-db.ts
import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { prisma } from "./prisma";

const scryptAsync = promisify(scrypt);

type SignUpWithCredentialsInput = {
  email?: string;
  name?: string;
  username: string;
  password: string;
};

type LoginWithCredentialsInput = {
  username: string;
  password: string;
};

type UpdateBankStartingBalanceInput = {
  username: string;
  startingBalance: number;
};

type UpdateBankStartingBalanceByUserIdInput = {
  userId: string;
  startingBalance: number;
};

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;

  return `${salt}:${derivedKey.toString("hex")}`;
}

async function verifyPassword(password: string, hashedPassword: string) {
  const [salt, storedKey] = hashedPassword.split(":");

  if (!salt || !storedKey) {
    return false;
  }

  const storedBuffer = Buffer.from(storedKey, "hex");
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;

  if (storedBuffer.length !== derivedKey.length) {
    return false;
  }

  return timingSafeEqual(storedBuffer, derivedKey);
}

// finds a user by email input
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

// Runs after Auth.js creates a new OAuth user.
export async function setupNewOAuthUser(userId: string) {
  return prisma.bank.upsert({
    where: { userId },
    update: {},
    create: {
      userId,
      savings: 0,
      currentBalance: 0,
    },
  });
}

// sign up with username / password
export async function signUpWithUserCredentials({
  email,
  name,
  username,
  password,
}: SignUpWithCredentialsInput) {
  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUsername) {
    return { error: "Username is already taken" };
  }

  if (email) {
    const existingEmail = await getUserByEmail(email);

    if (existingEmail) {
      return { error: "Email is already taken" };
    }
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      username,
      password: hashedPassword,
      bank: {
        create: {
          savings: 0,
          currentBalance: 0,
        },
      },
    },
  });

  return { user };
}

// login with user credentials
export async function loginWithUserCredentials({
  username,
  password,
}: LoginWithCredentialsInput) {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user?.password) {
    return null;
  }

  const passwordMatches = await verifyPassword(password, user.password);

  if (!passwordMatches) {
    return null;
  }

  return user;
}

export async function updateBankStartingBalanceByUserId({
  userId,
  startingBalance,
}: UpdateBankStartingBalanceByUserIdInput) {
  const bank = await prisma.bank.upsert({
    where: { userId },
    update: {
      currentBalance: startingBalance,
    },
    create: {
      userId,
      savings: 0,
      currentBalance: startingBalance,
    },
  });

  return { bank };
}

export async function updateBankStartingBalance({
  username,
  startingBalance,
}: UpdateBankStartingBalanceInput) {
  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });

  if (!user) {
    return { error: "User not found" };
  }

  return updateBankStartingBalanceByUserId({
    userId: user.id,
    startingBalance,
  });
}

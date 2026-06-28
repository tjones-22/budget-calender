import { prisma } from "./prisma";

// get a users bills
export async function getBillsByUser(userID: string) {
  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  const startOfTomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  );
  const userBills = await prisma.bills.findMany({
    where: {
      userId: userID,
      date: {
        gte: startOfToday,
        lt: startOfTomorrow,
      },
    },
  });

  return userBills
}

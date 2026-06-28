import type { Bill, BillType, Day } from "@/types/types";
import { getUsersBillsAction } from "../actions/dashboard-actions";
import { signOutAction } from "../actions/user-actions";
import DayCard from "../components/Day";
import SubmitButton from "../components/FormSubmitButton";
import { requireUser } from "../lib/auth/session";
import { capitalizeName } from "../lib/format";

const billTypes: BillType[] = ["payday", "bill", "purchase"];

function isBillType(type: string): type is BillType {
  return billTypes.includes(type as BillType);
}

function getBillLabel(type: BillType) {
  switch (type) {
    case "payday":
      return "Payday";
    case "bill":
      return "Bill due";
    case "purchase":
      return "Purchase";
  }
}

export default async function DashboardPage() {
  const user = await requireUser();
  const usersBills = await getUsersBillsAction();

  const displayName = capitalizeName(user.name ?? "User");
  const today = new Date();
  const weekdayName = today.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const dayBills: Bill[] = usersBills.flatMap((bill) => {
    if (!isBillType(bill.type)) {
      return [];
    }

    return [
      {
        type: bill.type,
        name: getBillLabel(bill.type),
      },
    ];
  });

  const todayCard: Day = {
    dayNumber: today.getDate(),
    bills: dayBills,
  };

  return (
    <main className="min-h-screen bg-white p-6 text-black dark:bg-gray-900 dark:text-white">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 flex items-center justify-between border-b border-gray-700 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-yellow-300">Dashboard</h1>
            <p className="mt-1 text-2xl text-gray-300">Welcome {displayName}</p>
          </div>

          <form action={signOutAction}>
            <SubmitButton className="hover-animation-timing rounded-md bg-blue-950 px-4 py-2 text-sm font-semibold text-yellow-300 hover:bg-amber-700 hover:text-white">
              Sign out
            </SubmitButton>
          </form>
        </header>

        <section className="grid gap-4 min-[850px]:grid-cols-2">
          <div className="rounded-lg bg-gray-900 p-4 text-gray-300 dark:bg-white dark:text-black">
            <h2 className="text-lg font-semibold">Notifications</h2>

            <div className="mt-4 space-y-3">
              {dayBills.length > 0 ? (
                dayBills.map((bill, index) => (
                  <div
                    key={`${bill.type}-${index}`}
                    className="rounded-md border border-gray-700 p-3 text-sm dark:border-gray-300"
                  >
                    {bill.name} today
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 dark:text-gray-600">
                  No bills scheduled for today.
                </p>
              )}
            </div>
          </div>

          <div className=" flex flex-col h-full w-full justify-between items-center ">
            
            <DayCard
              day={todayCard}
              weekdayName={weekdayName}
              weekdayNameClassName="text-2xl normal-case"
              dayNumberClassName="text-2xl"
              headerClassName="flex-row gap-4"
              className="mb-4 h-56 w-full max-w-full justify-between"
            />

            <div className="rounded-lg bg-gray-900 p-4 text-gray-300 dark:bg-white dark:text-black w-full">
                <h3 className="font-semibold text-lg border-b "> Analytics</h3>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

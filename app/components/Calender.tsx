import { Day } from "../custom-types/types";
import { mockBillsByDay } from "../lib/mockBills";
import DayCard from "./Day";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(month: Date): Day[] {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, index) => ({
    dayNumber: index + 1,
    bills: mockBillsByDay[index + 1] ?? [],
  }));
}

export default function Calender({ month = new Date() }: { month?: Date }) {
  const days = getDaysInMonth(month);
  const monthName = month.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className="min-w-3/4  rounded-lg border border-gray-200 bg-white p-4 text-gray-950 dark:border-gray-700 dark:bg-black dark:text-white ml-1 mt-3">
      <h2 className="mb-4 text-lg font-semibold sm:text-center">{monthName}</h2>

      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold uppercase text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}

        {days.map((day) => (
          <DayCard key={day.dayNumber} day={day} />
        ))}
      </div>
    </section>
  );
}

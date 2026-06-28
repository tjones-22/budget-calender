import { Day } from "../../types/types";

const billTypeStyles = {
  payday: "bg-green-500",
  bill: "bg-red-500",
  purchase: "bg-orange-500",
};

export default function DayCard({
  day,
  className = "",
  dayNumberClassName = "",
  weekdayNameClassName = "",
  weekdayName,
  headerClassName = "",
}: {
  day: Day;
  className?: string;
  dayNumberClassName?: string;
  weekdayNameClassName?: string;
  weekdayName?: string;
  headerClassName?: string;
}) {
  const weekdayClasses =
    weekdayNameClassName || "text-sm uppercase";
  const dayNumberClasses =
    dayNumberClassName || "text-base sm:text-sm";

  return (
    <div
      className={`flex min-h-fit max-w-fit flex-col rounded-md border border-gray-200 bg-white p-4 text-gray-950 dark:border-gray-700 dark:bg-black dark:text-white ${className}`}
    >
      <div
        className={`flex flex-col items-center justify-center ${headerClassName}`}
      >
        {weekdayName && (
          <p
            className={`font-semibold text-gray-500 dark:text-gray-400 ${weekdayClasses}`}
          >
            {weekdayName}
          </p>
        )}
        <p className={`font-bold italic ${dayNumberClasses}`}>
          {day.dayNumber}
        </p>
      </div>

      <div className="mt-auto flex w-full flex-row items-center gap-1">
        {day.bills.map((bill, index) => (
          <span
            key={`${bill.name}-${bill.type}-${index}`}
            title={bill.name}
            className={`h-2.5 w-2.5 rounded-full ${billTypeStyles[bill.type]}`}
          />
        ))}
      </div>
    </div>
  );
}

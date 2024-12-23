import birthdayData from "@/data/birthdays.json";
import type { ICalendarEntry } from "./calendarService";

export interface IBirthday {
  day: number;
  name: string;
  year?: number;
}

interface IBirthdayData {
  [key: string]: IBirthday[];
}

export function transformBirthdaysToCalendarFormat(year: number) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const allBirthdays: ICalendarEntry[] = [];
  const data = birthdayData as IBirthdayData;

  for (let monthIndex = 0; monthIndex < monthNames.length; monthIndex++) {
    const monthName = monthNames[monthIndex];
    const monthBirthdays = data[monthName] || [];

    monthBirthdays.forEach((birthday) => {
      // Format the date to YYYY-MM-DD
      const month = (monthIndex + 1).toString().padStart(2, "0");
      const day = birthday.day.toString().padStart(2, "0");

      allBirthdays.push({
        // id: `birthday-${monthName}-${birthday.day}-${birthday.name}`,
        title: `🎂 ${birthday.name}`,
        date: `${year}-${month}-${day}`,
        type: "birthday",
        completed: false,
      });
    });
  }

  return allBirthdays;
}

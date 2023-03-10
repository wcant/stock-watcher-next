import { DateTime } from "luxon";

export default function diffIsoDates(date1, date2) {
  const { values, invalid } = date1.diff(date2, [
    "months",
    "days",
    "hours",
    "minutes",
  ]);

  if (invalid)
    return console.error(
      `Warning: diff attempted to create an invalid DateTime`
    );

  return { values, invalid };
}

import { format } from "date-fns";

export function formatDateTime(dateTimeString: string | number | Date) {
  const formatted = format(dateTimeString, "HH:mm");
  return formatted;
}

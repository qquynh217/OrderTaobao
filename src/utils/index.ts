import { DATE_FORMAT } from "constants";
import dayjs from "dayjs";

export const formatDate = (
  date: string | number | Date | dayjs.Dayjs | null | undefined,
  formatStr: string | undefined = DATE_FORMAT
) => {
  if (!date) return "--";
  return dayjs(date).format(formatStr);
};

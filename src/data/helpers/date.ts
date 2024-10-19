import dayjs, { Dayjs } from "dayjs";

export const formatDate = (date: Dayjs | null): string => {
  return date ? date.format("DD/MM/YY") : dayjs().format("DD/MM/YY");
};

import {
  DATE_FORMAT,
  ORDER_STATUS,
  SHIPPING_TYPE,
  SORT_DIRECTIONS,
} from "constants";
import dayjs from "dayjs";

export const formatDate = (
  date: string | number | Date | dayjs.Dayjs | null | undefined,
  formatStr: string | undefined = DATE_FORMAT
) => {
  if (!date) return "--";
  return dayjs(date).format(formatStr);
};
export function objectToSearchParams(obj: Record<string, any>): string {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value != "") {
      params.append(key, String(value));
    }
  });

  return params.toString();
}

export const getOrderStatus = (key: number | string) => {
  const status = ORDER_STATUS.find((item) => +item.key == +key);
  return status ? status : ORDER_STATUS[0];
};

export const getShippingType = (key?: string) => {
  const type = SHIPPING_TYPE.find((item) => item.value == key);
  return type;
};

export const handleSortOrder = (order?: string) => {
  const { ASC, DESC } = SORT_DIRECTIONS;
  return order === "ascend" ? ASC : DESC;
};

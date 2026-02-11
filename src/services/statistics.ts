import axios from "axios";

export interface OrderStatsParams {
  type: "day" | "week" | "month";
  from: string;
  to: string;
  export?: boolean;
}

export interface OrderStatsItem {
  date_label: string;
  total_item_cost: number;
  total_weight_fee: number;
  total_order_fee: number;
  total_extra_fee: number;
}

export async function fetchOrderStatistics(params: OrderStatsParams) {
  const res = await axios.get<{ data: OrderStatsItem[] }>(
    "/api/statistics/order-costs",
    {
      params,
    }
  );
  return res.data.data;
}

export async function exportOrderStatisticsExcel(params: OrderStatsParams) {
  const res = await axios.get("/api/statistics/order-costs", {
    params: { ...params, export: "excel" },
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `order_costs_${Date.now()}.xlsx`);
  document.body.appendChild(link);
  link.click();
}

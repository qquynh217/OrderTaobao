import {
  Button,
  DatePicker,
  Form,
  message,
  Select,
  Table
} from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { FilterValue } from "antd/es/table/interface";
import { PAGE_SIZE_OPTIONS, SORT_DIRECTIONS } from "constants";
import { generateFakeOrderStats } from "constants/dumpData";
import dayjs from "dayjs";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import {
  exportOrderStatisticsExcel,
  // fetchOrderStatistics,
  OrderStatsItem,
} from "services/statistics";
import { handleSortOrder } from "utils";

const { RangePicker } = DatePicker;

const OrderStatistics: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<{
    list: OrderStatsItem[];
    total: number;
  }>({
    list: [],
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    size: 10,
    sort_by: "_id",
    sort: SORT_DIRECTIONS.DESC,
  });

  const columns: ColumnsType<OrderStatsItem> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (_val: any, _rec: any, index: number) => index + 1,
    },
    { title: "Thời gian", dataIndex: "date_label", key: "date_label" },
    {
      title: "Tiền hàng (VNĐ)",
      dataIndex: "total_item_cost",
      key: "total_item_cost",
      render: (v) => v.toLocaleString(),
    },
    {
      title: "Tiền cân (VNĐ)",
      dataIndex: "total_weight_fee",
      key: "total_weight_fee",
      render: (v) => v.toLocaleString(),
    },
    {
      title: "Phí mua hàng (VNĐ)",
      dataIndex: "total_order_fee",
      key: "total_order_fee",
      render: (v) => v.toLocaleString(),
    },
    {
      title: "Phí thêm (VNĐ)",
      dataIndex: "total_extra_fee",
      key: "total_extra_fee",
      render: (v) => v.toLocaleString(),
    },
  ];

  const onChangeTable = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: any
  ) => {
    const { current, pageSize } = pagination;
    const key = get(sorter, ["column", "key"]);
    const { order } = sorter;

    setQueryParams({
      ...queryParams,
      page: current || 1,
      size: pageSize || PAGE_SIZE_OPTIONS[0],
      sort_by: key || "_id",
      sort: handleSortOrder(order),
    });
  };

  const handleSubmit = async (value: {
    type: "day" | "week" | "month";
    dateRange: [dayjs.Dayjs, dayjs.Dayjs];
  }) => {
    try {
      let params = {
        type: value.type,
        from: value.dateRange[0].toISOString(),
        to: value.dateRange[1].toISOString(),
      };
      setQueryParams({
        ...queryParams,
        ...params,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetch = async (params: any) => {
    try {
      setLoading(true);

      // const res = await fetchOrderStatistics({
      //   type,
      //   from: from.toISOString(),
      //   to: to.toISOString(),
      // });
      console.log(params);

      const res = generateFakeOrderStats(params.type, params.from, params.to);
      setData({
        list: res,
        total: res.length,
      });
    } catch (err) {
      message.error("Không thể tải dữ liệu thống kê");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const values = form.getFieldsValue();
      console.log(values);
      await exportOrderStatisticsExcel({
        type: values.type,
        from: values.dateRange[0].toISOString(),
        to: values.dateRange[1].toISOString(),
      });
      message.success("Đã xuất file Excel");
    } catch {
      message.error("Xuất file thất bại");
    }
  };

  useEffect(() => {
    handleFetch({
      ...queryParams,
    });
  }, [queryParams]);

  return (
    <div className="order-statistics">
      <h2 className="title">Thống kê chi phí đơn hàng</h2>
      <Form onFinish={handleSubmit} className="search-form" form={form}>
        <Form.Item name="type" label="Loại thống kê" className="type">
          <Select
            options={[
              { value: "day", label: "Theo ngày" },
              { value: "week", label: "Theo tuần" },
              { value: "month", label: "Theo tháng" },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="dateRange"
          label="Khoảng thời gian"
          className="date-range"
        >
          <RangePicker placeholder={["Từ ngày", "Đến ngày"]} />
        </Form.Item>

        <Button type="primary" loading={loading} size="small" htmlType="submit">
          Thống kê
        </Button>
        <Button onClick={handleExport} className="export-btn" type="primary">
          Xuất Excel
        </Button>
      </Form>
      <Table
        loading={loading}
        dataSource={data.list}
        columns={columns}
        rowKey="date_label"
        pagination={{ pageSizeOptions: PAGE_SIZE_OPTIONS }}
        onChange={onChangeTable}
        summary={() => {
          const total = data.list.reduce(
            (acc, cur) => ({
              item: acc.item + cur.total_item_cost,
              weight: acc.weight + cur.total_weight_fee,
              orderFee: acc.orderFee + cur.total_order_fee,
              extra: acc.extra + cur.total_extra_fee,
            }),
            { item: 0, weight: 0, orderFee: 0, extra: 0 }
          );
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>
                <b>Tổng</b>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                {total.item.toLocaleString()}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                {total.weight.toLocaleString()}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                {total.orderFee.toLocaleString()}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4}>
                {total.extra.toLocaleString()}
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </div>
  );
};

export default OrderStatistics;

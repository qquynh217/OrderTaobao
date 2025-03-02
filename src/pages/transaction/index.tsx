import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { FilterValue } from "antd/es/table/interface";
import NumberFormat from "components/NumberFormat";
import {
  PAGE_SIZE_OPTIONS,
  SORT_DIRECTIONS,
  TRANSACTION_KEY_TYPE,
  TRANSACTION_TYPE,
} from "constants";
import { transHistory } from "constants/dumpData";
import { ITransaction } from "constants/interface";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { formatDate, handleSortOrder } from "utils";

const { RangePicker } = DatePicker;

const Transaction: FC = () => {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    size: 10,
    sort_by: "_id",
    sort: SORT_DIRECTIONS.DESC,
  });
  const [data, setData] = useState<{
    list: Array<ITransaction>;
    total: number;
  }>({
    list: [],
    total: 0,
  });
  const onChangeTable = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: any
  ) => {
    const { current, pageSize } = pagination;
    const { order } = sorter;

    setQueryParams({
      ...queryParams,
      page: current || 1,
      size: pageSize || PAGE_SIZE_OPTIONS[0],
      sort_by: "_id",
      sort: handleSortOrder(order),
    });
  };
  const columns: TableProps<ITransaction>["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (_val, _rec, id) => id + 1,
    },
    {
      title: "Thời gian",
      dataIndex: "code",
      key: "code",
      render: (val, rec) => (
        <>
          <p>{formatDate(rec.created_time, "HH:mm DD-MM-YYYY")}</p>
          <p>Mã GD: {val}</p>
        </>
      ),
    },
    {
      title: "Loại giao dịch",
      dataIndex: "type",
      key: "type",
      render: (val, rec) => (
        <>
          <p>{TRANSACTION_TYPE.find((item) => item.value == val)?.text}</p>
          {rec.order_id && (
            <Link to={ROUTE_URL.ORDER_DETAIL + `/${rec.order_id}`}>
              Đơn hàng: {rec.order_code}
            </Link>
          )}
        </>
      ),
    },
    {
      title: "Thông tin",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Giá trị GD",
      dataIndex: "amount",
      key: "amount",
      render: (val) => <NumberFormat value={val} suffix="đ" />,
    },
    {
      title: "Số dư",
      dataIndex: "balance",
      key: "balance",
      render: (val) => <NumberFormat value={val} suffix="đ" />,
    },
  ];
  const onSubmit = (value: {
    code?: string;
    type?: string;
    order_code?: string;
    duration?: (string | number | dayjs.Dayjs | Date | null | undefined)[];
  }) => {
    const params = {
      code: value.code,
      type: value.type,
      order_code: value.order_code,
      time_from:
        value.duration && value.duration[0]
          ? dayjs(value.duration[0]).startOf("day").valueOf()
          : "",
      time_to:
        value.duration && value.duration[1]
          ? dayjs(value.duration[1]).endOf("day").valueOf()
          : "",
    };
    setQueryParams({
      ...queryParams,
      ...params,
    });
  };
  const fetchData = async (params: any) => {
    console.log("Search params", params);

    const data = transHistory;
    setData({ list: data, total: data.length });
  };
  useEffect(() => {
    fetchData(queryParams);
  }, [queryParams]);

  return (
    <div className="transaction-history">
      <h2 className="title">Lịch sử giao dịch</h2>
      <div className="transaction-search">
        <Form
          initialValues={{ type: TRANSACTION_KEY_TYPE.ALL }}
          className="transaction-search_form"
          onFinish={onSubmit}
        >
          <Row gutter={20}>
            <Col span={6}>
              <Form.Item name="code">
                <Input placeholder="Mã giao dịch" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="type">
                <Select
                  options={TRANSACTION_TYPE.map((item) => ({
                    label: item.text,
                    value: item.value,
                  }))}
                  placeholder="Loại giao dịch"
                />
              </Form.Item>
            </Col>
            <Col span={12} />
            <Col span={6}>
              <Form.Item name="order_code">
                <Input placeholder="Mã đơn hàng" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="duration">
                <RangePicker placeholder={["Từ ngày", "Đến ngày"]} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Space style={{ gap: 20 }}>
                <Button type="primary" htmlType="submit">
                  Tìm kiếm
                </Button>
                <Button type="primary" className="export-btn">
                  Xuất excel
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </div>
      <Table
        dataSource={data.list}
        columns={columns}
        onChange={onChangeTable}
        pagination={{
          total: data.total || 0,
          pageSizeOptions: PAGE_SIZE_OPTIONS,
          current: queryParams.page || 1,
          pageSize: queryParams.size || PAGE_SIZE_OPTIONS[0],
          showSizeChanger: true,
        }}
      />
    </div>
  );
};
export default Transaction;

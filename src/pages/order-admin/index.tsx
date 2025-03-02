import {
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  DatePicker,
  Space,
  Button,
  TableProps,
  Tag,
  Table,
  TablePaginationConfig,
} from "antd";
import { FilterValue } from "antd/es/table/interface";
import NumberFormat from "components/NumberFormat";
import { ORDER_STATUS, PAGE_SIZE_OPTIONS, SORT_DIRECTIONS } from "constants";
import { IOrder, IPackage } from "constants/interface";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { orderService } from "services/order";
import { getOrderStatus, getShippingType, handleSortOrder } from "utils";
import { get } from "lodash";
const { RangePicker } = DatePicker;

const OrderAdmin: FC = () => {
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useState({
    page: 1,
    size: 10,
    sort_by: "_id",
    sort: SORT_DIRECTIONS.DESC,
  });
  const [orders, setOrders] = useState<{ list: Array<IOrder>; total: 0 }>({
    list: [],
    total: 0,
  });

  const handleSubmit = async (value: {
    key: any;
    isCheck: any;
    status: string;
    duration: (string | number | dayjs.Dayjs | Date | null | undefined)[];
  }) => {
    try {
      let params = {
        search: value.key,
        status: value.status,
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
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = async (params: any) => {
    try {
      const res = await orderService.get(params);
      const result = res.data.data.result;
      const list: Array<IOrder> = result.map((item: any) => ({
        ...item,
        status: item.status || 1,
        image_order: item.image_order,
      }));

      setOrders({
        total: res.data.data.pagination.total_records || list.length,
        list: list,
      });
    } catch (error) {
      console.log(error);
    }
  };
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

  useEffect(() => {
    fetchOrders({
      ...queryParams,
    });
  }, [queryParams]);
  const columns: TableProps<IOrder>["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (_val: any, _rec: any, index: number) => index + 1,
    },
    {
      title: "Khách hàng",
      dataIndex: "created_by",
      key: "created_by",
    },
    {
      title: "Đơn hàng",
      dataIndex: "status",
      key: "status",
      render: (val, rec) => (
        <div className="order-status">
          <h4 className="order-code">{rec.code}</h4>
          <p>
            <Tag color={getOrderStatus(val).color}>
              {getOrderStatus(val).value}
            </Tag>
          </p>
          <p className="type-delivery">
            {getShippingType(rec.type_delivery)?.text}
          </p>
        </div>
      ),
    },
    {
      title: "Kiện hàng",
      dataIndex: "packages",
      key: "packages",
      render: (val: Array<IPackage>, item) => {
        return (
          <div className="order-packages">
            <p>
              Số lượng: <b>{val?.length || 0}</b>
            </p>
            <p>
              % phí mua hàng:{" "}
              <b>
                {item.order_fee_percent
                  ? item.order_fee_percent * 100 + " %"
                  : "--"}
              </b>
            </p>
            <p>
              Tỉ giá: <b>{item.exchange_rate}</b>
            </p>
            <p>
              Hàng về kho: <b>{item.stock_storage || "--"}</b>
            </p>
            <p>
              Kho khách chọn: <b>{item.user_storage || "--"}</b>
            </p>
          </div>
        );
      },
    },
    {
      title: "Chi phí",
      dataIndex: "total_fee",
      key: "total_fee",
      render: (val, rec) => {
        return (
          <>
            <p>
              Tổng chi phí:{" "}
              <b>
                <NumberFormat
                  decimalScale={0}
                  value={val}
                  suffix="đ"
                  emptyText="--"
                />
              </b>
            </p>
            <p>
              Đã thanh toán:
              <b>
                <NumberFormat
                  value={rec.total_paid}
                  suffix="đ"
                  emptyText="--"
                  decimalScale={0}
                />
              </b>
            </p>
            <p>
              Chưa thanh toán:{" "}
              <b>
                <NumberFormat
                  value={val - rec.total_paid}
                  suffix="đ"
                  emptyText="--"
                  decimalScale={0}
                />
              </b>
            </p>
          </>
        );
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "note_staff",
      key: "note_staff",
    },
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      render: (val) => (
        <>
          <Button
            onClick={() => {
              navigate(ROUTE_URL.ORDER_ADMIN + `/${val}`);
            }}
          >
            Chi tiết
          </Button>
        </>
      ),
    },
  ];
  return (
    <div className="list-order order-admin">
      <h2 className="title">Quản lý đơn hàng</h2>
      <div className="search-field">
        <Form className="search-order_form" onFinish={handleSubmit}>
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item name="key">
                <Input placeholder="Mã đơn hàng hoặc ghi chú riêng" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="status">
                <Select
                  options={ORDER_STATUS.map((item) => ({
                    value: item.key,
                    label: item.value,
                  }))}
                  allowClear
                  placeholder="Trạng thái đơn"
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="isCheck" valuePropName="checked" label={null}>
                <Checkbox>Đóng gỗ</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8} />
            <Col span={8}>
              <Form.Item name="duration">
                <RangePicker placeholder={["Từ ngày", "Đến ngày"]} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Space style={{ gap: 20 }}>
                <Button type="primary" htmlType="submit">
                  Tìm kiếm
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </div>
      <Table
        columns={columns}
        dataSource={orders.list}
        onChange={onChangeTable}
        pagination={{ pageSizeOptions: PAGE_SIZE_OPTIONS }}
      />
    </div>
  );
};
export default OrderAdmin;

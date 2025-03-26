import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Empty,
  Form,
  Input,
  Pagination,
  Row,
  Space,
} from "antd";
import showMessage from "components/Message";
import OrderItem from "components/OrderItem";
import { ORDER_STATUS, PAGE_SIZE_OPTIONS, SORT_DIRECTIONS } from "constants";
import { IOrder } from "constants/interface";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { orderService } from "services/order";
import { userStore } from "store/userStore";

const { RangePicker } = DatePicker;

const ListOrder: FC = () => {
  const { status } = useParams();
  const { balance, setBalance } = userStore();
  const [orders, setOrders] = useState<{ list: Array<IOrder>; total: 0 }>({
    list: [],
    total: 0,
  });
  const [queryParams, setQueryParams] = useState({
    page: 1,
    size: 10,
    sort_by: "_id",
    sort: SORT_DIRECTIONS.DESC,
  });
  const handleSubmit = async (value: {
    key: any;
    isCheck: any;
    duration: (string | number | dayjs.Dayjs | Date | null | undefined)[];
  }) => {
    {
      try {
        let params = {
          search: value.key,
          time_from: value.duration[0]
            ? dayjs(value.duration[0]).startOf("day").valueOf()
            : "",
          time_to: value.duration[1]
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
  const handlePageChange = (page: number, pageSize: number) => {
    setQueryParams({
      ...queryParams,
      size: pageSize,
      page: page,
    });
  };
  const handleDeposit =
    (percent: number, item: IOrder) => async (close: any) => {
      try {
        const amount = Math.round((percent * item.item_total_cost) / 100);
        const res = await orderService.paid({
          amount,
          orderId: item.id,
        });
        if (res.status == 200) {
          const newBalance = balance - amount;
          setBalance(newBalance);
          showMessage("success", "Đặt cọc đơn thành công!");
          fetchOrders({ ...queryParams, status });
        } else {
          showMessage("error", "Đặt cọc đơn không thành công!");
        }

        close();
      } catch (error: any) {
        const status = error.status;
        const msg =
          status == 405 ? "Số dư không đủ" : "Đặt cọc đơn không thành công.";
        showMessage("error", msg);
        close();
      }
    };
  useEffect(() => {
    fetchOrders({
      ...queryParams,
      status,
    });
  }, [status, queryParams]);
  return (
    <div className="list-order">
      <h2 className="title">
        {(status && ORDER_STATUS.find((item) => item.key == status)?.value) ||
          "Tất cả"}
      </h2>
      <div className="search-field">
        <Form className="search-order_form" onFinish={handleSubmit}>
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item name="key">
                <Input placeholder="Mã đơn hàng hoặc ghi chú riêng" />
              </Form.Item>
            </Col>
            <Col span={8}>
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
                {/* <Button type="primary" className="export-btn">
                  Xuất excel
                </Button> */}
              </Space>
            </Col>
          </Row>
        </Form>
      </div>
      <p className="total-result">
        Đang hiển thị <b>{orders.list.length}</b> trong tổng số{" "}
        <b>{orders.total}</b> bản ghi
      </p>

      {orders.list.length > 0 ? (
        !status || (status && +status != 2) ? (
          <div className="list-order_wrapper">
            {orders.list.map((order) => (
              <OrderItem item={order} status={+(status || 0)} key={order.id} />
            ))}
          </div>
        ) : (
          <div className="list-order_wrapper list-order-deposit">
            {orders.list.map((order) => (
              <OrderItem
                item={order}
                status={+(status || 0)}
                key={order.id}
                handleDeposit={handleDeposit}
              />
            ))}
          </div>
        )
      ) : (
        <Empty description="Không có đơn hàng" />
      )}
      {orders.list.length > 0 && (
        <Pagination
          showSizeChanger
          total={orders.total}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          current={queryParams.page || 1}
          pageSize={queryParams.size || PAGE_SIZE_OPTIONS[0]}
          onChange={handlePageChange}
          align="center"
          style={{ marginTop: 20 }}
        />
      )}
    </div>
  );
};
export default ListOrder;

import { Table, Tooltip } from "antd";
import NumberFormat from "components/NumberFormat";
import { DATE_FORMAT } from "constants";
import { useOrderContext } from "context/OrderContext";
import { FC } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import { formatDate } from "utils";

const OrderPackage: FC = () => {
  const { order } = useOrderContext();
  const packageCol = [
    {
      title: "KIỆN HÀNG",
      dataIndex: "status",
      key: "status",
      render: () => order.status,
    },
    {
      title: "CÂN NẶNG",
      dataIndex: "weight",
      key: "weight",
      render: (val: string, rec: any) => (
        <>
          <p className="d-flex-center gap5">
            <NumberFormat value={val} suffix="kg" />
            <Tooltip title="Cân nặng">
              <FaCircleExclamation />
            </Tooltip>
          </p>
          <p className="d-flex-center gap5">
            <NumberFormat value={rec.weight_base_volumn} suffix="kg" />
            <Tooltip title="Quy đổi thể tích 0.00 x 0.00 x 0.00">
              <FaCircleExclamation />
            </Tooltip>
          </p>
        </>
      ),
    },
    {
      title: "ĐƠN GIÁ",
      dataIndex: "weight_rate",
      key: "weight_rate",
      render: (val: number) => <NumberFormat value={val} suffix="đ" />,
    },
    {
      title: "THÀNH TIỀN",
      dataIndex: "total_weight_price",
      key: "total_weight_price",
      render: (val: number) => <NumberFormat value={val} suffix="đ" />,
    },
    // {
    //   title: "CƯỚC THÊM",
    //   dataIndex: "woodPackagingFee",
    //   key: "woodPackagingFee",
    //   render: (val: number, rec: any) => (
    //     <>
    //       <p className="d-flex-center gap5">
    //         <NumberFormat value={val} suffix="đ" />
    //         <Tooltip title="Cước đóng gỗ">
    //           <FaCircleExclamation />
    //         </Tooltip>
    //       </p>
    //       <p className="d-flex-center gap5">
    //         <NumberFormat value={rec.extraShippingFee} suffix="đ" />
    //         <Tooltip title="Cước vận chuyển phát sinh">
    //           <FaCircleExclamation />
    //         </Tooltip>
    //       </p>
    //     </>
    //   ),
    // },
    {
      title: "NGÀY",
      dataIndex: "ship_at",
      key: "ship_at",
      width: "230px",
      render: (val: string, rec: any) => (
        <>
          {[
            { label: "Người bán giao", value: val },
            { label: "Trên đường về VN", value: rec.transit_at_vn },
            { label: "Trong kho VN:", value: rec.stock_at_vn },
            { label: "Đã trả", value: rec.return_at },
          ].map((item, id) => (
            <div className="d-flex-center gap5 justify-between" key={id}>
              <p>{item.label}: </p>
              <b>{formatDate(item.value, DATE_FORMAT)}</b>
            </div>
          ))}
        </>
      ),
    },
  ];
  return (
    <div className="order-package">
      <h2>Kiện hàng</h2>
      <Table
        columns={packageCol}
        dataSource={order.packages}
        pagination={false}
      />
    </div>
  );
};

export default OrderPackage;

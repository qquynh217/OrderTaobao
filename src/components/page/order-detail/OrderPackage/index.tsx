import { Table, Tooltip } from "antd";
import NumberFormat from "components/NumberFormat";
import { DATE_FORMAT } from "constants";
import { IOrder } from "constants/interface";
import { FC, useMemo } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import { formatDate, getOrderStatus } from "utils";

const OrderPackage: FC<{ order: IOrder }> = ({ order }) => {
  const packages = useMemo(() => {
    return [
      {
        status: getOrderStatus(order.status).value,
        weight: order.weight || 0,
        weightBasedVolumn: order.weightBasedVolumn || 0,
        weightRate: order.weightRate || 0,
        totalWeightFee: order.totalWeightFee || 0,
        woodPackagingFee: order.woodPackagingFee || 0,
        extraShippingFee: order.extraShippingFee || 0,
        transitToVnAt: order.transitToVnAt,
        stockInVnAt: order.stockInVnAt,
        returnAt: order.returnAt,
        sellerShippedAt: order.sellerShippedAt,
      },
    ];
  }, [order]);
  const packageCol = [
    {
      title: "KIỆN HÀNG",
      dataIndex: "status",
      key: "status",
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
            <NumberFormat value={rec.weightBasedVolumn} suffix="kg" />
            <Tooltip title="Quy đổi thể tích 0.00 x 0.00 x 0.00">
              <FaCircleExclamation />
            </Tooltip>
          </p>
        </>
      ),
    },
    {
      title: "ĐƠN GIÁ",
      dataIndex: "weightRate",
      key: "weightRate",
      render: (val: number) => <NumberFormat value={val} suffix="đ" />,
    },
    {
      title: "THÀNH TIỀN",
      dataIndex: "totalWeightFee",
      key: "totalWeightFee",
    },
    {
      title: "CƯỚC THÊM",
      dataIndex: "woodPackagingFee",
      key: "woodPackagingFee",
      render: (val: number, rec: any) => (
        <>
          <p className="d-flex-center gap5">
            <NumberFormat value={val} suffix="đ" />
            <Tooltip title="Cước đóng gỗ">
              <FaCircleExclamation />
            </Tooltip>
          </p>
          <p className="d-flex-center gap5">
            <NumberFormat value={rec.extraShippingFee} suffix="đ" />
            <Tooltip title="Cước vận chuyển phát sinh">
              <FaCircleExclamation />
            </Tooltip>
          </p>
        </>
      ),
    },
    {
      title: "NGÀY",
      dataIndex: "sellerShippedAt",
      key: "sellerShippedAt",
      render: (val: string, rec: any) => (
        <>
          <div className="d-flex-center gap5">
            <p>Người bán giao: </p>
            <b>{formatDate(val, DATE_FORMAT)}</b>
          </div>
          <div className="d-flex-center gap5">
            <p>Trên đường về VN: </p>
            <b>{formatDate(rec.transitToVnAt, DATE_FORMAT)}</b>
          </div>
          <div className="d-flex-center gap5">
            <p>Trong kho VN: </p>
            <b>{formatDate(rec.stockInVnAt, DATE_FORMAT)}</b>
          </div>
          <div className="d-flex-center gap5">
            <p>Đã trả: </p>
            <b>{formatDate(rec.returnAt, DATE_FORMAT)}</b>
          </div>
        </>
      ),
    },
  ];
  return (
    <div className="order-package">
      <h2>Kiện hàng</h2>
      <Table columns={packageCol} dataSource={packages} pagination={false} />
    </div>
  );
};

export default OrderPackage;

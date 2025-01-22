import { Table, TableProps, Tooltip } from "antd";
import NumberFormat from "components/NumberFormat";
import { IOrderProduct } from "constants/interface";
import { FC } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import noImage from "resources/images/no-image-product.png";

const OrderProducts: FC<{
  products: Array<IOrderProduct>;
  exchangeRate: number;
}> = ({ products, exchangeRate }) => {
  const column: TableProps<IOrderProduct>["columns"] = [
    {
      title: "LINK",
      dataIndex: "link",
      key: "link",
      render: (val: string, rec) => (
        <a href={val} className="product-link">
          <img src={rec.image || noImage} alt="" />
        </a>
      ),
    },
    {
      title: "ĐẶC ĐIỂM",
      dataIndex: "size",
      key: "size",
      render: (val: string, rec) => (
        <>
          <Tooltip title="Kích thước">
            <p>{val}</p>
          </Tooltip>
          <Tooltip title="Màu sắc">
            <p>{rec.color}</p>
          </Tooltip>
        </>
      ),
    },
    {
      title: "SỐ LƯỢNG",
      dataIndex: "qty",
      key: "qty",
      render: (val: string, rec) => (
        <p className="d-flex-center gap5">
          <b>
            {val}/{rec.qtyOrder}/{rec.qtyOrder}
          </b>
          <Tooltip title="SL khách đặt / SL đặt được / SL về kho">
            <FaCircleExclamation />
          </Tooltip>
        </p>
      ),
    },
    {
      title: "GIÁ",
      dataIndex: "price",
      key: "price",
      render: (val: number) => (
        <div className="product-price">
          <b>
            <NumberFormat
              value={exchangeRate * val}
              suffix="đ"
              decimalScale={0}
            />
          </b>
          <br />
          <b>
            <NumberFormat value={val} suffix="¥" />
          </b>
        </div>
      ),
    },
    {
      title: "GHI CHÚ KHÁCH",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "GHI CHÚ NHÂN VIÊN",
      dataIndex: "staffNote",
      key: "staffNote",
    },
  ];
  return (
    <div className="order-product">
      <h2>Link hàng</h2>
      <Table columns={column} dataSource={products} pagination={false} />
    </div>
  );
};

export default OrderProducts;

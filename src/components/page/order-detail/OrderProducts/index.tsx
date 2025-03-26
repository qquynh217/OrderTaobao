import { Button, Popconfirm, Space, Table, TableProps, Tooltip } from "antd";
import NumberFormat from "components/NumberFormat";
import { USER_ROLE } from "constants";
import { IOrderProduct } from "constants/interface";
import { useOrderContext } from "context/OrderContext";
import { FC, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaCircleExclamation } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import noImage from "resources/images/no-image-product.png";
import { userStore } from "store/userStore";
import ProductModal from "./ProductModal";

const OrderProducts: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<number | null>(null);
  const { order, handleUpdateOrder } = useOrderContext();
  const { role } = userStore();
  const handleRemoveProduct = async (index: number) => {
    const newProducts = [
      ...order.products.slice(0, index),
      ...order.products.slice(index + 1),
    ];
    await handleUpdateOrder(newProducts, "products");
  };

  const column: TableProps<IOrderProduct>["columns"] = [
    {
      title: "LINK",
      dataIndex: "link_product",
      key: "link_product",
      width: 100,
      render: (val: string, rec: IOrderProduct) => (
        <a href={val} className="product-link" target="_blank">
          <img src={rec.link_product_image || noImage} alt="" />
        </a>
      ),
    },
    {
      title: "ĐẶC ĐIỂM",
      dataIndex: "size",
      key: "size",
      width: "20%",
      render: (val: string, rec: IOrderProduct) => (
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
      dataIndex: "number",
      key: "number",
      render: (val: string, rec: IOrderProduct) => (
        <p className="d-flex-center gap5">
          <b>
            {val}/{rec.number_order || 0}
          </b>
          <Tooltip title="SL khách đặt / SL đặt được">
            <FaCircleExclamation />
          </Tooltip>
        </p>
      ),
    },
    {
      title: "GIÁ",
      dataIndex: "price",
      key: "price",
      render: (val: number, rec: IOrderProduct) => (
        <div className="product-price">
          <b>
            <NumberFormat
              value={order.exchange_rate * val * rec.number}
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
      width: "15%",
    },
    {
      title: "GHI CHÚ NHÂN VIÊN",
      dataIndex: "note_staff",
      key: "note_staff",
      width: "15%",
    },
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      render: (_val: any, _rec: any, index: number) => (
        <Space>
          <Button
            onClick={() => {
              setIsOpenModal(index);
            }}
          >
            <RiEdit2Fill />
          </Button>
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có chắc chắn xóa sản phẩm này không?"
            onConfirm={() => {
              handleRemoveProduct(index);
            }}
            okText="Có"
            cancelText="Không"
          >
            <Button danger>
              <AiFillDelete />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ].filter(
    (item) =>
      role == USER_ROLE.ADMIN || (role == USER_ROLE.USER && item.title != "#")
  );
  return (
    <div className="order-product">
      <h2>Link hàng</h2>
      <Table columns={column} dataSource={order.products} pagination={false} />
      <ProductModal
        setIndex={setIsOpenModal}
        index={isOpenModal}
        products={order.products}
      />
    </div>
  );
};

export default OrderProducts;

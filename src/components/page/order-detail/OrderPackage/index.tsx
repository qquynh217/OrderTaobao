import { Button, Popconfirm, Space, Table, Tooltip } from "antd";
import NumberFormat from "components/NumberFormat";
import { DATE_FORMAT, USER_ROLE } from "constants";
import { IPackage } from "constants/interface";
import { useOrderContext } from "context/OrderContext";
import { FC, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaCircleExclamation } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import { userStore } from "store/userStore";
import { formatDate, getOrderStatus } from "utils";
import PackageModal from "./PackageModal";

const OrderPackage: FC = () => {
  const { order, handleUpdateOrder } = useOrderContext();
  const { role } = userStore();

  const [isOpenModal, setIsOpenModal] = useState<{
    action: string;
    index: number | null;
  }>({ action: "", index: null });

  const handleRemovePackage = async (index: number) => {
    const newProducts = [
      ...order.packages.slice(0, index),
      ...order.packages.slice(index + 1),
    ];
    await handleUpdateOrder(newProducts, "packages");
  };

  const packageCol = [
    {
      title: "KIỆN HÀNG",
      dataIndex: "id",
      key: "id",
      render: (val: any) => (val ? val : getOrderStatus(order.status).value),
    },
    {
      title: "CÂN NẶNG",
      dataIndex: "weight",
      key: "weight",
      width: 150,
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
      width: 180,
      dataIndex: "weight_rate",
      key: "weight_rate",
      render: (val: number, rec: IPackage) => (
        <>
          <p className="d-flex-center gap5">
            <NumberFormat value={val} suffix="kg" />
            <Tooltip title="Đơn giá theo cân nặng">
              <FaCircleExclamation />
            </Tooltip>
          </p>
          <p className="d-flex-center gap5">
            <NumberFormat value={rec.weight_base_volumn_rate} suffix="kg" />
            <Tooltip title="Đơn giá theo cân nặng quy đổi từ thể tích">
              <FaCircleExclamation />
            </Tooltip>
          </p>
        </>
      ),
    },
    {
      title: "THÀNH TIỀN",
      dataIndex: "weight_rate",
      key: "weight_rate",
      width: 180,
      render: (val: number, rec: IPackage) => (
        <>
          <b className="d-flex-center gap5">
            <NumberFormat value={val * (rec.weight || 0)} suffix="đ" />
            <Tooltip title="Tiền cân nặng">
              <FaCircleExclamation />
            </Tooltip>
          </b>
          <b className="d-flex-center gap5">
            <NumberFormat
              value={
                (rec.weight_base_volumn_rate || 0) *
                (rec.weight_base_volumn || 0)
              }
              suffix="đ"
            />
            <Tooltip title="Tiền cân theo thể tích">
              <FaCircleExclamation />
            </Tooltip>
          </b>
        </>
      ),
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
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 150,
      render: (_val: any, _rec: any, index: number) => (
        <Space>
          <Button
            onClick={() => {
              setIsOpenModal({
                action: "edit",
                index,
              });
            }}
          >
            <RiEdit2Fill />
          </Button>
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có chắc chắn xóa sản phẩm này không?"
            onConfirm={() => {
              handleRemovePackage(index);
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
    <div className="order-package">
      <div className="d-flex-center justify-between">
        <h2>Kiện hàng</h2>
        {role == USER_ROLE.ADMIN && (
          <Button
            type="primary"
            className="small"
            onClick={() => {
              setIsOpenModal({
                action: "create",
                index: null,
              });
            }}
          >
            + Thêm
          </Button>
        )}
      </div>
      <Table
        columns={packageCol}
        dataSource={order.packages}
        pagination={false}
      />
      <PackageModal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        packages={order.packages}
      />
    </div>
  );
};

export default OrderPackage;

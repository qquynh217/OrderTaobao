import { Table, Tag } from "antd";
import NumberFormat from "components/NumberFormat";
import { CONSIGNMENT_STATUS } from "constants";
import { IConsignment } from "constants/interface";
import { FC } from "react";

const ConsignmentTab: FC<{ data: Array<IConsignment>; isLoading: boolean }> = ({
  data,
  isLoading,
}) => {
  const columns = [
    { title: "MÃ KÝ GỬI", dataIndex: "code", key: "code" },
    {
      title: "SỐ KIỆN",
      dataIndex: "numberPackage",
      key: "numberPackage",
    },
    { title: "TÊN SẢN PHẨM", dataIndex: "productName", key: "productName" },
    { title: "LOẠI ĐƠN", dataIndex: "orderType", key: "orderType" },
    { title: "NGÀY ĐẶT HÀNG", dataIndex: "orderDate", key: "orderDate" },
    { title: "TỔNG KG", dataIndex: "weight", key: "weight" },
    { title: "TỔNG M3", dataIndex: "volume", key: "volume" },
    {
      title: "TỔNG TIỀN",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (value: string) => <NumberFormat value={value} />,
    },
    {
      title: "ĐÃ TRẢ",
      dataIndex: "paid",
      key: "paid",
      render: (value: string) => <NumberFormat value={value} />,
    },
    {
      title: "TT THANH TOÁN",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "TRẠNG THÁI",
      dataIndex: "status",
      key: "status",
      render: (status: any) => {
        const statusData = CONSIGNMENT_STATUS.find(
          (item) => item.value === status
        );
        return <Tag color={statusData?.color}>{statusData?.label}</Tag>;
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        // pagination={false}
        bordered
      />
    </>
  );
};

export default ConsignmentTab;

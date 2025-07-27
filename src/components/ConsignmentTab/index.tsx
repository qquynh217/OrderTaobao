import { Table, Tag } from "antd";
import NumberFormat from "components/NumberFormat";
import { CONSIGNMENT } from "constants";
import { IConsignmentTable } from "constants/interface";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";

const ConsignmentTab: FC<{ data: Array<IConsignmentTable>; isLoading: boolean }> = ({
  data,
  isLoading,
}) => {
  const navigate = useNavigate()
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
    { title: "TỔNG KG", dataIndex: "totalWeight", key: "totalWeight" },
    { title: "TỔNG M3", dataIndex: "totalVolume", key: "totalVolume" },
    {
      title: "TỔNG TIỀN",
      dataIndex: "totalPrice",
      key: "totalPrice",
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
        const statusData = CONSIGNMENT.STATUS.find(
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
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(ROUTE_URL.CONSIGNMENT + '/' + record.id);
            },
          };
        }}
        // pagination={false}
        bordered
      />
    </>
  );
};

export default ConsignmentTab;

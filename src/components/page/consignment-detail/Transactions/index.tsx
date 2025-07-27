import { Card, Table, Tag } from "antd";
import showMessage from "components/Message";
import NumberFormat from "components/NumberFormat";
import { IConsignmentTransaction } from "constants/interface";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import consignmentService from "services/consignment";

const ConsignmentTransactions = () => {
  const { consignmentId } = useParams()
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState<Array<IConsignmentTransaction>>([]);
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 50,
      render: (_text: any, _record: any, index: number) => index + 1,
    },
    {
      title: "Mã vận đơn",
      dataIndex: "transactionCode",
      key: "transactionCode",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Giá trị",
      dataIndex: "productValue",
      key: "productValue",
      render: (value: any) => <NumberFormat value={value} suffix="đ" />,
    },
    {
      title: "Số sản phẩm",
      dataIndex: "productAmount",
      key: "productAmount",
    },
    {
      title: "Cân nặng",
      dataIndex: "weight",
      key: "weight",
      render: (weight: any) => <NumberFormat value={weight} suffix="kg" />,
    },
    {
      title: "Cân quy đổi",
      dataIndex: "weightByVolume",
      key: "weightByVolume",
      render: (weightByVolume: any) => <NumberFormat value={weightByVolume} suffix="kg" />,
    },
    {
      title: "Kích thước (Dài x Rộng x Cao)",
      dataIndex: "width",
      key: "width",
      render: (width: any, record: IConsignmentTransaction) => {
        const volumn = (width || 0) * (record.length || 0) * (record.height || 0)
        return volumn ? `${record.length} x ${width} x ${record.height}` : ''
      },
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (fee: any) => <NumberFormat value={fee} suffix="đ" />,
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (amount: any) => <NumberFormat value={amount} suffix="đ" />,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: () => <Tag>Đã giao hàng</Tag>,
    },
  ];

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await consignmentService.getTransactions(consignmentId || '') as any;
      setDataSource(res);
    } catch (error) {
      console.log(error);
      showMessage('error', 'Lấy dữ liệu thất bại')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [consignmentId])
  return (
    <div className="consignment-transactions">
      <Card className="col-span-2" title="Danh sách vận đơn">
        <Table
          loading={loading}
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
      </Card>
    </div>
  )
}

export default ConsignmentTransactions

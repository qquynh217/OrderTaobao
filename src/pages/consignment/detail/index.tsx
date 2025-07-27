import { Breadcrumb, Col, Row } from "antd";
import showMessage from "components/Message";
import ConsignmentChat from "components/page/consignment-detail/Chat";
import ConsignmentCost from "components/page/consignment-detail/Cost";
import CustomerInfo from "components/page/consignment-detail/CustomerInfo";
import ConsignmentTransactions from "components/page/consignment-detail/Transactions";
import { IConsignment } from "constants/interface";
import { useEffect, useState } from "react";
import { FaBox } from "react-icons/fa";
import { Link, useParams } from "react-router-dom"
import { ROUTE_URL } from "routes";
import consignmentService from "services/consignment";

const ConsignmentDetail = () => {
  const { consignmentId } = useParams()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IConsignment>({
    id: '',
    code: '',
    userId: '',
    status: '',
  })

  const fetchData = async () => {
    try {
      setLoading(true)
      const res: IConsignment = await consignmentService.getDetail(consignmentId || '') as any
      setData(res)
    } catch (error) {
      showMessage('error', 'Lỗi khi lấy dữ liệu')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [consignmentId])

  return (
    <div className="consignment-detail">
      <Breadcrumb
        separator=">"
        items={[
          {
            title: (
              <Link to={ROUTE_URL.CONSIGNMENT} className="title">
                <FaBox />
                <span>KÝ GỬI</span>
              </Link>
            ),
          },
          {
            title: "Chi tiết ký gửi",
          },
        ]}
      />
      <Row gutter={[20, 20]} className="consignment-detail-wrapper">
        <Col span={12}>
          <CustomerInfo data={data} loading={loading} />
        </Col>
        <Col span={12}>
          <ConsignmentChat />
        </Col>
        <Col span={24}>
          <ConsignmentTransactions />
        </Col>
        <Col span={24}>
          <ConsignmentCost loading={loading} />
        </Col>
      </Row>
    </div>
  )
}

export default ConsignmentDetail
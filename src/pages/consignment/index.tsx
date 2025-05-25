import { Button, Input, Tabs } from "antd";
import ConsignmentTab from "components/ConsignmentTab";
import { CONSIGNMENT_STATUS } from "constants";
import { IConsignment } from "constants/interface";
import { consignmentData } from "constants/dumpData";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";

const { TabPane } = Tabs;
const { Search } = Input;

const Consignment: FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<IConsignment>>([]);
  const [tab, setTab] = useState("total");
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState<{
    total: number;
    shop_dispatching: number;
    warehouse_inbound_cn: number;
    shipping_to_vn: number;
    warehouse_inbound_vn: number;
    dispatched: number;
    cancelled: number;
    completed: number;
  }>({
    total: 0,
    shop_dispatching: 0,
    warehouse_inbound_cn: 0,
    shipping_to_vn: 0,
    warehouse_inbound_vn: 0,
    dispatched: 0,
    cancelled: 0,
    completed: 0,
  });

  const fetchData = async (tab: string, searchTerm: string) => {
    try {
      // Giả lập call api
      console.log(tab, searchTerm);
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData(consignmentData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTotal = async () => {
    try {
      // Giả lập call api
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Mock response data
      const data = {
        shop_dispatching: 38,
        warehouse_inbound_cn: 1,
        shipping_to_vn: 2,
        warehouse_inbound_vn: 1,
        dispatched: 407,
        cancelled: 10,
        completed: 0,
        total: 0,
      };

      data.total = Object.values(data).reduce((acc, curr) => acc + curr, 0);

      setTotal(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTotal();
  }, []);

  useEffect(() => {
    fetchData(tab, searchTerm);
  }, [tab]);

  const handleChangeTab = (key: string) => {
    setTab(key);
  };

  const handleSearch = (value: string) => {
    fetchData(tab, value);
  };

  return (
    <div className="consignment-container">
      <h2 className="title">Ký gửi</h2>
      <div className="consignment-card">
        <Tabs
          defaultActiveKey="1"
          onChange={handleChangeTab}
          defaultValue={"total"}
        >
          {CONSIGNMENT_STATUS.map((item) => (
            <TabPane
              tab={`${item.label} (${total[item.value as keyof typeof total]})`}
              key={item.value}
            >
              <div className="search-box">
                <Search
                  placeholder="Tìm mã ký gửi"
                  onSearch={handleSearch}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  allowClear
                />
                <Button
                  type="primary"
                  className="create-button"
                  onClick={() => {
                    navigate(ROUTE_URL.CONSIGNMENT_CREATE);
                  }}
                >
                  Tạo ký gửi
                </Button>
              </div>
              <div className="summary-box">
                <div className="summary-item cn-storage">
                  <b>Kho TQ</b>
                  <p>920 -- 920</p>
                </div>
                <h3>Thống kê tiền hàng</h3>
                <div className="total-revenue">
                  <div className="summary-item">
                    <b>Tổng tiền đơn hàng trong kho</b>
                    <p>0</p>
                  </div>
                  <div className="summary-item">
                    <b>Tổng tiền thiếu để xuất kho</b>
                    <p>-912,000</p>
                  </div>
                  <div className="summary-item">
                    <b>Tổng tiền xuất kho chưa thanh toán</b>
                    <p>0</p>
                  </div>
                </div>
              </div>
              <ConsignmentTab data={data} isLoading={isLoading} />
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Consignment;

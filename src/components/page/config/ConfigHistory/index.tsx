import { Card, Pagination, Table } from 'antd'; // Import AntD components
import NumberFormat from 'components/NumberFormat';
import { formatDate } from 'utils';


interface HistoryTableProps {
  historyData: any;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  onSearchChange: (search: string) => void;
}

function HistoryTable({ historyData, onPageChange, pageSize, onPageSizeChange }: HistoryTableProps) {
  const { data: history, total_items, total_pages, current_page } = historyData;

  // Cấu hình cột cho AntD Table
  const columns = [
    {
      title: 'STT',
      key: 'stt',
      render: (_text: any, _record: any, index: number) => (current_page - 1) * pageSize + index + 1,
      width: 70,
      align: 'center', // Căn giữa STT
    },
    {
      title: 'Thời gian lưu',
      dataIndex: 'created_time',
      key: 'created_time',
      render: (timestamp: string) => formatDate(timestamp, 'DD/MM/YYYY HH:mm'),
      width: 180,
    },
    {
      title: 'Tỷ giá (VNĐ/Tệ)',
      key: 'exchange_rate',
      render: (record: any) => {
        const savedConfig = record.savedConfig || record;
        return <NumberFormat value={savedConfig.exchange_rate} />; // Hiển thị trực tiếp tỷ giá
      },
    },
    {
      title: 'Phí mua hàng (%)',
      key: 'purchase_fee',
      render: (record: any) => {
        const savedConfig = record.savedConfig || record;
        // Gộp phí mua hàng thành chuỗi ngắn gọn
        return (
          <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none' }}>
            {savedConfig.purchase_fee
              ?.map((fee: any) =>
                <li key={fee.value}>
                  <b><NumberFormat value={fee.value * 100} suffix='%' /></b> {" "}
                  [<NumberFormat value={fee.min} suffix='đ' /> - <NumberFormat value={fee.max} suffix='đ' />]
                </li>)}
          </ul>
        );
      },
      // Giảm width nếu quá dài, hoặc cho phép bảng tự điều chỉnh
      // width: 200,
    },
    {
      title: 'Phí V/C cân nặng (VNĐ/KG)',
      key: 'weight',
      render: (record: any) => {
        const savedConfig = record.savedConfig || record;
        // Gộp phí cân nặng thành chuỗi ngắn gọn
        return (
          <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none' }}>
            {savedConfig.weight
              ?.map((w: any) =>
                <li key={w.value}>
                  <b><NumberFormat value={w.value} suffix='đ' /></b> {" "}
                  [<NumberFormat value={w.min} suffix='kg' /> - <NumberFormat value={w.max} suffix='kg' />]
                </li>)}
          </ul>
        );
      },
      // width: 250,
    },
    // Có thể thêm cột "Action" tại đây nếu cần các nút Khôi phục/Xóa
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <Button type="link" icon={<EditOutlined />} />
    //       <Button type="link" icon={<DeleteOutlined />} danger />
    //     </Space>
    //   ),
    //   width: 100,
    // },
  ];

  return (
    <div className="history-tab">
      <Card className="ant-card-small">
        {history.length === 0 ? (
          <p className="no-history-message">Chưa có lịch sử chỉnh sửa nào.</p>
        ) : (
          <>
            {/* Sử dụng AntD Table */}
            <Table
              columns={columns as any}
              dataSource={history}
              rowKey={(record) => record._id || record.timestamp} // Sử dụng _id hoặc timestamp làm key
              pagination={false} // Tắt pagination mặc định của Table để tự xử lý bằng AntD Pagination
              bordered // Thêm border cho bảng
              scroll={{ x: 'max-content' }} // Cho phép cuộn ngang nếu nội dung quá dài
            />

            {/* Sử dụng AntD Pagination */}
            {total_pages > 1 && (
              <Pagination
                className="ant-pagination-custom" // Custom class để style
                current={current_page}
                pageSize={pageSize}
                total={total_items}
                onChange={onPageChange}
                showSizeChanger={true} // Cho phép thay đổi kích thước trang
                onShowSizeChange={(_current, size) => onPageSizeChange(size)}
                pageSizeOptions={['5', '10', '20', '50']} // Tùy chọn kích thước trang
                showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} mục`}
              />
            )}
          </>
        )}
      </Card>
    </div>
  );
}

export default HistoryTable;
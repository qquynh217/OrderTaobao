import { Alert, Spin, Tabs } from 'antd'; // Import AntD components
import showMessage from 'components/Message';
import HistoryTable from 'components/page/config/ConfigHistory';
import CurrentConfigForm from 'components/page/config/CurrentConfigForm';
import { IConfig } from 'constants/interface';
import { useEffect, useState } from 'react';
import { configService } from 'services/config';

const { TabPane } = Tabs; // Destructure TabPane từ Tabs

function ConfigPage() {
	const [config, setConfig] = useState<IConfig>({
		purchase_fee: [],
		exchange_rate: 0,
		weight: [],
	});

	const [historyData, setHistoryData] = useState({
		data: [],
		total_items: 0,
		total_pages: 1,
		current_page: 1,
	});
	const [activeTabKey, setActiveTabKey] = useState('current'); // key cho AntD Tabs
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [searchQuery, setSearchQuery] = useState('');

	const fetchLatestConfig = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await configService.getLatest();
			const latestConfig = res.data.data.result;
			// Đảm bảo cấu trúc dữ liệu luôn có đủ các trường, nếu API trả về thiếu
			setConfig({
				purchase_fee: latestConfig?.purchase_fee || [],
				exchange_rate: latestConfig?.exchange_rate || 0,
				weight: latestConfig?.weight || [],
			});
		} catch (err) {
			console.error('Lỗi khi tải cấu hình mới nhất:', err);
			setError('Không thể tải cấu hình mới nhất. Vui lòng thử lại.');
		} finally {
			setIsLoading(false);
		}
	};

	const fetchHistoryConfigs = async (page: number, size: number, search = '') => {
		setIsLoading(true);
		setError(null);
		try {
			const params = {
				page: page,
				size: size,
				sort_by: '_id',
				sort: 'desc',
				search: search,
			};
			const res = await configService.getHistoryConfigs(params);
			const response = res.data.data;
			setHistoryData({
				data: response.result || [],
				total_items: response.pagination?.total_records || 0,
				total_pages: response.pagination?.total_page || 1,
				current_page: page,
			});
		} catch (err) {
			console.error('Lỗi khi tải lịch sử cấu hình:', err);
			setError('Không thể tải lịch sử cấu hình. Vui lòng thử lại.');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (activeTabKey === 'current') {
			fetchLatestConfig();
		} else if (activeTabKey === 'history') {
			fetchHistoryConfigs(currentPage, pageSize, searchQuery);
		}
	}, [activeTabKey, currentPage, pageSize, searchQuery]);

	const handleSubmit = async (values: any) => { // handleSubmit nhận values từ AntD Form
		setIsLoading(true);
		setError(null);
		try {
			const savedConfig = await configService.createConfig(values); // Gửi values trực tiếp
			console.log('Cấu hình đã lưu thành công:', savedConfig);
			showMessage('success', 'Cấu hình đã lưu thành công!');
			setActiveTabKey('history'); // Chuyển sang tab lịch sử
			setCurrentPage(1);
			fetchHistoryConfigs(1, pageSize, searchQuery); // Tải lại lịch sử
		} catch (err) {
			console.error('Lỗi khi lưu cấu hình:', err);
			setError('Lưu cấu hình thất bại. Vui lòng kiểm tra lại.');
		} finally {
			setIsLoading(false);
		}
	};


	const handleTabChange = (key: string) => {
		setActiveTabKey(key);
	};

	return (
		<div className="config-page">
			<h2 className="title">Quản lý chi phí</h2>
			{/* Thay thế custom tabs bằng AntD Tabs */}
			<Tabs activeKey={activeTabKey} onChange={handleTabChange}>
				<TabPane tab="Cấu hình hiện tại" key="current">
					{isLoading && activeTabKey === 'current' ? (
						<div style={{ textAlign: 'center', padding: '20px' }}>
							<Spin tip="Đang tải cấu hình..." />
						</div>
					) : error && activeTabKey === 'current' ? (
						<Alert message="Lỗi" description={error} type="error" showIcon />
					) : (
						<CurrentConfigForm
							initialValues={config} // Truyền initialValues cho AntD Form
							handleSubmit={handleSubmit}
						/>
					)}
				</TabPane>
				<TabPane tab="Lịch sử chỉnh sửa" key="history">
					{isLoading && activeTabKey === 'history' ? (
						<div style={{ textAlign: 'center', padding: '20px' }}>
							<Spin tip="Đang tải lịch sử..." />
						</div>
					) : error && activeTabKey === 'history' ? (
						<Alert message="Lỗi" description={error} type="error" showIcon />
					) : (
						<HistoryTable
							historyData={historyData}
							onPageChange={setCurrentPage}
							pageSize={pageSize}
							onPageSizeChange={setPageSize}
							onSearchChange={setSearchQuery}
						/>
					)}
				</TabPane>
			</Tabs>
		</div>
	);
}

export default ConfigPage;
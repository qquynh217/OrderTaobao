import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Row,
  Space,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { FilterValue } from "antd/es/table/interface";
import showMessage from "components/Message";
import NumberFormat from "components/NumberFormat";
import UserModal from "components/page/user/UserModal";
import { PAGE_SIZE_OPTIONS, SORT_DIRECTIONS } from "constants";
import { IUser } from "constants/interface";
import dayjs from "dayjs";
import { get } from "lodash";
import { FC, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import { userService } from "services/user";
import { formatDate, handleSortOrder } from "utils";

const { RangePicker } = DatePicker;

const UserAdmin: FC = () => {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    size: 10,
    sort_by: "_id",
    sort: SORT_DIRECTIONS.DESC,
  });
  const [isOpenModal, setIsOpenModal] = useState<string>("");
  const [users, setUsers] = useState<{ list: Array<IUser>; total: 0 }>({
    list: [],
    total: 0,
  });
  const handleSubmit = async (value: {
    key: any;
    isCheck: any;
    duration: (string | number | dayjs.Dayjs | Date | null | undefined)[];
  }) => {
    try {
      let params = {
        search: value.key,
        time_from:
          value.duration && value.duration[0]
            ? dayjs(value.duration[0]).startOf("day").valueOf()
            : "",
        time_to:
          value.duration && value.duration[1]
            ? dayjs(value.duration[1]).endOf("day").valueOf()
            : "",
      };
      setQueryParams({
        ...queryParams,
        ...params,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchOrders = async (params: any) => {
    try {
      const res = await userService.getList(params);
      const result = res.data.data.result;
      const list: Array<IUser> = result.map((item: any) => ({
        ...item,
        status: item.status || 1,
        image_order: item.image_order,
      }));

      setUsers({
        total: res.data.data.pagination.total_records || list.length,
        list: list,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeTable = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: any
  ) => {
    const { current, pageSize } = pagination;
    const key = get(sorter, ["column", "key"]);
    const { order } = sorter;

    setQueryParams({
      ...queryParams,
      page: current || 1,
      size: pageSize || PAGE_SIZE_OPTIONS[0],
      sort_by: key || "_id",
      sort: handleSortOrder(order),
    });
  };
  const handleUpdate = async (value: IUser) => {
    try {
      const res = await userService.update({ userId: value.id + "", ...value });
      if (res.status == 200) {
        showMessage("success", "Sửa thông tin thành công!");
        fetchOrders(queryParams);
      }
    } catch (error) {
      console.log(error);
      showMessage("error", "Sửa thông tin không thành công!");
    }
  };
  const handleDeleteUser = async (userId: string) => {
    try {
      const res = await userService.delete(userId);
      if (res.status == 200) {
        showMessage("success", "Xóa tài khoản thành công.");
      }
    } catch (error) {
      showMessage("error", "Xóa tài khoản không thành công.");
    }
  };
  const columns: TableProps<IUser>["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (_val: any, _rec: any, index: number) => index + 1,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "Email - SĐT",
      dataIndex: "email",
      key: "email",
      width: "15%",
      render: (val, rec) => (
        <>
          <b>{val}</b>
          <p>{rec.phone_number}</p>
        </>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address_detail",
      key: "address_detail",
    },
    {
      title: "Kho",
      dataIndex: "storage",
      key: "storage",
      width: 100,
    },
    {
      title: "Số dư",
      dataIndex: "balance",
      key: "balance",
      align: "center",
      width: 150,
      render: (val) => (
        <b>
          <NumberFormat value={val} suffix="đ" />
        </b>
      ),
    },
    {
      title: "Chức năng",
      dataIndex: "role",
      key: "role",
      width: 100,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_time",
      key: "created_time",
      render: (val) => formatDate(val),
      width: 110,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (val) => (
        <Space>
          <Button
            onClick={() => {
              setIsOpenModal(val);
            }}
          >
            <RiEdit2Fill />
          </Button>
          <Popconfirm
            title="Xóa user"
            description="Bạn có chắc chắn xóa user này không?"
            onConfirm={() => {
              handleDeleteUser(val);
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
  ];

  useEffect(() => {
    fetchOrders({
      ...queryParams,
    });
  }, [queryParams]);
  return (
    <div className="user-admin list-order">
      <h2 className="title">Quản lý khách hàng</h2>
      <div className="search-field">
        <Form className="search-order_form" onFinish={handleSubmit}>
          <Row gutter={20}>
            <Col span={6}>
              <Form.Item name="key">
                <Input placeholder="Tên hoặc email" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="duration">
                <RangePicker placeholder={["Từ ngày", "Đến ngày"]} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Space style={{ gap: 20 }}>
                <Button type="primary" htmlType="submit">
                  Tìm kiếm
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </div>
      <Table
        dataSource={users.list}
        columns={columns}
        onChange={onChangeTable}
        pagination={{ pageSizeOptions: PAGE_SIZE_OPTIONS }}
      />
      <UserModal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};
export default UserAdmin;

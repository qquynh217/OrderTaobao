import { Button, Form, Input, Select } from "antd";
import showMessage from "components/Message";
import { useEffect, useState } from "react";
import { provinceService } from "services/province";
import { userService } from "services/user";
import { userStore } from "store/userStore";

const Profile = () => {
  const {
    id: userId,
    email,
    avatar,
    name,
    phone_number,
    province,
    district,
    address_detail,
    storage,
    setUser,
  } = userStore();

  const [address, setAddress] = useState<{
    province: string;
    district: string;
  }>({
    province: "",
    district: "",
  });

  const getAddress = async () => {
    try {
      const location = await provinceService.getLocationText({
        province: province,
        district: district,
        field: "name",
      });
      const provinceText = location.split(",")[0];
      const districtText = location.split(",")[1];
      setAddress({ province: provinceText, district: districtText });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  const handleUpdateProfile = async (values: any) => {
    try {
      const res: any = await userService.update({ id: userId, ...values });
      if (res.status == 200) {
        const data = res.data.data.result
        setUser({
          ...data,
        });
        showMessage("success", "Cập nhật thông tin thành công.");
      }

    } catch (error) {
      console.log(error);
      showMessage("error", "Cập nhật thông tin thất bại.");
    }
  };

  return (
    <div className="profile-page">
      <h1 className="title">Thông tin cá nhân</h1>
      <Form
        initialValues={{
          email,
          avatar,
          name,
          phone_number,
          province,
          district,
          address_detail,
          storage,
        }}
        onFinish={handleUpdateProfile}
      >
        <Form.Item label="Email" name="email" required>
          <Input readOnly bordered={false} />
        </Form.Item>
        <Form.Item
          label="Họ tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone_number"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Tỉnh / Thành phố" name="province" required>
          <Select
            options={[
              {
                label: address.province,
                value: province,
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Quận / huyện" name="district" required>
          <Select
            options={[
              {
                label: address.district,
                value: district,
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Địa chỉ chi tiết" name="address_detail" required>
          <Input readOnly bordered={false} />
        </Form.Item>
        <Form.Item label="Kho lưu trữ" name="storage" required>
          <Select
            options={[
              {
                label: "Hà Nội",
                value: "Hà Nội",
              },
              {
                label: "Hồ Chí Minh",
                value: "Hồ Chí Minh",
              },
            ]}
          />
        </Form.Item>
        <div className="button-container">
          <Button type="primary" htmlType="submit" size="small">
            Cập nhật
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Profile;

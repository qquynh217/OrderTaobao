import { message } from 'antd';
import showMessage from 'components/Message';
import { IProductCart } from 'constants/interface';
import axiosInstance from 'services';


class CartService {
  getCartItems() {
    return axiosInstance.get('/cart')
  }

  async updateProductQuantity(cartId: string, newProducts: Array<IProductCart>) {
    try {
      // Trong thực tế: const response = await axios.put(`/api/cart/${productId}/quantity`, { quantity: newQuantity });
      const response: any = await axiosInstance.put(`/cart/${cartId}`, {
        products: newProducts,
      }
      );
      message.success('Cập nhật số lượng thành công!');
      const result = response.data?.data?.result?.products || []
      const data = result.map((item: any, index: number) => ({
        ...item,
        id: index,
      }))
      return data; // Trả về toàn bộ giỏ hàng đã cập nhật
    } catch (error) {
      console.error("Error updating product quantity:", error);
      message.error("Cập nhật số lượng thất bại.");
      throw error;
    }
  }

  async removeProduct(cartId: string, newProducts: Array<IProductCart>) {
    try {
      // Trong thực tế: const response = await axios.delete(`/api/cart/${productId}`);
      const response: any = await axiosInstance.put(`/cart/${cartId}`, {
        products: newProducts,
      }
      );
      message.success('Đã xóa sản phẩm khỏi giỏ hàng.');
      const result = response.data?.data?.result?.products || []
      const data = result.map((item: any, index: number) => ({
        ...item,
        id: index,
      }))
      return data; // Trả về toàn bộ giỏ hàng đã cập nhật
    } catch (error) {
      console.error("Error removing product:", error);
      message.error("Xóa sản phẩm thất bại.");
      throw error;
    }
  }

  async createOrder(deliveryMethod: any) {
    try {

      const res: any = await axiosInstance.post(`/cart/create-order?type_delivery=${deliveryMethod}`);

      showMessage('success', 'Đơn hàng đã được tạo thành công!');
      return res.data.data.result;
    } catch (error) {
      console.error("Error creating order:", error);
      showMessage('error', "Tạo đơn hàng thất bại.");
      throw error;
    }
  }
}

const cartService = new CartService()

export default cartService
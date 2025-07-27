import { Button, Empty, Radio, Space, Spin } from 'antd';
import CartItem from 'components/CartItem';
import NumberFormat from 'components/NumberFormat';
import { SHIPPING_TYPE } from 'constants';
import { IProductCart } from 'constants/interface';
import { useCallback, useEffect, useState } from 'react';
import { TbRefresh } from 'react-icons/tb';
import emptyCart from 'resources/images/empty-cart.png';
import cartService from 'services/cart';

function Cart() {
  const [cartItems, setCartItems] = useState<Array<IProductCart>>([]);
  const [cartId, setCartId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [deliveryMethod, setDeliveryMethod] = useState(SHIPPING_TYPE[0].value);

  // Fetch sản phẩm từ DB (sử dụng cartService)
  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res: any = await cartService.getCartItems();
      const products = res.data.data.result?.products || []
      if (!cartId) {
        const cartId = res.data.data.result?.id || ""
        setCartId(cartId);
      }


      // Đảm bảo isSelected được khởi tạo
      setCartItems(products.map((p: any, index: number) => ({ ...p, isSelected: p.isSelected || false, id: index })));
    } catch (error) {
      console.log(error);

      // message.error đã được xử lý trong cartService
    } finally {
      setLoading(false);
    }
  }, [cartId]);

  useEffect(() => {
    getProducts();
  }, []);

  // Cập nhật trạng thái chọn của sản phẩm
  const handleSelectItem = (id: string, checked: boolean) => {
    setCartItems((prevItems) =>
      prevItems.map((item: any) =>
        item.id === id ? { ...item, isSelected: checked } : item
      )
    );
  };

  // Cập nhật số lượng sản phẩm (gọi API)
  const handleQuantityChange = async (id: string, newQuantity: number) => {
    setLoading(true); // Có thể đặt loading cho từng item nếu muốn tinh tế hơn
    try {
      const newCartItems = cartItems.map((item: any) => {
        if (item.id === id) {
          return { ...item, number: newQuantity }
        }
        return item
      })

      // Gọi service để cập nhật số lượng
      const data = await cartService.updateProductQuantity(cartId, newCartItems);
      setCartItems(data);
    } catch (error) {
      // message.error đã được xử lý trong cartService
    } finally {
      setLoading(false);
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng (gọi API)
  const handleRemoveItem = async (id: string) => {
    setLoading(true);
    try {
      const newCartItems = cartItems.filter((item: any) => item.id !== id)
      // Gọi service để xóa sản phẩm
      const updatedCart = await cartService.removeProduct(cartId, newCartItems);
      setCartItems(updatedCart);
    } catch (error) {
      // message.error đã được xử lý trong cartService
    } finally {
      setLoading(false);
    }
  };

  // Chọn/bỏ chọn tất cả sản phẩm
  // const handleSelectAllItems = (e: any) => {
  //   const checked = e.target.checked;
  //   setCartItems((prevItems) =>
  //     prevItems.map((item) => ({ ...item, isSelected: checked }))
  //   );
  // };

  // Lấy các sản phẩm đã chọn
  // const getSelectedCartItems = () => {
  //   return cartItems.filter(item => item.isSelected);
  // };

  // Tạo đơn hàng (gọi API)
  const createOrder = async () => {
    // const selected = getSelectedCartItems();
    // if (selected.length === 0) {
    //   message.warning('Vui lòng chọn ít nhất một sản phẩm để tạo đơn hàng.');
    //   return;
    // }

    setLoading(true);
    try {
      await cartService.createOrder(deliveryMethod);
      await getProducts();

    } catch (error) {
      // message.error đã được xử lý trong cartService
    } finally {
      setLoading(false);
    }
  };

  // const isAllSelected = cartItems.length > 0 && cartItems.every(item => item.isSelected);
  // const totalSelectedItems = getSelectedCartItems().length;
  // Tính tổng tiền của các sản phẩm đã chọn (đơn vị tiền tệ là VNĐ)
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.number), 0);

  return (
    <div className="cart-container">
      <h1>Giỏ hàng của bạn</h1>

      <div className="cart-refresh-button">
        <Button type="primary" onClick={getProducts} size='small' className='refresh-button'>
          <span>Làm mới</span>
          <TbRefresh />
        </Button>
      </div>
      {loading && cartItems.length === 0 ? ( // Chỉ hiển thị spinner khi tải lần đầu và giỏ hàng trống
        <div className="loading-spinner-container">
          <Spin size="large" tip="Đang tải sản phẩm..." />
        </div>
      ) : (
        <>
          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
              <Empty description="Giỏ hàng trống." image={emptyCart} />
            </div>
          ) : (
            <div className="cart-items-list">
              {/* <div className="select-all-header">
                <Checkbox
                  checked={isAllSelected}
                  onChange={handleSelectAllItems}
                  disabled={cartItems.length === 0}
                >
                  Chọn tất cả ({cartItems.length} sản phẩm)
                </Checkbox>
              </div> */}
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onSelect={handleSelectItem}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
          )}

          <div className="cart-summary-footer">
            <div className="delivery-options">
              <h3>Phương thức vận chuyển</h3>
              <Radio.Group onChange={(e) => setDeliveryMethod(e.target.value)} value={deliveryMethod}>
                <Space direction="vertical">
                  {SHIPPING_TYPE.map((item) => (
                    <Radio value={item.value} key={item.value}>{item.text}</Radio>
                  ))}
                </Space>
              </Radio.Group>
            </div>

            <div className="order-summary">
              <div className="summary-text">
                Đã chọn {cartItems.length} sản phẩm:
              </div>
              <div className="total-amount">
                Tổng tiền: <span className="amount-value"><NumberFormat value={totalAmount} suffix='¥' /></span>
              </div>
              <Button
                type="primary"
                size="large"
                onClick={createOrder}
                disabled={cartItems.length === 0 || loading}
                className="create-order-button"
                loading={loading && cartItems.length > 0} // Chỉ hiển thị loading trên nút nếu đang xử lý order
              >
                Tạo đơn hàng
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
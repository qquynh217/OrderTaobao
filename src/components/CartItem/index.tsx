import { Button, InputNumber, Tooltip } from 'antd';
import NumberFormat from 'components/NumberFormat';
import { IProductCart } from 'constants/interface';
import { configStore } from 'store/configStore';

interface CartItemProps {
  item: IProductCart;
  onSelect: (id: string, checked: boolean) => void;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const { exchange_rate } = configStore();
  const handleQuantityChange = async (value: number | null) => {
    // Đảm bảo số lượng không âm và không phải NaN
    const newQuantity = value === null ? 1 : Math.max(1, value);
    if (newQuantity !== item.number) { // Chỉ gọi API nếu số lượng thay đổi
      onQuantityChange(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    // onRemove đã gọi service và xử lý thông báo
    onRemove(item.id);
  };


  return (
    <div className="cart-item-card">
      <div className="product-details-row">
        {/* <Checkbox
          className="product-checkbox"
          checked={item.isSelected}
          onChange={(e) => onSelect(item.id, e.target.checked)}
        /> */}
        <img
          src={item.link_product_image}
          alt="product"
          className="product-image"
        />
        <div className="product-info">
          <a className="product-name" href={item.link_product} target="_blank" rel="noopener noreferrer">{item.name}</a>
          {(item.color || item.size) && (
            <div className="product-category">
              {item.color && <span>Màu sắc: <b>{item.color}</b></span>}
              {item.size && <>{" | "}<span>Kích thước: <b>{item.size}</b></span></>}
            </div>
          )}
          {item.note && (
            <Tooltip title={item.note}>
              <span className="product-note-tag">
                Ghi chú
                <span className="info-icon">i</span>
              </span>
            </Tooltip>
          )}
        </div>

        <div className="product-price-section">
          <span className="current-price"><NumberFormat value={item.price} suffix='¥' /> </span>
          <span className="current-price-vn"><NumberFormat value={item.price * exchange_rate} suffix='đ' /> </span>
        </div>

        <div className="product-quantity-control">
          <Button
            className="quantity-button"
            onClick={() => handleQuantityChange(item.number - 1)}
            disabled={item.number <= 1}
          >
            -
          </Button>
          <InputNumber
            min={1}
            value={item.number}
            onChange={handleQuantityChange}
            className="quantity-input"
            bordered={false}
          />
          <Button
            className="quantity-button"
            onClick={() => handleQuantityChange(item.number + 1)}
          >
            +
          </Button>
        </div>
        <div className="product-total-price-section">
          <div className="product-total-price">
            <NumberFormat value={item.price * item.number} suffix='¥' />
          </div>
          <div className="product-total-price-vn">
            <NumberFormat value={item.price * item.number * exchange_rate} suffix='đ' />
          </div>
        </div>

        <div className="product-actions">
          <Button type="link" danger onClick={handleRemove}>
            Xóa
          </Button>

        </div>
      </div>
    </div>
  );
}

export default CartItem;
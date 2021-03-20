import React from "react";
import { addToCart } from "../../actions/CartActions";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, message } from "antd";
import "antd/dist/antd.css";

function format_currency(price) {
  return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
export default function ProductSearch(props) {
  const { product } = props;
  const { Meta } = Card;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const addToCartHandler = (id, qty) => {
    if (!cartItems.find((x) => x.product === id)) {
      dispatch(addToCart(id, qty));
      message.success("Thêm vào giỏ thành công!");
    } else {
      message.error("Sản phẩm đã có trong giỏ!");
    }
  };
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={product.name} src={product.image[0]} />}
    >
      <Meta
        title={product.name}
        description={format_currency(product.price) + " VNĐ"}
      />
      <br />
      {product.countInStock > 0 ? (
        <Button
          style={{ background: "#956bc7", color: "white" }}
          onClick={() => addToCartHandler(product._id, 1)}
        >
          Thêm vào giỏ
        </Button>
      ) : (
        <Button
          style={{ background: "#956bc7", color: "white", opacity: 0.5 }}
          disabled
        >
          Hết hàng
        </Button>
      )}
    </Card>
  );
}

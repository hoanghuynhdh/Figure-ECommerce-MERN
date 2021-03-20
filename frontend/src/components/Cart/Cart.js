import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
} from "@material-ui/core";
import MessageBox from "../Box/MessageBox";
import { Cancel } from "@material-ui/icons";
import { Row, Col } from "antd";
import { InputNumber, Button } from "antd";
import { addToCart, removeFromCart } from "../../actions/CartActions";

function format_currency(price) {
  return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
function Cart(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    props.history.push("/login?redirect=checkout");
  };

  return (
    <div className="container">
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {cartItems.length === 0 ? (
        <MessageBox>
          Không có sản phẩm trong giỏ hàng.{" "}
          <NavLink to="/">Tiếp tục shopping.</NavLink>
        </MessageBox>
      ) : (
        <div className="cart">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Table className="table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Sản Phẩm</TableCell>
                    <TableCell>Giá</TableCell>
                    <TableCell>Số Lượng</TableCell>
                    <TableCell>Tổng cộng</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="table">
                  {cartItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ textAlign: "center" }}>
                        <NavLink to={`/detail/${item.product}`}>
                          <img
                            src={item.image[0]}
                            alt={item.name}
                            style={{ width: "50%", height: "auto" }}
                            className="img-fluid z-depth-0"
                          />
                        </NavLink>
                      </TableCell>
                      <TableCell>
                        <h5>
                          <NavLink to={`/detail/${item.product}`}>
                            <strong>{item.name}</strong>
                          </NavLink>
                        </h5>
                      </TableCell>
                      <TableCell>
                        <span>{format_currency(item.price)} VNĐ</span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <InputNumber
                            min={1}
                            max={item.countInStock}
                            aria-label="number"
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(addToCart(item.product, Number(e)))
                            }
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <span style={{ color: "red" }}>
                          {format_currency(item.price * item.qty)} VNĐ
                        </span>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => removeFromCartHandler(item.product)}
                          aria-label="delete"
                        >
                          <Cancel />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Col>
            <Col span={12}>
              <Table className="table">
                <TableHead>
                  <TableRow>
                    <TableCell className="text-left">
                      <h6>
                        <strong>CỘNG GIỎ HÀNG</strong>
                      </h6>
                    </TableCell>
                    <TableCell className="text-left"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <h6>
                        <strong>Tạm tính</strong>
                      </h6>
                    </TableCell>
                    <TableCell className="text-right" style={{ color: "red" }}>
                      {format_currency(
                        cartItems.reduce((a, c) => a + c.price * c.qty, 0)
                      )}{" "}
                      VNĐ
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <h6>
                        <strong>Tổng</strong>
                      </h6>
                    </TableCell>
                    <TableCell className="text-right" style={{ color: "red" }}>
                      {format_currency(
                        cartItems.reduce((a, c) => a + c.price * c.qty, 0)
                      )}{" "}
                      VNĐ
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-4">
                <Button
                  size="large"
                  onClick={checkoutHandler}
                  block
                  style={{ background: "#956bc7", color: "white" }}
                >
                  TIẾN HÀNH THANH TOÁN
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default Cart;

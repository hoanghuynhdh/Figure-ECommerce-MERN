import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../actions/CartActions";
import { Row, Col } from "antd";
import { createOrder } from "../../actions/orderActions";
import { Button, Input } from "antd";
import { ORDER_CREATE_RESET } from "../../constants/orderConstants";
import "./styles.css";

function format_currency(price) {
  return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
function Checkout(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [lastName, setLastName] = useState(shippingAddress.lastName);
  const [firstName, setFirstName] = useState(shippingAddress.firstName);
  const [phone, setPhone] = useState(shippingAddress.phone);
  const [address, setAddress] = useState(shippingAddress.address);
  const [state, setState] = useState(shippingAddress.state);
  const [message, setMessage] = useState(shippingAddress.message);
  const [paymentMethod, setPaymentMethod] = useState("Payment");
  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, order } = orderCreate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        lastName,
        firstName,
        // email,
        phone,
        address,
        state,
        message,
      })
    );
    dispatch(savePaymentMethod(paymentMethod));
  };
  cart.itemsPrice = cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  cart.totalPrice = cart.itemsPrice;
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  return (
    <div className="container mt-5">
      <div className="checkout">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={16}>
            <h3>Thông tin thanh toán</h3>
            <form onSubmit={submitHandler}>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    allowClear
                    size="large"
                    id="lastName"
                    aria-label="lastName"
                    value={lastName}
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
                <Col span={12}>
                  <Input
                    type="text"
                    placeholder="First Name"
                    allowClear
                    size="large"
                    id="firstName"
                    aria-label="firstName"
                    value={firstName}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
              </Row>

              <div className="form-group mb-3 mt-3">
                <Input
                  type="email"
                  placeholder="Email"
                  size="large"
                  id="email"
                  aria-label="email"
                  value={userInfo.email}
                  required
                  readOnly
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <Input
                  type="text"
                  placeholder="Phone"
                  allowClear
                  size="large"
                  id="phone"
                  aria-label="phone"
                  value={phone}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <Input
                  type="text"
                  placeholder="Address"
                  allowClear
                  size="large"
                  id="address"
                  aria-label="address"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="form-group mb-5">
                <Input
                  type="text"
                  placeholder="City"
                  allowClear
                  size="large"
                  id="state"
                  aria-label="city"
                  value={state}
                  required
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="FormControlTextarea" className="form-label">
                  Thông tin bổ sung
                </label>
                <Input.TextArea
                  rows={4}
                  placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                  allowClear
                  size="large"
                  id="FormControlTextarea"
                  aria-label="message"
                  value={message}
                  required
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </form>
          </Col>
          <Col span={8} className="checkout-cart">
            <div className="single-widget">
              <h3>Đơn hàng của bạn</h3>
              <div className="content">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="text-left">
                        <h6>
                          <strong>Sản phẩm</strong>
                        </h6>
                      </TableCell>
                      <TableCell className="text-right">
                        <h6>
                          <strong>Tổng</strong>
                        </h6>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  {cart.cartItems.map((item) => (
                    <TableBody key={item._id}>
                      <TableRow>
                        <TableCell>
                          {item.name}{" "}
                          <span className="quantity">x {item.qty}</span>
                        </TableCell>
                        <TableCell
                          className="text-right"
                          style={{ color: "red" }}
                        >
                          {format_currency(item.price * item.qty)} VNĐ
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))}
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <h6>
                          <strong>Tạm tính</strong>
                        </h6>
                      </TableCell>
                      <TableCell
                        className="text-right"
                        style={{ color: "red" }}
                      >
                        <strong>{format_currency(cart.itemsPrice)}VNĐ</strong>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <h6>
                          <strong>Tổng</strong>
                        </h6>
                      </TableCell>
                      <TableCell
                        className="text-right"
                        style={{ color: "red" }}
                      >
                        <strong>{format_currency(cart.totalPrice)}VNĐ</strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="pay mt-5">
              <form className="container" onSubmit={submitHandler}>
                <ul>
                  <li className="mt-5">
                    <input
                      className="form-check-input payment"
                      type="radio"
                      id="payment"
                      value="Payment"
                      name="paymentMethod"
                      required
                      checked
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="payment">
                      Chuyển khoản ngân hàng
                    </label>
                    <div className="form-check payment">
                      <p>
                        Quý khách vui lòng chuyển tiền vào tài khoản dưới đây:
                      </p>
                      <h5>VIETCOMBANK</h5>
                      <p>Chủ tài khoản: ...</p>
                      <p>Số tài khoản: ...</p>
                      <p>Chi nhánh ...</p>
                      <p>SĐT: ... (vui lòng gọi xác nhận sau khi chuyển.)</p>
                    </div>
                  </li>
                  <li className="mt-5">
                    <input
                      className="form-check-input momo"
                      type="radio"
                      id="momo"
                      value="Momo"
                      name="paymentMethod"
                      required
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="momo">
                      Chuyển khoản qua MOMO
                    </label>
                    <div className="form-check momo">
                      <p>Quý khách vui lòng chuyển tiền vào tài khoản:</p>
                      <p>090...</p>
                    </div>
                  </li>
                  <li className="mt-5">
                    <input
                      className="form-check-input cod"
                      type="radio"
                      id="cod"
                      value="Cod"
                      name="paymentMethod"
                      required
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="cod">
                      Trả tiền mặt khi nhận hàng
                    </label>
                    <div className="form-check cod">
                      <p>
                        Đối với COD, chi phí vận chuyển được tính dựa theo vị
                        trí tỉnh/thành mà quý khách muốn giao đến.
                      </p>
                      <p>
                        Shop sẽ gọi điện xác nhận đơn và thông báo phí vận
                        chuyển chính xác đến quý khách hàng.
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="single-widget get-button">
                  <div className="content">
                    <Button
                      size="large"
                      htmlType="submit"
                      onClick={placeOrderHandler}
                      style={{ background: "#956bc7", color: "white" }}
                      disabled={cart.cartItems.length === 0}
                    >
                      THANH TOÁN
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Checkout;

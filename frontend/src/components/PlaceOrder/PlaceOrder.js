import React, { useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { detailsOrder } from "../../actions/orderActions";
import "./styles.css";
import LoadingBox from "../Box/LoadingBox";
import MessageBox from "../Box/MessageBox";

function format_currency(price) {
  return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
export default function PlaceOrder(props) {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);
  var today = new Date(),
    date =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();

  return (
    <div className="container">
      <div className="placeOrder mt-5 row">
        <div className="placeOrder__left col-6">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="text-left">
                      <h6>
                        <strong>SẢN PHẨM</strong>
                      </h6>
                    </TableCell>
                    <TableCell className="text-right">
                      <h6>
                        <strong>TỔNG</strong>
                      </h6>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.orderItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        {item.name}
                        <span className="quantity">x {item.qty}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        {format_currency(item.price * item.qty)} VNĐ
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <h6>
                        <strong>Tạm tính:</strong>
                      </h6>
                    </TableCell>
                    <TableCell className="text-right">
                      <strong>{format_currency(order.itemsPrice)} VNĐ</strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <h6>
                        <strong>Phương thức thanh toán:</strong>
                      </h6>
                    </TableCell>
                    <TableCell className="text-right">
                      {order.paymentMethod}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <h6>
                        <strong>Tổng cộng:</strong>
                      </h6>
                    </TableCell>
                    <TableCell className="text-right">
                      <strong>{format_currency(order.totalPrice)} VNĐ</strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <h6>
                        <strong>Lưu ý:</strong>
                      </h6>
                    </TableCell>
                    <TableCell className="text-right">
                      <strong>{order.shippingAddress.message}</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          )}
        </div>
        <div className="placeOrder__right col-6">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <h5>Cảm ơn bạn. Đơn hàng của bạn đã được nhận.</h5>
              <ul>
                <li>Mã đơn hàng: {order._id}</li>
                <li>
                  Họ và Tên: {order.shippingAddress.firstName}{" "}
                  {order.shippingAddress.lastName}
                </li>
                <li>Đia chỉ: {order.shippingAddress.address}</li>
                <li>
                  Phương thức thanh toán: <strong>{order.paymentMethod}</strong>
                </li>
                <li>Ngày: {date}</li>
                <li>
                  Tổng cộng:
                  <strong> {format_currency(order.totalPrice)} VNĐ</strong>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

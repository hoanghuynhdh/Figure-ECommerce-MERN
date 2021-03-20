import React, { useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../../actions/orderActions";
import LoadingBox from "../Box/LoadingBox";
import MessageBox from "../Box/MessageBox";

function format_currency(price) {
  return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
export default function OrderHistory(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <div className="container">
      <div className="mt-5">
        <h2>Lịch sử mua hàng</h2>
      </div>
      <div className="cart">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <Table className="table">
              <TableHead>
                <TableRow>
                  <TableCell>Mã đơn hàng</TableCell>
                  <TableCell>NGÀY</TableCell>
                  <TableCell>TỔNG CỘNG</TableCell>
                  <TableCell>THANH TOÁN</TableCell>
                  <TableCell>GIAO HÀNG</TableCell>
                  <TableCell>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="table">
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                    <TableCell>{format_currency(order.totalPrice)}</TableCell>
                    <TableCell>
                      {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                    </TableCell>
                    <TableCell>
                      {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : "No"}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          props.history.push(`/order/${order._id}`);
                        }}
                      >
                        CHI TIẾT
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </div>
  );
}

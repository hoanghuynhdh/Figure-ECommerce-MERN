import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { USER_DETAILS_RESET } from "../../constants/userConstants";
import { deleteUser, listUsers } from "../../actions/userActions";
import LoadingBox from "../Box/LoadingBox";
import MessageBox from "../Box/MessageBox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

export default function UserList(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch]);
  const deleteHandler = (user) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(user._id));
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">Users</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">Xóa tài khoản thành công</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>IS ADMIN</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isAdmin ? "YES" : "NO"}</TableCell>
                <TableCell>
                  <Button
                    type="primary"
                    onClick={() => props.history.push(`/user/${user._id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => deleteHandler(user)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import { NavLink } from "react-router-dom";
import { Button, Input } from "antd";
import MessageBox from "../Box/MessageBox";
import "./styles.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error } = userLogin;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className="login container">
      <h3>Đăng nhập</h3>
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="InputEmail" className="form-label">
            Địa chỉ Email
          </label>
          <Input
            type="email"
            placeholder="Enter your email"
            allowClear
            size="large"
            id="InputEmail"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputPassword" className="form-label">
            Mật khẩu
          </label>
          <Input.Password
            id="InputPassword"
            placeholder="Password"
            size="large"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          htmlType="submit"
          style={{
            background: "#956bc7",
            color: "white",
          }}
        >
          Đăng nhập
        </Button>
      </form>
      <div className="mt-3">
        Nếu chưa có tài khoản vui lòng đăng ký{" "}
        <span>
          <NavLink to={`/signup?redirect=${redirect}`}>tại đây.</NavLink>
        </span>
      </div>
    </div>
  );
}

export default Login;

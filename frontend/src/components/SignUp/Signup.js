import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions/userActions";
import { NavLink } from "react-router-dom";
import { Button, Input } from "antd";
import MessageBox from "../Box/MessageBox";
import "./styles.css";

function Signup(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const userSignup = useSelector((state) => state.userSignup);
  const { userInfo, error } = userSignup;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else {
      dispatch(signup(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className="signup container">
      <h3>Đăng ký</h3>
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">
            Họ và Tên
          </label>
          <Input
            type="text"
            placeholder="Enter your name"
            allowClear
            size="large"
            id="Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="InputConfirmPassword" className="form-label">
            Xác nhận mật khẩu
          </label>
          <Input.Password
            id="InputConfirmPassword"
            placeholder="Confirm Password"
            size="large"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Button
          htmlType="submit"
          style={{
            background: "#956bc7",
            color: "white",
          }}
        >
          Đăng Ký
        </Button>
      </form>
      <div className="mt-3">
        Nếu bạn đã có tài khoản, đăng nhập{" "}
        <span>
          <NavLink to={`/login?redirect=${redirect}`}>tại đây.</NavLink>
        </span>
      </div>
    </div>
  );
}

export default Signup;

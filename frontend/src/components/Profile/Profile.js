import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "antd";
import LoadingBox from "../Box/LoadingBox";
import MessageBox from "../Box/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { detailsUser, updateUserProfile } from "../../actions/userActions";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert("Password and Confirm Password Are Not Matched");
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
        })
      );
    }
  };

  return (
    <div className="profile container mt-3">
      <h3>Thông tin người dùng</h3>
      <form onSubmit={submitHandler}>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">Cập nhật thành công</MessageBox>
            )}
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <Input
                type="text"
                placeholder="Enter your Name"
                size="large"
                id="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputEmail" className="form-label">
                Email address
              </label>
              <Input
                type="email"
                placeholder="Enter your Email"
                size="large"
                id="InputEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputPassword" className="form-label">
                Password
              </label>
              <Input
                type="password"
                placeholder="Password"
                size="large"
                id="InputPassword"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputConfirmPassword" className="form-label">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Confirm Password"
                size="large"
                id="InputConfirmPassword"
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
              Cập nhật
            </Button>
          </>
        )}
      </form>
    </div>
  );
}

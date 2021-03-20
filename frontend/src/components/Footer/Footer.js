import React from "react";
import { Row, Col } from "antd";
import { NavLink } from "react-router-dom";
import { LocationOn, Phone, MailOutline } from "@material-ui/icons/";
import "./styles.css";

export function Footer() {
  return (
    <footer className="footer">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={6} className="footer__left">
          <img src="/template/images/logo.png" alt="logo"></img>
          <h3>Kết nối với mình</h3>
          <NavLink to="/">
            <img
              src="/template/images/fb.png"
              alt="facebook"
              style={{ width: "24px" }}
            />{" "}
          </NavLink>
          <NavLink to="/">
            <img
              src="/template/images/g+.png"
              alt="google plus"
              style={{ width: "24px" }}
            />{" "}
          </NavLink>
          <NavLink to="/">
            <img
              src="/template/images/instagram.png"
              alt="instagram"
              style={{ width: "24px" }}
            />{" "}
          </NavLink>
          <NavLink to="/">
            <img
              src="/template/images/twitter.png"
              alt="twitter"
              style={{ width: "24px" }}
            />{" "}
          </NavLink>
          <NavLink to="/">
            <img
              src="/template/images/github.png"
              alt="github"
              style={{ width: "24px" }}
            />
          </NavLink>
        </Col>
        <Col span={6} className="footer__center1">
          <h3>Liên Hệ</h3>
          <ul>
            <li>
              <LocationOn />
              Địa chỉ: 381/10/22 Tân Hòa Đông, P.Bình Trị Đông, Q.Bình Tân
              TP.HCM
            </li>
            <li>
              <Phone />
              0898124973
            </li>
            <li>
              <MailOutline />
              hoanghuynhdh99@gmail.com
            </li>
          </ul>
        </Col>
        <Col span={6} className="footer__center2">
          <h3>Hổ trợ</h3>
          <ul>
            <li>Tìm kiếm</li>
            <li>Đóng góp</li>
          </ul>
        </Col>
        <Col span={6} className="footer__right">
          <h3>Chấp nhận thanh toán:</h3>
          <img src="/template/images/payment.png" alt="payment"></img>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;

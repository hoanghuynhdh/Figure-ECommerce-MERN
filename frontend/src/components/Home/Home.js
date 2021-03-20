import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  LocalShipping,
  Autorenew,
  Lock,
  AttachMoney,
} from "@material-ui/icons";
import { listProducts } from "../../actions/ProductActions";
import { Tabs, Col, Row, Input, Button } from "antd";
import LoadingBox from "../Box/LoadingBox";
import MessageBox from "../Box/MessageBox";
import HomeItem from "./HomeItem";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./styles.css";

export function Home() {
  const { TabPane } = Tabs;
  const { Search } = Input;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(6);
  const productList = useSelector((state) => state.productList);
  const { loading, products } = productList;
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  const { name = "all", category = "all" } = useParams();
  const submitHandler = (e) => {
    e.preventDefault();
    alert("Đăng ký thành công!");
  };
  const showMoreItem = () => {
    setVisible((value) => value + 3);
  };
  useEffect(() => {
    dispatch(
      listProducts({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
      })
    );
  }, [dispatch, name, category]);

  return (
    <div className="container">
      <OwlCarousel
        className="owl-theme"
        loop
        margin={10}
        items={1}
        autoplay
        nav
        dots={false}
      >
        <div className="item">
          <h4>
            <img src="/template/images/slide1.jpg" alt="slide1"></img>
            <div className="info">
              <span>cung cấp</span>
              <h3>
                Sản phẩm chính hãng <br /> từ Nhật Bản
              </h3>
              <p>
                Figure là thiên đường với những bạn quan tâm và đam mê văn hóa
                từ Nhật Bản
              </p>
            </div>
          </h4>
        </div>
        <div className="item">
          <h4>
            <img src="/template/images/slide3.jpg" alt="slide3"></img>
            <div className="info">
              <span>Bộ sựu tập R18</span>
              <h3>Figure R18 tại nhật 2020</h3>
              <p>Ảnh 18+ cân nhắc khi xem</p>
              <Button
                shape="round"
                size="large"
                style={{ background: "#956bc7", color: "white" }}
              >
                <NavLink to="/product">Xem chi tiết</NavLink>
              </Button>
            </div>
          </h4>
        </div>
        <div className="item">
          <h4>
            <img src="/template/images/slide2.jpg" alt="slide2"></img>
            <div className="info">
              <h3>Mang nhân vật yêu thích đến gần bạn hơn</h3>
              <p>
                Mua bán - Cập nhật thông tin sản phẩm mỗi ngày.Giải đáp mọi thắc
                mắc về figure, cách đặt hàng và mua hàng miễn phí.Hỗ trợ vận
                chuyển.
              </p>
            </div>
          </h4>
        </div>
      </OwlCarousel>

      <div className="content">
        <h2>
          <strong>Trending Item</strong>
        </h2>
      </div>
      <div className="content__info">
        {loadingCategories ? (
          <LoadingBox></LoadingBox>
        ) : errorCategories ? (
          <MessageBox variant="danger">{errorCategories}</MessageBox>
        ) : (
          <Tabs defaultActiveKey="0">
            <TabPane tab="All" key="0">
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {loading === false &&
                  products.products.slice(0, visible).map((product, index) => (
                    <Col span={6} key={index}>
                      <HomeItem product={product}></HomeItem>
                    </Col>
                  ))}
              </Row>
              {loading === false && products.products.length > 6 && (
                <div className="mt-5">
                  <Button
                    size="large"
                    style={{ background: "#956bc7", color: "white" }}
                    block
                    onClick={showMoreItem}
                  >
                    Xem thêm
                  </Button>
                </div>
              )}
            </TabPane>
            {categories.map((c, index) => (
              <TabPane tab={c} key={index + 1}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  {loading === false &&
                    products.products
                      .filter((p) => p.category === c)
                      .slice(0, visible)
                      .map((product, index) => (
                        <Col span={6} key={index}>
                          <HomeItem product={product}></HomeItem>
                        </Col>
                      ))}
                </Row>
                {loading === false &&
                  products.products.filter((p) => p.category === c).length >
                    6 && (
                    <div className="mt-5">
                      <Button
                        size="large"
                        style={{ background: "#956bc7", color: "white" }}
                        block
                        onClick={showMoreItem}
                      >
                        Xem thêm
                      </Button>
                    </div>
                  )}
              </TabPane>
            ))}
          </Tabs>
        )}
      </div>

      <div className="service" style={{ width: "100%" }}>
        <div className="single-service">
          <LocalShipping />
          <h4>Free shiping</h4>
          <p>Orders over $100</p>
        </div>
        <div className="single-service">
          <Autorenew />
          <h4>Free Return</h4>
          <p>Within 30 days returns</p>
        </div>
        <div className="single-service">
          <Lock />
          <h4>Secure Payment</h4>
          <p>100% secure payment</p>
        </div>
        <div className="single-service">
          <AttachMoney />
          <h4>Best Price</h4>
          <p>Guaranteed price</p>
        </div>
      </div>

      <section>
        <div className="subscribe container">
          <h4>Newsletter</h4>
          <p>
            Subscribe to our newsletter and get{" "}
            <span style={{ color: "red" }}>10%</span> off your first purchase
          </p>
          <form onSubmit={submitHandler}>
            <Search
              placeholder="Your Email Address"
              size="large"
              enterButton="Subscribe"
              aria-label="email"
              style={{ width: "50%" }}
            />
          </form>
        </div>
      </section>
    </div>
  );
}

export default Home;

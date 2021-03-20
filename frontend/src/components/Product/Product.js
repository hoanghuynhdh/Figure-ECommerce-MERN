import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Breadcrumb, List, Select, Button } from "antd";
import {
  listProductCategories,
  listProducts,
} from "../../actions/ProductActions";
import { prices } from "../../utils";
import LoadingBox from "../Box/LoadingBox";
import MessageBox from "../Box/MessageBox";
import ProductItem from "./ProductItem";

export function Product(onAddToCart) {
  const { Option } = Select;
  const { category = "all", min = 0, max = 0, order = "newest" } = useParams();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(6);
  const showMoreItem = () => {
    setVisible((value) => value + 3);
  };
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(
      listProducts({
        category: category !== "all" ? category : "",
        min,
        max,
        order,
      })
    );
    dispatch(listProductCategories());
  }, [category, dispatch, max, min, order]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/product/category/${filterCategory}/min/${filterMin}/max/${filterMax}/order/${sortOrder}`;
  };

  return (
    <div className="container">
      <img
        style={{ width: "100%" }}
        src="/template/images/slide5.png"
        alt="slide5"
      ></img>
      <Breadcrumb
        separator=">"
        style={{ textAlign: "left", margin: "1rem 0", fontSize: " 1.2rem" }}
      >
        <Breadcrumb.Item>
          <NavLink to="/">Trang chủ</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/product">Sản phẩm</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{category}</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="product">
        <Col span={6} className="product__left">
          {loadingCategories ? (
            <LoadingBox></LoadingBox>
          ) : errorCategories ? (
            <MessageBox variant="danger">{errorCategories}</MessageBox>
          ) : (
            <List header={<h4>Danh mục sản phẩm</h4>} bordered>
              <ul>
                <List.Item>
                  <NavLink
                    className={"all" === category ? "active" : ""}
                    to={getFilterUrl({ category: "all" })}
                  >
                    All
                  </NavLink>
                </List.Item>
                {categories.map((c, index) => (
                  <List.Item key={index}>
                    <NavLink
                      className={c === category ? "active" : ""}
                      to={getFilterUrl({ category: c })}
                    >
                      {c}
                    </NavLink>
                  </List.Item>
                ))}
              </ul>
            </List>
          )}
          <br />
          {loadingCategories ? (
            <LoadingBox></LoadingBox>
          ) : errorCategories ? (
            <MessageBox variant="danger">{errorCategories}</MessageBox>
          ) : (
            <List header={<h4>Giá</h4>} bordered>
              <ul>
                {prices.map((p, index) => (
                  <List.Item key={index}>
                    <NavLink
                      to={getFilterUrl({ min: p.min, max: p.max })}
                      className={
                        `${p.min}-${p.max}` === `${min}-${max}` ? "active" : ""
                      }
                    >
                      {p.name}
                    </NavLink>
                  </List.Item>
                ))}
              </ul>
            </List>
          )}
        </Col>
        <Col span={18} className="product__right">
          <Row>
            <Col
              span={24}
              style={{ paddingBottom: "2rem", textAlign: "right" }}
            >
              <span>Sắp xếp :</span>
              <Select
                defaultValue={order}
                style={{ width: 120 }}
                onChange={(e) => {
                  onAddToCart.history.push(getFilterUrl({ order: e }));
                }}
                aria-label="Filter"
                aria-expanded
              >
                <Option value="newest">Sản phẩm mới</Option>
                <Option value="lowest">Giá tăng dần</Option>
                <Option value="highest">Giá giảm dần</Option>
              </Select>
            </Col>
          </Row>

          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {products.products.slice(0, visible).map((product, index) => (
                  <Col span={8} key={index}>
                    <ProductItem product={product}></ProductItem>
                  </Col>
                ))}
              </Row>
              {products.products.length > 6 && (
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
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Product;

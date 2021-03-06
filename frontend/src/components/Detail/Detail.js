import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listProducts,
  createReview,
  detailsProduct,
} from "../../actions/ProductActions";
import {
  Tabs,
  Button,
  Tag,
  Row,
  Col,
  Breadcrumb,
  InputNumber,
  Input,
} from "antd";
import LoadingBox from "../Box/LoadingBox";
import MessageBox from "../Box/MessageBox";
import HomeItem from "../Home/HomeItem";
import DetailImage from "./DetailImage";
import ReactImageMagnify from "react-image-magnify";
import { addToCart } from "../../actions/CartActions";
import { PRODUCT_REVIEW_CREATE_RESET } from "../../constants/ProductConstants";
import { LocalShipping, VerifiedUser, Loop } from "@material-ui/icons";
import "./styles.css";

function format_currency(price) {
  return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
export function Detail(props, onAddToCart) {
  const { TabPane } = Tabs;
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(6);
  const [selectedImage, setSelectedImage] = useState(0);
  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProduct,
    error: errorProduct,
    products,
  } = productList;
  const productDetails = useSelector((state) => state.productDetails);
  const {
    loading: loadingDetails,
    error: errorDetails,
    product,
  } = productDetails;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { name = "all", category = "all" } = useParams();
  const showMoreItem = () => {
    setVisible((value) => value + 3);
  };
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  const BuyNow = (id, qty) => {
    if (userInfo) {
      dispatch(addToCart(id, qty));
      props.history.push(`/checkout`);
    } else {
      props.history.push(`/login`);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment) {
      dispatch(createReview(productId, { comment, name: userInfo.name }));
    } else {
      alert("B???n ch??a nh???p b??nh lu???n.");
    }
  };
  useEffect(() => {
    dispatch(
      listProducts({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
      })
    );
    dispatch(detailsProduct(productId));
    if (successReviewCreate) {
      window.alert("????ng b??i ????nh gi?? th??nh c??ng!!!");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
  }, [dispatch, productId, name, category, successReviewCreate]);

  return (
    <div className="container">
      {loadingDetails ? (
        <LoadingBox></LoadingBox>
      ) : errorDetails ? (
        <MessageBox variant="danger">{errorDetails}</MessageBox>
      ) : (
        <div>
          <Breadcrumb
            separator=">"
            style={{ textAlign: "left", margin: "1rem 0", fontSize: " 1.2rem" }}
          >
            <Breadcrumb.Item>
              <NavLink to="/">Trang ch???</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <NavLink to="/product">S???n ph???m</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="detail">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={12}>
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: product.name,
                      isFluidWidth: true,
                      src: product.image[selectedImage],
                    },
                    largeImage: {
                      src: product.image[selectedImage],
                      width: 1200,
                      height: 1800,
                    },
                  }}
                />
                <DetailImage
                  product={product.image}
                  onSelect={setSelectedImage}
                  selectedImage={selectedImage}
                />
              </Col>
              <Col span={12}>
                <h2>{product.name}</h2>
                <h4 style={{ color: "red" }}>
                  {format_currency(product.price)} VN??
                </h4>
                {product.countInStock === 0 && (
                  <h5 style={{ color: "lightcoral" }}>H???t h??ng</h5>
                )}
                {product.countInStock > 0 && (
                  <>
                    <div className="detail-item">
                      <span style={{ fontSize: "1.2rem" }}>S??? l?????ng: </span>
                      <div className="detail-quantity">
                        <Button
                          onClick={() => {
                            qty > 1 && setQty(qty - 1);
                          }}
                          style={{ background: "#956bc7", color: "white" }}
                        >
                          -
                        </Button>
                        <InputNumber
                          style={{ height: "32px" }}
                          min={1}
                          max={product.countInStock}
                          aria-label="number"
                          value={qty}
                          onChange={(e) => setQty(e)}
                        />
                        <Button
                          onClick={() => {
                            qty < product.countInStock && setQty(qty + 1);
                          }}
                          style={{ background: "#956bc7", color: "white" }}
                        >
                          +
                        </Button>
                      </div>
                      <span>({product.countInStock} s???n ph???m c?? s???n )</span>
                    </div>
                    <div className="mt-2">
                      <Button
                        size="large"
                        onClick={() => BuyNow(product._id, qty)}
                        block
                        style={{ background: "#33727d", color: "white" }}
                      >
                        Mua ngay
                      </Button>
                      <Button
                        size="large"
                        onClick={addToCartHandler}
                        block
                        style={{ background: "#956bc7", color: "white" }}
                      >
                        Th??m v??o gi???
                      </Button>
                    </div>
                    <div className="detail-information">
                      <ul>
                        <li>
                          <LocalShipping />
                          <span
                            style={{ fontSize: "24px", marginLeft: "1rem" }}
                          >
                            Mi???n ph?? v???n chuy???n v???i ????n h??ng t??? 500.000 VN??.
                          </span>
                        </li>
                        <li>
                          <Loop />
                          <span
                            style={{ fontSize: "24px", marginLeft: "1rem" }}
                          >
                            B???o h??nh 5 n??m.
                          </span>
                        </li>
                        <li>
                          <VerifiedUser />
                          <span
                            style={{ fontSize: "24px", marginLeft: "1rem" }}
                          >
                            S???n ph???m 100% ch??nh h??ng.
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="row detail-tags">
                      <div className="col-2" style={{ textAlign: "right" }}>
                        <h5>Tags: </h5>
                      </div>
                      <div className="col-10">
                        <Tag>
                          <NavLink to="/product/category/Action Figure">
                            Action Figure
                          </NavLink>
                        </Tag>
                        <Tag>Action Figure</Tag>
                        <Tag>Action Figure</Tag>
                        <Tag>Action Figure</Tag>
                      </div>
                    </div>
                  </>
                )}
              </Col>
            </Row>

            <div className="detail-tabs" style={{ margin: "2rem 0" }}>
              <Tabs type="card">
                <TabPane tab="M?? T??? CHI TI???T" key="1">
                  <ul style={{ textAlign: "left", lineHeight: "2.5" }}>
                    <li>T??n s???n ph???m: {product.name}</li>
                    <li>
                      Gi??:{" "}
                      <span style={{ color: "red" }}>
                        {format_currency(product.price)} VN??
                      </span>
                    </li>
                    <li>Th??? lo???i: {product.category}</li>
                    <li>M?? t???: {product.description}</li>
                  </ul>
                </TabPane>
                <TabPane tab="????NH GI??" key="2">
                  <div>
                    {product.reviews.length === 0 && (
                      <MessageBox>There is no review</MessageBox>
                    )}
                    <ul>
                      {product.reviews.map((review) => (
                        <li key={review._id}>
                          <strong>{review.name}</strong>
                          <p>{review.createdAt.substring(0, 10)}</p>
                          <p>{review.comment}</p>
                        </li>
                      ))}
                      <li>
                        {userInfo ? (
                          <form className="form" onSubmit={submitHandler}>
                            <div>
                              <h2>????nh gi??? c???a kh??ch h??ng</h2>
                            </div>
                            <div>
                              <label htmlFor="comment">B??nh lu???n: </label>
                              <TextArea
                                rows={4}
                                id="comment"
                                allowClear
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              />
                            </div>
                            <div>
                              <label />
                              <Button
                                htmlType="submit"
                                style={{
                                  background: "#956bc7",
                                  color: "white",
                                  margin: "1rem 0",
                                }}
                              >
                                ????ng b??nh lu???n
                              </Button>
                            </div>
                            <div>
                              {loadingReviewCreate && <LoadingBox></LoadingBox>}
                              {errorReviewCreate && (
                                <MessageBox variant="danger">
                                  {errorReviewCreate}
                                </MessageBox>
                              )}
                            </div>
                          </form>
                        ) : (
                          <MessageBox>
                            <NavLink to="/login">????ng nh???p</NavLink> ????? vi???t b??i
                            ????nh gi??
                          </MessageBox>
                        )}
                      </li>
                    </ul>
                  </div>
                </TabPane>
                <TabPane tab="CH??NH S??CH ?????I TR???" key="3">
                  Nh???n ?????i tr??? s???n ph???m ???? mua trong v??ng 7 ng??y k??? t??? ng??y nh???n
                  h??ng. Tuy nhi??n s???n ph???m ph???i ???????c gi??? nguy??n nh?? l??c nh???n
                  h??ng, n???u kh??ng th?? shop xin ph??p kh??ng nh???n h??ng g???i l???i nha!
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      )}
      <div>
        <h3 style={{ margin: "2rem 0" }}>S???N PH???M T????NG T???</h3>
        {loadingProduct ? (
          <LoadingBox></LoadingBox>
        ) : errorProduct ? (
          <MessageBox variant="danger">{errorProduct}</MessageBox>
        ) : (
          <>
            <div className="detail-product">
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {loadingProduct === false &&
                  loadingDetails === false &&
                  products.products
                    .filter(
                      (p) =>
                        p.category === product.category && p._id !== product._id
                    )
                    .slice(0, visible)
                    .map((p, index) => (
                      <Col span={6} key={index}>
                        <HomeItem
                          product={p}
                          onAddToCart={onAddToCart}
                        ></HomeItem>
                      </Col>
                    ))}
              </Row>
              {loadingProduct === false &&
                loadingDetails === false &&
                products.products.filter(
                  (p) =>
                    p.category === product.category && p._id !== product._id
                ).length > 6 && (
                  <div className="mt-5">
                    <Button
                      size="large"
                      style={{ background: "#956bc7", color: "white" }}
                      block
                      onClick={showMoreItem}
                    >
                      Xem th??m
                    </Button>
                  </div>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Detail;

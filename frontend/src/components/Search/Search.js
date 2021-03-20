import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import { listProducts } from "../../actions/ProductActions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductSearch from "../Product/ProductSearch";
import LoadingBox from "../Box/LoadingBox";
import MessageBox from "../Box/MessageBox";

export default function Search(onAddToCart) {
  const { name = "" } = useParams();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(6);
  const showMoreItem = () => {
    setVisible((value) => value + 3);
  };
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(
      listProducts({
        name: name !== "all" ? name : "",
      })
    );
  }, [dispatch, name]);

  return (
    <div className="container mt-5">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <h3 style={{ textAlign: "left" }}>Tìm kiếm: {name}</h3>
          <div className="mt-5">
            {products.products.length === 0 || name === "" ? (
              <div>
                <h5>Không tìm thấy sản phẩm nào</h5>
              </div>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {products.products.slice(0, visible).map((product, index) => {
                  return (
                    <Col span={6} key={index}>
                      <ProductSearch
                        product={product}
                        onAddToCart={onAddToCart}
                      ></ProductSearch>
                    </Col>
                  );
                })}
              </Row>
            )}
            {products.products.length > 6 &&
              products.products.length === 0 &&
              name === "" && (
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
          </div>
        </>
      )}
    </div>
  );
}

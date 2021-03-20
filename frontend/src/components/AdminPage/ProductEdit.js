import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct, updateProduct } from "../../actions/ProductActions";
import Axios from "axios";
import LoadingBox from "../Box/LoadingBox";
import MessageBox from "../Box/MessageBox";
import { Button, Input } from "antd";
import { PRODUCT_UPDATE_RESET } from "../../constants/ProductConstants";

export default function ProductEdit(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/productlist");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product, dispatch, productId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        countInStock,
        description,
      })
    );
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div className="container mt-5" style={{ textAlign: "left" }}>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Product {productId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <Input
                type="text"
                placeholder="Enter Name"
                size="large"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <Input
                type="number"
                placeholder="Enter price"
                size="large"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <Input
                type="text"
                placeholder="Enter image"
                size="large"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="imageFile" className="form-label">
                Image File
              </label>
              <Input
                type="file"
                size="large"
                id="imageFile"
                onChange={uploadFileHandler}
              />
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <Input
                type="text"
                placeholder="Enter category"
                size="large"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="countInStock" className="form-label">
                Count In Stock
              </label>
              <Input
                type="text"
                placeholder="Enter countInStock"
                size="large"
                id="countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <Input.TextArea
                rows={3}
                placeholder="Enter description"
                size="large"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Button
                htmlType="submit"
                style={{
                  background: "#956bc7",
                  color: "white",
                }}
              >
                Cập nhật
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

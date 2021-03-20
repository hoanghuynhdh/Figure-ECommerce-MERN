import React, { useEffect } from "react";
import { NavLink, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Drawer, Badge } from "@material-ui/core";
import {
  ShoppingCart,
  AccountCircle,
  ChevronLeft,
  Phone,
  Cancel,
  ExpandLess,
} from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "./styles";
import SearchBox from "../Search/SearchBox";
import LoadingBox from "../Box/LoadingBox";
import MessageBox from "../Box/MessageBox";
import { signout } from "../../actions/userActions";
import { removeFromCart } from "../../actions/CartActions";
import { listProductCategories } from "../../actions/ProductActions";
import { Menu, Button, BackTop, Divider, Row, Col, Affix } from "antd";
import "./styles.css";
import "antd/dist/antd.css";

function format_currency(price) {
  return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
export function Header(props) {
  const { SubMenu } = Menu;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { loading, error } = props;
  const dispatch = useDispatch();
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  const signoutHandler = () => {
    dispatch(signout());
  };
  useEffect(() => {
    dispatch(listProductCategories({}));
  }, [dispatch]);

  return (
    <header className="header">
      {/* Header Mobile */}
      <div className="header__mobile row">
        <div className="header__mobile-left">
          <div className="toolbar__menuButton">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </div>
        <div className="header__mobile-center">
          <NavLink to="/">
            <img src="/template/images/logo.png" alt="logo"></img>
          </NavLink>
        </div>
        <div className="header__mobile-right shopping">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {cartItems.length > 0 ? (
                <Badge
                  badgeContent={cartItems.reduce((a, c) => a + c.qty, 0)}
                  color="error"
                >
                  <ShoppingCart />
                </Badge>
              ) : (
                <ShoppingCart />
              )}
              <div className="shopping-item">
                <div className="dropdown-cart-header">
                  {cartItems.length > 0 ? (
                    <span>
                      {cartItems.reduce((a, c) => a + c.qty, 0)} Sản phẩm
                    </span>
                  ) : (
                    <span>0 Sản phẩm</span>
                  )}
                  <NavLink to="/cart">Xem giỏ hàng</NavLink>
                </div>
                <ul className="shopping-list">
                  {cartItems.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        className="cart-img"
                        to={`/detail/${item.product}`}
                      >
                        <img src={item.image[0]} alt={item.name} />
                      </NavLink>
                      <h4>
                        <NavLink to={`/detail/${item.product}`}>
                          {item.name}
                        </NavLink>
                      </h4>
                      <p className="quantity">
                        {item.qty}x -{" "}
                        <span className="amount">
                          {format_currency(item.price)} VNĐ
                        </span>
                      </p>
                      <IconButton
                        size="small"
                        onClick={() => removeFromCartHandler(item.product)}
                        aria-label="delete"
                      >
                        <Cancel />
                      </IconButton>
                    </li>
                  ))}
                </ul>
                <div className="bottom">
                  <div className="total">
                    <span>Tổng cộng</span>
                    <span className="total-amount">
                      {format_currency(
                        cartItems.reduce((a, c) => a + c.price * c.qty, 0)
                      )}{" "}
                      VNĐ
                    </span>
                  </div>
                  <Button
                    size="large"
                    block
                    style={{ background: "#956bc7", color: "white" }}
                    disabled={cart.cartItems.length === 0 || !userInfo}
                  >
                    <NavLink to="/checkout">THANH TOÁN</NavLink>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="header__mobile-search ">
          <Route
            render={({ history }) => <SearchBox history={history}></SearchBox>}
          ></Route>
        </div>
      </div>
      {/* Main Header */}
      <div className="header__top" style={{ background: "#33727d" }}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={8}>
            <ul className="header__top-left-list">
              <li className="header__top-left-item">
                <Phone />
                <strong>
                  Hotline:<span style={{ color: "red" }}> 19001560</span>
                </strong>
              </li>
            </ul>
          </Col>
          <Col span={16}>
            <ul className="header__top-right-list">
              <li className="header__top-right-item accountInfo">
                {userInfo ? (
                  <div className="account">
                    <strong>
                      <span>Xin chào </span>
                      <NavLink
                        className="dropdown-toggle"
                        role="button"
                        id="dropdownMenuLink"
                        to="#"
                      >
                        {userInfo.name}
                      </NavLink>
                    </strong>
                    <ul
                      className="account-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li>
                        <NavLink className="dropdown-item" to="/profile">
                          Thông tin người dùng
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/orderhistory">
                          Lịch sử mua hàng
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="#signout"
                          onClick={signoutHandler}
                        >
                          Đăng xuất
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <ul>
                    <li className="header__top-right-item">
                      <NavLink to="/login">
                        <AccountCircle />
                        Đăng Nhập
                      </NavLink>
                    </li>
                    <li className="header__top-right-item">
                      <NavLink to="/signup">
                        <AccountCircle />
                        Đăng Ký
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li className="header__top-right-item accountInfo">
                {userInfo && userInfo.isAdmin && (
                  <div className="account">
                    <strong>
                      <NavLink
                        className="dropdown-toggle"
                        role="button"
                        id="dropdownMenuLink1"
                        to="#admin"
                      >
                        Admin
                      </NavLink>
                    </strong>
                    <ul
                      className="account-menu"
                      aria-labelledby="dropdownMenuLink1"
                    >
                      <li>
                        <NavLink className="dropdown-item" to="/dashboard">
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/productlist">
                          Products
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/orderlist">
                          Orders
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/userlist">
                          Users
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </Col>
        </Row>
      </div>
      <div className="header__middle ">
        <div className="header__middle--logo" style={{ textAlign: "right" }}>
          <NavLink to="/">
            <img
              src="/template/images/logo.png"
              alt="logo"
              style={{ marginRight: "3rem" }}
            ></img>
          </NavLink>
        </div>
        <div className="header__middle--search">
          <Route
            render={({ history }) => <SearchBox history={history}></SearchBox>}
          ></Route>
          {loadingCategories ? (
            <LoadingBox></LoadingBox>
          ) : errorCategories ? (
            <MessageBox variant="danger">{errorCategories}</MessageBox>
          ) : (
            <Affix offsetTop={0}>
              <Menu
                mode="horizontal"
                style={{
                  borderBottom: "none",
                  background: "#33727d",
                  fontWeight: "bold",
                }}
              >
                <Menu.Item>
                  <NavLink to="/">Trang Chủ</NavLink>
                </Menu.Item>
                <SubMenu key="SubMenu" title="Sản Phẩm">
                  {categories.map((c) => (
                    <Menu.Item key={c}>
                      <NavLink to={"/product/category/" + c}>{c}</NavLink>
                    </Menu.Item>
                  ))}
                </SubMenu>
                <Menu.Item style={{ color: "#f8b607" }}>
                  <NavLink to="/">Liên Hệ</NavLink>
                </Menu.Item>
                <Menu.Item style={{ color: "#f8b607" }}>
                  <NavLink to="/">Hỗ trợ</NavLink>
                </Menu.Item>
              </Menu>
            </Affix>
          )}
        </div>
        <div className="header__middle--right shopping">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <div style={{ textAlign: "left", marginLeft: "3rem" }}>
                {cartItems.length > 0 ? (
                  <Badge
                    badgeContent={cartItems.reduce((a, c) => a + c.qty, 0)}
                    color="error"
                  >
                    <ShoppingCart />
                  </Badge>
                ) : (
                  <ShoppingCart />
                )}
              </div>
              <div className="shopping-item">
                <div className="dropdown-cart-header">
                  {cartItems.length > 0 ? (
                    <span>
                      {cartItems.reduce((a, c) => a + c.qty, 0)} sản phẩm
                    </span>
                  ) : (
                    <span>0 sản phẩm</span>
                  )}
                  <NavLink to="/cart">Xem giỏ hàng</NavLink>
                </div>
                {cartItems.length > 0 ? (
                  <span>
                    <ul className="shopping-list">
                      {cartItems.map((item) => (
                        <li key={item.name}>
                          <NavLink
                            className="cart-img"
                            to={`/detail/${item.product}`}
                          >
                            <img src={item.image[0]} alt={item.name} />
                          </NavLink>
                          <h4>
                            <NavLink to={`/detail/${item.product}`}>
                              {item.name}
                            </NavLink>
                          </h4>
                          <p className="quantity">
                            {item.qty}x -{" "}
                            <span className="amount">
                              {format_currency(item.price)} VNĐ
                            </span>
                          </p>
                          <IconButton
                            size="small"
                            onClick={() => removeFromCartHandler(item.product)}
                            aria-label="delete"
                          >
                            <Cancel />
                          </IconButton>
                        </li>
                      ))}
                    </ul>
                    <div className="bottom">
                      <div className="total">
                        <span>Tổng cộng</span>
                        <span className="total-amount">
                          {format_currency(
                            cartItems.reduce((a, c) => a + c.price * c.qty, 0)
                          )}{" "}
                          VNĐ
                        </span>
                      </div>
                      {!userInfo ? (
                        <Button
                          size="large"
                          block
                          style={{ background: "#956bc7", color: "white" }}
                        >
                          <NavLink to="/login">THANH TOÁN</NavLink>
                        </Button>
                      ) : (
                        <Button
                          size="large"
                          block
                          style={{ background: "#956bc7", color: "white" }}
                          disabled={cart.cartItems.length === 0}
                        >
                          <NavLink to="/checkout">THANH TOÁN</NavLink>
                        </Button>
                      )}
                    </div>
                  </span>
                ) : (
                  <div style={{ margin: "1rem 0" }}>
                    <span>Chưa có sản phẩm trong giỏ</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {/* Drawer */}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {/* {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />} */}
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        {loadingCategories ? (
          <LoadingBox></LoadingBox>
        ) : errorCategories ? (
          <MessageBox variant="danger">{errorCategories}</MessageBox>
        ) : (
          <Menu style={{ width: 256 }} mode="inline">
            <Menu.Item>
              <NavLink to="/">Trang Chủ</NavLink>
            </Menu.Item>
            <SubMenu key="sub2" title="Sản Phẩm">
              {categories.map((c) => (
                <Menu.Item key={c}>
                  <NavLink to={"/product/category/" + c}>{c}</NavLink>
                </Menu.Item>
              ))}
            </SubMenu>
            <Menu.Item>
              <NavLink to="/">Liên Hệ</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to="/">Hỗ Trợ</NavLink>
            </Menu.Item>
          </Menu>
        )}
      </Drawer>
      <BackTop>
        <div
          style={{
            width: "40px",
            height: "40px",
            lineHeight: "40px",
            borderRadius: 4,
            background: "#1088e9",
            color: "white",
            fontSize: "14px",
          }}
        >
          <ExpandLess />
        </div>
      </BackTop>
    </header>
  );
}

export default Header;

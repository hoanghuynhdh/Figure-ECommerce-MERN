import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Home/Home";
import Cart from "../Cart/Cart";
import Login from "../Login/Login";
import Signup from "../SignUp/Signup";
import Detail from "../Detail/Detail";
import Product from "../Product/Product";
import Checkout from "../Checkout/Checkout";
import Profile from "../Profile/Profile";
import PlaceOrder from "../PlaceOrder/PlaceOrder";
import ProductEdit from "../AdminPage/ProductEdit";
import OrderHistory from "../OrderHistory/OrderHistory";
import PrivateRoute from "./PrivateRoute";
import ProductList from "../AdminPage/ProductList";
import AdminRoute from "./AdminRoute";
import DashBoard from "../AdminPage/DashBoard";
import OrderList from "../AdminPage/OrderList";
import UserList from "../AdminPage/UserList";
import UserEdit from "../AdminPage/UserEdit";
import Search from "../Search/Search";

class RouterURL extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/product" component={Product} exact></Route>
          <Route path="/product/category/:category/" component={Product} exact></Route>
          <Route path="/product/category/:category/min/:min/max/:max/order/:order" component={Product} exact></Route>
          <Route path="/detail/:id" component={Detail}></Route>
          <Route path="/cart/:id?" component={Cart}></Route>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/orderhistory" component={OrderHistory}></Route>
          <PrivateRoute path="/profile" component={Profile}></PrivateRoute>
          <AdminRoute path="/dashboard" component={DashBoard} exact></AdminRoute>
          <AdminRoute path="/productlist" component={ProductList} exact></AdminRoute>
          <AdminRoute path="/productlist/pageNumber/:pageNumber" component={ProductList} exact></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderList} exact></AdminRoute>
          <AdminRoute path="/userlist" component={UserList}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEdit}></AdminRoute>
          <Route path="/product/:id/edit" component={ProductEdit} exact></Route>
          <Route path="/search/name/:name?" component={Search} exact></Route>
          <Route path="/order/:id" component={PlaceOrder}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route component={Home}></Route>
        </Switch>
      </div>
    );
  }
}

export default RouterURL;

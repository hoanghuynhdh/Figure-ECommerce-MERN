import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import RouterURL from "./components/RouterURL/RouterURL";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>
        <RouterURL></RouterURL>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;

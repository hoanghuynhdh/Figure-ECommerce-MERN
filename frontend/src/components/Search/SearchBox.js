import React, { useState } from "react";
import { Input } from "antd";

export default function SearchBox(props) {
  const { Search } = Input;
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="search" onSubmit={submitHandler}>
      <Search
        placeholder="Search…"
        allowClear
        enterButton
        size="large"
        aria-label="Search"
        onChange={(e) => setName(e.target.value)}
      />
    </form>
  );
}

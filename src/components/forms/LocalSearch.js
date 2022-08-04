import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
    // console.log(keyword);
  };
  return (
    <input
      type="search"
      placeholder="Filter"
      value={keyword}
      onChange={handleSearchChange}
      className="form-control my-4"
    />
  );
};

export default LocalSearch;

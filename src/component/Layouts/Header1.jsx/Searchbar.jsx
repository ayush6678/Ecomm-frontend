import React from "react";
import { CloseOutlined } from "@mui/icons-material";
import { GoSearch } from "react-icons/go";
import "./Searchbar.css";

const Search = ({
  handleSearchButtonClick,
  handleCrossButtonClick,
  searchBarActive,
  handleSearchFormSubmit,
  handleSearchInputChange,
  searchValue,
}) => {

  return (
    <div className="main">
      {!searchBarActive && (
        <div className="SearchButton" onClick={handleSearchButtonClick}>
          <GoSearch fontSize="large" className="closeIcon" />
        </div>
      )}
      {searchBarActive && (
        <div className="SearchBar">
          <div className="SearchButton" onClick={handleSearchFormSubmit}>
          </div>
          <form onSubmit={handleSearchFormSubmit} className="search_from">
            <input className="SearchInput"
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchInputChange}
            />
          </form>
          <button className="SearchButton" onClick={handleCrossButtonClick}>
            <CloseOutlined fontSize="large" className="closeIcon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;

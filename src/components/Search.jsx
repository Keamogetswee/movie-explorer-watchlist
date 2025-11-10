import React from "react";

const Search = () => {
  return (
    <div className="text-white text-3xl">
      <input 
        type="text" 
        placeholder="Search for movies, TV shows, or actors..." 
        className="search-input"
      />
      <button className="search-button">Search</button>
    </div>
  );
}

export default Search;
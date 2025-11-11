import React from "react";

const Search = ({searchTerm, setSetsearchTerm}) => {
  return (
    <div className="search">
        <div>
            <img src="./search-icon.svg" alt="Search Icon" />
            <input 
            type="text" 
            placeholder="Search for movies..." 
            value={searchTerm}
            onChange={(e) => setSetsearchTerm(e.target.value)}
            />
        </div>
    </div>
  );
}

export default Search;
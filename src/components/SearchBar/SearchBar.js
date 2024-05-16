import React, { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Perform search logic here
  };

  return (
    <div style={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        style={styles.searchInput}
      />
      {/* Render search results here */}
    </div>
  );
};

const styles = {
  searchContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  },
  searchInput: {
    padding: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginRight: "1rem",
    flex: 1,
  },
};

export default SearchBar;

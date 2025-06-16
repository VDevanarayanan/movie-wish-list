import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSearch(query); }}>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;

import { useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import './SearchBar.css';


const SearchBar = (props: {
  onChange?: (text: string) => void,
}) => {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (props.onChange) props.onChange(searchText);
  }, [searchText]);

  return (
    <div className="SearchBar">
      <MdSearch />
      <input type="text" onChange={(e) => setSearchText(e.target.value)} />
    </div>
  );
};

export default SearchBar;
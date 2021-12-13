import React from "react";
import useDebounce from "../hooks/useDebonce";
import { useAppContext } from "../hooks/useAppContext";

export const SearchInput = ({ value, onChange }) => {
  const { useState, useEffect } = React;
  const [displayValue, setDisplayValue] = useState(value);
  const debouncedChange = useDebounce(onChange, 600);
  const { dataApp } = useAppContext();

  useEffect(() => {
    if (dataApp.criteria != "") {
      setDisplayValue(dataApp.criteria);
    }
  }, []);

  function handleChange(event) {
    setDisplayValue(event.target.value);
    debouncedChange(event.target.value);
    event.preventDefault();
  }

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-md-8">
        <input
          type="search"
          value={displayValue}
          onChange={handleChange}
          className="form-control p-3 m-5"
          placeholder="Search issues"
        />
      </div>
    </div>
  );
};

export default SearchInput;

import React from 'react';

const SearchBar = ({ handleSort }) => {
  return(
    <div className="row">
      <form className="col-lg-3 col-md-9 col-sm-6">

        <div className="form-group">
          <label htmlFor="category">Sort</label>
          <select
            className="form-control"
            id="sort"
            name="sort"
            onChange={ handleSort }
          >
            <option value="" disabled>Please Select</option>
            <option default value="date|desc">Newest first</option>
            <option value="date|asc">Oldest first</option>
            <option value="averageRating|desc">Rating (High - Low)</option>
            <option value="averageRating|asc">Rating (Low - High)</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

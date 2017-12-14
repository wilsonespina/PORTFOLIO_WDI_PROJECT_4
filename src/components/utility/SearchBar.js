import React from 'react';

const SearchBar = ({ handleSort, handleSearch }) => {
  return(
    <div className="row">
      <form className="col-lg-6 col-md-6 col-sm-6 col-xs-6">

        <div className="form-group">
          <label htmlFor="name">Search by username</label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            onChange={handleSearch}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Sort</label>
          <select
            className="form-control"
            id="sort"
            name="sort"
            onChange={ handleSort }
          >
            <option value="" disabled>Please Select</option>
            <option value="date|desc">Newest first</option>
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

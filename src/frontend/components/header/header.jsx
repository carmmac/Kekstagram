import React from "react";
import PropTypes from "prop-types";
import {Filter} from "../../_const";

const Header = ({selectedFilter, handleFilterSelect, arePhotosLoaded}) => {
  const filters = Object.keys(Filter);

  return (
    <header
      className={`img-filters  ${
        !arePhotosLoaded ? `img-filters--inactive` : ``
      } container`}
    >
      <h2 className="img-filters__title  visually-hidden">Фильтр фотографий</h2>
      {
        filters.map((filter, i) => (
          <button
            type="button"
            className={`img-filters__button ${
              selectedFilter === Filter[filter].name
                ? `img-filters__button--active`
                : ``
            }`}
            id={Filter[filter].name}
            key={Filter[filter].name + i}
            onClick={() => handleFilterSelect(Filter[filter].name)}
          >
            {Filter[filter].label}
          </button>
        ))
      }
    </header>
  );
};

Header.propTypes = {
  selectedFilter: PropTypes.string.isRequired,
  handleFilterSelect: PropTypes.func.isRequired,
  arePhotosLoaded: PropTypes.bool.isRequired,
};

export default Header;

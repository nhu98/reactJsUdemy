import React from "react";
import PropTypes from "prop-types";
import FilterByCategory from "./Filters/FilterByCategory";
import { Box } from "@mui/system";
import FilterByPrice from "./Filters/FilterByPrice";
import FilterByService from "./Filters/FilterByService";

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilters({ filters, onChange }) {
  function handleCetegoryChange(newCategory) {
    if (!onChange) return;

    const newFilters = {
      "category.id": newCategory.id,
      "category.name": newCategory.name,
      // _page: 1,
      // _limit: 9,
      // salePrice_gte: undefined,
      // salePrice_lte: undefined,
    };
    onChange(newFilters);
  }

  function handleChange(values) {
    // console.log(values);
    if (onChange) onChange(values);
  }

  return (
    <Box>
      <FilterByCategory onChange={handleCetegoryChange} />
      <FilterByPrice onChange={handleChange} />
      <FilterByService filters={filters} onChange={handleChange} />
    </Box>
  );
}

export default ProductFilters;

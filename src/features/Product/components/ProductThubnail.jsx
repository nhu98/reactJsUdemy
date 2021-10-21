import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { STATIC_HOST } from "constants/index";
import { THUMBNAIL_PLACEHOLDER } from "constants/common";

ProductThubnail.propTypes = {
  product: PropTypes.object,
};

function ProductThubnail({ product = {} }) {
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;

  return (
    <Box>
      <img src={thumbnailUrl} alt={product.name} width="100%" />
    </Box>
  );
}

export default ProductThubnail;

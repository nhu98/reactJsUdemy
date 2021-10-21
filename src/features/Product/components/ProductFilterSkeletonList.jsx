import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Skeleton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

ProductFilterSkeletonList.propTypes = {
  length: PropTypes.number,
};
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "16px",
  },

  menu: {
    padding: 0,
    margin: 0,
    listStyleType: "none",
    "& > li": {
      marginTop: 1,
      transition: "all .25s",
      "&:hover": {
        color: "blue",
        cursor: "pointer",
      },
    },
  },
}));

function ProductFilterSkeletonList({ length = 6 }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>

      <ul className={classes.menu}>
        {Array.from(new Array(length)).map((x, index) => (
          <li key={index}>
            <Skeleton width="40%" />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default ProductFilterSkeletonList;

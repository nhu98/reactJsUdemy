import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import categoryApi from "api/categoryApi";
import { makeStyles } from "@mui/styles";
import ProductFilterSkeletonList from "../ProductFilterSkeletonList";

FilterByCategory.propTypes = {
  onChange: PropTypes.func.isRequired,
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

function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);
  const classes = useStyles();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryApi.getAll();
        setCategoryList(
          response.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log("Failed to fetch category", error);
      }

      setLoading(false);
    })();
  }, []);

  function handleCategoryClick(category) {
    if (!onChange) return;

    onChange(category);
  }

  return (
    <Box>
      {loading ? (
        <ProductFilterSkeletonList length={6} />
      ) : (
        <Box className={classes.root}>
          <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>

          <ul className={classes.menu}>
            {categoryList.map((category) => (
              <li
                key={category.id}
                onClick={() => handleCategoryClick(category)}
              >
                <Typography variant="body2">{category.name}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
}

export default FilterByCategory;

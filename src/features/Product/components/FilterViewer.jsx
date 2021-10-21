import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Chip } from "@mui/material";

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",

    padding: 0,
    marginTop: "16px",
    marginBottom: "0px",
    listStyleType: "none",

    "& >li": {
      margin: 0,
      padding: "8px",
    },
  },
}));

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => "Giao hàng miễn phí",
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }

      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => "Có khuyến mãi",
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isPromotion) {
        delete newFilters.isPromotion;
      }

      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 3,
    getLabel: (filters) =>
      `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
    isActive: () => true,
    isVisible: (filters) => {
      if (
        parseInt(filters.salePrice_gte) >= 0 &&
        parseInt(filters.salePrice_lte) >= 0
      ) {
        return true;
      }
    },
    //   Object.keys(filters).includes("salePrice_gte") &&
    //   Object.keys(filters).includes("salePrice_lte"),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      if (
        newFilters.salePrice_gte ||
        newFilters.salePrice_lte ||
        !newFilters.salePrice_gte ||
        !newFilters.salePrice_lte
      ) {
        delete newFilters.salePrice_gte;
        delete newFilters.salePrice_lte;
      }

      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 4,
    getLabel: (filters) => filters["category.name"],
    isActive: () => true,
    isVisible: (filters) => {
      if (filters["category.id"]) {
        return true;
      }
    },
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      if (newFilters["category.id"] && newFilters["category.name"]) {
        delete newFilters["category.id"];
        delete newFilters["category.name"];
      }

      return newFilters;
    },
    onToggle: () => {},
  },
];

function FilterViewer({ filters = {}, onChange = null }) {
  const classes = useStyles();

  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters));
  }, [filters]);

  return (
    <Box component="ul" className={classes.root}>
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? "primary" : "default"}
            size="small"
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;

                    const newFilters = x.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;

                    const newFilters = x.onRemove(filters);
                    onChange(newFilters);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;

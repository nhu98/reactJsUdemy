import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

FilterByService.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "16px",
    borderTop: "1px solid grey",
  },

  list: {
    padding: 0,
    margin: 0,
    listStyleType: "none",

    "& > li": {
      margin: 0,
    },
  },
}));

function FilterByService({ onChange, filters = {} }) {
  const classes = useStyles();

  function handleChange(event) {
    if (!onChange) return;

    const { name, checked } = event.target;
    console.log(name);
    onChange({ [name]: checked });
  }

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DỊCH VỤ </Typography>

      <ul className={classes.list}>
        {[
          { value: "isPromotion", label: "Có khuyến mãi" },
          { value: "isFreeShip", label: "Vận chuyển miễn phí" },
        ].map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])}
                  onChange={(e) => handleChange(e)}
                  name={service.value}
                  color="primary"
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;

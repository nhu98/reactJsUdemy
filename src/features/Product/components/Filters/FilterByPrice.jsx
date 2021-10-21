import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import NumberFormat from "react-number-format";

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "16px",
    borderTop: "1px solid grey",
  },

  range: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",

    marginTop: "8px",
    marginBottom: "8px",

    "& > span": {
      marginLeft: "8px",
      marginRight: "8px",
    },
  },
}));

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function FilterByPrice({ onChange }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    // salePrice_gte: 0,
    // salePrice_lte: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    console.log({ [name]: value });
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleSubmit() {
    if (onChange) {
      if (!values.salePrice_gte || !values.salePrice_lte) {
        onChange({ salePrice_gte: 0, salePrice_lte: 0 });
      } else {
        onChange(values);
      }
    }

    setValues({ salePrice_gte: "", salePrice_lte: "" });
  }

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">KHOẢNG GIÁ</Typography>

      <Box className={classes.range}>
        <TextField
          name="salePrice_gte"
          value={values.salePrice_gte}
          onChange={handleChange}
          label="Từ"
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
        <span>-</span>
        <TextField
          name="salePrice_lte"
          value={values.salePrice_lte}
          onChange={handleChange}
          label="Đến"
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
      </Box>

      <Button
        variant="outlined"
        color="primary"
        onClick={handleSubmit}
        size="small"
      >
        Áp Dụng
      </Button>
    </Box>
  );
}

export default FilterByPrice;

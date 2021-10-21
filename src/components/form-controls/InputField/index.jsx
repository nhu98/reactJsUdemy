import { TextField } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disable: PropTypes.bool,
};

InputField.defaultProps = {
  label: null,
  disable: false,
};

function InputField(props) {
  const { form, name, label, disable } = props;
  const { control } = form;
  // console.log(control);

  // const { formState } = form;

  // const hasError = formState.touchedFields[name] && formState.errors[name];
  // console.log(formState.errors[name], formState.touchedFields[name]);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, error },
      }) => (
        <TextField
          margin="normal"
          variant="outlined"
          fullWidth
          label={label}
          error={invalid}
          helperText={error?.message}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          value={value}
          disabled={disable}
        />
      )}
    />
  );
}

export default InputField;

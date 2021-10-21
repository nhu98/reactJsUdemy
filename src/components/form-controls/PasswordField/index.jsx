import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disable: PropTypes.bool,
};

PasswordField.defaultProps = {
  label: null,
  disable: false,
};

function PasswordField(props) {
  const { form, name, label, disable } = props;
  const { control } = form;
  // console.log(control);

  // const { formState } = form;

  // const hasError = formState.touchedFields[name] && formState.errors[name];
  // console.log(formState.errors[name], formState.touchedFields[name]);

  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, error },
      }) => (
        <>
          <FormControl
            margin="normal"
            variant="outlined"
            fullWidth
            error={invalid}
          >
            <InputLabel htmlFor={name}>{label}</InputLabel>

            <OutlinedInput
              id={name}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label={label}
              error={invalid}
              disabled={disable}
              onChange={onChange}
              name={name}
              value={value}
            />

            <FormHelperText error={invalid}>{error?.message}</FormHelperText>
          </FormControl>
        </>
      )}
    />
  );
}

export default PasswordField;

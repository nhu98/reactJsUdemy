import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import InputField from "components/form-controls/InputField";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PasswordField from "components/form-controls/PasswordField/index";
import LinearProgress from "@mui/material/LinearProgress";

const theme = createTheme();

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

RegisterForm.defaultProps = {
  onSubmit: null,
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
  },
  avatar: {
    margin: "0 auto",
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    textAlign: "center",
    margin: theme.spacing(2, 0, 3, 0),
  },
  submit: {},
}));

function RegisterForm(props) {
  const classes = useStyles();
  // console.log(classes);

  const schema = yup
    .object({})
    .shape({
      fullName: yup
        .string()
        .required("Please enter your full name.")
        .test(
          "should has at least two words",
          "Please enter at least two words.",
          (value) => {
            return value.split(" ").length >= 2;
          }
        ),
      email: yup
        .string()
        .required("Please enter your email.")
        .email("Please enter a valid email address."),
      password: yup.string().required("Please enter your password").min("6"),
      retypePassword: yup
        .string()
        .required("Please retype your password")
        .oneOf([yup.ref("password")], "Password does not match."),
    })
    .required();

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    console.log("TODO FORM: ", values);
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }

    //reset form when submited
    // form.reset();
    // form.setValue("password", "");
    // form.setValue("retypePassword", "");
  };

  const { isSubmitting } = form.formState;

  // const { isDirty, isValid } = form.formState;

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root} sx={{ position: "relative" }}>
        {isSubmitting && (
          <LinearProgress
            className={classes.progress}
            sx={{ position: "absolute", top: 8, left: 0, right: 0 }}
          />
        )}

        <Avatar className={classes.avatar} sx={{ bgcolor: "secondary.main" }}>
          <LockOutlinedIcon></LockOutlinedIcon>
        </Avatar>

        <Typography
          className={classes.title}
          sx={{ mt: 2, mr: 0, mb: 3, ml: 0 }}
          variant="h5"
        >
          Create an Account
        </Typography>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <InputField name="fullName" label="Full Name" form={form} />
          <InputField name="email" label="Email" form={form} />
          <PasswordField name="password" label="Password" form={form} />
          <PasswordField
            name="retypePassword"
            label="Retype Password"
            form={form}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isSubmitting}
            size="large"
          >
            Create an Account
          </Button>
        </form>
      </div>
    </ThemeProvider>
  );
}

export default RegisterForm;

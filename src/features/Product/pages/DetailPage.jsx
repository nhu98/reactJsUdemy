import React from "react";
import { Box } from "@mui/system";
import { Container, Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ProductThubnail from "../components/ProductThubnail";

DetailPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: "40%",
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },

  right: {
    width: "60%",
    padding: theme.spacing(1.5),

    flex: "1 1 0",
  },
}));

function DetailPage() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThubnail product={{}} />
            </Grid>
            <Grid item className={classes.right}>
              ProductInfo
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default DetailPage;

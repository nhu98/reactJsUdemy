import { Box } from "@mui/system";
import ListPage from "features/Product/pages/ListPage";
import DetailPage from "features/Product/pages/DetailPage";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NotFound from "../../components/NotFound";

ProductFeature.propTypes = {};

function ProductFeature(props) {
  const match = useRouteMatch();
  return (
    <Box pt={4}>
      <Switch>
        <Route patch={match.url} exact component={ListPage} />
        <Route patch={`${match.url}/:productId`} component={DetailPage} />

        <Route component={NotFound} />
      </Switch>
    </Box>
  );
}

export default ProductFeature;

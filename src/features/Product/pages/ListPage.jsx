import { Container, Grid, Pagination, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import productApi from "api/productApi";
import ProductSkeletonList from "../components/ProductSkeletonList";
import ProductList from "../components/ProductList";
import ProductSort from "../components/ProductSort";
import ProductFilters from "../components/ProductFilters";
import FilterViewer from "../components/FilterViewer";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
// import { createTheme } from "@mui/material/styles";

// const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: "30%",
  },

  right: {
    width: "70%",

    flex: "1 1 0",
  },

  pagination: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",

    marginTop: "30px",
    paddingBottom: "20px",
  },
}));

function ListPage(props) {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  const queryPrams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 9,
      _sort: params._sort || "salePrice:ASC",
      isPromotion: params.isPromotion === "true",
      isFreeShip: params.isFreeShip === "true",
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 9,
    page: 1,
    total: 10,
  });
  const [loading, setLoading] = useState(true);
  // const [filters, setFilters] = useState({
  //   _page: 1,
  //   _limit: 9,
  //   _sort: "salePrice:ASC",
  // });

  // const [filters, setFilters] = useState(() => ({
  //   ...queryPrams,
  //   _page: Number.parseInt(queryPrams._page) || 1,
  //   _limit: Number.parseInt(queryPrams._limit) || 9,
  //   _sort: queryPrams._sort || "salePrice:ASC",
  // }));

  // useEffect(() => {
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(filters),
  //   });
  // }, [history, filters]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryPrams);
        setProductList(data);
        setPagination(pagination);
        console.log({ data, pagination });
      } catch (error) {
        console.log("Failed to fetch product list", error);
      }

      setLoading(false);
    })();
  }, [queryPrams]);

  function handlePageChange(e, page) {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _page: page,
    // }));
    const filters = {
      ...queryPrams,
      _page: page,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  }

  function handleSortChange(newSortValue) {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _sort: newSortValue,
    //   _page: 1,
    // }));

    const filters = {
      ...queryPrams,
      _sort: newSortValue,
      _page: 1,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  }

  function handleFiltersChange(newFilters) {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   ...newFilters,
    //   _page: 1,
    // }));

    const filters = {
      ...queryPrams,
      ...newFilters,
      _page: 1,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  }

  function setNewFilters(newFilters) {
    // setFilters({ ...newFilters, _page: 1 });

    const filters = {
      ...newFilters,
      _page: 1,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  }

  return (
    <Box>
      <Container className={classes.root}>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters
                filters={queryPrams}
                onChange={handleFiltersChange}
              />
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort
                currentSort={queryPrams._sort}
                onChange={handleSortChange}
              />
              <FilterViewer filters={queryPrams} onChange={setNewFilters} />

              {loading ? (
                <ProductSkeletonList length={9} />
              ) : (
                <ProductList data={productList} />
              )}

              <Box className={classes.pagination}>
                <Pagination
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;

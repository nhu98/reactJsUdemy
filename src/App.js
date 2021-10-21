import Header from "components/Header";
import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import productApi from "./api/productApi";
import "./App.css";
import NotFound from "./components/NotFound";
import AlbumFeature from "./features/Album";
import CounterFeature from "./features/Counter";
import TodoFeature from "./features/Todo";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProductFeature from "features/Product";

const theme = createTheme();

function App() {
  useEffect(() => {
    const fetchProducts = async () => {
      const params = {
        _limit: 10,
      };

      const productList = await productApi.getAll(params);

      console.log(productList);
    };

    fetchProducts();
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>

      <Switch>
        <Redirect from="/home" to="/" exact />
        <Redirect from="/post-list/:postId" to="/posts/:postId" />

        {/* <Route path="/" component={TodoFeature} exact /> */}
        <Route path="/" component={CounterFeature} exact />
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />
        <Route path="/products" component={ProductFeature} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;

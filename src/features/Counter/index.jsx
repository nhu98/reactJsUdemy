import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increase, decrease } from "./counterSlice";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 32,
    padding: "0 30px",
  },
});

function CounterFeature(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  const handleInceaseClick = () => {
    const action = increase();
    console.log(action);

    dispatch(action);
  };

  const handleDeceaseClick = () => {
    const action = decrease();
    console.log(action);

    dispatch(action);
  };

  return (
    <div>
      Counter: {count}
      <div>
        <Button className={classes.root} onClick={handleInceaseClick}>
          Incease
        </Button>
        <Button className={classes.root} onClick={handleDeceaseClick}>
          Decease
        </Button>
      </div>
    </div>
  );
}

export default CounterFeature;

import { Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import TodoList from "../../components/TodoList";
import queryString from "query-string";
import { useLocation, useHistory, useRouteMatch } from "react-router-dom";
import TodoForm from "../../components/TodoForm";

ListPage.propTypes = {};

function ListPage(props) {
  const initTodoList = [
    { id: 1, title: "Eat", status: "new" },
    { id: 2, title: "Sleep", status: "completed" },
    { id: 3, title: "Code", status: "new" },
  ];

  const history = useHistory();

  const match = useRouteMatch();

  const location = useLocation();

  const [todoList, setTodoList] = useState(initTodoList);

  const [filteredStatus, setFilteredStatus] = useState(() => {
    const params = queryString.parse(location.search);
    // console.log(params);

    return params.status || "all";
  });

  useEffect(() => {
    const params = queryString.parse(location.search);

    setFilteredStatus(params.status || "all");
  }, [location.search]);

  const handleTodoClick = (todo, idx) => {
    console.log(todo, idx);
    const newTodoList = [...todoList];

    const newTodo = {
      ...newTodoList[idx],
      status: newTodoList[idx].status === "new" ? "completed" : "new",
    };

    newTodoList[idx] = newTodo;

    setTodoList(newTodoList);
  };

  const handleShowAllClick = () => {
    // setFilteredStatus("all");
    const queryParams = { status: "all" };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };
  const handleShowCompletedClick = () => {
    // setFilteredStatus("completed");
    const queryParams = { status: "completed" };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };
  const handleShowNewClick = () => {
    // setFilteredStatus("new");
    const queryParams = { status: "new" };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const renderedTodoList = useMemo(() => {
    return todoList.filter(
      (todo) => filteredStatus === "all" || filteredStatus === todo.status
    );
  }, [todoList, filteredStatus]);

  // console.log(renderedTodoList);

  const handleTodoFormSubmit = (values) => {
    // console.log("todo Form: ", values);
    const newTodo = {
      id: todoList.length + 1,
      title: values.title,
      status: "new",
    };

    const newTodoList = [...todoList, newTodo];

    setTodoList(newTodoList);
  };

  return (
    <div>
      <h3> What to do</h3>
      <TodoForm onSubmit={handleTodoFormSubmit} />

      <h3>Todo List</h3>
      <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick} />

      <Button variant="contained" onClick={handleShowAllClick}>
        show All
      </Button>

      <Button variant="contained" onClick={handleShowCompletedClick}>
        show Completed
      </Button>

      <Button variant="contained" onClick={handleShowNewClick}>
        show New
      </Button>
    </div>
  );
}

export default ListPage;

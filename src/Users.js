import React, { useReducer, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

function reducer(state, action) {
  
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
        error: null
      };
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        error: null
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function Users() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: null
  });
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  
  const fetchUsers = async () => {
    setPage((p) => p + 1);
    dispatch({ type: "LOADING" });
    try {
      console.log(page + 1);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch({ type: "SUCCESS" });
      const unit = [...result, ...response.data];
      setResult(unit);
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  const { loading } = state;

  return (
    <div>
      {result && (
        <ul>
        <span>{page}</span>
        {result.map((user) => (
            <li key={`${user.id}_${uuidv4()}`}>
              {user.username} ({user.name})
            </li>
          ))}
      </ul>
      )}
      {loading && <div>로딩중</div>}
      <button onClick={fetchUsers}>다시 불러오기</button>
    </div>
  );
}

export default Users;

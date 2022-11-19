// Функциональный компонент и хуки
import React, { useState } from "react";
import styled from "styled-components";

const Counter = () => {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  return (
    <div>
      <h1>{count}</h1>
      <ButtonBoxIncrement count={count} onClick={increment}>
        Increment
      </ButtonBoxIncrement>
      <ButtonBoxDecrement onClick={decrement}>Decrement</ButtonBoxDecrement>
    </div>
  );
};

const ButtonBoxIncrement = styled.button`
  background: ${(props) => (props.count > 3 ? "red" : "green")};
`;

const ButtonBoxDecrement = styled.button``;

export default Counter;

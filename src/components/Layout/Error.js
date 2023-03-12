import React from "react";
import styled from "styled-components";

const Error = ({ message }) => {
  return (
    <Wrapper className="text-center">
      <h2>{message}</h2>
    </Wrapper>
  );
};

export default Error;
const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

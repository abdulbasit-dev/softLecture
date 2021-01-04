import React from 'react';
import styled from 'styled-components';

const StyledBtn = styled.button`
  border: 3px solid #c2c2c2;
  outline: none;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  border-radius: 10px;

  background: transparent;
  padding: 0.3rem 1rem;
  &:hover {
    cursor: pointer !important;
  }
  & h3 {
    color: #c2c2c2;
    vertical-align: middle;
  }
`;
function CardButton({ text, url, subject }) {
  return (
    <StyledBtn>
      <h3>{text}</h3>
    </StyledBtn>
  );
}
export default CardButton;

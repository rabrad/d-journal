import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Label = styled.label`
  font-weight: 500;
  color: ${({ color }) => (color ? color : '#334858')};
  position: absolute;
  pointer-events: none;
  left: 25px;
  top: 30px;
  transition: 0.2s ease all;
`;

export const FormTitle = styled.p`
  margin-bottom: 0.6rem;
  margin-top: 0.6rem;
  text-align: center;
  font-size: 1.5rem;
`;

export const Input = styled.input.attrs((props) => ({
  autoComplete: 'off',
}))`
  width: ${({ small }) => (small ? '50%;' : '100%')};
  padding: 10px 20px;
  margin: 8px 0;
  outline: none;
  color: ${({ color }) => color};
  border: none;
  border-bottom: 1px solid
    ${({ borderColor }) => (borderColor ? borderColor : '#BDBDBD')};
  &:focus ~ ${Label}, :not(:focus):valid ~ ${Label} {
    top: 10px;
    left: 15px;
    font-size: 11px;
  }
  background: ${({ background }) => (background ? background : 'none')};
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const InputHolder = styled.div`
  position: relative;
  padding-top: 10px;
`;

export const Form = styled.form`
  /* z-index: 1; */
  color: ${({ color }) => (color ? color : '#334858')};
  flex-direction: column;
  display: flex;
  padding: 1rem;
  border-radius: 7px;
  border: 1px solid #bdbdbd;
  margin: 1rem 0 1rem 0;
  width: ${({ width }) => width};

  width: ${({ small }) => {
    if (small) {
      return '50%';
    } else {
      return '100%';
    }
  }};
  height: ${({ height }) => height};
  background: ${({ background }) => background};

  @media (min-width: 576px) {
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 992px) {
    width: ${({ md }) => md};
  }
  @media (min-width: 1200px) {
  }
`;

export const GridButtons = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
`;

export const StyledLink = styled(Link)`
  color: #334858;
  text-decoration: none;
  font-size: 0.8rem;
  margin: 1.3rem 0 0.5rem 0;
  &:hover {
    color: #2d9cdb;
  }
`;

export const SendContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100%;
`;

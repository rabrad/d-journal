import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';
import logo from '../../assets/app-logo.svg';
import { Container } from '../shared/GridSystem';

const Ul = styled.ul`
  list-style-type: none;
  width: 50%;
  display: flex;
  color: #334858;
  font-size: 14px;
  font-weight: bolder;
  font-family: cursive;
  justify-content: space-around;
  margin-left: auto;
  align-items: center;
`;

export const Menu = styled.nav`
  display: flex;
  width: 100%;
  position: relative;
  padding: 1.5rem 1rem;
  @media (max-width: 576px) {
    ${Ul} {
      display: flex;
      flex-direction: column;
      position: absolute;
      right: 0px;
      top: 100px;
      background: #dff2ff;
      width: 100%;
      visibility: ${(props) => props.show || 'hidden'};
      z-index: 100;
    }
  }
`;
const Link = styled(NavLink)`
  text-decoration: none;
  transition: 0.5 ease-in-out;
  color: ${(props) => props.active || ` #334858`};
  &:hover {
    color: #2d9cdb;
  }
  @media (max-width: 576px) {
    display: flex;
    justify-content: space-around;
    height: 10vh;
    padding-top: 0.5rem;
  }
`;
const HamburgerButton = styled.i`
  position: absolute;
  right: 20px;
  color: #334858;
  font-size: 1.6rem;
  top: 47px;
  cursor: pointer;
  visibility: ${({ visibility }) => visibility};
  @media (min-width: 576px) {
    visibility: hidden;
  }
`;

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const router = useLocation();

  function isActive(route) {
    return route === router.pathname;
  }
  const [open, toggle] = useState(false);

  return (
    <Container>
      <Menu show={open ? 'visible' : 'hidden'}>
        <Link to='/'>
          <img src={logo} alt='Dev Journal logo' />
        </Link>
        <HamburgerButton
          onClick={(e) => toggle(!open)}
          className={`fas fa-${open ? 'times' : 'bars'}`}
          visibility={isAuthenticated ? 'visible' : 'hidden'}></HamburgerButton>
        <Ul>
          {isAuthenticated && (
            <>
              <Link
                active={isActive('/createNote') ? '#2D9CDB' : '#334858'}
                to='/createNote'
                onClick={() => toggle(false)}>
                Add note
              </Link>

              <Link
                active={isActive('/notes') ? '#2D9CDB' : '#334858'}
                to='/notes'
                onClick={() => toggle(false)}>
                Notes
              </Link>

              <Link
                active={isActive('/me') ? '#2D9CDB' : '#334858'}
                to='/me'
                onClick={() => toggle(false)}>
                Me
              </Link>
              <Link
                active={isActive('/reviewNote') ? '#2D9CDB' : '#334858'}
                to='/reviewNote'
                onClick={() => toggle(false)}>
                Review note
              </Link>
              <Link
                active={isActive('/reviewNote') ? '#2D9CDB' : '#334858'}
                to='#!'
                onClick={(e) => {
                  dispatch(logout());
                  toggle(false);
                }}>
                Logout
              </Link>
            </>
          )}
        </Ul>
      </Menu>
    </Container>
  );
};

export default Navbar;

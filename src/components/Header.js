import React from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../images/Logo.png';
import './Header.css';
import { Image } from 'antd';

function Header() {
  return (
    <div class="header">
      {/* logo */}

      <img
        src={Logo}
        className="header__logo img-fluid"
        alt="logo"
        style={{ width: '200px' }}
      />

      <nav className="header__nav">
        <li>
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/subjects">Subjects</NavLink>
        </li>

        <li>
          <NavLink to="/lectures">Lectures</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </nav>
    </div>
  );
}

export default Header;

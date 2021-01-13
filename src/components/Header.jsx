import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { ACTIONS, LectureContext } from "../LectureConetxt";
// import Logo from '../assets/images/Logo.png';
import "./Header.css";
import { auth } from "../firebase";

function Header(props) {
  const [state, dispatch] = useContext(LectureContext);

  function handleLogout() {
    auth.signOut();
    dispatch({ type: ACTIONS.USER, user: null });
  }

  return (
    <div
      className={` flex items-center   h-24  mx-auto mb-8 ${
        props.shadow ? "shadow-md" : ""
      }`}
    >
      <div className="container">
        {/* <img
        src={Logo}
        className="header__logo img-fluid cursor-pointer"
        alt="logo"
        style={{ width: '200px' }}
      /> */}

        <nav className="header__nav flex flex-1  items-center  justify-between">
          <ul className="flex items-center">
            <li className="mr-3">
              <NavLink to="/" className="p-1 mr-2" exact>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" className="p-1 mr-2">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/feedback" className="p-1 mr-2">
                Send Feedback
              </NavLink>
            </li>
          </ul>
          <ul>
            {state.user ? (
              <div className="flex items-center">
                <li className="mr-3 hover:text-indigo-500">
                  {state.user.email}
                </li>
                <li
                  className="font-bold uppercase cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </div>
            ) : (
              <li className="mr-3">
                <NavLink to="/admin/signin">Sign In</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;

import React from "react";
import { Link } from "react-router-dom";
import LogoImg from "../images/Logo-removebg-preview.png";
import menuBar from "../images/menu_32.png";
import "../style/navbar.scss";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={LogoImg} />
      </div>
      <ul className="menu">
        <li>
          <Link to="/" className="link">
            <h3>Home</h3>
          </Link>
        </li>
        <li>
          <Link to="/staking" className="link">
            <h3>Staking</h3>
          </Link>
        </li>
        <li>
          <Link to="/buyingtoken" className="link">
            <h3>BuyToken</h3>
          </Link>
        </li>
        <li>
          <Link to="/swap" className="link">
            <h3>BuyTree</h3>
          </Link>
        </li>
      </ul>
      <Link className="menubar">
        <img src={menuBar} />
      </Link>
    </nav>
  );
};

export default NavBar;

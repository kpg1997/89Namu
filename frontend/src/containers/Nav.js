import React from 'react'
import '../style/Nav.scss';
import Logo from "../images/Logo-removebg-preview.png"
import { Link } from 'react-router-dom';
import UserState from './UserState';
const Nav = ({ palgunamu, account, treefactory , setHolomi, setHTR, setAccount }) => {
    return (
        <div className="NavBar">
            <div className="Logo"><img src={Logo} /></div>
            <div className="menu">
                <ul className="menu">
                    <li>
                        <Link to="/" className="link">
                            <h3>Home</h3>
                        </Link>
                    </li>
                    <li>
                        <Link to="/shop" className="link">
                            <h3>Shop</h3>
                        </Link>
                    </li>
                    <li>
                        <Link to="/staking" className="link">
                            <h3>Staking</h3>
                        </Link>
                    </li>
                    <li>
                        <Link to="/buyingtoken" className="link">
                            <h3>Token</h3>
                        </Link>
                    </li>
                    <li>
                        <Link to="/swap" className="link">
                            <h3>Tree</h3>
                        </Link>
                    </li>

                </ul>
            </div>
            <UserState  palgunamu={palgunamu} account={account} treefactory={treefactory} setHolomi={setHolomi} setHTR={setHTR} setAccount={setAccount}/>        
        </div>
    )
}

export default Nav

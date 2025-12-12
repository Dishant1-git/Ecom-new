import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import { Logout } from './reducer/userslice';
import context from './usecontext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faComments } from '@fortawesome/free-solid-svg-icons';


const Userheader = () => {
    const [info, setInfo] = useState(null);
    const { setUsertype } = useContext(context);

    const { Loggedin } = useSelector((state) => state.userslice);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Load user info from session storage once
    useEffect(() => {
        const userData = sessionStorage.getItem('userinfo');
        if (userData) {
            try {
                const parsed = JSON.parse(userData);
                setInfo(parsed);
            } catch (err) {
                console.error("Error parsing session userinfo:", err);
            }
        } else {
            setInfo(null);
        }
    }, [Loggedin]);

    const onLogout = () => {
        dispatch(Logout());
        sessionStorage.clear();
        navigate("/login");
        setUsertype(null);
        setInfo(null);
    };

    return (
        <header>
            <div className="top-header">
                <div className="mobile-fix-option"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="header-contact">
                                <ul>
                                    <li>
                                        Welcome{" "}
                                        <span style={{ color: "#ec8951" }}>
                                            {info?.firstname || "Guest"}
                                        </span>{" "}
                                        to Our store Bakery
                                    </li>
                                    <li>
                                        <i className="ri-phone-fill"></i>
                                        Call Us: 123 - 456 - 7890
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 text-end">
                            <ul className="header-dropdown">
                                <li className="onhover-dropdown mobile-account">
                                    <i className="ri-user-fill"></i>
                                    My Account
                                    <ul className="onhover-show-div">
                                        {Loggedin ? (
                                            <li onClick={onLogout}>
                                                <Link to="#">Logout</Link>
                                            </li>
                                        ) : (
                                            <>
                                                <li>
                                                    <Link to="/login">Login</Link>
                                                </li>
                                                <li>
                                                    <Link to="/register">Register</Link>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="main-menu">
                            <div className="menu-left">
                                <div className="brand-logo">
                                    <Link to="/">
                                        <img
                                            src="../assets/images/bakery.png"
                                            className="img-fluid blur-up lazyload"
                                            alt=""
                                            style={{ height: "75px" }}
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div className="menu-right pull-right">
                                <nav id="main-nav">
                                    <div className="toggle-nav">
                                        <i className="ri-bar-chart-horizontal-line sidebar-bar"></i>
                                    </div>
                                    <ul id="main-menu" className="sm pixelstrap sm-horizontal">
                                        <li className="mobile-box">
                                            <div className="mobile-back text-end">
                                                Menu<i className="ri-close-line"></i>
                                            </div>
                                        </li>
                                        <li>
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="mega hover-cls">
                                            <Link to="#">About Us</Link>
                                        </li>
                                        <li>
                                            <Link to="/contact">Contact Us</Link>
                                        </li>
                                        <li>
                                            <Link to="/addtocart">
                                                <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '5px' }} />
                                                Cart
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/chat">
                                                <FontAwesomeIcon icon={faComments} style={{ marginRight: '5px' }} />
                                                Assistant
                                            </Link>
                                        </li>

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Userheader;

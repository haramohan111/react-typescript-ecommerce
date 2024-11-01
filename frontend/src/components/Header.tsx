import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
import { ReactComponent as IconPersonBadgeFill } from "bootstrap-icons/icons/person-badge-fill.svg";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconListCheck } from "bootstrap-icons/icons/list-check.svg";
import { ReactComponent as IconDoorClosedFill } from "bootstrap-icons/icons/door-closed-fill.svg";
import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconBellFill } from "bootstrap-icons/icons/bell-fill.svg";
import { ReactComponent as IconInfoCircleFill } from "bootstrap-icons/icons/info-circle-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/cartContext";
import { userlogout, verifyUser } from "../actions/userAction";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useAuth } from "../context/auth";

interface UserState {
  loginInfo: {
    accessToken?: string; // Make accessToken optional
    success?: string[];
  };
  userverify:{
    success:boolean;
    message:string;
  }
  register: any[]; // Initialize register with an empty array
  authcheck: any[]; // Initialize authcheck with an empty array
}

interface RootState {
  userreducer: UserState;
}

const Header: React.FC = () => {
  const [cartItems] = useCart();
  const [auth] = useAuth();
  // const userList = useSelector((state: RootState) => state.userreducer);
  // const { loginInfo,userverify } = userList;
  //const[checklog,setChecklog]= useState<boolean>(false);
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const navigate = useNavigate();
  console.log(auth)
  // useEffect(() => {
  //   dispatch(verifyUser());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (auth) {
  //     setChecklog(true);
  //   } else {
  //     setChecklog(false);
  //   }
  // }, [auth]);

  const handleLogout = () => {
    dispatch(userlogout(navigate));
  };

  return (
    <React.Fragment>
      <header className="p-3 border-bottom bg-light">
        <div className="container-fluid">
          <div className="row g-3">
            <div className="col-md-3 text-center">
              <Link to="/">
                <img alt="logo" src="../../images/logo.webp" />
              </Link>
            </div>
            <div className="col-md-5">
              <Search />
            </div>
            <div className="col-md-4">
              <div className="position-relative d-inline me-3">
                <Link to="/cart" className="btn btn-primary">
                  <IconCart3 className="i-va" />
                  {cartItems.length > 0 && (
                    <div className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-circle">
                      {cartItems.length}
                    </div>
                  )}
                </Link>
              </div>
              {  auth?(
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-secondary rounded-circle border me-3"
                    data-toggle="dropdown"
                    aria-expanded="false"
                    aria-label="Profile"
                    data-bs-toggle="dropdown"
                  >
                    <FontAwesomeIcon icon={faUser} className="text-light" />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/account/profile">
                        <IconPersonBadgeFill /> My Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/star/zone">
                        <IconStarFill className="text-warning" /> Star Zone
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/account/orders">
                        <IconListCheck className="text-primary" /> Orders
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/account/wishlist">
                        <IconHeartFill className="text-danger" /> Wishlist
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/account/notification">
                        <IconBellFill className="text-primary" /> Notification
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/support">
                        <IconInfoCircleFill className="text-success" /> Support
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/">
                        <IconDoorClosedFill className="text-danger" /> 
                        <button onClick={handleLogout} style={{ background: 'none', border: 'none', padding: 0 }}>
                          Logout
                        </button>
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="position-relative d-inline me-3">
                  <Link to="/account/signin" className="btn btn-primary">
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;

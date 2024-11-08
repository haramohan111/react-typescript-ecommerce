import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from './views/pages/spinner/Spinner'; // Correct path
import axios from 'axios';
import api from './utils/api';
import { verifyUser } from './actions/userAction';
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

interface UserState {
  userverify: {
    success: boolean;
  };
}

interface UserRootState {
  userreducer: UserState;
}

const PrivateRoute: React.FC = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const [checkauth, setCheckauth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start as loading

  const userList = useSelector((state:UserRootState)=>state.userreducer)
  const {userverify} = userList

  const apiUrl = process.env.REACT_APP_API_URL;
console.log("private route")
  const verifyToken = async () => {

    try {
      //const response = await axios.post(`${apiUrl}/api/v1/userverify`,null, { withCredentials: true });
      await dispatch(verifyUser());
      setCheckauth(userverify.success);
    } catch (error) {
      console.error(error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  // const { userinfo } = useSelector((state: UserRootState) => state.userreducer);
  // const token = userinfo?.accessToken;

  if (isLoading) {
    return <Spinner />;
  }
console.log(checkauth)
  return checkauth ? <Outlet /> : <Navigate to="/account/signin" replace={true} />;
}

export default PrivateRoute;

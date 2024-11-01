import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from './views/pages/spinner/Spinner'; // Correct path
import axios from 'axios';
import api from './utils/api';

interface UserState {
  userinfo: {
    accessToken: string;
  };
}

interface UserRootState {
  userreducer: UserState;
}

const PrivateRoute: React.FC = () => {
  const [checkauth, setCheckauth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start as loading

  const apiUrl = process.env.REACT_APP_API_URL;

  const verifyToken = async () => {

    try {
      const response = await axios.post(`${apiUrl}/api/v1/userverify`,null, { withCredentials: true });
      setCheckauth(response.data.success);
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

  return checkauth ? <Outlet /> : <Navigate to="/account/signin" replace={true} />;
}

export default PrivateRoute;

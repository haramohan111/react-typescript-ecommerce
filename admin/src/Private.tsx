import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from './views/pages/spiner/Spinner';
import axios from 'axios';

interface userState {
  userinfo: {
    accessToken: string
  }
}

interface userRootState {
  userreducer: userState
}

const PrivateRoute: React.FC = () => {

  const [checkauth, setCheckauth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const location = useLocation();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const currentPath = location.pathname;
  //   localStorage.setItem('lastPath', currentPath);
  // }, [location]);

  // useEffect(() => {
  //   const lastPath = localStorage.getItem('lastPath');
  //   if (lastPath) {
  //     navigate(lastPath);
  //   }
  // }, [navigate]);

  // navigate(location.pathname, { replace: true })

  const apiUrl = process.env.REACT_APP_API_URL
  const verifyToken = async () => {
    const atoken = JSON.parse(localStorage.getItem('refreshToken')!);
    try {
      const response = await axios.post(`${apiUrl}/api/v1/verify`, { atoken });
      console.log(response.data.success)
      setCheckauth(response.data.success);
    } catch (error) {
      console.error(error);
    }finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, [])

  const { userinfo } = useSelector((state: userRootState) => state.userreducer);
  const token = userinfo?.accessToken;
  // const token = localStorage.getItem('refreshToken'); // Check if token exists
  ;

  if (isLoading) {
    return <Spinner/>;
  }
  console.log(checkauth)
  return checkauth ? <Outlet /> : <Navigate to="/admin" replace={true} />;
  // return ok ? <Outlet /> : <Login />;
}

export default PrivateRoute

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface userState {
  userinfo: {
    accessToken: string
  }
}

interface userRootState {
  userreducer: userState
}

const PrivateRoute: React.FC = () =>{

  // const [checkauth,setCheckauth] = useState(false)
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

  // const apiUrl = process.env.REACT_APP_API_URL
  // useEffect(async () => {
  //   const atoken = JSON.parse(localStorage.getItem('accessToken'));

  //   await axios.post(`${apiUrl}/api/v1/verify`, { atoken })
  //     .then((response) => {
  //       console.log(response)
  //     }).catch((error) => {
  //       console.log(error)
  //     })
  // },[])

  const { userinfo } = useSelector((state: userRootState) => state.userreducer);
  const token = userinfo?.accessToken;
  // const token = localStorage.getItem('refreshToken'); // Check if token exists
  // console.log("response")
  return token ? <Outlet /> : <Navigate to="/admin" />;
  // return ok ? <Outlet /> : <Login />;
}

export default PrivateRoute

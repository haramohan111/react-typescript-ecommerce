import React, { Component, Suspense, useEffect } from "react";
import { HashRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./scss/style.scss";
import PrivateRoute from "./Private";
import { setNavigate } from "./utils/navigationHelper";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const App: React.FC = () =>{
  const navigate = useNavigate();

  useEffect(() => {
      setNavigate(navigate);
  }, [navigate]);
    return (

        <Suspense fallback={loading}>
          <Routes>
          <Route path="/admin" element={<Login />} />
            <Route element={<PrivateRoute />}>

              {/* <Route exact path="/dashboard" name="dash" element={<Dashboard />}  /> */}
              <Route path="/register"  element={<Register />}/>
              <Route path="/404" element={<Page404 />} />
              <Route path="/500"  element={<Page500 />} />
              <Route path="/*" element={<DefaultLayout />} />
            </Route>
            <Route path="*" element={<Page404 />} /> {/* Catch-all route for 404 */}
          </Routes>
        </Suspense>
   
    )
  
}

export default App

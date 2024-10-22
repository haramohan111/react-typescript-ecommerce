import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth";
const Spinner = () => {
  const [auth] = useAuth();
  const navigate = useNavigate()
  console.log(auth.token)
  // useEffect(() => {
  //   if (auth.token){
  //     navigate('/dashboard')
  //   }
  // }, [])
  return (
    <>  
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="Text-center">redirecting to you in second </h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;

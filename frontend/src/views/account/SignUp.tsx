import React, { lazy, Component } from "react";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { signup } from "../../actions/userAction";
const SingUpForm = lazy(() => import("../../components/account/SignUpForm"));


interface userRoot{
  loading:boolean,
  error:string,
  register:string[]
}

interface userRootReducer{
  userreducer:userRoot
}

const SignUpView = () => {
  let navigate = useNavigate();
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const {loading,error,register} = useSelector((state:userRootReducer)=>state.userreducer)

  const onSubmit = async (values:any) => {
    //alert(JSON.stringify(values));
    console.log(values)
    dispatch(signup(values,navigate,toast))
  };

    return (
      <>
   
      <div className="container my-3">
        <div className="row border">
          <div className="col-md-6 bg-light bg-gradient p-3 d-none d-md-block">
            <Link to="/">
              <img
                src="../../images/banner/Dell.webp"
                alt="..."
                className="img-fluid"
              />
            </Link>
            <Link to="/">
              <img
                src="../../images/banner/Laptops.webp"
                alt="..."
                className="img-fluid"
              />
            </Link>
          </div>
          <div className="col-md-6 p-3">
            <h4 className="text-center">Sign Up</h4>
            <SingUpForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
      </>
    );
}


export default SignUpView;

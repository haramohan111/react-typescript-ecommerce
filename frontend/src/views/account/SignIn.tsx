import React, { lazy, useEffect} from "react";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast} from 'react-toastify';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import { loginUser } from "../../actions/userAction";
import { useAuth } from "../../context/auth";
const SignInForm = lazy(() => import("../../components/account/SignInForm"));


interface UserState{
  loading:string,error:string,login:string
}
interface userRootreducer{
  userreducer:UserState
}
interface SignInFormValues {
  email: string;
  password: string;
}

interface UserState {
  loginInfo: {
    success: string[],
  }
  userverify:{
    success:boolean;
  }
  register: [], // Initialize register
  authcheck: [], // Initialize authcheck
}
interface userRootreducer {
  userreducer: UserState
}
const SignInView = () => {

  let navigate = useNavigate();
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  //const {loading,error,login} = useSelector((state:userRootreducer)=>state.userreducer)
  const userList = useSelector((state:userRootreducer)=>state.userreducer)
  const {userverify} = userList
console.log(userverify.success)
  const onSubmit = async (values:SignInFormValues) => {
  // alert(JSON.stringify(values));
   dispatch(loginUser(values,navigate,toast))
  };

  useEffect(() => {
    if (userverify.success) {
   navigate("/")
    } 
  }, [userverify]);
 
    return (
      <>
      <ToastContainer/>
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
            <h4 className="text-center">Sign In</h4>
            <SignInForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
      </>
    );
  
}

export default SignInView;

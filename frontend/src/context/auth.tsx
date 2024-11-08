import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { verifyUser } from '../actions/userAction';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// Define the type for the context value
type AuthContextType ={} | false; 
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

type AuthContextValue = [AuthContextType, Dispatch<SetStateAction<AuthContextType>>];

// Create the context with a default value
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const[checklog,setChecklog]= useState<boolean>(false);

  const userList = useSelector((state: RootState) => state.userreducer);
  const { userverify } = userList;
  const [auth, setAuth] = useState<AuthContextType>(false);
  console.log("auth.tsx")
  useEffect(() => {
    const checkAuth = async () => {
    console.log("verifyUser")
    await dispatch(verifyUser());
    }
    checkAuth();
  }, [dispatch]);


  useEffect(() => {
    if (userverify) {
      setAuth(userverify.success);
    }
  }, [userverify]);

  return (
    <AuthContext.Provider value={[auth,setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  token: string;
}

const AuthContext = createContext<[AuthContextType, React.Dispatch<React.SetStateAction<AuthContextType>>] | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthContextType>({ token: "" });

  useEffect(() => {
    const str = localStorage.getItem("auth");

    function gfg_Run() {
      return testJSON(str);
    }

    // Function to test string
    function testJSON(text: string | null): boolean {
      if (typeof text !== "string") {
        return false;
      }
      try {
        JSON.parse(text);
        return true;
      } catch (error) {
        return false;
      }
    }

    if (gfg_Run()) {
      const data = localStorage.getItem("auth");

      if (data) {
        const parseData = JSON.parse(data);
        setAuth({ token: parseData });
      }
    } else {
      setAuth({ token: '' });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): [AuthContextType, React.Dispatch<React.SetStateAction<AuthContextType>>] => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };

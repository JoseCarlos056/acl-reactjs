import { createContext, useCallback, useContext, useState } from "react";
import { api } from "../services/api";
interface TokenState{
  token: string;
}
interface AuthContextState{
  token: TokenState;
  signIn({username, password}: UserData) : Promise<void>;
  userLooged(): boolean;
}
interface UserData{
  username: string;
  password: string;
}
const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children }) =>{
  const [token, setToken] = useState<TokenState>(() => {
    const token = localStorage.getItem("@PermissionYT:token");

    if (token) {
      api.defaults.headers.common['Authorization']  = `Bearer ${token}`;

      return { token };
    }

    return {} as TokenState;
  });
  const signIn = useCallback(async ({ username, password} : UserData)=>{
      const response = await api.post('/sessions', {
        username,
        password
      })
      const { token } = response.data;
      setToken(token)
      localStorage.setItem('@PermissionYT:token', token);
      api.defaults.headers.common['Authorization']  = `Bearer ${token}`;
  },[]) 

  const userLooged = useCallback(()=>{
    const token = localStorage.getItem('@PermissionYT:token');
    return token ? true :  false
  },[])
return(
  <AuthContext.Provider value={{
    token,
    signIn,
    userLooged
  }}>
    {children}
  </AuthContext.Provider>
)
}

function useAuth() :AuthContextState{
  const context = useContext(AuthContext);
  return context
  
}
export { useAuth, AuthProvider}
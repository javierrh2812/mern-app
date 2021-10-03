import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
  useCallback,
} from "react";
import { login, register, getUser, updateUser as update } from "api/axios";

const authContext = createContext();

export const USER_STATES = {
  NOT_KNOWN: undefined,
  NOT_LOGGED: null,
};

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN);

  const checkAuth = useCallback(async () => {
    console.log("checking session");
    const session = window.sessionStorage.getItem("user");
    if (!session) setUser(USER_STATES.NOT_LOGGED);
    else setUser(JSON.parse(session));
  }, []);

  const signin = useCallback(async (email, password) => {
    return login(email, password).then(res => {
      window.sessionStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
    });
  }, []);

  const updateUser = useCallback(async (id, userData) => {
    return update(id, userData).then(res => res.data);
  }, []);

  const fetchUser = useCallback(async id => {
    return getUser(id).then(res => res.data);
  }, []);

  const signup = useCallback(async userData => {
    return register(userData).then(res => {
      window.sessionStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
    });
  }, []);

  const signout = useCallback(() => {
    console.log("signing out");
    setUser(null);
    window.sessionStorage.removeItem("user");
  }, []);

  useEffect(() => {});

  const value = useMemo(
    () => ({
      user,
      signin,
      signout,
      signup,
      fetchUser,
      updateUser,
      checkAuth,
    }),
    [user, signin, signout, signup, fetchUser, updateUser, checkAuth]
  );
  return value;
}

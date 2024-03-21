import { createContext, useContext, useReducer } from 'react';

interface User {
  first: string | null;
  last: string | null;
  email: string | null;
  accessToken: string | null;
  roles: string[] | null;
}

interface ContextProvider {
  children: React.ReactNode;
}

enum AuthReducerActionType {
  LOGIN_USER,
  LOGOUT_USER,
}

interface AuthContextReducerPayload {
  first: string;
  last: string;
  email: string;
  accessToken: string;
  roles: string[];
}

interface AuthContextReducerAction {
  type: AuthReducerActionType;
  payload?: AuthContextReducerPayload;
}

const initialState: User = {
  first: null,
  last: null,
  accessToken: null,
  email: null,
  roles: null,
};

const AuthContext = createContext<AuthContext>({} as AuthContext);

function reducer(state: User, action: AuthContextReducerAction): User {
  switch (action.type) {
    case AuthReducerActionType.LOGIN_USER:
      return {
        ...state,
        roles: action.payload?.roles as string[],
        first: action.payload?.first as string,
        last: action.payload?.last as string,
        accessToken: action.payload?.accessToken as string,
        email: action.payload?.email as string,
      };
    case AuthReducerActionType.LOGOUT_USER:
      return {
        ...state,
        roles: null,
        first: null,
        last: null,
        accessToken: null,
        email: null,
      };
    default:
      throw new Error('Unknown Action');
  }
}

function AuthProvider({ children }: ContextProvider) {
  const [{ first, last, accessToken, email, roles }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(
    first: string,
    last: string,
    accessToken: string,
    email: string,
    roles: string[]
  ) {
    dispatch({
      type: AuthReducerActionType.LOGIN_USER,
      payload: { first, last, accessToken, email, roles },
    });
  }

  function logout() {
    dispatch({ type: AuthReducerActionType.LOGOUT_USER });
  }

  return (
    <AuthContext.Provider
      value={{ first, last, accessToken, email, roles, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };

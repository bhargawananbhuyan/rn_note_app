import { createContext, useReducer } from "react";

export const AuthContext = createContext();

let initialState = {
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER":
      return {
        user: action.payload,
      };

    case "UPDATE_USER":
      return {
        user: action.payload,
      };

    default:
      return state;
  }
};

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        getUser: (payload) => dispatch({ type: "GET_USER", payload }),
        updateUser: (payload) => dispatch({ type: "UPDATE_USER", payload }),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

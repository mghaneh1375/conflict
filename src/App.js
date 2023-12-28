import "./App.css";
import MyApp from "./MyApp";
import { createContext } from "react";
import { useReducer } from "react";

const defaultGlobalState = {
  showError: false,
  showSuccess: false,
  errMsg: undefined,
  loading: false,
  showDialog: false,
  dialogTitle: undefined,
  dialogMsg: undefined,
  dialogOnAccept: undefined,
  token: window.localStorage.getItem("token"),
};

export const globalStateContext = createContext(defaultGlobalState);
export const dispatchStateContext = createContext(undefined);

const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state, newValue) => ({ ...state, ...newValue }),
    defaultGlobalState
  );

  return (
    <globalStateContext.Provider value={state}>
      <dispatchStateContext.Provider value={dispatch}>
        {children}
      </dispatchStateContext.Provider>
    </globalStateContext.Provider>
  );
};

function App() {
  return (
    <GlobalStateProvider>
      <MyApp />
    </GlobalStateProvider>
  );
}

export default App;

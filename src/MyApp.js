import { Alert, Box, CircularProgress, Grid, Snackbar } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import CurrTermDuplicate from "./pages/currTermDuplicate/CurrTermDuplicate";
import DuplicateUserMailRecords from "./pages/duplicateUserMailRecords/DuplicateUserMailRecords";
import OSDTransactionConflicts from "./pages/OSDTransactionConflicts/OSDTransactionConflicts";
import { dispatchStateContext, globalStateContext } from "./App";
import { useContext } from "react";
import ConflictInClassesWithPassed from "./pages/conflictInClassesWithPassed/ConflictInClassesWithPassed";
import Confirmation from "./components/Confirmation";
import ConflictInPassedWithClasses from "./pages/conflictInPassedWithClasses/ConflictInPassedWithClasses";

function MyApp() {
  const useGlobalState = () => [
    useContext(globalStateContext),
    useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();

  return (
    <Grid>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/currTermDuplicates" element={<CurrTermDuplicate />} />
        <Route
          path="/conflictInClassesWithPassed"
          element={<ConflictInClassesWithPassed />}
        />
        <Route
          path="/ConflictInPassedWithClasses"
          element={<ConflictInPassedWithClasses />}
        />
        <Route
          path="/duplicateUserMailRecords"
          element={<DuplicateUserMailRecords />}
        />
        <Route
          path="/OSDTransactionConflicts"
          element={<OSDTransactionConflicts />}
        />
      </Routes>

      <Snackbar
        open={state.showError}
        autoHideDuration={3000}
        severity="error"
        onClose={() => {
          dispatch({ showError: false, errMsg: undefined });
        }}
      >
        <Alert
          onClose={() => {
            dispatch({ showError: false, errMsg: undefined });
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
          {state.errMsg}
        </Alert>
      </Snackbar>

      <Snackbar
        open={state.showSuccess}
        autoHideDuration={3000}
        severity="success"
        onClose={() => {
          dispatch({ showSuccess: false });
        }}
      >
        <Alert
          onClose={() => {
            dispatch({ showSuccess: false });
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          Success
        </Alert>
      </Snackbar>

      <Confirmation />

      {state.loading && (
        <Box
          sx={{
            display: "flex",
            position: "fixed",
            zIndex: 1000,
            backgroundColor: "#aaa",
            opacity: "0.8",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            justifyContent: "center",
          }}
        >
          <CircularProgress sx={{ alignSelf: "center" }} />
        </Box>
      )}
    </Grid>
  );
}

export default MyApp;

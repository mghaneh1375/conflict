import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { dispatchStateContext, globalStateContext } from "../App";
import React, { useContext } from "react";

function Confirmation() {
  const useGlobalState = () => [
    useContext(globalStateContext),
    useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();

  const closeDialog = () => {
    dispatch({
      showDialog: false,
      dialogTitle: undefined,
      dialogMsg: undefined,
      dialogOnAccept: undefined,
    });
  };

  return (
    <Dialog
      open={state.showDialog}
      onClose={() => closeDialog()}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        {state.dialogTitle === undefined ? "" : state.dialogTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {state.dialogMsg === undefined ? "" : state.dialogMsg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeDialog()}>Cancel</Button>
        <Button
          onClick={() => {
            if (state.dialogOnAccept !== undefined) state.dialogOnAccept();
            closeDialog();
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Confirmation;

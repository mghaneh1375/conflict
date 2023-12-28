import { Typography } from "@mui/material";
import { toast } from "react-toastify";

export function showError(msg) {
  toast.error(<Typography>{msg}</Typography>);
}

export function showSuccess(msg) {
  toast.success(
    <Typography>
      {msg === undefined ? "عملیات موردنظر با موفقیت انجام شد" : msg}
    </Typography>
  );
}

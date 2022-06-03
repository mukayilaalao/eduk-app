import * as React from "react";
import Stack from "@mui/material/Stack";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function GeneralShowMessage({
  message,
  severity,
  open,
  handleClose,
  anchorOrigin,
}) {
  return (
    <div>
      <Stack spacing={2} sx={{ width: "50%" }}>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          anchorOrigin={anchorOrigin}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}

import * as React from "react";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import Snackbar from "@mui/material/Snackbar";
import { useCallback } from "react";
import { styled } from "@mui/material";

const IconCopy = styled(CopyAllIcon)({
  cursor: "pointer",
  transition: ".15s ease",
  borderRadius: "12px",
  padding: "2px",
  "&:active": {
    transform: "scale(1.2)",
    backgroundColor: "#f7f7f769;",
    transition: ".15s ease",
  },
});
export default function Notify({ open, setOpen, content }) {
  const { content:text, send } = content
  const [state, setState] = React.useState({
    vertical: "bottom",
    horizontal: "left",
  });

  const { vertical, horizontal } = state;

  const handleClose = () => {
    setState({ ...state });
    setOpen({...open, open:false});
  };

  const handleCopy = useCallback(
    (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(text);
    },
    [open, content]
  );
  return (
    <div>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
        open={open.open}
        onClose={handleClose}
        message={text}
        key={vertical + horizontal}
        action={send && <IconCopy onClick={handleCopy} />}
      />
    </div>
  );
}

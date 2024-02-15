import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import { SquadsContext, TreatsContext } from "../App";

export default function ConsecutiveSnackbars(props) {
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);
  const { squads, setSquads, prevSquad, setPrevSquad} = useContext(SquadsContext);


  React.useEffect(() => {
    if (props.snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...props.snackPack[0] });
      props.setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (props.snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [props.snackPack, messageInfo, open]);
  const handleUndo = (event, reason) => {
    const updatedSquads = squads.map((squad) => {
      if (squad.name === prevSquad) {
        // Remove the last log entry immutably
        const newLog = squad.log.slice(0, -1);
        
        // Recalculate total points (example calculation)
        const newTotal = newLog.reduce((acc, logEntry) => acc + logEntry.pointsCount, 0);
        
        // Return a new squad object with updated log and total
        return { ...squad, log: newLog, total: newTotal };
      }
      return squad;
    });
  
    // Update squads state with recalculated ranks and totals
    setSquads(updatedSquads);
    handleClose(event, reason);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <div>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}        
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        message={messageInfo ? messageInfo.message : undefined}
        action={
          <React.Fragment>
            <Button color="inherit" size="small" onClick={handleUndo}>
              UNDO
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

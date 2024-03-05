import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { SquadsContext } from "../App";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { theme } from "./CustomTheme.js";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function PointHistory() {
  const { squads } = useContext(SquadsContext);
  const { setSquads } = useContext(SquadsContext);
  const allEntries = squads.reduce((acc, squad) => {
    const entriesWithSquadName = squad.log.map((entry) => ({
      ...entry,
      squadName: squad.name, // Add the squad name to each entry for reference
    }));
    return acc.concat(entriesWithSquadName);
  }, []);
  // Sort the combined entries array by timestamp, most recent first

  const sortedEntries = allEntries.sort(
    (a, b) => new Date(b.entered) - new Date(a.entered)
  );

  function handleDeleteEntry(name, id) {
    setSquads(
      squads.map((squad) => {
        if (squad.name === name) {
          squad.log = squad.log.filter((item) => item.id !== id);
        }
        return squad;
      })
    );
  }

  function getPointsTotal() {
    var PointsTotal = 0;
    squads.map((squad) => {
      PointsTotal += squad.total;
      return squad;
    });
    return PointsTotal;
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        sx={{ borderRadius: theme.button.borderRadius }}
      >
        Point History
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-desscription"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">Point History</DialogTitle>
        <DialogContent>
          {sortedEntries.map((entry, index) => {
            return (
              <List component="div" disablePadding>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      title="Delete"
                      onClick={() =>
                        handleDeleteEntry(entry.squadName, entry.id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <Stack>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "h6.fontSize",
                      }}
                    >
                      {entry.treatName}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "400",
                        fontSize: "body2.fontSize",
                      }}
                    >
                      {entry.squadName +
                        " · " +
                        entry.pointsCount +
                        " points · " +
                        entry.entered}
                    </Typography>
                  </Stack>
                </ListItem>
              </List>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ borderRadius: theme.button.borderRadius }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

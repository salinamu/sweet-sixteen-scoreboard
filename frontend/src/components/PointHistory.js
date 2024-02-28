import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
import {theme} from './CustomTheme.js'

export default function PointHistory() {
    const { squads } = useContext(SquadsContext);
  const { setSquads } = useContext(SquadsContext);

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

      <Button onClick={handleClickOpen} sx = {{borderRadius: theme.button.borderRadius}}>Point History</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-desscription"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">Point History</DialogTitle>
        <DialogContent>

        {squads.map((squad) => {
          return (
            <List component="div" disablePadding>
            {squad.log.map((entry) => {
                  return (
                        <ListItem
                          sx={{ pl: 4}}
                          secondaryAction={
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              title="Delete"
                              onClick={() =>
                                handleDeleteEntry(squad.name, entry.id)
                              }
                              
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                        >
                          <ListItemText
                            primary={squad.name + " " + entry.treatName + " " + entry.pointsCount + " points" + entry.entered}
                          />
                        </ListItem>
                  );
                })}
                                                  </List>

          );
        })}
    
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx = {{borderRadius: theme.button.borderRadius}}>Done</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

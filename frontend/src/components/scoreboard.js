import * as React from "react";

import "../inputform.css";
import { useContext } from "react";
import { SquadsContext } from "../App";
import Button from "@mui/material/Button";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';




export default function Scoreboard(props) {
  const { squads } = useContext(SquadsContext);
  const { setSquads } = useContext(SquadsContext);

  function handleClear() {
    setSquads(
      squads.map((squad) => {
        squad.log = [];
        return squad;
      })
    );
  }

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
  const [open, setOpen] = React.useState();

  const handleClick = (name) => {
    if (open === name) {
      setOpen(null);
    } else {
      setOpen(name);
    }
  };

  function getPointsTotal() {
    var PointsTotal = 0;
    squads.map((squad) => {
      PointsTotal += squad.log.reduce(
        (total, currentValue) => (total = total + currentValue.pointsCount),
        0
      );
      return squad;
    });
    return PointsTotal;
  }

  return (
    <div>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="squads-subheader"
        subheader={
          <ListSubheader component="div" id="squads-subheader" disableSticky = "true">
            Squads
          </ListSubheader>
        }
      >
        {squads.map((squad) => {
          return (
            <div>
              <ListItemButton onClick={() => handleClick(squad.name)}>
                <ListItemText
                  primary={
                    squad.name +
                    " " +
                    squad.log.reduce(
                      (total, currentValue) =>
                        (total = total + currentValue.pointsCount),
                      0
                    )
                  }
                />
                {open === squad.name ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open === squad.name} timeout="auto" unmountOnExit>
                {squad.log.map((entry) => {
                  return (
                    <div>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText
                            primary={entry.treatName + ", " + entry.pointsCount}
                          />
                          <Button
                            onClick={() =>
                              handleDeleteEntry(squad.name, entry.id)
                            }
                          >
                            Delete
                          </Button>
                        </ListItemButton>
                      </List>
                    </div>
                  );
                })}
              </Collapse>
            </div>
          );
        })}
        <ListItem>
         <Box sx={{ fontWeight: 'fontWeightBold', fontSize: 'body.fontSize'}}>Total Points: {getPointsTotal()}</Box>
         </ListItem>
         <ListItem>
         <Button variant="contained" onClick={handleClear}>
        Clear
      </Button>
      </ListItem>

      </List>
      
    </div>
  );
}

import React from "react";
import { useState } from "react";
import { createContext } from "react";
import Form from "./components/Form.js";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuAppBar from "./components/MenuAppBar.js";
import "./App.css";
import { theme } from "./components/CustomTheme.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Leaderboard from "./components/Leaderboard.js";
import Container from "@mui/material/Container";
import ConsecutiveSnackbars from "./components/ConsecutiveSnackbars.js";
import { Typography } from "@mui/material";

// Create a new context and exports
export const SquadsContext = createContext();
export const TreatsContext = createContext();

function App() {
  const initialSquads = [];
  const initialTreats = [];
  const [squads, setSquads] = useState(initialSquads);
  const [treats, setTreats] = useState(initialTreats);
  const [snackPack, setSnackPack] = useState([]);
  const [prevSquad, setPrevSquad] = useState("");
  const addMessageToSnackPack = (message) => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  function handleAddTreat(category, countPerPointValue, pointValue) {
    if (!treats.find((treat) => treat.category === category)) {
      setTreats([
        ...treats,
        {
          id: treats.length - 1,
          category: category,
          countPerPointValue: countPerPointValue,
          pointValue: pointValue,
        },
      ]);
    } else {
    }
  }

  function handleAddSquad(name) {
    if (!squads.find((squad) => squad.name === name)) {
      const newId =
        squads.length > 0
          ? Math.max(...squads.map((squad) => squad.id)) + 1
          : 0;

      setSquads([
        ...squads,
        {
          id: newId,
          name: name,
          points: 0,
          log: [],
          total: 0,
          rank: 0,
        },
      ]);
    } else {
    }
  }

  handleAddSquad("Boyband");
  handleAddSquad("High School Musical");
  handleAddSquad("Lifeguards");
  handleAddSquad("Royals");
  handleAddSquad("Cops");
  handleAddSquad("Aliens");
  handleAddSquad("Vikings");
  handleAddSquad("Ninja");

  handleAddTreat("Theatre Box Candy", 1, 3);
  handleAddTreat("Candy Assorted", 5, 1);
  handleAddTreat("Snack Variety", 20, 15);
  handleAddTreat("Dum Dums", 15, 1);
  handleAddTreat("Juice Soda", 1, 1);
  handleAddTreat("Cookies and Cupcakes", 12, 6);

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ background: theme.palette.primary.mainGradient }}>
      <SquadsContext.Provider value={{ squads, setSquads, prevSquad, setPrevSquad }}>
        <TreatsContext.Provider value={{ treats, setTreats }}>
          <Container maxWidth="lg">

            <Grid container justifyContent="center" alignItems="center">
            <MenuAppBar appName="Sweet16" />

              <Grid item xs={12} sm={5.9} sx={{
                paddingRight: { sm: 1 }, // Add right padding on sm screens and larger to the first item
                paddingBottom: { xs: 2, sm: 0 }, // Add bottom padding on xs screens to the first item
              }}>
                <Leaderboard />
              </Grid>
              <Grid item xs={12} sm={5.9} sx={{
                paddingLeft: { sm: 1 }, // Add left padding on sm screens and larger to the second item
              }}>
                <Form addMessage={addMessageToSnackPack} />
              </Grid>
            </Grid>
            <ConsecutiveSnackbars snackPack={snackPack} setSnackPack={setSnackPack} />
          </Container>
        </TreatsContext.Provider>
      </SquadsContext.Provider>
    </Box>
  </ThemeProvider>
  );
}

export default App;

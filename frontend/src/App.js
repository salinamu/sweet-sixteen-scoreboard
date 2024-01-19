import React from "react";
import { useState } from "react";
import { createContext } from "react";
import Input from "./components/inputfield.js";
import Scoreboard from "./components/scoreboard.js";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Box from "@mui/material/Box";



import "./App.css";

// Create a new context and export
export const SquadsContext = createContext();
export const TreatsContext = createContext();

function App() {
  const initialSquads = [];
  const initialTreats = [];
  const [squads, setSquads] = useState(initialSquads);
  const [treats, setTreats] = useState(initialTreats);


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
      setSquads([
        ...squads,
        {
          id: squads.length - 1,
          name: name,
          points: 0,
          log: [],
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
    <div>
      <SquadsContext.Provider value={{ squads, setSquads }}>
        <TreatsContext.Provider value={{ treats, setTreats }}>

          <Scoreboard />

          <Box sx={{ m: 1, fontWeight: "fontWeightBold", fontSize: "h5.fontSize" }}>
            Add Points
          </Box>

         
          <Input/>



        </TreatsContext.Provider>
      </SquadsContext.Provider>
    </div>
  );
}

export default App;

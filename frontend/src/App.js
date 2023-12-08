import React from "react";
import { useState } from "react";
import { createContext } from "react";
import Input from "./components/inputfield.js";
import Scoreboard from "./components/scoreboard.js";


import "./App.css";

// Create a new context and export
export const SquadsContext = createContext();
export const TreatsContext = createContext();

function App() {
  const initialSquads = [
  ];
  const initialTreats = [
  ];
  const [squads, setSquads] = useState(initialSquads);
  const [treats, setTreats] = useState(initialTreats);
  const [squadOption, setSquadOption] = useState("");
  const [treatOption, setTreatOption] = useState("");


  function handleAddTreat(category, countPerPointValue, pointValue) {
    if (!treats.find((treat) => treat.category === category)) {
      setTreats([
        ...treats,
        {
          id: treats.length - 1,
          category: category,
          countPerPointValue: countPerPointValue,
          pointValue: pointValue
        },
      ]);
    } else {
      console.log("treat by category [" + category + "] already exists");
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
          log: []
        },
      ]);
    } else {
      console.log("squad by name [" + name + "] already exists");
    }
  }

  const handleSelectTreatOption = (event) => {
    setTreatOption(event.target.value);
  };
  const handleSelectSquadOption = (event) => {
    setSquadOption(event.target.value);
  };
  handleAddSquad('Boyband');
  handleAddSquad('High School Musical');
  handleAddSquad('Lifeguards');
  handleAddSquad('Royals');
  handleAddSquad('Cops');
  handleAddSquad('Aliens');
  handleAddSquad('Vikings');
  handleAddSquad('Ninja');

  handleAddTreat('Theatre Box Candy', 1, 3);
  handleAddTreat('Candy Assorted', 5, 1);
  handleAddTreat('Snack Variety', 20, 15);
  handleAddTreat('Dum Dums', 15, 1);
  handleAddTreat('Juice Soda', 1, 1);
  handleAddTreat('Cookies and Cupcakes', 12, 6);

  return (
    <div>
      <SquadsContext.Provider value={{ squads, setSquads }}>
        <TreatsContext.Provider value={{ treats, setTreats }}>
          <h1>Sweet Sixteen Scoreboard</h1>
          <button onClick={() => handleAddSquad("Jordan")}>
            Add squad named Jordan
          </button>
          <Scoreboard />

          <h2>Select Squad</h2>
          <select value={squadOption} onChange={handleSelectSquadOption}>
            <option value="Select Squad" defaultValue hidden>
              Select Squad
            </option>
            {squads.map((squad) => {
              return <option value={squad.name}>{squad.name}</option>;
            })}
          </select>

          {squadOption && (
            <div>
              <h2>Select Treat</h2>
              <select value={treatOption} onChange={handleSelectTreatOption}>
                <option value="Select Treat" defaultValue hidden>
                  Select Treat
                </option>
                {treats.map((treat) => {
                  return (
                    <option value={treat.category}>{treat.category}</option>
                  );
                })}
              </select>
            </div>
          )}

          {treatOption && (
            <Input itemName={treatOption} squadName={squadOption} />
          )}

        </TreatsContext.Provider>
      </SquadsContext.Provider>
    </div>
  );
}

export default App;

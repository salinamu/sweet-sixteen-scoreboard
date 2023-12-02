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
    {
      id: 0,
      name: "Boyband",
      points: 0,
    },
    {
      id: 1,
      name: "High School Musical",
      points: 0,
    },
    {
      id: 2,
      name: "Lifeguards",
      points: 0,
    },
    {
      id: 3,
      name: "Royals",
      points: 0,
    },
    {
      id: 4,
      name: "Cops",
      points: 0,
    },
    {
      id: 5,
      name: "Aliens",
      points: 0,
    },
    {
      id: 6,
      name: "Vikings",
      points: 0,
    },
    {
      id: 7,
      name: "Ninja",
      points: 0,
    },
  ];
  const treats = [
    {
      id: 0,
      category: "Theatre Box Candy",
      countPerPointValue: 1,
      pointValue: 3,
    },
    {
      id: 1,
      category: "Candy Assorted",
      countPerPointValue: 5,
      pointValue: 1,
    },
    {
      id: 2,
      category: "Snack Variety",
      countPerPointValue: 20,
      pointValue: 15,
    },
    {
      id: 3,
      category: "Dum Dums",
      countPerPointValue: 15,
      pointValue: 1,
    },
    {
      id: 4,
      category: "Juice Soda",
      countPerPointValue: 1,
      pointValue: 1,
    },
    {
      id: 5,
      category: "Cookies and Cupcakes",
      countPerPointValue: 12,
      pointValue: 6,
    },
  ];
  const [treatOption, setTreatOption] = useState("");
  const [squads, setSquads] = useState(initialSquads);

  const [squadOption, setSquadOption] = useState("");

  /*handle squads*/
  function handleAddSquad(name) {
    if (!squads.find((squad) => squad.name === name)) {
      setSquads([
        ...squads,
        {
          id: squads.length - 1,
          name: name,
          points: 0,
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

  return (
    <div>
      <SquadsContext.Provider value={{ squads, setSquads }}>
        <TreatsContext.Provider value={{ treats }}>
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

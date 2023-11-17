import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";

import Input from "./components/inputfield.js";
import Scoreboard from "./components/scoreboard.js";

import "./App.css";

// Create a new context and export
export const PointsContext = createContext();

// Create a Context Provider
const PointsContextProvider = ({ children }) => {
  const [points, setPoints] = useState(0);

  return (
    <PointsContext.Provider value={{ points, setPoints }}>
      {children}
    </PointsContext.Provider>
  );
};

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
  const [squads, setSquads] = React.useState(initialSquads);
  const [treat, setTreat] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [minCount, setMinCount] = React.useState(1);
  const totalPoints = squads.reduce(
    (total, currentValue) => (total = total + currentValue.points),
    0
  );

  console.log(totalPoints);
  /*handle squads*/
  function handleAddSquad(name) {
    setSquads([
      ...squads,
      {
        id: squads.length - 1,
        name: name,
        points: 0,
      },
    ]);
  }

  function handleAddSquadPoints(name, points) {
    setSquads(
      squads.map((squad) => {
        if (squad.name === name) {
          squad.points = squad.points + points;
        } else {
          return;
        }
      })
    );
  }

  function updateMinCount() {
    if (treat === "Theatre Box Candy") {
      setMinCount(1);
    } else if (treat === "Candy Assorted") {
      setMinCount(5);
    } else if (treat === "Snack Variety") {
      setMinCount(1);
    } else if (treat === "Dum Dums") {
      setMinCount(15);
    } else if (treat === "Juice Soda") {
      setMinCount(1);
    } else if (treat === "Cookies and Cupcakes") {
      setMinCount(1);
    } else {
    }
  }
  const handleChange = (event) => {
    setTreat(event.target.value);
    setVisible(true);
  };
  useEffect(() => {
    console.log(treat);
    updateMinCount(); // Access the updated value here
  }, [treat]);
  return (
    <div>
      <PointsContextProvider>
        <h1>Sweet Sixteen Scoreboard</h1>
        <button onClick={() => handleAddSquad("Jordan")}>
          Add squad named Jordan
        </button>
        <Scoreboard points={0} />
        <p>
          {squads.map((squad) => {
            return squad.name;
          }).join(' | ')}
        </p>
        <h2>Select Squad</h2>

        <select>
          {
          squads.map((squad) => {
            return <option key={squad.name}>{squad.name}</option>;
          })
          }
        </select>

        <h2>Select Treat Type</h2>

        <select onChange={handleChange}>
          {treats.map((treat) => {
            return <option key={treat.category}>{treat.category}</option>;
          })}
        </select>

        {visible ? <Input minCount={minCount} itemName={treat} /> : null}
      </PointsContextProvider>
    </div>
  );
}

export default App;

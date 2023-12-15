import { useState } from "react";
import "../inputfield.css";
import { useContext } from "react";
import { SquadsContext, TreatsContext } from "../App";
import { createContext } from "react";


export default function Input(props) {

  const [value, setValue] = useState("");

  const onInput = (e) => setValue(e.target.value);
  const { squads } = useContext(SquadsContext);
  const { treats } = useContext(TreatsContext);
  const { setSquads } = useContext(SquadsContext);

  const itemName = props.itemName;
  var pointsMultiplier = 1;
  var treatCategory = "";


  function getPointsMultiplier(category) {
    treats.map((treat) => {
      if (treat.category === category) {
        treatCategory = category;
        pointsMultiplier = treat.pointValue / treat.countPerPointValue;
      }
      return treat;
    });
    return pointsMultiplier;
  }
  function updateLog(name, points, category) {
    setSquads(
      squads.map((squad) => {
        if (squad.name === name) {
          treats.map((treat) => {
            if (treat.category === category) {
              squad.log.push({treatName: category, pointsCount: points});
          console.log(squad.log[squad.log.length - 1].pointsCount);
            }
            return treat;
          });
          
        }
        return squad;
      })
    );
  }
  function handleAddSquadPoints(name, points) {
    setSquads(
      squads.map((squad) => {
        if (squad.name === name) {
          squad.points = squad.points + points;
          console.log(points);
        }
        return squad;
      })
    );
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (!isNaN(+value) && value >= 1) {
        console.log(props.squadName);
        console.log(itemName);
        handleAddSquadPoints(
          props.squadName,
          Math.round(parseInt(e.target.value) * getPointsMultiplier(itemName))
        );
        updateLog(props.squadName,
          Math.round(parseInt(e.target.value) * getPointsMultiplier(itemName)),itemName);

      }
      setValue("");
    }
  }

  return (
    <div>
      <h1>{"Treat: " + props.itemName}</h1>
      <p>{"Point Multiplier: " + getPointsMultiplier(itemName)}</p>
      <p>Count individual treats</p>
      <input value={value} onInput={onInput} onKeyDown={handleKeyDown}></input>
    </div>
  );
}

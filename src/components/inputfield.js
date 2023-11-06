import { useState } from "react";
import '../inputfield.css'
import Scoreboard from "./scoreboard.js";
import { useContext } from 'react';
import { PointsContext } from '../App'

export default function Input(props) {
  const [value, setValue] = useState("");

  const onInput = (e) => setValue(e.target.value);
  const { setPoints } = useContext(PointsContext);
  const { points } = useContext(PointsContext);
  const itemName = props.itemName;
  var pointsMultiplier = 1;


  updatePointsMultiplier();
  function updatePointsMultiplier () {
  if (itemName === "Theatre Box Candy") {
    pointsMultiplier = 3;
  }
  else if (itemName === "Candy Assorted") {
    pointsMultiplier = 1/5;
  }
  else if (itemName === "Snack Variety") {
    pointsMultiplier = 15/20;
  }
  else if (itemName === "Dum Dums") {
    pointsMultiplier = 1/15;
  }
  else if (itemName === "Juice Soda") {
    pointsMultiplier = 1;
  }
  else if (itemName === "Cookies and Cupcakes") {
    pointsMultiplier = 1/2;
  }
  else {
  }
}

  function handleKeyDown (e) {
    
    if (e.key === 'Enter') {
      if (!isNaN(+value) && value>=1) {
      console.log(itemName);
     updatePointsMultiplier();

      setPoints(points+ Math.round(parseInt(e.target.value)* pointsMultiplier))
      console.log(value);

    }
    setValue("");

  }
  }

  return (
    <div>
      
      <h1>{"Treat: " + props.itemName}</h1>
      <p>{"Min count required: "+ props.minCount}</p>
      <p>{"Point Multiplier: "+ pointsMultiplier}</p>

      <p>Count individual treats</p>
   <input value={value}  onInput={onInput} onKeyDown={handleKeyDown}></input>
    </div>
  );
}


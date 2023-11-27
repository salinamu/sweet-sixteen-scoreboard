import "../inputform.css";
import { useContext } from "react";
import { SquadsContext } from "../App";

export default function Scoreboard(props) {
  const { squads } = useContext(SquadsContext);
  const { setSquads } = useContext(SquadsContext);
  const totalPoints = squads.reduce(
    (total, currentValue) => (total = total + currentValue.points),
    0
  );
  
  console.log(totalPoints);

  function clear() {
    squads.map((squad) => {

        squad.points = 0;

    });
  }


  return (
    <div>
      {squads.map((squad) => {
        return (
          <p>
            {squad.name} {squad.points}
          </p>
        );
      })}

      <p>Total Points: {totalPoints}</p>
      <button onClick={clear}>Clear</button>
    </div>
  );
}

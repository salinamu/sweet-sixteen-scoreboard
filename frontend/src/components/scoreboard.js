import "../inputform.css";
import { useContext } from "react";
import { SquadsContext } from "../App";
import Collapsible from "react-collapsible";

export default function Scoreboard(props) {
  const { squads } = useContext(SquadsContext);
  const { setSquads } = useContext(SquadsContext);

  const totalPoints = squads.reduce(
    (total, currentValue) => (total = total + currentValue.points),
    0
  );

  function handleClear() {
    setSquads(
      squads.map((squad) => {
        squad.points = 0;
        return squad;
      })
    );
  }

  return (
    <div>
      {squads.map((squad) => {
        return (
          <p>
            <Collapsible trigger={squad.name + " " + squad.points}>
              {squad.log.map((entry) => {
                return (
                      <p>{"-"+entry.treatName + ", " + entry.pointsCount}</p>
                );
              })}
            </Collapsible>
          </p>
        );
      })}

      <p>Total Points: {totalPoints}</p>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
}

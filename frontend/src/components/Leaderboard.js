import "../leaderboard.css";
import RankedSquad from "./RankedSquad";
import { useContext, useMemo } from "react";
import { SquadsContext } from "../App";
import Box from '@mui/material/Box';

export default function Leaderboard(props) {
  const { squads } = useContext(SquadsContext);

  const sortedSquads = useMemo(() => {
    // Sort squads by total points in descending order
    const squadsCopy = JSON.parse(JSON.stringify(squads)).sort((a, b) => b.total - a.total);

    // First Pass: Mark ties and exclude ranks for squads with 0 points
    for (let i = 0; i < squadsCopy.length; i++) {
      squadsCopy[i].tied = false; // Assume no tie initially

      if (squadsCopy[i].total > 0 && i > 0 && squadsCopy[i].total === squadsCopy[i - 1].total) {
        // Mark as tied if the squad has the same total as the previous, excluding squads with 0 points
        squadsCopy[i].tied = true;
        squadsCopy[i - 1].tied = true;
      }
    }

    // Second Pass: Assign ranks, considering ties and excluding squads with 0 points
    let currentRank = 1;
    squadsCopy.forEach((squad, index) => {
      if (squad.total > 0) { // Exclude squads with 0 points from being assigned a rank
        if (index > 0 && squad.total !== squadsCopy[index - 1].total) {
          currentRank = index + 1;
        }
        squad.rank = currentRank; // Assign rank
      }
    });

    return squadsCopy;
  }, [squads]);

  return (
    <div className="leaderboard">
      <Box sx={{ m: 1, fontWeight: "fontWeightBold", fontSize: "h5.fontSize" }}>
        Leaderboard
      </Box>
      {sortedSquads.map((sortedSquad, index) => (
        <RankedSquad
          key={index} // Ideally, use a more stable identifier
          rank={sortedSquad.total > 0 ? ( '#'+sortedSquad.rank + (sortedSquad.tied ? " (Tied)" : "")) : null}
          squadName={sortedSquad.name}
          points={sortedSquad.log.reduce((total, currentValue) => total + currentValue.pointsCount, 0)}
        />
      ))}
    </div>
  );
}

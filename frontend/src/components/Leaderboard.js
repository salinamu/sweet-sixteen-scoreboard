import "../leaderboard.css";
import RankedSquad from "./RankedSquad";
import { useContext, useState, useEffect, useMemo } from "react";
import { SquadsContext } from "../App";
export default function Leaderboard(props) {
  const { squads, setSquads } = useContext(SquadsContext);
  const sortedSquads = useMemo(() => {
    // Assuming squadsCopy is already sorted by total points in descending order
    const squadsCopy = JSON.parse(JSON.stringify(squads)).sort((a, b) => b.total - a.total);
  
    let currentRank = 1; // Start with rank 1
    let previousTotal = squadsCopy[0] ? squadsCopy[0].total : 0; // Initialize with the first squad's total
  
    return squadsCopy.map((squad, index) => {
      if (index > 0 && squad.total < previousTotal) { // If the current squad's total is less than the previous total, increase the rank
        currentRank = index + 1;
      }
      // If the current squad's total equals the previous total, they share the same rank, and currentRank is not incremented
  
      previousTotal = squad.total; // Update previousTotal for the next iteration
  
      return {
        ...squad,
        rank: currentRank, // Assign the currentRank
      };
    });
  }, [squads]);

  return (
    <div className="leaderboard">
      {sortedSquads.map((sortedSquad) => {
        return (
          <RankedSquad
            rank={sortedSquad.rank}
            squadName={sortedSquad.name}
            points={sortedSquad.log.reduce(
              (total, currentValue) =>
                (total = total + currentValue.pointsCount),
              0
            )}
          />
        );
      })}
    </div>
  );
}

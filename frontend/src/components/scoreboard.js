import '../inputform.css'
import { useContext } from 'react';
import { PointsContext } from '../App'




export default function Scoreboard(props) {
    const { points } = useContext(PointsContext);
    const { setPoints } = useContext(PointsContext);



  return (
<div>
<p>Total Points: {points}</p>
<button onClick={() => setPoints(0)}>
      Clear
    </button>

</div>
);
}
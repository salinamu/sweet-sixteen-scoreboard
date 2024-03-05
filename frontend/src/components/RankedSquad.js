import "../rankedsquad.css"
import {theme} from './CustomTheme.js';
export default function RankedSquad({ rank, squadName, points, tied }) {

    return (
        <div>
            <div className="squad" style = {{background: theme.palette.secondary.mainGradient}}>
            <div className="rank">
                {rank}{tied}
            </div>
            <div className="squadName">
            {squadName}
            </div>
            <div className="points">
            {points}
            </div>
            </div>
            
            <div>
            </div>
        </div>
    );
}

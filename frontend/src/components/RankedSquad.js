import "../rankedsquad.css"
import {theme} from './CustomTheme.js';
export default function RankedSquad(props) {

    return (
        <div>
            <div className="squad" style = {{background: theme.palette.secondary.mainGradient}}>
            <div className="rank">
                #{props.rank}
            </div>
            <div className="squadName">
            {props.squadName}
            </div>
            <div className="points">
            {props.points}
            </div>
            </div>
            
            <div>
            </div>
        </div>
    );
}

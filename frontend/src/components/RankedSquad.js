import "../rankedsquad.css"
export default function RankedSquad(props) {

    return (
        <div>
            <div className="squad">
            <div className="rank">
                {props.rank}
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

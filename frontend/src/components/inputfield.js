import { useState } from "react";
import "../inputfield.css";
import { useContext } from "react";
import { SquadsContext, TreatsContext } from "../App";
import TextField from '@mui/material/TextField';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";



export default function Input(props) {
  const [pieceCountValue, setPieceCountValue] = useState("");
  const [itemCountValue, setItemCountValue] = useState("");

  const onInputPieceCount = (e) => setPieceCountValue(e.target.value);
  const onInputItemCount = (e) => setItemCountValue(e.target.value);

  const { squads } = useContext(SquadsContext);
  const { treats } = useContext(TreatsContext);
  const { setSquads } = useContext(SquadsContext);
  const [squadOption, setSquadOption] = useState("");
  const [treatOption, setTreatOption] = useState("");
  const handleSelectTreatOption = (event) => {
    setTreatOption(event.target.value);
  };
  const handleSelectSquadOption = (event) => {
    setSquadOption(event.target.value);
  };
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
              squad.log.push({ id: squad.log.length, treatName: category, pointsCount: points });
              console.log(squad.log[squad.log.length - 1].pointsCount);
            }
            return treat;
          });
        }
        return squad;
      })
    );
  }

  function handleOnClick(e) {
      if (!isNaN(+itemCountValue) && itemCountValue >= 1) {
        updateLog(
          squadOption,
          Math.round(pieceCountValue * getPointsMultiplier(treatOption) * itemCountValue),
          treatOption,
          itemCountValue
        );
      }
      setPieceCountValue("");
      setItemCountValue("");
      setTreatOption("");
      setSquadOption("");


  }

  return (
    <div>
       <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="squad-select-label">Squad</InputLabel>
            <Select
              labelId="squad-select-label"
              id="squad-select"
              value={squadOption}
              label="Squad"
              onChange={handleSelectSquadOption}
              autoWidth
            >
              {squads.map((squad) => {
                return <MenuItem value={squad.name}>{squad.name}</MenuItem>;
              })}
            </Select>
          </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="treat-select-label">Treat</InputLabel>
              <Select
                labelId="treat-select-label"
                id="treat-select"
                value={treatOption}
                label="Treat"
                onChange={handleSelectTreatOption}
                autoWidth
              >
                {treats.map((treat) => {
                  return (
                    <MenuItem value={treat.category}>{treat.category}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
      <TextField sx={{ m: 1, maxWidth: 120 }} id="outlined-basic" label="Piece count" variant="outlined" value={pieceCountValue} onInput={onInputPieceCount}   error={pieceCountValue === ""}
  helperText={pieceCountValue === "" ? 'Empty field!' : ' '}/>
      <TextField sx={{ m: 1, maxWidth: 120 }} id="outlined-basic" label="Item count" variant="outlined" value={itemCountValue} onInput={onInputItemCount}   error={itemCountValue === ""}
  helperText={itemCountValue === "" ? 'Empty field!' : ' '}/>
      <br/>
      <Button sx={{ m: 1 }} variant="contained" onClick={handleOnClick}>Add</Button>
    </div>
  );
}

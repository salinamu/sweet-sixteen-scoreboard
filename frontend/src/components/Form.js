import { useState } from "react";
import "../inputfield.css";
import { useContext } from "react";
import { SquadsContext, TreatsContext } from "../App";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";

export default function Form(props) {
  const [pieceCountValue, setPieceCountValue] = useState("");
  const [itemCountValue, setItemCountValue] = useState("");
  const { squads, setSquads } = useContext(SquadsContext);
  const { treats } = useContext(TreatsContext);
  const [squadOptionValue, setSquadOptionValue] = useState("");
  const [treatOptionValue, setTreatOptionValue] = useState("");
  const [isSquadOptionValid, setIsSquadOptionValid] = useState(true);
  const [isTreatOptionValid, setIsTreatOptionValid] = useState(true);
  const [isPieceCountValid, setIsPieceCountValid] = useState(true);
  const [isItemCountValid, setIsItemCountValid] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  var pointsMultiplier = 1;
  const onInputPieceCount = (e) => {
    var newValue = e.target.value.replace(/[^0-9]/g, "");
    setPieceCountValue(newValue);
    validatePieceCount(newValue);
  };
  const onInputItemCount = (e) => {
    var newValue = e.target.value.replace(/[^0-9]/g, "");
    setItemCountValue(newValue);
    validateItemCount(newValue);
  };
  const handleSelectTreatOption = (e) => {
    setTreatOptionValue(e.target.value);
    validateTreatOption(e.target.value);
  };
  const handleSelectSquadOption = (e) => {
    setSquadOptionValue(e.target.value);
    validateSquadOption(e.target.value);
  };
  const handleOnBlurPieceCount = () => {
    validatePieceCount(pieceCountValue);
  };
  const handleOnBlurItemCount = () => {
    validateItemCount(itemCountValue);
  };
  const handleOnBlurSquadOption = () => {
    validateSquadOption(squadOptionValue);
  };
  const handleOnBlurTreatOption = () => {
    validateTreatOption(treatOptionValue);
  };
  function isFilled(value) {
    return value.trim() !== "";
  }
  function validatePieceCount(val) {
    if (!isFilled(val)) {
      setIsPieceCountValid(false);
    } else {
      setIsPieceCountValid(true);
    }
  }
  function validateItemCount(val) {
    if (!isFilled(val)) {
      setIsItemCountValid(false);
    } else {
      setIsItemCountValid(true);
    }
  }
  function validateSquadOption(val) {
    if (!isFilled(val)) {
      setIsSquadOptionValid(false);
    } else {
      setIsSquadOptionValid(true);
    }
  }
  function validateTreatOption(val) {
    if (!isFilled(val)) {
      setIsTreatOptionValid(false);
    } else {
      setIsTreatOptionValid(true);
    }
  }
  function validate() {
    var valid = true;
    if (!isFilled(squadOptionValue)) {
      setIsSquadOptionValid(false);
      valid = false;
    }
    if (!isFilled(treatOptionValue)) {
      setIsTreatOptionValid(false);
      valid = false;
    }
    if (!isFilled(pieceCountValue)) {
      setIsPieceCountValid(false);
      valid = false;
    }
    if (!isFilled(itemCountValue)) {
      setIsItemCountValid(false);
      valid = false;
    }
    return valid;
  }
  function getPointsMultiplier(category) {
    treats.map((treat) => {
      if (treat.category === category) {
        pointsMultiplier = treat.pointValue / treat.countPerPointValue;
      }
      return treat;
    });
    return pointsMultiplier;
  }
  function updateLog(name, points, category, time) {
    setSquads(
      squads.map((squad) => {
        if (squad.name === name) {
          treats.map((treat) => {
            if (treat.category === category) {
              squad.log.push({
                id: squad.log.length,
                treatName: category,
                pointsCount: points,
                entered: time
              });
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
    var timestamp = new Date();
  timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  var enteredPoints = Math.round(
    pieceCountValue *
      getPointsMultiplier(treatOptionValue) *
      itemCountValue
  );
    if (validate()) {
      updateLog(
        squadOptionValue,
        enteredPoints,
        treatOptionValue,
        timestamp
      );
      setPieceCountValue("");
      setItemCountValue("");
      setTreatOptionValue("");
      setSquadOptionValue("");
    }
    setSubmitted(true);
  }
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="squad-select-label">Squad</InputLabel>
        <Select
          labelId="squad-select-label"
          id="squad-select"
          value={squadOptionValue}
          label="Squad"
          onChange={handleSelectSquadOption}
          autoWidth
          error={!isSquadOptionValid}
          onBlur={handleOnBlurSquadOption}
        >
          {squads.map((squad) => {
            return <MenuItem value={squad.name}>{squad.name}</MenuItem>;
          })}
        </Select>
        {!isSquadOptionValid && (
          <FormHelperText error={!isSquadOptionValid}>
            Select squad
          </FormHelperText>
        )}
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="treat-select-label">Treat</InputLabel>
        <Select
          labelId="treat-select-label"
          id="treat-select"
          value={treatOptionValue}
          label="Treat"
          onChange={handleSelectTreatOption}
          autoWidth
          error={!isTreatOptionValid}
          onBlur={handleOnBlurTreatOption}
        >
          {treats.map((treat) => {
            return <MenuItem value={treat.category}>{treat.category}</MenuItem>;
          })}
        </Select>
        {!isTreatOptionValid && (
          <FormHelperText error={!isTreatOptionValid}>
            Select treat
          </FormHelperText>
        )}
      </FormControl>
      <FormControl sx={{ m: 1, maxWidth: 120 }}>
        <TextField
          autoComplete="off"
          id="outlined"
          label="Pieces"
          placeholder="#"
          value={pieceCountValue}
          onInput={onInputPieceCount}
          onBlur={handleOnBlurPieceCount}
          error={!isPieceCountValid}
        />
        {!isPieceCountValid && (
          <FormHelperText error={!isPieceCountValid}>
            Enter # of pieces
          </FormHelperText>
        )}
      </FormControl>
      <FormControl sx={{ m: 1, maxWidth: 120 }}>
        <TextField
          autoComplete="off"
          id="outlined"
          label="Packages"
          placeholder="#"
          value={itemCountValue}
          onInput={onInputItemCount}
          onBlur={handleOnBlurItemCount}
          error={!isItemCountValid}
        />
        {!isItemCountValid && (
          <FormHelperText error={!isItemCountValid}>
            Enter # of packages
          </FormHelperText>
        )}
      </FormControl>
      <br />
      <Button sx={{ m: 1 }} variant="contained" onClick={handleOnClick}>
        Add
      </Button>
    </div>
  );
}
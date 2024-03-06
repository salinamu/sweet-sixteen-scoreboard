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
import PointHistory from "./PointHistory";
import { theme } from "./CustomTheme.js";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import "../form.css";
import QuantityInput from "./QuantityInput.js";

export default function Form(props) {
  const [pieceCountValue, setPieceCountValue] = useState("");
  const [quantity, setQuantity] = useState(1); // Initialize quantity with 1
  // In Form.js, within the Form component
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value); // Directly use the newValue
    console.log("Updating quantity to:", e.target.value);
  };

  const { squads, setSquads, prevSquad, setPrevSquad } =
    useContext(SquadsContext);
  const { treats } = useContext(TreatsContext);
  const [squadOptionValue, setSquadOptionValue] = useState("");
  const [treatOptionValue, setTreatOptionValue] = useState("");
  const [isSquadOptionValid, setIsSquadOptionValid] = useState(true);
  const [isTreatOptionValid, setIsTreatOptionValid] = useState(true);
  const [isPieceCountValid, setIsPieceCountValid] = useState(true);

  var pointsMultiplier = 1;
  const onInputPieceCount = (e) => {
    var newValue = e.target.value.replace(/[^0-9]/g, "");
    setPieceCountValue(newValue);
    validatePieceCount(newValue);
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
                entered: time,
              });
            }
            return treat;
          });
          const newTotal = squad.total + points;
          squad.total = newTotal;
        }
        return squad;
      })
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Create a new date object for the current date and time
    const currentDate = new Date();

    // Define options for formatting the date
    const dateFormatOptions = {
      year: "numeric",
      month: "short", // Use abbreviated month name
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    // Create an Intl.DateTimeFormat instance with US English locale and the defined options
    const dateTimeFormatter = new Intl.DateTimeFormat(
      "en-US",
      dateFormatOptions
    );

    // Format the current date
    const timestamp = dateTimeFormatter.format(currentDate);

    var enteredPoints = Math.round(
      pieceCountValue * getPointsMultiplier(treatOptionValue) * quantity
    );
    if (validate()) {
      updateLog(squadOptionValue, enteredPoints, treatOptionValue, timestamp);
      props.addMessage(
        enteredPoints + " points added to squad " + squadOptionValue
      );
      setPrevSquad(squadOptionValue);
      setPieceCountValue("");
      setQuantity(1);
      setTreatOptionValue("");
      setSquadOptionValue("");
    }
  }
  return (
    <div className="form">
      <Box
        sx={{
          m: 1,
          fontWeight: "fontWeightBold",
          fontSize: "h5.fontSize",
        }}
      >
        New Treat
      </Box>
      <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit}>
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
              sx={{
                [`& fieldset`]: {
                  borderRadius: 100,
                },
              }}
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
              sx={{
                [`& fieldset`]: {
                  borderRadius: 100,
                },
              }}
            >
              {treats.map((treat) => {
                return (
                  <MenuItem value={treat.category}>{treat.category}</MenuItem>
                );
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
              label="Pieces"
              placeholder="#"
              value={pieceCountValue}
              onInput={onInputPieceCount}
              onBlur={handleOnBlurPieceCount}
              error={!isPieceCountValid}
              sx={{
                [`& fieldset`]: {
                  borderRadius: 100,
                },
              }}
            />
            {!isPieceCountValid && (
              <FormHelperText error={!isPieceCountValid}>
                Enter # of pieces
              </FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ m: 1, maxWidth: 120 }}>
            <QuantityInput value={quantity} onChange={handleQuantityChange} />
          </FormControl>

          <br />

          <Button
            sx={{ m: 1, borderRadius: theme.button.borderRadius }}
            type="submit"
            variant="contained"
          >
            Add Points
          </Button>
          <PointHistory />
        </form>
      </ThemeProvider>
    </div>
  );
}

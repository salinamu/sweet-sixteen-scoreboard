import { useState } from 'react';
import {
  validatePieceCount,
  validateItemCount,
  validateSquadOption,
  validateTreatOption
} from './FormValidations';

const validate = {
  squadOption: validateSquadOption,
  treatOption: validateTreatOption,
  pieceCount: validatePieceCount,
  itemCount: validateItemCount
};

export default function useForm(initialValues) {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (name, value) => {
    if (validate[name]) {
      setFormValues(prevValues => ({
        ...prevValues,
        [name]: {
          value: value,
          isValid: validate[name](value)
        }
      }));
    }
  };

  return {
    formValues,
    handleChange
  };
}

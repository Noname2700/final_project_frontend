import { useState, useCallback } from 'react';

export const useForm = (inputValues = {}) => {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: event.target.validationMessage,
    }));

    setIsValid(event.target.closest('form').checkValidity());
  }, []);

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
};

export default useForm;
import { useState, useCallback } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

export const useForm = (inputValues = {}) => {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!EMAIL_REGEX.test(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (!PASSWORD_REGEX.test(value)) return 'Password must be at least 6 characters long and contain both letters and numbers';
        return '';
      case 'username':
        if (!value) return 'Username is required';
        if (value.length < 2) return 'Username must be at least 2 characters long';
        return '';
      default:
        return value ? '' : 'This field is required';
    }
  };

  const validateForm = useCallback((currentValues) => {
    const newErrors = {};
    let formIsValid = true;

    Object.keys(currentValues).forEach(key => {
      const error = validateField(key, currentValues[key]);
      if (error) {
        newErrors[key] = error;
        formIsValid = false;
      }
    });

    return { errors: newErrors, isValid: formIsValid };
  }, []);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    const newValues = {
      ...values,
      [name]: value,
    };
    
    setValues(newValues);
    
  
    const fieldError = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError,
    }));


    const { isValid: formIsValid } = validateForm(newValues);
    setIsValid(formIsValid);
  }, [values, validateForm]);

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
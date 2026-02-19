import { Link } from "react-router-dom";
import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useKeyboard } from "../../contexts/KeyboardContext";
import { isTouchDevice } from "../../utils/isTouchDevice";

const LoginModal = ({
  isOpen,
  onClose,
  handleLogin,
  switchToRegister,
  errorMessage,
}) => {
  const { values, handleChange, resetForm, isValid, errors } = useForm({
    email: "",
    password: "",
  });
  const { openKeyboard } = useKeyboard();

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
  };

  return (
    <ModalWithForm
      title="Sign In"
      buttonText="Sign In"
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
      hideSubmitButton={true}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
          placeholder="Enter Email"
          required
          className="modal__input"
          autoComplete="email"
          onFocus={(e) => isTouchDevice() && openKeyboard(e.target)}
          inputMode="none"
        />
        <span className="modal__error">
          {errorMessage && !errors.email ? errorMessage : errors.email}
        </span>
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          value={values.password || ""}
          onChange={handleChange}
          placeholder="Enter Password"
          required
          className="modal__input"
          onFocus={(e) => isTouchDevice() && openKeyboard(e.target)}
          inputMode="none"
        />
        <span className="modal__error">
          {errorMessage && !errors.password ? errorMessage : errors.password}
        </span>
      </label>

      <div className="modal__button-row">
        <button
          type="submit"
          className={`modal__submit-btn ${
            !isValid ? "modal__submit-btn_disabled" : ""
          }`}
          disabled={!isValid}
        >
          Sign In
        </button>
        <button
          type="button"
          className="modal__link-btn"
          onClick={switchToRegister}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;

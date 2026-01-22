import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useKeyboard } from "../../contexts/KeyboardContext";
import { isTouchDevice } from "../../utils/isTouchDevice";

const RegisterModal = ({
  isOpen,
  onClose,
  handleRegistration,
  switchToLogin,
}) => {
  const { values, handleChange, resetForm, isValid } = useForm({
    username: "",
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
    const { username, email, password } = values;

    if (handleRegistration) {
      handleRegistration({
        username,
        email,
        password,
      });
    }
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
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
          {values.email && isValid === false
            ? "Please enter a valid email"
            : ""}
        </span>
      </label>

      <label className="modal__label">
        Username
        <input
          type="text"
          name="username"
          value={values.username || ""}
          onChange={handleChange}
          placeholder="Enter your username"
          required
          className="modal__input"
          minLength="2"
          maxLength="40"
          autoComplete="username"
          onFocus={(e) => isTouchDevice() && openKeyboard(e.target)}
          inputMode="none"
        />
        <span className="modal__error">
          {values.username && isValid === false
            ? "Username must be 2-40 characters"
            : ""}
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
          minLength="6"
          autoComplete="password"
          onFocus={(e) => isTouchDevice() && openKeyboard(e.target)}
          inputMode="none"
        />
        <span className="modal__error">
          {values.password && isValid === false
            ? "Password must be at least 6 characters"
            : ""}
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
          Sign Up
        </button>
        <button
          type="button"
          className="modal__link-btn"
          onClick={switchToLogin}
        >
          or Sign In
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;

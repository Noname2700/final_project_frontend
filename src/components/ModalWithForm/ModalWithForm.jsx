import "./ModalWithForm.css";
import { useModalClose } from "../../hooks/useModalClose";

function ModalWithForm({
  children,
  title,
  buttonText,
  handleCloseClick,
  isFormValid,
  isOpen,
  onSubmit,
  hideSubmitButton = false,
}) {
  useModalClose(isOpen, handleCloseClick);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        ></button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          {!hideSubmitButton && (
            <button
              type="submit"
              className={`modal__submit-btn ${
                !isFormValid ? "modal__submit-btn_disabled" : ""
              }`}
              disabled={!isFormValid}
            >
              {buttonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

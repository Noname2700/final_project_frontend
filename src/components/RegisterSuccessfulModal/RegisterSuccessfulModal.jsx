import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterSuccessfulModal.css";

function RegisterSuccessfulModal({ setActiveModal, isOpen, onClose }) {
  const handleSignInClick = () => {
    setActiveModal("login");
  };

  return (
    <ModalWithForm
      title=" Registration successfully completed!"
      isOpen={isOpen}
      handleCloseClick={onClose}
      hideSubmitButton={true}
    >
      <button
        type="button"
        className="register-success__signin-btn"
        onClick={handleSignInClick}
      >
        Sign in
      </button>
    </ModalWithForm>
  );
}

export default RegisterSuccessfulModal;

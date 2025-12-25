import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({
  isOpen,
  onClose,
  handleCloseClick,
  onConfirm,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_confirmation">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        ></button>
        <p className="modal__title">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <div className="modal__actions">
          <button
            onClick={onConfirm}
            className="modal__confirm-button"
          >
            Yes, delete item
          </button>
          <button onClick={onClose} className="modal__cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;

import { useEffect } from "react";
import { useKeyboard } from "../../contexts/KeyboardContext";
import { isTouchDevice } from "../../utils/isTouchDevice";

/**
 * Global listener that automatically opens the virtual keyboard
 * when any input/textarea/contentEditable element is focused
 * and closes it when clicking outside
 */
export default function KeyboardListener() {
  const { openKeyboard, closeKeyboard, targetElement } = useKeyboard();

  useEffect(() => {
    const handleFocus = (e) => {
      const el = e.target;

      // Check if it's an editable element
      const isEditable =
        el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.isContentEditable;

      // Check if we should show keyboard (mobile/tablet or touchscreen desktop)
      const shouldShowKeyboard = isTouchDevice() || window.innerWidth <= 1024;

      if (isEditable && shouldShowKeyboard) {
        openKeyboard(el);
      }
    };

    const handleClick = (e) => {
      // If keyboard is open and clicking outside input/keyboard
      if (targetElement) {
        const clickedElement = e.target;
        const isClickOnInput =
          clickedElement.tagName === "INPUT" ||
          clickedElement.tagName === "TEXTAREA" ||
          clickedElement.isContentEditable;

        const isClickOnKeyboard =
          clickedElement.closest(".keyboard") ||
          clickedElement.closest(".keyboard-overlay");

        // Close keyboard if clicking outside both input and keyboard
        if (!isClickOnInput && !isClickOnKeyboard) {
          if (targetElement) {
            targetElement.blur();
          }
          closeKeyboard();
        }
      }
    };

    const handleFormSubmit = () => {
      // Close keyboard when any form is submitted
      if (targetElement) {
        targetElement.blur();
        closeKeyboard();
      }
    };

    // Listen for focus on any element
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("submit", handleFormSubmit, true);

    return () => {
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("submit", handleFormSubmit, true);
    };
  }, [openKeyboard, closeKeyboard, targetElement]);

  return null; // This component doesn't render anything
}

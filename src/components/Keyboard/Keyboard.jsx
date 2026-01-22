import { useState } from "react";
import { useKeyboard } from "../../contexts/KeyboardContext";
import "./Keyboard.css";

// Constants for special keys
const DELETE_KEY = "DELETE_KEY";
const SHIFT_KEY = "SHIFT_KEY";
const NUMBER_TOGGLE = "NUMBER_TOGGLE";
const EMOJI_KEY = "EMOJI_KEY";
const GO_KEY = "GO_KEY";

/**
 * iPhone-style virtual keyboard component
 * @returns {JSX.Element} Virtual keyboard UI
 */
function Keyboard() {
  const { targetElement, closeKeyboard } = useKeyboard();

  const [isShift, setIsShift] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false);

  // Don't render if no target element
  if (!targetElement) return null;

  /**
   * Handle clicks on the overlay (outside keyboard) to close it
   */
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("keyboard-overlay")) {
      targetElement.blur();
      closeKeyboard();
    }
  };

  /**
   * Main key click handler
   */
  const handleKeyClick = (key) => {
    if (key === DELETE_KEY) {
      handleDeleteKey();
    } else if (key === SHIFT_KEY) {
      setIsShift(!isShift);
    } else if (key === NUMBER_TOGGLE) {
      setShowNumbers(!showNumbers);
    } else if (key === EMOJI_KEY) {
      // Emoji functionality placeholder
      return;
    } else if (key === GO_KEY) {
      targetElement.blur();
      closeKeyboard();
    } else if (key === " ") {
      const newValue = targetElement.value + " ";
      // eslint-disable-next-line react-hooks/immutability
      targetElement.value = newValue;
      targetElement.dispatchEvent(new Event("input", { bubbles: true }));
    } else {
      // Regular character
      const char = isShift ? key.toUpperCase() : key;
      const newValue = targetElement.value + char;
      targetElement.value = newValue;
      targetElement.dispatchEvent(new Event("input", { bubbles: true }));
      if (isShift) setIsShift(false); // Auto-disable shift after one character
    }
  };

  const handleDeleteKey = () => {
    if (targetElement.value.length === 0) return;
    const newValue = targetElement.value.slice(0, -1);
    // eslint-disable-next-line react-hooks/immutability
    targetElement.value = newValue;
    targetElement.dispatchEvent(new Event("input", { bubbles: true }));
  };

  /**
   * Get keyboard layout based on current mode
   */
  const getKeyboardLayout = () => {
    if (showNumbers) {
      return [
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", DELETE_KEY],
        ["-", "/", ":", ";", "(", ")", "$", "&", "@", '"', GO_KEY],
        ["#+=", ".", ",", "?", "!", "'", SHIFT_KEY],
        [NUMBER_TOGGLE, EMOJI_KEY, " ", NUMBER_TOGGLE, "🌐"],
      ];
    } else {
      return [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", DELETE_KEY],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l", GO_KEY],
        [SHIFT_KEY, "z", "x", "c", "v", "b", "n", "m", "!", "?", SHIFT_KEY],
        [NUMBER_TOGGLE, EMOJI_KEY, " ", NUMBER_TOGGLE, "🌐"],
      ];
    }
  };

  /**
   * Render key content based on key type
   */
  const renderKey = (key, rowIndex, keyIndex) => {
    let displayText = "";
    let className = "key";

    if (key === DELETE_KEY) {
      displayText = "⌫";
      className += " key--special key--delete";
    } else if (key === SHIFT_KEY) {
      displayText = "⇧";
      className += " key--special key--shift";
      if (isShift) className += " key--active";
    } else if (key === NUMBER_TOGGLE) {
      displayText = showNumbers ? "ABC" : ".?123";
      className += " key--special key--number";
    } else if (key === EMOJI_KEY) {
      displayText = "😊";
      className += " key--special key--emoji";
    } else if (key === GO_KEY) {
      displayText = "return";
      className += " key--special key--return";
    } else if (key === " ") {
      displayText = "space";
      className += " key--space";
    } else if (key === "🌐") {
      displayText = "🌐";
      className += " key--special key--globe";
    } else if (key === "#+=") {
      displayText = "#+=";
      className += " key--special key--symbols";
    } else {
      displayText = isShift && !showNumbers ? key.toUpperCase() : key;
    }

    return (
      <div
        key={`${rowIndex}-${keyIndex}`}
        className={className}
        onClick={() => handleKeyClick(key)}
      >
        {displayText}
      </div>
    );
  };

  const layout = getKeyboardLayout();

  return (
    <div className="keyboard-overlay" onClick={handleOverlayClick}>
      <div className="keyboard">
        <div className="keyboardcontainer">
          <div className="container">
            {layout.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((key, keyIndex) => renderKey(key, rowIndex, keyIndex))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Keyboard;

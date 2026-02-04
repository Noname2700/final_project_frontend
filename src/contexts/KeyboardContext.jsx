import React, { createContext, useState, useContext } from "react";

const KeyboardContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useKeyboard = () => useContext(KeyboardContext);

export const KeyboardProvider = ({ children }) => {
  const [targetElement, setTargetElement] = useState(null);

  const openKeyboard = (element) => setTargetElement(element);
  const closeKeyboard = () => setTargetElement(null);

  return (
    <KeyboardContext.Provider
      value={{ targetElement, openKeyboard, closeKeyboard }}
    >
      {children}
    </KeyboardContext.Provider>
  );
};

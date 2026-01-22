/**
 * Detects if the device supports touch input
 * @returns {boolean} True if device has touch capabilities
 */
export const isTouchDevice = () =>
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0;

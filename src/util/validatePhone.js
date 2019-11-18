const PhoneTest = /^\+(\d{11})$/;

/**
 * Checks wether the given string value matches international telephomne formatting
 * @param {string} value the international formatted telephone number to be validated
 */
export default function validatePhone(value) {
  // strip all spaces from value
  const stripped_value = value.replace(/\s/g, '');
  return PhoneTest.test(stripped_value);
}

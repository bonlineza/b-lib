const PhoneTest = /^\+(\d{11})$/;

/**
 * Checks wether the given string value matches international telephone formatting
 * @param {string} value: phone number to be validated
 * @returns {boolean} result of the evaluation
 */
export default function validatePhone(value) {
  // strip all spaces from value
  const stripped_value = value.replace(/\s/g, '');
  return PhoneTest.test(stripped_value);
}

const WebsiteTest = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;

/**
 * Checks whether the given string matches good known website naming schemes
 * @param {string} value the website to be validated
 * @returns {boolean} result of the evaluation
 */
export default function validateWebsite(value) {
  return WebsiteTest.test(value);
}

const WebsiteTest = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;

/**
 * Checks wethe the given string maches good known website naming schemes
 * @param {string} value the website to be validated
 * @returns {boolean} result of the evaluation
 */
export default function validateWebsite(value) {
  return WebsiteTest.test(value);
}

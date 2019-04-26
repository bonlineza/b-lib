const WebsiteTest = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;

export default function validateWebsite(value) {
  return WebsiteTest.test(value);
}

const user = "[a-zA-Z0-9_\\-\\.\\+\\^!#\\$%&*+\\/\\=\\?\\`\\|\\{\\}~\\']+";
const domain = '(?:(?:[a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.?)+';
const ipv4 = '[0-9]{1,3}(\\.[0-9]{1,3}){3}';
const ipv6 = '[0-9a-fA-F]{1,4}(\\:[0-9a-fA-F]{1,4}){7}';
const EmailTest = new RegExp(`^${user}@(${domain}|(\\[(${ipv4}|${ipv6})\\]))$`);

export default function validateEmail(value) {
  return EmailTest.test(value);
}

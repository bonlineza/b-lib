const PhoneTest = /^\+(\d{11})$/;

export default function validatePhone(value) {
  // strip all spaces from value
  const stripped_value = value.replace(/\s/g, '');
  return PhoneTest.test(stripped_value);
}

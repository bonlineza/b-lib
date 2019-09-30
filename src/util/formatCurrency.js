import numeral from 'numeral';

// Format Currency: used as a base currency formatter with Numberal
export default (number, round = false, format = '$ 0,0[.]00') =>
  numeral(round ? Math.round(parseFloat(number)) : parseFloat(number)).format(
    format,
  );

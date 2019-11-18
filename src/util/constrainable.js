import occurances from './stringOccurances';
import flattenObject from './flattenObject';

function serializeDataToString(obj: Object): string {
  const flattenedData = flattenObject(obj, 'constraint');
  return Object.keys(flattenedData)
    .map((key: string) => `${key}=${flattenedData[key]}`)
    .join('&');
}

export function sanitizeInputForConstraints(input: string): Array<string> {
  let inputSplit = [];
  let holdingString = '';
  let recursiveStore = '';
  let initialSplit = [];
  if (input.includes(':"') && occurances(input, '"') % 2 === 0) {
    initialSplit = input.split(':"');
    holdingString = `${initialSplit[0]}:${initialSplit[1].split('"')[0]}`;
    recursiveStore = sanitizeInputForConstraints(
      /* +2 because indexOf returns it in array indexing (0 == first)
       * and substring accepts it in counting format (1 == first)
       * and then we add one more to get away from the first instance of
       * what we are searching for
       */
      input.substring(input.indexOf('"', input.indexOf('"') + 1) + 2),
    );
    inputSplit = [holdingString, ...recursiveStore];
  } else {
    inputSplit = input.split(' ');
  }
  return inputSplit.filter((v: string) => v !== '"');
}

export const unenclosedWhitespaceRegex = /\s+(?=(?:[^"]*"[^"]*")*[^"]*$)/g;

function splitInput(input: string): string[] {
  const split = input
    // split values that are separated by whitespace, except for those enclosed in ""
    .split(unenclosedWhitespaceRegex)
    .filter((v: string) => v.includes(':'))
    .join(':')
    .split(':');

  return split;
}

export default function constrainSearch(input: string): string {
  let result = input;

  const seperatorSplit = splitInput(input);
  const specialOperators = ['<>', '<', '>', '='];

  let columns = [];
  let constraintObj = {};

  if (seperatorSplit.length > 0) {
    columns = seperatorSplit.filter(
      (element: string, index: number): boolean => index % 2 === 0,
    );
    if (columns.length) {
      // the api can constrain this
      constraintObj = columns.reduce(
        (acc: Object, value: string, index: number): Object => {
          let toInsert: Object | string = {};
          const searchValue = seperatorSplit[index * 2 + 1] || '';

          let constraintValues: string[] = [];
          let operator: string | void;
          if (
            searchValue !== '' &&
            specialOperators.some((op: string): boolean =>
              searchValue.includes(op),
            )
          ) {
            operator = specialOperators.find((op: string): boolean =>
              searchValue.includes(op),
            );
            constraintValues = searchValue.split(operator).filter(s => !!s);
          } else {
            // split values that are separated by comma, except for those enclosed in ""
            constraintValues = searchValue
              .split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/g)
              .filter(s => !!s);
          }
          constraintValues = constraintValues.map((cV: string): string => {
            if (occurances(cV, '"') > 1) {
              const firstQuote = cV.indexOf('"');
              return cV.substring(
                firstQuote + 1,
                cV.indexOf('"', firstQuote + 1),
              );
            }
            return cV;
          });
          if (constraintValues.length === 1) {
            const [v] = constraintValues;
            if (operator) {
              toInsert = {
                op: operator,
                v,
              };
            } else {
              toInsert = v;
            }
          } else {
            const constraintvaluesObj = { ...constraintValues };
            toInsert = {
              op: operator,
              v: constraintvaluesObj,
            };
          }
          return {
            ...acc,
            [value]: toInsert,
          };
        },
        {},
      );

      result = serializeDataToString(constraintObj);
    }
  }

  return result;
}

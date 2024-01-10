export const getNumberMask = (
  num: number,
  digitsAfterDecimalPoint = 2,
  delimiter = ","
) => {
  const getIntegerPart = (num: string) => {
    let result = "";
    let currentPosition = 0;
    const isNegative = parseInt(num) < 0;
    let enterNumberString = num.toString();
    if (isNegative) {
      enterNumberString = enterNumberString.substring(1);
    }

    for (let i = enterNumberString.length - 1; i >= 0; i--) {
      if (currentPosition < 3) {
        currentPosition++;
        result = enterNumberString.charAt(i) + result;
      } else {
        currentPosition = 1;
        result = enterNumberString.charAt(i) + " " + result;
      }
    }
    return `${isNegative ? "-" : ""}${result}`;
  };

  const getDecimalPart = (num: string) => {
    let enterNumberString = num.toString();
    if (enterNumberString.length === 1) {
      return enterNumberString + "0";
    }
    return enterNumberString;
  };

  if (typeof num !== "number" && isNaN(parseFloat(num))) {
    return num;
  }

  const parsedNumber =
    Math.round(num * 10 ** digitsAfterDecimalPoint) /
    10 ** digitsAfterDecimalPoint;

  const [integer, decimal = ""] = parsedNumber.toString().split(".");

  const integerPart = getIntegerPart(integer);
  const decimalPart = getDecimalPart(decimal);

  return `${integerPart}${decimalPart ? `${delimiter}${decimalPart}` : ""}`;
};

let rgbValues = {
  red: document.querySelector("#redRangeInput"),
  green: document.querySelector("#greenRangeInput"),
  blue: document.querySelector("#blueRangeInput"),
};

let inputValues = {
  red: document.querySelector("#redValue"),
  green: document.querySelector("#greenValue"),
  blue: document.querySelector("#blueValue"),
};

function changeValue(color) {
  inputValues[color].value = rgbValues[color].value;

  document.querySelector(
    "#boxColor"
  ).style.backgroundColor = `rgb(${inputValues.red.value},${inputValues.green.value},${inputValues.blue.value})`;
}

function dezoite(number) {
  if ((number / 2 + 1) % 2 === 0) {
    return "par";
  } else {
    return "impar";
  }
}

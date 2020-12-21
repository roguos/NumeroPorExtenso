"use strict";
document.querySelector("#inputRange").addEventListener("input", getRangeValue);
const rangeValueNumber = document.querySelector("#rangeValueNumber");
const rangeValueText = document.querySelector("#rangeValueText");

let rangeValue = [];

const obj = {
  unidade: ["", "Um", "Dois", "Três", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove"],
  dezena: [
    "",
    "Dez",
    "Vinte",
    "Trinta",
    "Quarenta",
    "Cinquenta",
    "Sessenta",
    "Setenta",
    "Oitenta",
    "Noventa",
  ],
  centena: [
    "",
    "Cem",
    "Duzentos",
    "Trezentos",
    "Quatrocentos",
    "Quinhentos",
    "Seiscentos",
    "Setecentos",
    "Oitocentos",
    "Novecentos",
  ],
  especial: [
    "",
    "Onze",
    "Doze",
    "Treze",
    "Quatorze",
    "Quinze",
    "Dezesseis",
    "Dezessete",
    "Dezoito",
    "Dezenove",
    "Cento",
  ],
};

function getRangeValue({ target }) {
  rangeValue = target.valueAsNumber.toString().split("");
  setValueNumber(target.valueAsNumber);
  Init(rangeValue);
}

function setValueText(value) {
  rangeValueText.value = value;
}
function setValueNumber(value) {
  rangeValueNumber.value = value;
}

function Init(splitRangeValue) {
  let { unidade, dezena, centena, especial } = obj;

  switch (rangeValue.length) {
    case 1:
      splitRangeValue[0] === "0" ? setValueText("Zero") : setValueText(uni(0));
      break;

    case 2:
      setValueText(dez(1, 0));
      break;

    case 3:
      setValueText(cen(2, 1, 0));
      break;

    default:
      break;
  }

  function uni(index) {
    return unidade[splitRangeValue[index]];
  }

  function dez(indexUni, indexDez) {
    if (splitRangeValue[indexDez] === "1" && Number(splitRangeValue[indexUni]) > 0) {
      return especial[splitRangeValue[indexUni]];
    } else if (splitRangeValue[indexUni] === "0") {
      return `${dezena[splitRangeValue[indexDez]]} ${uni(indexUni)}`;
    } else {
      return `${dezena[splitRangeValue[indexDez]]} e ${uni(indexUni)}`;
    }
  }

  function cen(indexUni, indexDez, indexCen) {
    if (splitRangeValue[indexDez] === "0" && splitRangeValue[indexUni] === "0") {
      return centena[splitRangeValue[indexCen]];
    } else if (splitRangeValue[indexCen] === "1" && splitRangeValue[indexDez] === "0") {
      return `${especial[10]}${dez(indexUni, indexDez)}`;
    } else if (splitRangeValue[indexCen] === "1") {
      return `${especial[10]} e ${dez(indexUni, indexDez)}`;
    } else if (splitRangeValue[indexDez] === "0") {
      return `${centena[splitRangeValue[indexCen]]}${dez(indexUni, indexDez)}`;
    } else {
      return `${centena[splitRangeValue[indexCen]]} e ${dez(indexUni, indexDez)}`;
    }
  }
}

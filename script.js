"use strict";

const words = [
  "white",
  "dog",
  "present",
  "flowers",
  "skyblue",
  "blueviolet",
  "dragon",
  "matrix",
  "saturday",
  "javascript",
];

let mistakeCount = 0;
let goodTip = 0;
let wrongLetters = "";
let text = "";
let word = "";
const wordDiv = document.getElementById("word");

function initialGame() {
  // word = words[Math.floor(Math.random()*10)];
  // word = "alma";
  fetch("https://random-word-api.herokuapp.com/word")
    .then((response) => {
      return response.json();
    })
    .then((words) => {
      word = words[0];
      mistakeCount = 0;
      goodTip = 0;
      wrongLetters = "";
      text = "";

      for (let i = 0; i <= word.length - 1; i++) {
        text += "_ ";
      }

      wordDiv.innerHTML = text;
      refresh();
    });
}

function checkLetter() {
  const userLetter = document.getElementById("userLetter");
  const letter = userLetter.value;

  let notFound = true;

  let text2 = "";
  for (let i = 0; i <= word.length - 1; i++) {
    if (letter === word[i]) {
      goodTip++;
      text2 += letter + " ";
      notFound = false;
    } else {
      text2 += text.substr(i * 2, 2);
    }
  }

  userLetter.value = "";
  text = text2;

  if (notFound) {
    mistakeCount++;
    const img = document.getElementById("img");
    img.src = `images/${mistakeCount}.webp`;
    wrongLetters += letter + " ";
  }

  refresh();

  function inputDisabled() {
    const disabledInput = document.getElementById("userLetter");
    disabledInput.disabled = true;
    const chkBtnDis = document.getElementById("chk-btn");
    chkBtnDis.disabled = true;
  }

  if (mistakeCount >= 12) {
    const result = document.getElementById("result");
    result.innerHTML = "Vesztettél! Ez volt a keresett szó: " + word;
    result.insertAdjacentHTML(
      "beforeend",
      `<button onclick ="initialGame()">Retry</button>`
    );
    inputDisabled();
  }

  if (goodTip === word.length) {
    const result = document.getElementById("result");
    result.innerHTML = "Nyertél!";
    result.insertAdjacentHTML(
      "beforeend",
      `<button onclick ="initialGame()">New Game</button>`
    );
    inputDisabled();
  }
}

function refresh() {
  wordDiv.innerHTML = text;
  const mistakeDiv = document.getElementById("mistakes");
  mistakeDiv.innerHTML = `mistake count: ${mistakeCount}`;

  const wrongLetterDiv = document.getElementById("wrongLetters");
  wrongLetterDiv.innerHTML = `wrong letters: ${wrongLetters}`;

  const disabledInput = document.getElementById("userLetter");
  disabledInput.disabled = false;
  const chkBtnDis = document.getElementById("chk-btn");
  chkBtnDis.disabled = false;

  const result = document.getElementById("result");
  result.innerHTML = "";
}

initialGame();

"use strict";
import keyElement from "./modules/key.js";
import keysData from "./modules/keysData.js";

window.lang = "en";
let testKeys = [];
keysData.forEach(el => testKeys.push(
  new keyElement(el.en, el.enShift, el.ru, el.ruShift, el.options, el.keyEvent)
));

for (let i = 0; i < 14; i++) {
  document.querySelectorAll(".board-line")[0].append(testKeys[i].create());
  testKeys[i].language = "en";
}
for (let i = 14; i < 28; i++) {
  document.querySelectorAll(".board-line")[1].append(testKeys[i].create());
  testKeys[i].language = "en";
}
for (let i = 28; i < 42; i++) {
  document.querySelectorAll(".board-line")[2].append(testKeys[i].create());
  testKeys[i].language = "en";
}
for (let i = 42; i < 55; i++) {
  document.querySelectorAll(".board-line")[3].append(testKeys[i].create());
  testKeys[i].language = "en";
}
for (let i = 55; i < 64; i++) {
  document.querySelectorAll(".board-line")[4].append(testKeys[i].create());
  testKeys[i].language = "en";
}

// 

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.altKey) {
    window.lang = window.lang == "en" ? "ru" : "en";
    testKeys.forEach(el => el.language = window.lang);
  }
  if (e.shiftKey) {
    testKeys.forEach(el => el.shiftUp = window.lang);
  }
});
window.addEventListener("keyup", (e) => {
  if (!e.shiftKey) {
    testKeys.forEach(el => el.shiftDown = window.lang);
  }
});
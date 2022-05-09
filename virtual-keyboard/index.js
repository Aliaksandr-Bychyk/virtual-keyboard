"use strict";
import keyElement from "./modules/key.js";
import keysData from "./modules/keysData.js";

window.lang = "en";
window.capsLock = false;

let arrKeys = [];
keysData.forEach(el => arrKeys.push(
  new keyElement(el.en, el.enShift, el.ru, el.ruShift, el.options, el.keyEvent)
));

for (let i = 0; i < 14; i++) {
  document.querySelectorAll(".board-line")[0].append(arrKeys[i].create());
  arrKeys[i].language = "en";
}
for (let i = 14; i < 28; i++) {
  document.querySelectorAll(".board-line")[1].append(arrKeys[i].create());
  arrKeys[i].language = "en";
}
for (let i = 28; i < 42; i++) {
  document.querySelectorAll(".board-line")[2].append(arrKeys[i].create());
  arrKeys[i].language = "en";
}
for (let i = 42; i < 55; i++) {
  document.querySelectorAll(".board-line")[3].append(arrKeys[i].create());
  arrKeys[i].language = "en";
}
for (let i = 55; i < 64; i++) {
  document.querySelectorAll(".board-line")[4].append(arrKeys[i].create());
  arrKeys[i].language = "en";
}

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.altKey) {
    window.lang = window.lang == "en" ? "ru" : "en";
    arrKeys.forEach(el => el.language = window.lang);
  }
  if (e.shiftKey) {
    arrKeys.forEach(el => el.shiftUp = window.lang);
  }
});
window.addEventListener("keyup", (e) => {
  if (!e.shiftKey) {
    arrKeys.forEach(el => el.shiftDown = window.lang);
  }
  if (e.code == "CapsLock") {
    window.capsLock = !window.capsLock;
    arrKeys.forEach(el => el.capsLock = window.capsLock);
  }
});

arrKeys[42].div.addEventListener("mousedown", (e) => {
  arrKeys.forEach(el => el.shiftUp = window.lang);
});
arrKeys[54].div.addEventListener("mousedown", (e) => {
  arrKeys.forEach(el => el.shiftUp = window.lang);
});
arrKeys[42].div.addEventListener("mouseup", (e) => {
  arrKeys.forEach(el => el.shiftDown = window.lang);
});
arrKeys[54].div.addEventListener("mouseup", (e) => {
  arrKeys.forEach(el => el.shiftDown = window.lang);
});

arrKeys[28].div.addEventListener("mousedown", (e) => {
  window.capsLock = !window.capsLock;
  arrKeys.forEach(el => el.capsLock = window.capsLock);
});
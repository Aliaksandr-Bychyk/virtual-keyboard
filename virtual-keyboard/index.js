"use strict";
import keyElement from "./modules/key.js";
import keysData from "./modules/keysData.js";

(localStorage.getItem("lang") == null) && localStorage.setItem("lang", "en");

window.capsLock = false;

let arrKeys = [];
keysData.forEach(el => arrKeys.push(
  new keyElement(el.en, el.enShift, el.ru, el.ruShift, el.options, el.keyEvent)
));

for (let i = 0; i < 14; i++) {
  document.querySelectorAll(".board-line")[0].append(arrKeys[i].create());
  arrKeys[i].language = localStorage.getItem("lang");
}
for (let i = 14; i < 28; i++) {
  document.querySelectorAll(".board-line")[1].append(arrKeys[i].create());
  arrKeys[i].language = localStorage.getItem("lang");
}
for (let i = 28; i < 42; i++) {
  document.querySelectorAll(".board-line")[2].append(arrKeys[i].create());
  arrKeys[i].language = localStorage.getItem("lang");
}
for (let i = 42; i < 55; i++) {
  document.querySelectorAll(".board-line")[3].append(arrKeys[i].create());
  arrKeys[i].language = localStorage.getItem("lang");
}
for (let i = 55; i < 64; i++) {
  document.querySelectorAll(".board-line")[4].append(arrKeys[i].create());
  arrKeys[i].language = localStorage.getItem("lang");
}

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.altKey) {
    if (localStorage.getItem("lang") == "en") {
      localStorage.setItem("lang", "ru");
    } else {
      localStorage.setItem("lang", "en");
    }
    arrKeys.forEach(el => el.language = localStorage.getItem("lang"));
  }
  if (e.shiftKey) {
    arrKeys.forEach(el => el.shiftUp = localStorage.getItem("lang"));
  }
});
window.addEventListener("keyup", (e) => {
  if (!e.shiftKey) {
    arrKeys.forEach(el => el.shiftDown = localStorage.getItem("lang"));
  }
  if (e.code == "CapsLock") {
    window.capsLock = !window.capsLock;
    arrKeys.forEach(el => el.capsLock = window.capsLock);
  }
});

arrKeys[42].div.addEventListener("mousedown", () => {
  arrKeys.forEach(el => el.shiftUp = localStorage.getItem("lang"));
});
arrKeys[54].div.addEventListener("mousedown", () => {
  arrKeys.forEach(el => el.shiftUp = localStorage.getItem("lang"));
});
arrKeys[42].div.addEventListener("mouseup", () => {
  arrKeys.forEach(el => el.shiftDown = localStorage.getItem("lang"));
});
arrKeys[54].div.addEventListener("mouseup", () => {
  arrKeys.forEach(el => el.shiftDown = localStorage.getItem("lang"));
});

arrKeys[28].div.addEventListener("mousedown", () => {
  window.capsLock = !window.capsLock;
  arrKeys.forEach(el => el.capsLock = window.capsLock);
});
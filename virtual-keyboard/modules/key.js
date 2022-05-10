export default class KeyElement {
  constructor(en, enShift, ru, ruShift, keyEvent, options = "") {
    this.en = en;
    this.enShift = enShift;
    this.ru = ru;
    this.ruShift = ruShift;
    this.options = options;
    this.keyEvent = keyEvent;
    this.lang = this.en;
    this.shift = false;
    this.caps = false;
  }

  create() {
    let div = document.createElement("div");
    div.classList.add("key");
    if (this.options.length !== 0) {
      this.options.forEach(option => div.classList.add(option));
    }
    function click(lang) {
      let textarea = document.querySelector("textarea");
      let start = textarea.selectionStart;
      let end = textarea.selectionEnd;
      let newLine = textarea.value.slice(0, start);
      textarea.value = newLine + lang + textarea.value.slice(end);
      textarea.focus();
      textarea.setSelectionRange(newLine.length + 1, newLine.length + 1);
      textarea.focus();
    }

    function enter() {
      let textarea = document.querySelector("textarea");
      let start = textarea.selectionStart;
      let end = textarea.selectionEnd;
      let newLine = textarea.value.slice(0, start);
      textarea.value = newLine + "\n" + textarea.value.slice(end);
      textarea.focus();
      textarea.setSelectionRange(newLine.length + 1, newLine.length + 1);
    }

    function tab() {
      let textarea = document.querySelector("textarea");
      let start = textarea.selectionStart;
      let end = textarea.selectionEnd;
      let newLine = textarea.value.slice(0, start);
      textarea.value = newLine + "    " + textarea.value.slice(end);
      textarea.focus();
      textarea.setSelectionRange(newLine.length + 4, newLine.length + 4);
    }

    function backspace() {
      let textarea = document.querySelector("textarea");
      let start = textarea.selectionStart;
      let end = textarea.selectionEnd;
      if (start === end) {
        textarea.value = textarea.value.slice(0, start - 1) + textarea.value.slice(end);
      } else {
        textarea.value = textarea.value.slice(0, start) + textarea.value.slice(end);
      }
      textarea.focus();
      textarea.setSelectionRange(start - 1, start - 1);
    }

    function deleteKey() {
      let textarea = document.querySelector("textarea");
      let start = textarea.selectionStart;
      let end = textarea.selectionEnd;
      if (start === end) {
        textarea.value = textarea.value.slice(0, start) + textarea.value.slice(end + 1);
      } else {
        textarea.value = textarea.value.slice(0, start) + textarea.value.slice(end);
      }
      textarea.focus();
      textarea.setSelectionRange(start, start);
    }

    function space() {
      let textarea = document.querySelector("textarea");
      let start = textarea.selectionStart;
      let end = textarea.selectionEnd;
      let newLine = textarea.value.slice(0, start);
      textarea.value = newLine + " " + textarea.value.slice(end);
      textarea.focus();
      textarea.setSelectionRange(newLine.length + 1, newLine.length + 1);
    }
    function animationPressed() {
      div.classList.add("pressed");
    }
    function animationUnPressed() {
      div.classList.remove("pressed");
    }
    function animation() {
      animationPressed();
      setTimeout(() => animationUnPressed(), 200);
    }
    function control(value) {
      let textarea = document.querySelector("textarea");
      let start = textarea.selectionStart;
      let end = textarea.textContent.length - 1;
      textarea.focus();
      switch (value) {
        case "left":
          textarea.setSelectionRange(start - 1, start - 1);
          break;
        case "right":
          textarea.setSelectionRange(start + 1, start + 1);
          break;
        case "up":
          textarea.setSelectionRange(0, 0);
          break;
        case "down":
          textarea.setSelectionRange(end, end);
          break;
        default:
          break;
      }
    }

    document.addEventListener("keyup", (e) => {
      if (e.code === this.keyEvent && e.code === "CapsLock") {
        return this.caps ? animationUnPressed() : animationPressed();
      }
      if (e.code === this.keyEvent) {
        return animationUnPressed();
      }
      return undefined;
    });
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      if (e.code === this.keyEvent && (e.altKey || e.ctrlKey)) {
        return animationPressed();
      }
      if (e.code === this.keyEvent && e.code === "Backspace") {
        animationPressed();
        return backspace();
      }
      if (e.code === this.keyEvent && e.code === "Space") {
        animationPressed();
        return space();
      }
      if (e.code === this.keyEvent && e.code === "Tab") {
        animationPressed();
        return tab();
      }
      if (e.code === this.keyEvent && e.code === "Enter") {
        animationPressed();
        return enter();
      }
      if (e.code === this.keyEvent && e.code === "ShiftLeft") {
        return animationPressed();
      }
      if (e.code === this.keyEvent && e.code === "ShiftRight") {
        return animationPressed();
      }
      if (e.code === this.keyEvent && e.code === "ControlLeft") {
        return animationPressed();
      }
      if (e.code === this.keyEvent && e.code === "ControlRight") {
        return animationPressed();
      }
      if (e.code === this.keyEvent && e.code === "CapsLock") {
        return animationPressed();
      }
      if (e.code === this.keyEvent && e.code === "Delete") {
        animationPressed();
        return deleteKey();
      }
      if (e.code === this.keyEvent && e.code === "ArrowLeft") {
        animationPressed();
        return control("left");
      }
      if (e.code === this.keyEvent && e.code === "ArrowRight") {
        animationPressed();
        return control("right");
      }
      if (e.code === this.keyEvent && e.code === "ArrowUp") {
        animationPressed();
        return control("up");
      }
      if (e.code === this.keyEvent && e.code === "ArrowDown") {
        animationPressed();
        return control("down");
      }
      if (e.code === this.keyEvent) {
        animationPressed();
        return click(this.lang);
      }
      return undefined;
    });

    div.addEventListener("click", () => {
      if (this.keyEvent === "ArrowLeft") {
        animation();
        return control("left");
      }
      if (this.keyEvent === "ArrowRight") {
        animation();
        return control("right");
      }
      if (this.keyEvent === "ArrowUp") {
        animation();
        return control("up");
      }
      if (this.keyEvent === "ArrowDown") {
        animation();
        return control("down");
      }
      if (this.keyEvent === "Backspace") {
        animation();
        return backspace();
      }
      if (this.keyEvent === "Space") {
        animation();
        return space();
      }
      if (this.keyEvent === "Tab") {
        animation();
        return tab();
      }
      if (this.keyEvent === "Enter") {
        animation();
        return enter();
      }
      if (this.keyEvent === "CapsLock") {
        return this.caps ? animationPressed() : animationUnPressed();
      }
      if (this.keyEvent === "ShiftLeft" || this.keyEvent === "ShiftRight") {
        return undefined;
      }
      if (this.keyEvent === "ControlLeft" || this.keyEvent === "ControlRight") {
        return animation();
      }
      if (this.keyEvent === "AltLeft" || this.keyEvent === "AltRight") {
        return animation();
      }
      if (this.keyEvent === "Delete") {
        animation();
        return deleteKey();
      }
      if (this.keyEvent) {
        animation();
        click(this.lang);
      }
      return undefined;
    });

    this.div = div;
    return div;
  }

  set language(value) {
    this.lang = this[value];
    this.div.textContent = this.lang;
  }

  set shiftUp(value) {
    this.shift = true;
    this.lang = value === "en" ? this.enShift : this.ruShift;
    this.div.textContent = this.lang;
    if (this.caps) {
      this.div.textContent = this.div.textContent.length > 1
        ? this.div.textContent : this.div.textContent.toLocaleLowerCase();
    }
  }

  set shiftDown(value) {
    this.shift = false;
    this.lang = value === "en" ? this.en : this.ru;
    this.div.textContent = this.lang;
    if (this.caps) {
      this.div.textContent = this.div.textContent.length > 1
        ? this.div.textContent : this.div.textContent.toLocaleUpperCase();
    }
  }

  set capsLock(value) {
    this.caps = value;
    if (this.shift) {
      this.div.textContent = this.div.textContent.length > 1
        ? this.div.textContent : this.div.textContent.toLocaleLowerCase();
    } else if (this.caps) {
      this.div.textContent = this.div.textContent.length > 1
        ? this.div.textContent : this.div.textContent.toLocaleUpperCase();
    } else {
      this.div.textContent = this.div.textContent.length > 1
        ? this.div.textContent : this.div.textContent.toLocaleLowerCase();
    }
    if (!this.caps && this.shift) {
      this.div.textContent = this.div.textContent.length > 1
        ? this.div.textContent : this.div.textContent.toLocaleUpperCase();
    }
  }
}

export default class keyElement {
  constructor(en, enShift, ru, ruShift, options = "", keyEvent) {
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
    if (this.options.length != 0) {
      this.options.forEach(option => div.classList.add(option));
    }

    document.addEventListener("keyup", (e) => {
      if (e.code == this.keyEvent && e.code == "CapsLock") {
        return this.caps ? animationUnPressed() : animationPressed();
      }
      if (e.code == this.keyEvent) {
        return animationUnPressed();
      }
    });
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      if (e.code == this.keyEvent && (e.altKey || e.ctrlKey)) {
        return animationPressed();
      }
      if (e.code == this.keyEvent && e.code == "Backspace") {
        animationPressed();
        return backspace();
      }
      if (e.code == this.keyEvent && e.code == "Space") {
        animationPressed();
        return space();
      }
      if (e.code == this.keyEvent && e.code == "Tab") {
        animationPressed();
        return tab();
      }
      if (e.code == this.keyEvent && e.code == "Enter") {
        animationPressed();
        return enter();
      }
      if (e.code == this.keyEvent && e.code == "ShiftLeft") {
        return animationPressed();
      }
      if (e.code == this.keyEvent && e.code == "ShiftRight") {
        return animationPressed();
      }
      if (e.code == this.keyEvent && e.code == "ControlLeft") {
        return animationPressed();
      }
      if (e.code == this.keyEvent && e.code == "ControlRight") {
        return animationPressed();
      }
      if (e.code == this.keyEvent && e.code == "CapsLock") {
        return animationPressed();
      }
      if (e.code == this.keyEvent && e.code == "Delete") {
        animationPressed();
        return deleteKey();
      }
      if (e.code == this.keyEvent) {
        animationPressed();
        return click(this.lang);
      }
    });

    div.addEventListener("click", (e) => {
      if (this.keyEvent == "Backspace") {
        animation();
        return backspace();
      }
      if (this.keyEvent == "Space") {
        animation();
        return space();
      }
      if (this.keyEvent == "Tab") {
        animation();
        return tab();
      }
      if (this.keyEvent == "Enter") {
        animation();
        return enter();
      }
      if (this.keyEvent == "CapsLock") {
        return this.caps ? animationPressed() : animationUnPressed();
      }
      if (this.keyEvent == "ShiftLeft" || this.keyEvent == "ShiftRight") {
        return;
      }
      if (this.keyEvent == "ControlLeft" || this.keyEvent == "ControlRight") {
        return animation();
      }
      if (this.keyEvent == "AltLeft" || this.keyEvent == "AltRight") {
        return animation();
      }
      if (this.keyEvent == "Delete") {
        animation();
        return deleteKey();
      }
      if (this.keyEvent) {
        animation();
        click(this.lang);
      }
    });

    this.div = div;
    return div;

    function click(lang) {
      let textarea = document.querySelector("textarea");
      textarea.value += lang;
      textarea.focus();
    }

    function enter() {
      let textarea = document.querySelector("textarea");
      textarea.value += "\n";
      textarea.focus();
    }

    function tab() {
      let textarea = document.querySelector("textarea");
      textarea.value += "    ";
      textarea.focus();
    }

    function backspace() {
      let textarea = document.querySelector("textarea");
      let start = textarea.selectionStart;
      let end = textarea.selectionEnd;
      if (start == end) {
        textarea.value = textarea.value.slice(0, start - 1) + textarea.value.slice(end);
      } else {
        textarea.value = textarea.value.slice(0, start) + textarea.value.slice(end);
      }
      textarea.focus();
      textarea.setSelectionRange(start-1, start-1);
    }

    function deleteKey() {
      let textarea = document.querySelector("textarea");
      let start = textarea.selectionStart;
      let end = textarea.selectionEnd;
      if (start == end) {
        textarea.value = textarea.value.slice(0, start) + textarea.value.slice(end + 1);
      } else {
        textarea.value = textarea.value.slice(0, start) + textarea.value.slice(end);
      }
      textarea.focus();
      textarea.setSelectionRange(start, start);
    }

    function space() {
      let textarea = document.querySelector("textarea");
      textarea.value += " ";
      textarea.focus();
    }
    function animation() {
      animationPressed();
      setTimeout(() => animationUnPressed(), 200);
    }
    function animationPressed() {
      div.classList.add("pressed");
    }
    function animationUnPressed() {
      div.classList.remove("pressed");
    }
  }

  set language(value) {
    this.lang = this[value];
    this.div.textContent = this.lang;
  }

  set shiftUp(value) {
    this.shift = true;
    this.lang = value == "en" ? this.enShift : this.ruShift;
    this.div.textContent = this.lang;
    if (this.caps) {
      this.div.textContent = this.div.textContent.length > 1 ? this.div.textContent : this.div.textContent.toLocaleLowerCase();
    }
  }

  set shiftDown(value) {
    this.shift = false;
    this.lang = value == "en" ? this.en : this.ru;
    this.div.textContent = this.lang;
    if (this.caps) {
      this.div.textContent = this.div.textContent.length > 1 ? this.div.textContent : this.div.textContent.toLocaleUpperCase();
    }
  }

  set capsLock(value) {
    this.caps = value;
    if (this.shift) {
      this.div.textContent = this.div.textContent.length > 1 ? this.div.textContent : this.div.textContent.toLocaleLowerCase();
    } else if (this.caps) {
      this.div.textContent = this.div.textContent.length > 1 ? this.div.textContent : this.div.textContent.toLocaleUpperCase();
    } else {
      this.div.textContent = this.div.textContent.length > 1 ? this.div.textContent : this.div.textContent.toLocaleLowerCase();
    }
    if (!this.caps && this.shift) {
      this.div.textContent = this.div.textContent.length > 1 ? this.div.textContent : this.div.textContent.toLocaleUpperCase();
    }
  }
}
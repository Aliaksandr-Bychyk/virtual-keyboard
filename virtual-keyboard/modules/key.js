export default class keyElement {
  constructor (en, enShift, ru, ruShift, options = "", keyEvent) {
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
      if (e.code == this.keyEvent) {
        animationPressed();
        return click(this.lang);
      }
    });

    div.addEventListener("click", () => click(this.lang));
    this.div = div;
    return div;

    function click(lang) {
      let textarea = document.querySelector("textarea");
      textarea.value += lang;
    }

    function enter() {
      let textarea = document.querySelector("textarea");
      textarea.value += "\n";
    }

    function tab() {
      let textarea = document.querySelector("textarea");
      textarea.value += "    ";
    }

    function backspace() {
      let textarea = document.querySelector("textarea");
      if (textarea.selectionStart == textarea.selectionEnd) {
        textarea.value = textarea.value.slice(0, textarea.value.length-1);
      } else {
        textarea.value = textarea.value.slice(0, textarea.selectionStart) + textarea.value.slice(textarea.selectionEnd);
      }
    }

    function space() {
      let textarea = document.querySelector("textarea");
      textarea.value += " ";
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
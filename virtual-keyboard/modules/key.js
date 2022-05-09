export default class keyElement {
  constructor (en, enShift, ru, ruShift, options = "", keyEvent) {
    this.en = en;
    this.enShift = enShift;
    this.ru = ru;
    this.ruShift = ruShift;
    this.options = options;
    this.keyEvent = keyEvent;
    this.lang = this.en;
  }
  create() {
    
    let div = document.createElement("div");
    div.classList.add("key");
    if (this.options.length != 0) {
      this.options.forEach(option => div.classList.add(option));
    }
    document.addEventListener("keyup", (e) => {
      if (e.code == this.keyEvent && e.code == "ShiftLeft") {
        return animationUnPressed();
      } 
    });
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      if (e.code == this.keyEvent && (e.altKey || e.ctrlKey)) {
        return animation();
      }
      if (e.code == this.keyEvent && e.code == "Backspace") {
        animation();
        return backspace();
      } 
      if (e.code == this.keyEvent && e.code == "Space") {
        animation();
        return space();
      } 
      if (e.code == this.keyEvent && e.code == "Tab") {
        animation();
        return tab();
      } 
      if (e.code == this.keyEvent && e.code == "Enter") {
        animation();
        return enter();
      } 
      if (e.code == this.keyEvent && e.code == "ShiftLeft") {
        return animationPressed();
      } 
      if (e.code == this.keyEvent) {
        animation();
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
    function animation() {
      div.classList.add("pressed");
      setTimeout(() => div.classList.remove("pressed"), 200);
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
    this.lang = value == "en" ? this.enShift : this.ruShift;
    this.div.textContent = this.lang;
  }

  set shiftDown(value) {
    this.lang = value == "en" ? this.en : this.ru;
    this.div.textContent = this.lang;
  }
}
export default function canvas() { 
  let canvasElement = document.createElement("div");
  canvasElement.classList.add("canvas");
  
  let titleElement = document.createElement("h1");
  titleElement.classList.add("glass");
  titleElement.textContent = "RSS Virtual Keyboard";

  let textareaElement = document.createElement("textarea");
  textareaElement.classList.add("glass");
  textareaElement.setAttribute("placeholder", "Your text here...");

  let boardBackground = document.createElement("div");
  boardBackground.classList.add("board-background");
  boardBackground.classList.add("glass");

  let boardElement = document.createElement("div");
  boardElement.classList.add("board");

  for (let i = 0; i < 5; i++) {
    let boardLineElement = document.createElement("div");
    boardLineElement.classList.add("board-line");
    boardElement.append(boardLineElement);
  }

  boardBackground.append(boardElement);

  let textElement = document.createElement("h2");
  textElement.textContent = "OS Windows. To switch language: ctrl + alt";

  canvasElement.append(titleElement);
  canvasElement.append(textareaElement);
  canvasElement.append(boardBackground);
  canvasElement.append(textElement);

  return canvasElement;
}
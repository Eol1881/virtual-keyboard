import { KEYBOARD, TEXTAREA } from "./basic_layout";
import { keyFunctions } from "./key_functions";

////////////////////////////////////// Performance checks //////////////////////////////////////
let startTime; // delay measurement start time
let endTime; // delay measurement end time
let temp;
////////////////////////////////////////////////////////////////////////////////////////////////

let cursorPosition = 0; // default cursor position

function updateCursorPosition(textarea = TEXTAREA) {
  textarea.selectionStart = cursorPosition;
  textarea.selectionEnd = cursorPosition;
}

KEYBOARD.addEventListener('mousedown', (e) => {
  startTime = performance.now(); // start the delay measurement (performance check)

  if (e.target.tagName !== 'SPAN') return;
  const keyDatasetValue = e.target.parentElement.parentElement.dataset.value;

  if (keyFunctions[keyDatasetValue]) {
    //console.log(e);
    cursorPosition = keyFunctions[keyDatasetValue](TEXTAREA, cursorPosition);
    updateCursorPosition();
  } else {
    TEXTAREA.value = TEXTAREA.value.slice(0, cursorPosition) + e.target.textContent + TEXTAREA.value.slice(cursorPosition);
    cursorPosition += 1;
    updateCursorPosition();
  }

  console.log('>>>>', keyDatasetValue, '(virtual input)' + `\n` + 'Cursor pos:', cursorPosition);

  // create a new input event - default one fires only when physical key is down
  const inputEvent = new Event('input');
  TEXTAREA.dispatchEvent(inputEvent); // trigger the event
})

KEYBOARD.addEventListener('mouseup', (e) => {
  if (e.target.tagName !== 'SPAN') return;
  const keyDatasetValue = e.target.parentElement.parentElement.dataset.value;
  if (keyDatasetValue !== 'ShiftLeft' || keyDatasetValue !== 'ShiftRight') return;
  keyFunctions[keyDatasetValue](TEXTAREA, cursorPosition);
})

TEXTAREA.addEventListener('input', () => {
  if (startTime === temp) return;
  endTime = performance.now(); // finish the delay measurement (performance check)
  const delay = endTime - startTime; // calculate the ddelay (performance check)
  console.log(`Input delay: ${delay.toFixed(1)} ms`); // logging the delay (performance check)
  temp = startTime;
});

////////////////////////////////////// Textarea listeners //////////////////////////////////////
let isTextareaFirstClick = true;
let preventBlur = true;
TEXTAREA.focus();

function dontChangeCursorPos(event) {
  console.log('-');
  event.preventDefault();
  event.target.selectionStart = cursorPosition;
  event.target.selectionEnd = cursorPosition;
  event.target.focus();
  console.log('Cursor position:', cursorPosition);
  return false;
}

function changeCursorPos(event) {
  console.log('+', event.target.selectionStart);
  cursorPosition = event.target.selectionStart;
  console.log('Cursor position:', cursorPosition);
}

TEXTAREA.addEventListener('mousedown', function(event) {
  if (isTextareaFirstClick) isTextareaFirstClick = dontChangeCursorPos(event);
});

TEXTAREA.addEventListener('click', function(event) {
  if (!isTextareaFirstClick) changeCursorPos(event);
});

TEXTAREA.addEventListener('blur', (event) => {
  isTextareaFirstClick = true;
  if (preventBlur) event.target.focus();
});

////////////////////////////////////// Physical keyboard //////////////////////////////////////

window.addEventListener('keydown', function(e) {
  startTime = performance.now(); // start the delay measurement (performance check)

  e.preventDefault();

  const keyCode = e.code;
  const pressedKeyContainer = document.querySelector(`.keyboard__key--${keyCode}`);
  const langHolder = pressedKeyContainer.querySelector(':not(.hidden)');
  const symbolHolder = langHolder.querySelector(':not(.hidden)');

  pressedKeyContainer.classList.add('highlight')

  if (keyFunctions[keyCode]) {
    cursorPosition = keyFunctions[keyCode](TEXTAREA, cursorPosition);
    updateCursorPosition();
  } else {
    TEXTAREA.value = TEXTAREA.value.slice(0, cursorPosition) + symbolHolder.textContent + TEXTAREA.value.slice(cursorPosition);
    cursorPosition += 1;
    updateCursorPosition();
  }

  console.log('>>>>', keyCode, '(physical input)' + `\n` + 'Cursor pos:', cursorPosition);

  // create a new input event - default one fires only when physical key is down
  const inputEvent = new Event('input');
  TEXTAREA.dispatchEvent(inputEvent); // trigger the event
});

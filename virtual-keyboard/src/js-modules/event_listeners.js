import { KEYBOARD, TEXTAREA } from "./basic_layout";
import { keyFunctions } from "./key_functions";

////////////////////////////////////// Performance checks //////////////////////////////////////
let startTime; // delay measurement start time
let endTime; // delay measurement end time
let temp;
function dispatchInputEvent() {
  // create a new input event - default one fires only when physical key is down
  const inputEvent = new Event('input');
  TEXTAREA.dispatchEvent(inputEvent); // trigger the event
}
////////////////////////////////////////////////////////////////////////////////////////////////

let isShiftActive = false;
let isCapsActive = false;
let capsTrigger = false;
let cursorPosition = 0; // default cursor position
function updateCursorPosition(textarea = TEXTAREA) {
  textarea.selectionStart = cursorPosition;
  textarea.selectionEnd = cursorPosition;
}

KEYBOARD.addEventListener('mousedown', (e) => {
  startTime = performance.now(); // start the delay measurement (performance check)

  if (e.target.tagName !== 'SPAN') return;
  const pressedKeyContainer = e.target.parentElement.parentElement;
  const keyDatasetValue = pressedKeyContainer.dataset.value;

  pressedKeyContainer.classList.add('highlight')

  if (keyFunctions[keyDatasetValue]) {
    cursorPosition = keyFunctions[keyDatasetValue](TEXTAREA, cursorPosition);
    updateCursorPosition();
  } else {
    TEXTAREA.value = TEXTAREA.value.slice(0, cursorPosition) + e.target.textContent + TEXTAREA.value.slice(cursorPosition);
    cursorPosition += 1;
    updateCursorPosition();
  }

  console.log('>>>>', keyDatasetValue, '(virtual input)' + `\n` + 'Cursor pos:', cursorPosition);
  dispatchInputEvent();

  window.addEventListener('mouseup', function removeHightlight() {
    pressedKeyContainer.classList.remove('highlight');
    if (keyDatasetValue.startsWith('Shift')) {
      keyFunctions['ShiftLeft'](TEXTAREA, cursorPosition, true);
    }
    window.removeEventListener('mouseup', removeHightlight);
  })
  //////////////////////////////////////////////////// OR OPTION #2
  // pressedKeyContainer.addEventListener('mouseleave', function removeHightlight() {
  //   pressedKeyContainer.classList.remove('highlight');
  //   if (keyDatasetValue.startsWith('Shift')) {
  //     keyFunctions['ShiftLeft'](TEXTAREA, cursorPosition);
  //   }
  //   pressedKeyContainer.removeEventListener('mouseleave', removeHightlight);
  // })
})

TEXTAREA.addEventListener('input', () => { // performance check related only
  if (startTime === temp) return;
  endTime = performance.now(); // finish the delay measurement (performance check)
  const delay = endTime - startTime; // calculate the ddelay (performance check)
  console.log(`Input delay: ${delay.toFixed(1)} ms`); // logging the delay (performance check)
  temp = startTime;
});

////////////////////////////////////// Textarea listeners //////////////////////////////////////
TEXTAREA.focus();

TEXTAREA.addEventListener('click', function(event) { // TODO: add multiple character selection support
  cursorPosition = event.target.selectionStart;
  console.log('Cursor position:', cursorPosition);
});

TEXTAREA.addEventListener('blur', (event) => {
  event.target.focus();
});

////////////////////////////////////// Physical keyboard //////////////////////////////////////

window.addEventListener('keydown', function(e) {
  startTime = performance.now(); // start the delay measurement (performance check)

  e.preventDefault();

  const keyCode = e.code;
  const pressedKeyContainer = document.querySelector(`.keyboard__key--${keyCode}`);
  const langHolder = pressedKeyContainer.querySelector(':not(.hidden)');
  const symbolHolder = langHolder.querySelector(':not(.hidden)');

  if (!keyCode.startsWith('Caps')) pressedKeyContainer.classList.add('highlight');

  if (keyCode.startsWith('Shift')) {
    if (isShiftActive) return;
    cursorPosition = keyFunctions[keyCode](TEXTAREA, cursorPosition);
    window.addEventListener('keyup', function deactivateShift(e) {
      if (!e.code.startsWith('Shift')) return;
      cursorPosition = keyFunctions[keyCode](TEXTAREA, cursorPosition);
      window.removeEventListener('keyup', deactivateShift);
      isShiftActive = false;
    })
    isShiftActive = true;
  } else if (keyCode.startsWith('Caps')) {
    if (isCapsActive) return;
    cursorPosition = keyFunctions[keyCode](TEXTAREA, cursorPosition);
    pressedKeyContainer.classList.toggle('highlight');
    window.addEventListener('keyup', function deactivateCaps(e) {
      if (!e.code.startsWith('Caps')) return;
      isCapsActive = false;
      window.removeEventListener('keyup', deactivateCaps);
    })
    isCapsActive = true;
  } else if (keyFunctions[keyCode]) {
    cursorPosition = keyFunctions[keyCode](TEXTAREA, cursorPosition);
    updateCursorPosition();
  } else {
    TEXTAREA.value = TEXTAREA.value.slice(0, cursorPosition) + symbolHolder.textContent + TEXTAREA.value.slice(cursorPosition);
    cursorPosition += 1;
    updateCursorPosition();
  }

  console.log('>>>>', keyCode, '(physical input)' + `\n` + 'Cursor pos:', cursorPosition);
  dispatchInputEvent();
});

window.addEventListener('keyup', function(e) {
  const keyCode = e.code;
  const pressedKeyContainer = document.querySelector(`.keyboard__key--${keyCode}`);

  if (keyCode.startsWith('Caps')) return;
  else pressedKeyContainer.classList.remove('highlight');
});

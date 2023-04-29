import { KEYBOARD, KEYBOARD_STATE } from "./basic_layout";

const keysUpperCase = KEYBOARD.querySelectorAll('span.upperCase');
const keysLowerCase = KEYBOARD.querySelectorAll('span.lowerCase');
const keysCaps = KEYBOARD.querySelectorAll('span.caps');
const keysCapsShift = KEYBOARD.querySelectorAll('span.capsShift');

const langBoxesEN = Array.from(KEYBOARD.querySelectorAll('span.EN'));
const langBoxesRU = Array.from(KEYBOARD.querySelectorAll('span.RU'));

const funcDel = function(textarea, cursor) {
  const text = textarea.value;
  textarea.value = text.slice(0, cursor) + text.slice(cursor + 1);
  return cursor;
}

const funcBackspace = function(textarea, cursor) {
  if (cursor === 0) return cursor;
  const text = textarea.value;
  textarea.value = text.slice(0, cursor - 1) + text.slice(cursor);
  return cursor - 1;
}

const funcEnter = function(textarea, cursor) {
  const text = textarea.value;
  textarea.value = text.slice(0, cursor) + '\n' + text.slice(cursor);
  return cursor + 1;
}

const funcTab = function(textarea, cursor) {
  const text = textarea.value;
  textarea.value = text.slice(0, cursor) + '\t' + text.slice(cursor);
  return cursor + 1;
}

const funcRight = function(textarea, cursor) {
  if (textarea.value.length === cursor) return cursor;
  return cursor + 1;
}

const funcLeft = function(textarea, cursor) {
  if (cursor === 0) return cursor;
  return cursor - 1;
}

const funcDown = function(textarea, cursor) {
  const currentValue = textarea.value;

  // if we are on last line - set cursor pos to textarea.length
  const isOnLastLine = currentValue.indexOf('\n', cursor) === -1;
  if (isOnLastLine) {
    //console.log('on last line');
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    return textarea.value.length;
  }

  const prevLineBreakPos = currentValue.lastIndexOf('\n', cursor - 1) + 1;
  const currentLineLengthBeforeCursor = cursor - prevLineBreakPos;
  const nextLineBreakPos = currentValue.indexOf('\n', cursor) + 1;
  const afterNextLineBreakPos = currentValue.indexOf('\n', nextLineBreakPos);
  const isOnPreLastLine = afterNextLineBreakPos === -1;
  let nextLineLength;
  if (isOnPreLastLine) nextLineLength = textarea.value.length - prevLineBreakPos;
  else nextLineLength = afterNextLineBreakPos - nextLineBreakPos;
  console.log(nextLineBreakPos, afterNextLineBreakPos, nextLineLength);

  let newCursorPos;
  if (currentLineLengthBeforeCursor > nextLineLength && afterNextLineBreakPos !== -1) {
    newCursorPos = nextLineBreakPos + nextLineLength;
  } else {
    newCursorPos = nextLineBreakPos + currentLineLengthBeforeCursor;
  }

  textarea.setSelectionRange(newCursorPos, newCursorPos);
  return newCursorPos;
}

const funcUp = function(textarea, cursor) {
  const currentValue = textarea.value;

  // if we are on 1st line - set cursor pos to zero and return
  const isOnFirstLine = currentValue.lastIndexOf('\n', cursor - 1) === -1;
  if (isOnFirstLine) {
    //console.log('on 1st line');
    textarea.setSelectionRange(0, 0);
    return 0;
  }

  const prevLineBreakPos = currentValue.lastIndexOf('\n', cursor - 1);
  const beforePrevLineBreakPos = currentValue.lastIndexOf('\n', prevLineBreakPos - 1);
  const prevLineLength = prevLineBreakPos - beforePrevLineBreakPos - 1;
  const currentLineLengthBeforeCursor = cursor - prevLineBreakPos - 1;
  //console.log('xxxx', prevLineLength, currentLineLengthBeforeCursor);

  let xPosition;
  let newCursorPos;
  if (currentLineLengthBeforeCursor <= prevLineLength) {
    xPosition = cursor - prevLineBreakPos;
    newCursorPos = beforePrevLineBreakPos + xPosition;
  } else {
    xPosition = prevLineLength + 1;
    newCursorPos = beforePrevLineBreakPos + xPosition;
  }

  textarea.setSelectionRange(newCursorPos, newCursorPos);
  return newCursorPos;
}

const funcWin = function(_, cursor) {
  return cursor;
}

const funcAlt = function(_, cursor) {
  return cursor;
}

const funcCtrl = function(_, cursor) {
  return cursor;
}

const funcCapsLock = function(_, cursor) {
  const isShiftActive = KEYBOARD_STATE.Shift;

  function toggleHidden(elementsArray) {
    for (let element of elementsArray) {
      element.forEach(key => {
        key.classList.toggle('hidden');
      })
    }
  }

  if (isShiftActive) {
    toggleHidden([keysCapsShift, keysUpperCase]);
  } else {
    toggleHidden([keysLowerCase, keysCaps]);
  }

  KEYBOARD_STATE.CapsLock = KEYBOARD_STATE.CapsLock ? false : true;

  return cursor;
}

const funcShift = function(_, cursor) {
  const isCapsActive = KEYBOARD_STATE.CapsLock;

  if (isCapsActive) {
    keysCaps.forEach(key => {
      key.classList.toggle('hidden');
    })
    keysCapsShift.forEach(key => {
      key.classList.toggle('hidden');
    })
  } else {
    keysLowerCase.forEach(key => {
      key.classList.toggle('hidden');
    })
    keysUpperCase.forEach(key => {
      key.classList.toggle('hidden');
    })
  }

  KEYBOARD_STATE.Shift = KEYBOARD_STATE.Shift ? false : true;

  return cursor;
}

const changeLanguage = function() {
  langBoxesEN.forEach(langBox => (langBox.classList.toggle('hidden')));
  langBoxesRU.forEach(langBox => (langBox.classList.toggle('hidden')));
  KEYBOARD_STATE.language = KEYBOARD_STATE.language === 'EN' ? 'RU' : 'EN';
}

const keyFunctions = {
  Tab: funcTab,
  CapsLock: funcCapsLock,
  ShiftLeft: funcShift,
  ShiftRight: funcShift,
  ControlLeft: funcCtrl,
  ControlRight: funcCtrl,
  AltLeft: funcAlt,
  AltRight: funcAlt,
  MetaLeft: funcWin,
  Enter: funcEnter,
  Delete: funcDel,
  Backspace: funcBackspace,
  ArrowUp: funcUp,
  ArrowDown: funcDown,
  ArrowLeft: funcLeft,
  ArrowRight: funcRight
};

export { keyFunctions, changeLanguage };
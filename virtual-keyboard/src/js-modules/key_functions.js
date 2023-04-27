let
funcCtrl,
funcAlt

const keysUpperCase = document.querySelectorAll('span.upperCase');
const keysLowerCase = document.querySelectorAll('span.lowerCase');
const keysCaps = document.querySelectorAll('span.caps');
const keysCapsShift = document.querySelectorAll('span.capsShift');

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
  const nextLineLength = afterNextLineBreakPos - nextLineBreakPos;
  //console.log(nextLineBreakPos, afterNextLineBreakPos, nextLineLength);

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

  let nextLineBreakPos;// if on last line - set equal to textarea.value.length
  if (currentValue.indexOf('\n', cursor) !== -1) nextLineBreakPos = currentValue.indexOf('\n', cursor);
  else nextLineBreakPos = currentValue.length;
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

const funcWin = function() {
  return;
}

const funcCapsLock = function(textarea, cursor) {
  keysLowerCase.forEach(key => {
    key.classList.toggle('hidden');
  })
  keysCaps.forEach(key => {
    key.classList.toggle('hidden');
  })

  if (document.querySelector('div.keyboard').dataset.value) { // CRUTCH ATTENTION! (for shift func only)
    delete document.querySelector('div.keyboard').dataset.value;
  } else {
    document.querySelector('div.keyboard').dataset.value = 'CAPS-ON';
  }

  return cursor;
}

const funcShift = function(textarea, cursor) {
  const isCapsActive = document.querySelector('div.keyboard').dataset.value;


  // let isCapsActive = !keysCaps[0].classList.contains('hidden');

  if (isCapsActive) {
    keysCaps.forEach(key => {
      key.classList.toggle('hidden');
    })
    keysCapsShift.forEach(key => {
      key.classList.toggle('hidden');
    })
  }
  else {
    keysLowerCase.forEach(key => {
      key.classList.toggle('hidden');
    })
    keysUpperCase.forEach(key => {
      key.classList.toggle('hidden');
    })
  }


  return cursor;
}

const keyFunctions = {
  Tab: funcTab,
  CapsLock: funcCapsLock,
  Shift: funcShift,
  Ctrl: funcCtrl,
  Win: funcWin,
  Alt: funcAlt,
  Enter: funcEnter,
  Delete: funcDel,
  Backspace: funcBackspace,
  Up: funcUp,
  Down: funcDown,
  Left: funcLeft,
  Right: funcRight
};

export { keyFunctions };
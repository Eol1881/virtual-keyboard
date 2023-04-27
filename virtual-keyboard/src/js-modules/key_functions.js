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

  const xPosition = cursor - currentValue.lastIndexOf('\n', cursor);
  const newCursorPos = currentValue.indexOf('\n', cursor + 1) + xPosition;

  const isOnLastLine = currentValue.indexOf('\n', cursor) === -1;
  const isOnPreLastLineLast = newCursorPos === -1;

  // if we are on last line - set cursor pos to end
  if (isOnLastLine || isOnPreLastLineLast) {
    console.log('on last');
    const lastPossiblePos = currentValue.length;
    textarea.setSelectionRange(lastPossiblePos, lastPossiblePos);
    return lastPossiblePos;
  }

  textarea.setSelectionRange(newCursorPos, newCursorPos);
  return newCursorPos;
}

const funcUp = function(textarea, cursor) {
  const currentValue = textarea.value;

  // if we are on 1st line - set cursor pos to zero
  const isOnFirstLine = currentValue.lastIndexOf('\n', cursor - 1) === -1;
  if (isOnFirstLine) {
    console.log('on 1st');
    textarea.setSelectionRange(0, 0);
    return 0;
  }

  const lastLineBreakPos = currentValue.lastIndexOf('\n', cursor);
  const beforeLastLineBreakPos = currentValue.lastIndexOf('\n', lastLineBreakPos - 1);
  const xPosition = cursor - currentValue.lastIndexOf('\n', cursor);

  const newCursorPos = beforeLastLineBreakPos + xPosition;
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
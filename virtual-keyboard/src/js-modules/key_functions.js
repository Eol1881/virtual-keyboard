let funcCapsLock,
funcShift,
funcCtrl,
funcWin,funcAlt,
funcUp,
funcDown,
funcSpacebar


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
  Spacebar: funcSpacebar,
  Left: funcLeft,
  Right: funcRight
};

export { keyFunctions };
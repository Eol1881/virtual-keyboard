
const keymaps = {
  keyCodes: [
    'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
    'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash',
    'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
    'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft',
    'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'
  ],
  symbolsRU: {
    KeyQ: 'й',
    KeyW: 'ц',
    KeyE: 'у',
    KeyR: 'к',
    KeyT: 'е',
    KeyY: 'н',
    KeyU: 'г',
    KeyI: 'ш',
    KeyO: 'щ',
    KeyP: 'з',
    KeyA: 'ф',
    KeyS: 'ы',
    KeyD: 'в',
    KeyF: 'а',
    KeyG: 'п',
    KeyH: 'р',
    KeyJ: 'о',
    KeyK: 'л',
    KeyL: 'д',
    KeyZ: 'я',
    KeyX: 'ч',
    KeyC: 'с',
    KeyV: 'м',
    KeyB: 'и',
    KeyN: 'т',
    KeyM: 'ь',

    Backquote: 'ё',
    BracketLeft: 'х',
    BracketRight: 'ъ',
    Backslash: '\\',
    Semicolon: 'ж',
    Quote: 'э',
    Comma: 'б',
    Period: 'ю',
    Slash: '.',
  },
  symbolsEN: {
    Digit1: '1',
    Digit2: '2',
    Digit3: '3',
    Digit4: '4',
    Digit5: '5',
    Digit6: '6',
    Digit7: '7',
    Digit8: '8',
    Digit9: '9',
    Digit0: '0',
    Minus: '-',
    Equal: '=',
    Backspace: 'Backspace',
    Tab: 'Tab',
    CapsLock: 'CapsLock',
    Enter: 'Enter',
    ShiftLeft: 'Shift',
    ShiftRight: 'Shift',
    ControlLeft: 'Ctrl',
    ControlRight: 'Ctrl',
    AltLeft: 'Alt',
    AltRight: 'Alt',
    MetaLeft: 'Win',
    Space: ' ',
    ArrowUp: '▲',
    ArrowLeft: '◄',
    ArrowDown: '▼',
    ArrowRight: '►',
    Delete: 'Del',

    Backquote: '`',
    BracketLeft: '[',
    BracketRight: ']',
    Backslash: '\\',
    Semicolon: ';',
    Quote: '\'',
    Comma: ',',
    Period: '.',
    Slash: '/',

    KeyQ: 'q',
    KeyW: 'w',
    KeyE: 'e',
    KeyR: 'r',
    KeyT: 't',
    KeyY: 'y',
    KeyU: 'u',
    KeyI: 'i',
    KeyO: 'o',
    KeyP: 'p',
    KeyA: 'a',
    KeyS: 's',
    KeyD: 'd',
    KeyF: 'f',
    KeyG: 'g',
    KeyH: 'h',
    KeyJ: 'j',
    KeyK: 'k',
    KeyL: 'l',
    KeyZ: 'z',
    KeyX: 'x',
    KeyC: 'c',
    KeyV: 'v',
    KeyB: 'b',
    KeyN: 'n',
    KeyM: 'm',
  },

  shiftEN: {
    Digit1: "!",
    Digit2: "@",
    Digit3: "#",
    Digit4: "$",
    Digit5: "%",
    Digit6: "^",
    Digit7: "&",
    Digit8: "*",
    Digit9: "(",
    Digit0: ")",
    Minus: "_",
    Equal: "+",
    Backquote: "~",
    BracketLeft: "{",
    BracketRight: "}",
    Backslash: "|",
    Semicolon: ":",
    Quote: "\'",
    Comma: "<",
    Period: ">",
    Slash: "?",

    Tab: 'Tab',
    CapsLock: 'CapsLock',
    ShiftLeft: 'Shift',
    ShiftRight: 'Shift',
    ControlLeft: 'Ctrl',
    ControlRight: 'Ctrl',
    AltLeft: 'Alt',
    AltRight: 'Alt',
    MetaLeft: 'Win',
    Enter: 'Enter',
    Delete: 'Del',
    Backspace: 'Backspace',
    Space: ' ',
    ArrowUp: '▲',
    ArrowLeft: '◄',
    ArrowDown: '▼',
    ArrowRight: '►',
  },
  shiftRU: {
    Digit1: "!",
    Digit2: "\"",
    Digit3: "№",
    Digit4: ";",
    Digit5: "%",
    Digit6: ":",
    Digit7: "?",
    Digit8: "*",
    Digit9: "(",
    Digit0: ")",
    Minus: "_",
    Equal: "+",
    Backquote: "Ё",
    BracketLeft: "Х",
    BracketRight: "Ъ",
    Backslash: "/",
    Semicolon: "Ж",
    Quote: "Э",
    Comma: "Б",
    Period: "Ю",
    Slash: ",",
  },
}

//////////////////////////////////////////////// Performance check
const startTime = performance.now(); // delay measurement start time
let endTime; // delay measurement end time
////////////////////////////////////////////////

class keyObject {
  constructor(key) {
    let obj = {};

    obj.valueEN = keymaps.symbolsEN[key];
    obj.valueRU = keymaps.symbolsRU[key] || keymaps.symbolsEN[key];
    obj.upperCaseEN = keymaps.shiftEN[key] || obj.valueEN.toUpperCase();
    obj.upperCaseRU = keymaps.shiftRU[key] || obj.valueRU.toUpperCase();

    obj.isLetterEN = obj.valueEN.length === 1;
    obj.isLetterRU = obj.valueRU.length === 1;

    return obj;
  }
}

const keysData = {};

keymaps.keyCodes.forEach((keyCode) => {
  const createdObj = new keyObject(keyCode);
  keysData[keyCode] = createdObj;

  //keysData.push(createdObj);
});

//////////////////////////////////////////////// Performance check
endTime = performance.now();
const delay = endTime - startTime;
console.log(`Keys data successfully generated (${delay.toFixed(1)} ms):`, keysData);
////////////////////////////////////////////////

export { keysData };
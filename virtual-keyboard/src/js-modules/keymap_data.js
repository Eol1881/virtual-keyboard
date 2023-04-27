
const keymaps = {
  keymapEN: [
    'Backquote', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd0', 'Minus', 'Equal', 'Backspace',
    'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'BracketLeft', 'BracketRight', 'Backslash',
    'Delete', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Semicolon', 'Quote', 'Enter',
    'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Comma', 'Period', 'Slash', 'Up', 'Shift', 'Ctrl',
    'Win', 'Alt', 'Spacebar', 'Alt', 'Left', 'Down', 'Right', 'Ctrl'
  ],
  keymapRU: [
    'ё', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd0', 'Minus', 'Equal', 'Backspace', 'Tab',
    'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Backslash', 'Delete', 'CapsLock', 'ф',
    'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь',
    'б', 'ю', 'Comma', 'Up', 'Shift', 'Ctrl', 'Win', 'Alt', 'Spacebar',
    'Alt', 'Left', 'Down', 'Right', 'Ctrl'
  ],
  symbolsRU: {
    Backquote: 'ё',
    BracketLeft: 'х',
    BracketRight: 'ъ',
    Semicolon: 'ж',
    Quote: 'э',
    Comma: 'б',
    Period: 'ю',
    Slash: '.',
  },
  symbolsEN: {
    d1: '1',
    d2: '2',
    d3: '3',
    d4: '4',
    d5: '5',
    d6: '6',
    d7: '7',
    d8: '8',
    d9: '9',
    d0: '0',
    Backquote: '`',
    Minus: '-',
    Equal: '=',
    Backspace: 'Backspace',
    Tab: 'Tab',
    BracketLeft: '[',
    BracketRight: ']',
    Backslash: '\\',
    Delete: 'Del',
    CapsLock: 'CapsLock',
    Semicolon: ';',
    Quote: '\'',
    Enter: 'Enter',
    Shift: 'Shift',
    Comma: ',',
    Period: '.',
    Slash: '/',
    Ctrl: 'Ctrl',
    Win: 'Win',
    Alt: 'Alt',
    Spacebar: ' ',
    Up: '▲',
    Left: '◄',
    Down: '▼',
    Right: '►',
  },
  shiftEN: {
    d1: "!",
    d2: "@",
    d3: "#",
    d4: "$",
    d5: "%",
    d6: "^",
    d7: "&",
    d8: "*",
    d9: "(",
    d0: ")",
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
    Shift: 'Shift',
    Ctrl: 'Ctrl',
    Win: 'Win',
    Alt: 'Alt',
    Enter: 'Enter',
    Delete: 'Del',
    Backspace: 'Backspace',
    Spacebar: ' ',
    Up: '▲',
    Left: '◄',
    Down: '▼',
    Right: '►',
  },
  shiftRU: {
    d1: "!",
    d2: "\"",
    d3: "№",
    d4: ";",
    d5: "%",
    d6: ":",
    d7: "?",
    d8: "*",
    d9: "(",
    d0: ")",
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
  // capsEN: {
  //   a: 'A',
  //   b: 'B',
  //   c: 'C',
  //   d: 'D',
  //   e: 'E',
  //   f: 'F',
  //   g: 'G',
  //   h: 'H',
  //   i: 'I',
  //   j: 'J',
  //   k: 'K',
  //   l: 'L',
  //   m: 'M',
  //   n: 'N',
  //   o: 'O',
  //   p: 'P',
  //   q: 'Q',
  //   r: 'R',
  //   s: 'S',
  //   t: 'T',
  //   u: 'U',
  //   v: 'V',
  //   w: 'W',
  //   x: 'X',
  //   y: 'Y',
  //   z: 'Z'
  // },
  // capsRU: {
  //   a: 'A',
  //   b: 'B',
  //   c: 'C',
  //   d: 'D',
  //   e: 'E',
  //   f: 'F',
  //   g: 'G',
  //   h: 'H',
  //   i: 'I',
  //   j: 'J',
  //   k: 'K',
  //   l: 'L',
  //   m: 'M',
  //   n: 'N',
  //   o: 'O',
  //   p: 'P',
  //   q: 'Q',
  //   r: 'R',
  //   s: 'S',
  //   t: 'T',
  //   u: 'U',
  //   v: 'V',
  //   w: 'W',
  //   x: 'X',
  //   y: 'Y',
  //   z: 'Z'
  // },
  noCase: [
    'Tab', 'CapsLock', 'Shift', 'Ctrl', 'Win', 'Alt', 'Enter', 'Del',
    'Backspace', 'Up', 'Down', 'Spacebar', 'Left', 'Right'
  ],
}

const keysData = [];

class keyObject {
  constructor(key, index) {
    let obj = {};

    obj.key = key;
    obj.valueEN = keymaps.symbolsEN[key] || key;
    obj.valueRU = keymaps.symbolsRU[key] || keymaps.symbolsEN[key] || keymaps.keymapRU[index];
    obj.upperCaseEN = keymaps.shiftEN[key] || key.toUpperCase();
    obj.upperCaseRU = keymaps.shiftRU[key] || keymaps.shiftEN[key] || keymaps.keymapRU[index].toUpperCase();

    obj.isLetterEN = key.length === 1;
    obj.isLetterRU = keymaps.keymapRU[index] === 1;

    // obj.shiftEN = keymaps.shiftEN[index];
    // obj.shiftEN = keymaps.shiftEN[index];
    // obj.capsEN = keymaps.shiftEN[key] || key.toUpperCase();
    // obj.capsRU = keymaps.shiftRU[key] || keymaps.shiftEN[key] || keymaps.keymapRU[index].toUpperCase();

    return obj;
  }
}

keymaps.keymapEN.forEach((element, index) => {
  const createdObj = new keyObject(element, index);
  keysData.push(createdObj)
});

console.log('Keys data successfully generated:', keysData);

export { keysData };
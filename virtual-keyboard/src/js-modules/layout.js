const classTags = {
  div: 'div',
  p: 'p',
  textarea: 'textarea',
  span: 'span',
}

const keys = {
  en: [
    ['Backquote', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd0', 'Minus', 'Equal', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Semicolon', 'Quote', 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Comma', 'Period', 'Slash', 'Up', 'Shift'],
    ['Ctrl', 'Win', 'Alt', 'Spacebar', 'Alt', 'Left', 'Down', 'Right', 'Ctrl'],
  ],
  ru: [
    ['ё', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd0', 'Minus', 'Equal', 'Backspace'],
    ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Backslash', 'Delete'],
    ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
    ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'Comma', 'Up', 'Shift'],
    ['Ctrl', 'Win', 'Alt', 'Spacebar', 'Alt', 'Left', 'Down', 'Right', 'Ctrl'],
  ],
  symbols: {
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
    Up: '▲',
    Ctrl: 'Ctrl',
    Win: 'Win',
    Alt: 'Alt',
    Spacebar: ' ',
    Left: '◄',
    Down: '▼',
    Right: '►'
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
    Slash: "?"
  }
}

function createElement(tagName, classNames, parent) {
  const element = document.createElement(tagName);
  for (let className of classNames) {
    element.classList.add(className);
  }
  parent.appendChild(element);
  return element;
}

const BODY = document.querySelector('body');
const MAIN_WRAPPER = createElement(classTags.div , ['main-wrapper'], BODY);
const TITLE = createElement(classTags.p, ['p', 'title'], MAIN_WRAPPER);
const TEXTAREA = createElement(classTags.textarea, ['textarea'], MAIN_WRAPPER);
const KEYBOARD = createElement(classTags.div, ['keyboard'], MAIN_WRAPPER);
const DESCRIPTION = createElement(classTags.p, ['descr'], MAIN_WRAPPER);
const LANGUAGE = createElement(classTags.p, ['lang'], MAIN_WRAPPER);

TITLE.innerText = 'RSS Virtual keyboard';
DESCRIPTION.innerText = 'The keyboard is created in the Windows operating system.';
LANGUAGE.innerText = 'To switch the language, use the combination: left shift + alt.';
TEXTAREA.cols = 50;
TEXTAREA.rows = 5;


function createRows() {
  for (let i = 0; i < 5; i++) {
    const keyboardRow = document.createElement('div');
    keyboardRow.classList.add('keyboard__row');
    KEYBOARD.appendChild(keyboardRow);
  }
}
createRows();

const KEYBOARD_ROWS = Array.from(KEYBOARD.children);


function generateKeys(currentRow, rowInex) {
  keys['en'][rowInex].forEach(key => {
    const keyHolder = document.createElement('div');
    keyHolder.classList.add('keyboard__key', `keyboard__key--${key}`);

    keyHolder.dataset.value = key; // ????????????

    currentRow.appendChild(keyHolder);

    class keyContent {
      constructor(lang) {
        const keyUpperCase = key.toUpperCase();
        this.langBox = document.createElement('span');
        this.langBox.classList.add(lang);
        if (lang === 'ru') this.langBox.classList.add('hidden');

        const lowerCase = document.createElement('span');
        lowerCase.classList.add('lowerCase');
        keys.symbols[key] ? lowerCase.textContent = keys.symbols[key] : lowerCase.textContent = key;

        const upperCase = document.createElement('span');
        upperCase.classList.add('upperCase', 'hidden');
        keys.shiftEN[key] ? upperCase.textContent = keys.shiftEN[key] : upperCase.textContent = keyUpperCase;

        const caps = document.createElement('span');
        caps.classList.add('caps', 'hidden');
        keys.symbols[key] ? caps.textContent = keys.symbols[key] : caps.textContent = keyUpperCase;

        const capsShift = document.createElement('span');
        capsShift.classList.add('capsShift', 'hidden');
        keys.shiftEN[key] ? capsShift.textContent = keys.shiftEN[key] : capsShift.textContent = key;

        this.langBox.append(lowerCase, upperCase, caps, capsShift);

        return this.langBox;
      }
    }

    keyHolder.append(new keyContent('en'), new keyContent('ru'));
  });
}

KEYBOARD_ROWS.forEach((row, index) => generateKeys(row, index))

console.log('Keys layout successfully generated');

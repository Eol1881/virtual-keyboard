function createElement(tagName, classNames, parent) {
  const element = document.createElement(tagName);
  classNames.forEach((className) => {
    element.classList.add(className);
  });
  parent.appendChild(element);
  return element;
}

const BODY = document.querySelector('body');
const MAIN_WRAPPER = createElement('div', ['main-wrapper'], BODY);
const TITLE = createElement('p', ['p', 'title'], MAIN_WRAPPER);
const TEXTAREA = createElement('textarea', ['textarea'], MAIN_WRAPPER);
const KEYBOARD = createElement('div', ['keyboard'], MAIN_WRAPPER);
const DESCRIPTION = createElement('p', ['descr'], MAIN_WRAPPER);
const LANGUAGE = createElement('p', ['lang'], MAIN_WRAPPER);
const KEYBOARD_STATE = {
  Shift: false,
  CapsLock: false,
  Alt: false,
  language: 'EN',
};

TITLE.innerText = 'RSS Virtual keyboard';
DESCRIPTION.innerText = 'The keyboard is created in the Windows operating system.';
LANGUAGE.innerText = 'To switch the language, use the combination: left shift + alt.';
TEXTAREA.cols = 50;
TEXTAREA.rows = 5;

function createRows() {
  for (let i = 0; i < 5; i += 1) {
    const keyboardRow = document.createElement('div');
    keyboardRow.classList.add('keyboard__row');
    KEYBOARD.appendChild(keyboardRow);
  }
}
createRows();

console.log('Basic keyboard layout successfully generated');

export { KEYBOARD, TEXTAREA, KEYBOARD_STATE };

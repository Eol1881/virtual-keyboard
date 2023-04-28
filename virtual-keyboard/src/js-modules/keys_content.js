import { keysData } from "./keymap_data";
import { KEYBOARD } from "./basic_layout";
export const KEYBOARD_ROWS = Array.from(KEYBOARD.children);
const keyboardRowsLengths = [14, 15, 13, 13, 9];

function generateKeys() {
  const keysArr = Object.keys(keysData);
  let keyIndex = 0;
  for (let i = 0; i < keyboardRowsLengths.length; i++) {
    const currentRowLength = keyboardRowsLengths[i];
    const currentRow = KEYBOARD_ROWS[i];

    for (let i = 0; i < currentRowLength; i++, keyIndex++) {
      const currentKey = keysArr[keyIndex];
      const keyHolder = document.createElement('div');
      keyHolder.classList.add('keyboard__key', `keyboard__key--${currentKey}`);
      currentRow.appendChild(keyHolder);

      keyHolder.dataset.value = currentKey;

      class keyContent {
        constructor(lang) {
          this.langBox = document.createElement('span');
          this.langBox.classList.add(lang);
          if (lang === 'RU') this.langBox.classList.add('hidden');
          const isLetter = keysData[currentKey][`isLetter${lang}`];
          const keyLowerCase = keysData[currentKey][`value${lang}`];
          const keyUpperCase = keysData[currentKey][`upperCase${lang}`];

          const lowerCase = document.createElement('span');
          lowerCase.classList.add('lowerCase');
          lowerCase.textContent = keyLowerCase;

          const upperCase = document.createElement('span');
          upperCase.classList.add('upperCase', 'hidden');
          upperCase.textContent = keyUpperCase;

          const capsShift = document.createElement('span');
          capsShift.classList.add('capsShift', 'hidden');
          isLetter ? capsShift.textContent = keyLowerCase : capsShift.textContent = keyUpperCase;

          const caps = document.createElement('span');
          caps.classList.add('caps', 'hidden');
          isLetter ? caps.textContent = keyLowerCase.toUpperCase() : caps.textContent = keyLowerCase;

          this.langBox.append(lowerCase, upperCase, caps, capsShift);

          return this.langBox;
        }
      }
      keyHolder.append(new keyContent('EN', keyIndex), new keyContent('RU', keyIndex));
    }
  }
}
generateKeys()

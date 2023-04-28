import { keysData } from "./keymap_data";
import { KEYBOARD } from "./basic_layout";
export const KEYBOARD_ROWS = Array.from(KEYBOARD.children);
const keyboardRowsLengths = [14, 15, 13, 13, 9];

function generateKeys() {
  let keyIndex = 0;
  for (let i = 0; i < keyboardRowsLengths.length; i++) {
    const currentRowLength = keyboardRowsLengths[i];
    const currentRow = KEYBOARD_ROWS[i];

    for (let i = 0; i < currentRowLength; i++, keyIndex++) {
      const currentKey = keysData[keyIndex].key;
      const keyHolder = document.createElement('div');
      keyHolder.classList.add('keyboard__key', `keyboard__key--${currentKey}`);
      currentRow.appendChild(keyHolder);

      keyHolder.dataset.value = currentKey;

      class keyContent {
        constructor(lang, keyIndex) {
          this.langBox = document.createElement('span');
          this.langBox.classList.add(lang);
          if (lang === 'RU') this.langBox.classList.add('hidden');
          // if (keysData[keyIndex]['isLetterRU']) this.langBox.classList.add('letterRU');
          // if (keysData[keyIndex]['isLetterEN']) this.langBox.classList.add('letterEN');
          const isLetter = keysData[keyIndex][`isLetter${lang}`];
          const keyLowerCase = keysData[keyIndex][`value${lang}`];
          const keyUpperCase = keysData[keyIndex][`upperCase${lang}`];

          const lowerCase = document.createElement('span');
          lowerCase.classList.add('lowerCase');
          lowerCase.textContent = keyLowerCase;

          const upperCase = document.createElement('span');
          upperCase.classList.add('upperCase', 'hidden');
          upperCase.textContent = keyUpperCase;

          const capsShift = document.createElement('span');
          capsShift.classList.add('capsShift', 'hidden');
          //capsShift.textContent = keyLowerCase;
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

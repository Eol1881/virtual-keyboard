import keysData from './keymap_data';
import { KEYBOARD } from './basic_layout';

const KEYBOARD_ROWS = Array.from(KEYBOARD.children);
const keyboardRowsLengths = [14, 15, 13, 13, 9];

function generateKeys() {
  const keysArr = Object.keys(keysData);
  let currentLanguage = localStorage.getItem('language');
  if (!currentLanguage) {
    localStorage.setItem('language', 'EN');
    currentLanguage = 'EN';
  }
  let keyIndex = 0;
  for (let i = 0; i < keyboardRowsLengths.length; i += 1) {
    const currentRowLength = keyboardRowsLengths[i];
    const currentRow = KEYBOARD_ROWS[i];

    for (let j = 0; j < currentRowLength; j += 1, keyIndex += 1) {
      const currentKey = keysArr[keyIndex];
      const keyHolder = document.createElement('div');
      keyHolder.classList.add('keyboard__key', `keyboard__key--${currentKey}`);
      currentRow.appendChild(keyHolder);

      keyHolder.dataset.value = currentKey;

      class KeyContent {
        constructor(lang) {
          this.langBox = document.createElement('span');
          this.langBox.classList.add(lang);

          if (currentLanguage !== lang) this.langBox.classList.add('hidden');

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
          capsShift.textContent = isLetter ? keyLowerCase : keyUpperCase;

          const caps = document.createElement('span');
          caps.classList.add('caps', 'hidden');
          caps.textContent = isLetter ? keyLowerCase.toUpperCase() : keyLowerCase;

          this.langBox.append(lowerCase, upperCase, caps, capsShift);
        }
      }
      keyHolder.append(new KeyContent('EN').langBox, new KeyContent('RU').langBox);
    }
  }
}
generateKeys();

import { KEYBOARD } from './basic_layout';

const radioWrapper = document.createElement('div');
radioWrapper.classList.add('radio-wrapper');

class RadioInput {
  constructor(name, value, checked) {
    this.label = document.createElement('label');
    this.label.classList.add('radio-wrapper__label');
    this.span = document.createElement('span');
    this.span.classList.add('radio-wrapper__span');
    this.input = document.createElement('input');
    this.input.classList.add('radio-wrapper__radio');
    this.input.type = 'radio';
    this.input.name = name;
    this.input.value = value;
    this.input.checked = checked;
    this.label.append(this.input, this.span);
  }

  render() {
    return this.label;
  }
}

const radioOption1 = new RadioInput('option', 'option1', true).render();
const radioOption2 = new RadioInput('option', 'option2', false).render();
const radioOption3 = new RadioInput('option', 'option3', false).render();
const radioOption4 = new RadioInput('option', 'option4', false).render();

radioWrapper.append(radioOption1, radioOption2, radioOption3, radioOption4);
KEYBOARD.insertAdjacentElement('afterend', radioWrapper);

radioWrapper.addEventListener('change', (event) => {
  const clickedValue = event.target.value;
  if (clickedValue === 'option1') {
    KEYBOARD.classList.remove('keyboard-background-1');
    KEYBOARD.classList.remove('keyboard-background-2');
    KEYBOARD.classList.remove('keyboard-background-3');
  } else if (clickedValue === 'option2') {
    KEYBOARD.classList.add('keyboard-background-1');
    KEYBOARD.classList.remove('keyboard-background-2');
    KEYBOARD.classList.remove('keyboard-background-3');
  } else if (clickedValue === 'option3') {
    KEYBOARD.classList.remove('keyboard-background-1');
    KEYBOARD.classList.add('keyboard-background-2');
    KEYBOARD.classList.remove('keyboard-background-3');
  } else if (clickedValue === 'option4') {
    KEYBOARD.classList.remove('keyboard-background-1');
    KEYBOARD.classList.remove('keyboard-background-2');
    KEYBOARD.classList.add('keyboard-background-3');
  }
});

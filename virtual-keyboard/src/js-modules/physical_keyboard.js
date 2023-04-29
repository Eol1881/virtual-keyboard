import { KEYBOARD } from "./basic_layout";

const radioWrapper = document.createElement('div');
radioWrapper.classList.add('radio-wrapper');

class radioInput {
  constructor(name, value, checked) {
    this.input = document.createElement('input');
    this.input.classList.add('radio-wrapper__radio');
    this.input.type = 'radio';
    this.input.name = name;
    this.input.value = value;
    this.input.checked = checked;
		return this.input;
  }
}

const radioOption1 = new radioInput("option", "option1", true);
const radioOption2 = new radioInput("option", "option2", false);
const radioOption3 = new radioInput("option", "option3", false);
const radioOption4 = new radioInput("option", "option4", false);
console.log(radioOption1);

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


// radio1.classList.add('radio-wrapper__radio', 'radio-wrapper__radio--1');
// radio1.type = "radio";
// radio1.name = "option";
// radio1.value = "option1";
// radio1.checked = true;

// const radio2 = document.createElement("input");
// radio2.classList.add('radio-wrapper__radio', 'radio-wrapper__radio--2');
// radio2.type = "radio";
// radio2.name = "option";
// radio2.value = "option2";

// const radio3 = document.createElement("input");
// radio3.classList.add('radio-wrapper__radio', 'radio-wrapper__radio--3');
// radio3.type = "radio";
// radio3.name = "option";
// radio3.value = "option3";

// radioWrapper.append(radio1, radio2, radio3);
// KEYBOARD.insertAdjacentElement('afterend', radioWrapper);

// radioWrapper.addEventListener('change', (event) => {
//   const clickedValue = event.target.value;
//   if (clickedValue === 'option1') {
//     KEYBOARD.classList.remove('keyboard-background-1');
// 		KEYBOARD.classList.remove('keyboard-background-2');
//   } else if (clickedValue === 'option2') {
//     KEYBOARD.classList.add('keyboard-background-1');
// 		KEYBOARD.classList.remove('keyboard-background-2');
//   } else if (clickedValue === 'option3') {
//     KEYBOARD.classList.add('keyboard-background-2');
// 		KEYBOARD.classList.remove('keyboard-background-1');
//   }
// });

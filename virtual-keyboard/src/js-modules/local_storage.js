import { KEYBOARD_STATE } from "./basic_layout";

window.addEventListener("beforeunload", () => {
  const currLang = KEYBOARD_STATE.language;
  localStorage.setItem("language", currLang);
});

window.addEventListener("load", () => {
  const savedLang = localStorage.getItem("language");
  KEYBOARD_STATE.language = savedLang;
  console.log(savedLang, 'lang loadedd successfully from the local storage');
})
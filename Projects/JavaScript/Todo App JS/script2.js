import { createInputBox, inputToggler } from "./modules/todo.js";
import { urlSearchParamREG, cardREG } from "./modules/regex.js";
import { ObjectToCard } from "./modules/utils.js";
console.log("script2.js");
//card load
((search) => {
  let card;
  if (window.sessionStorage.tasklists == undefined) redirectToHome();
  else if (search.length == 0) {
    card = cardREG(".*?").exec(window.sessionStorage.tasklists)[0];
  } else if (search.length) {
    search = String(urlSearchParamREG.exec(search)[0]);
    card = new RegExp(cardREG(search));
    card = card.exec(window.sessionStorage.tasklists)[0];
  } else if (card == null) redirectToHome();
  card = ObjectToCard(card.toObject());
  document.getElementsByClassName("container")[0].appendChild(card);
})(window.location.search);
// delete the card
const deleteTaskCard = window.deleteTaskCard;
window.deleteTaskCard = (id) => {
  deleteTaskCard(id);
  setTimeout(redirectToHome, 1500);
};
//redirect to home page
function redirectToHome() {
  let href = window.location.href;
  href = href.slice(0, href.lastIndexOf("/") + 1);
  window.location.replace(href + "index.html");
}
//change card name
window.changeCardName = (cardID) => {
  let inputbox = createInputBox("saveCardNewName", cardID);
  let parent = document.querySelector(".todo__tasks__list__name__link");
  inputbox.children[1].value = parent.innerText;
  inputToggler(parent, inputbox, parent.nextElementSibling);
  parent.style.position = "relative";
  inputbox.style.position = "absolute";
  inputbox.style.minHeight = "100%";
  inputbox.style.minWidth = "100%";
  inputbox.style.backgroundColor = "white";
  inputbox.children[1].focus();
};

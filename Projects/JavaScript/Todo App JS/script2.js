import "./modules/todo.js";
import { cardSearchREG, cardREG } from "./modules/regex.js";
import { ObjectToCard } from "./modules/utils.js";
console.log("script2.js");
// window.sessionStorage.tasklists =
//   '[{"id":"01","name":"Trip to Paris","tasks":[{"name":"Completed Task","status":true},{"name":"Plesae uncheck above task","status":false}]},{"id":"02","name":"My Todo List","tasks":[{"name":"Completed Task","status":true},{"name":"Press Add Lsit","status":false}]},{"id":"03","name":"My Todo List","tasks":[{"name":"Completed Task","status":true},{"name":"Check me","status":false}]}]';
//card load
((search) => {
  let card;
  if (window.sessionStorage.tasklists == undefined) redirectToHome();
  else if (search.length == 0) {
    card = new RegExp(cardREG(".*?"));
    card = card.exec(window.sessionStorage.tasklists)[0];
  } else if (search.length) {
    search = String(cardSearchREG.exec(search)[0]);
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
  redirectToHome();
};
//redirect to home page
function redirectToHome() {
  let href = window.location.href;
  href = href.slice(0, href.lastIndexOf("/") + 1);
  window.location.replace(href + "index.html");
}

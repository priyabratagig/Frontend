import "./modules/todo.js";
import { cardToObject, ObjectToCard } from "./modules/utils.js";
console.log("script.js");
//get next id
const generateNextNumber = (() => {
  let generate = (function* () {
    let i = 0;
    let k;
    while (true) {
      if (k === undefined) k = yield i++;
      else
        yield (() => {
          i = k;
          k = undefined;
          return i++;
        })();
    }
  })();
  return (k) => {
    if (k == undefined) {
      return generate.next().value;
    }
    return generate.next(k).value;
  };
})();
// (() => {
//   let tasklists = document.getElementsByClassName("todo__tasks")[0].children;
//   let array = [];
//   for (let list = 0; list < tasklists.length; list++) {
//     array.push(cardToObject(tasklists[list]));
//   }
//   tasklists = array.toString();
//   window.sessionStorage.tasklists = tasklists;
// })();
// window.sessionStorage.tasklists =
//   '[{"id":"01","name":"Trip to Paris","tasks":[{"name":"Completed Task","status":true},{"name":"Plesae uncheck above task","status":false}]},{"id":"02","name":"My Todo List","tasks":[{"name":"Completed Task","status":true},{"name":"Press Add Lsit","status":false}]},{"id":"03","name":"My Todo List","tasks":[{"name":"Completed Task","status":true},{"name":"Check me","status":false}]}]';
if (
  window.sessionStorage.tasklists != undefined &&
  window.sessionStorage.tasklists.length
) {
  let todo = document.getElementsByClassName("todo__tasks")[0];
  for (let taskcard of window.sessionStorage.tasklists.toObject()) {
    taskcard = ObjectToCard(taskcard);
    todo.append(taskcard);
  }
  generateNextNumber(todo.lastChild.id);
} else window.popup("notification");
console.log(window.sessionStorage.tasklists);
console.log(window.sessionStorage.tasklists.length);
console.log(generateNextNumber());

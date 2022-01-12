import "./modules/todo.js";
import { cardToObject, ObjectToCard } from "./modules/utils.js";
console.log("script.js");
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
  window.generateNextNumber(todo.lastChild.id);
} else window.popup("notification");

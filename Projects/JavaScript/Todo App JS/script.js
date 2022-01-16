import "./modules/todo.js";
import { cardToObject, ObjectToCard } from "./modules/utils.js";
console.log("script.js");
//generator wasting first .next() to pass argument
window.generateNextNumber();
//loading from taskslists
if (
  window.sessionStorage.tasklists != undefined &&
  window.sessionStorage.tasklists.length
) {
  let todo = document.getElementsByClassName("todo__tasks")[0];
  for (let taskcard of window.sessionStorage.tasklists.toObject()) {
    taskcard = ObjectToCard(taskcard);
    todo.append(taskcard);
  }
  window.generateNextNumber(Number(todo.lastChild.id));
} else {
  window.popup("notification");
  window.sessionStorage.tasklists =
    '[{"id":"3","name":"Welcome🥳","tasks":[{"name":"Uncheck this task","status":true},{"name":"Add new task list press ➕ icon","status":false},{"name":"Add new tasks press ➕ on the list bellow","status":false},{"name":"Check all above tasks, and clear all completed tasks press 🔄 on the list bellow","status":false},{"name":"Change this task name, double click on the task","status":false},{"name":"Delete this task, double click on the task","status":false},{"name":"Change task-list name press ✏️ after name","status":false},{"name":"Open task-list in full page, click on the list name","status":false},{"name":"Press on ⬅️ arrow to come back","status":false},{"name":"Press 🗑 to delete this task-list","status":false}]}]';
  let todo = document.getElementsByClassName("todo__tasks")[0];
  for (let taskcard of window.sessionStorage.tasklists.toObject()) {
    taskcard = ObjectToCard(taskcard);
    todo.append(taskcard);
  }
  window.generateNextNumber(Number(todo.lastChild.id));
}

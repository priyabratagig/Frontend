import "./modules/string_and_object.js";
import {
  buildElement,
  createTask,
  popup,
  popupClose,
  creatreListCard,
  taskToObject,
  cardToObject,
  findAllTasks,
  findCard,
  sessionStorageUpdate,
} from "./modules/utils.js";
console.log("Todo App");
//id gnerator
let generateNextNumber = (() => {
  let generate = (function* () {
    let i = 0;
    while (true) {
      yield ++i;
    }
  })();
  return () => generate.next().value;
})();
//pop-up
window.popup = popup;
window.popupClose = popupClose;
//add new tasks
window.newTask = (card) => {
  let inputbox = buildElement("div", {
    class: "todo__tasks__list__task--input",
  });
  inputbox.append(
    buildElement(
      "lable",
      {
        class: "material-icons",
        onclick:
          "saveTask(this.closest('.todo__tasks__list'),document.getElementById('input-taskname').value)",
      },
      "check",
      { color: "greenyellow" }
    )
  );
  inputbox.append(
    buildElement("textarea", {
      id: "input-taskname",
      onkeydown:
        "if (event.key == 'Enter') saveTask(this.closest('.todo__tasks__list'),this.value)",
    })
  );
  let before = card.querySelector(".todo__tasks__list__icon");
  before.children[0].style.display = "none";
  card.insertBefore(inputbox, before);
};
window.saveTask = (card, name) => {
  card.removeChild(card.querySelector(".todo__tasks__list__task--input"));
  let before = card.querySelector(".todo__tasks__list__icon");
  before.children[0].style = "";
  let task = createTask(name);
  card.insertBefore(task, before);
  task = taskToObject(task); //code for inserting new task in sessionstorage
  task = task.toString();
  let reg = findAllTasks(card.id);
  sessionStorageUpdate(reg.index, reg[0].length, reg[0], task);
};
//add new list
window.addNewList = function (name, appendTo, popup) {
  let listcard = creatreListCard(name);
  listcard.id = "tasklist" + generateNextNumber();
  appendTo.append(listcard);
  popupClose(popup);
  if (window.sessionStorage.tasklists == undefined) {
    window.sessionStorage.tasklists = [cardToObject(listcard)].toString();
  } else {
    window.sessionStorage.tasklists =
      window.sessionStorage.tasklists.slice(
        0,
        window.sessionStorage.tasklists.length - 1
      ) +
      "," +
      cardToObject(listcard).toString() +
      "]";
  }
  console.log(window.sessionStorage);
};
//task status change
window.changeStatus = (ele) => {
  let index = Array.prototype.indexOf.call(ele.parentNode.children, ele) - 3;
  let reg = findAllTasks(ele.parentNode.id);
  let tasks = reg[0].split(/(?<={"name":.*?"status":(?:true|false)}),/);
  console.log(tasks);
  console.log(index);
  tasks[index] = tasks[index].toObject();
  tasks[index].status = tasks[index].status ? false : true;
  tasks[index] = tasks[index].toString();
  console.log(tasks);
  sessionStorageUpdate(reg.index, reg[0].length, ...tasks);
  console.log(window.sessionStorage.tasklists);
  console.log(window.sessionStorage.tasklists.length);
};
//tasklist card delete
window.deleteTaskCard = (id) => {
  loading();
  let reg = `(?<=[\\[,]){"id":"${id}",.*?,"tasks":\\[.*?\\]}(?=[,\\]]),?`;
  reg = new RegExp(reg);
  window.sessionStorage.tasklists = window.sessionStorage.tasklists.replace(
    reg,
    ""
  );
  document.getElementById(id).remove();
  console.log(window.sessionStorage.tasklists);
  console.log(window.sessionStorage.tasklists.length);
};
//delete completed task
window.deleteCompletedTask = (card, icon) => {
  icon.style.animation = "rotate 1s infinite";
  setTimeout(() => {
    icon.removeAttribute("style");
  }, 1000);
  let tasks = card.querySelectorAll(".todo__tasks__list__task");
  if ((tasks != null) | (tasks != undefined)) {
    for (let i = 0; i < tasks.length; i++)
      if (tasks[i].children[0].checked) tasks[i].remove();
    if (tasks.length) {
      let reg = findAllTasks(card.id);
      tasks = reg[0].split(/(?<={"name":.*?"status":(?:true|false)}),/);
      let incomplete = [];
      for (let task of tasks)
        if (/{"name":.*?,"status":false}/.test(task)) incomplete.push(task);
      sessionStorageUpdate(reg.index, reg[0].length, ...incomplete);
    }
  }
  console.log(window.sessionStorage.tasklists);
  console.log(window.sessionStorage.tasklists.length);
};
//loading animation
window.loading = () => {
  let ele = document.getElementById("loading-animation");
  ele.parentNode.style["z-index"] = 1;
  ele.style.opacity = 1;
  ele.style.top = "50%";
  ele.children[0].style.animation = "rotate 2s 2";
  setTimeout(() => {
    popupClose(ele.id);
  }, 3900);
};
//testings
// window.a = [
//   { id: "1c", name: "kjh", taks: [] },
//   { id: "2asa", name: "sdad", taks: [{ name: "asi", status: true }] },
// ];
// window.b = {
//   "name's []{priyabrata}": "priybrata",
//   id: 23,
//   qualification: {
//     current: "bca",
//     subjecs: ["mongo", "express", "react", "node", 'jakjs", nkas], akjk",'],
//   },
// };
//addings lists
(() => {
  let tasklists = document.getElementsByClassName("todo__tasks")[0].children;
  let array = [];
  for (let list = 0; list < tasklists.length; list++) {
    array.push(cardToObject(tasklists[list]));
  }
  console.log(array);
  tasklists = array.toString();
  window.sessionStorage.tasklists = tasklists;
})();
console.log(window.sessionStorage.tasklists);
console.log(window.sessionStorage.tasklists.length);
//  (function* () {
//    let i = 0;
//    let l;
//    while (true) {
//      if (l == undefined)
//        l = yield (() => {
//          console.log("l = undefined");
//          return (i += 1);
//        })();
//      else
//        yield (() => {
//          i = l;
//          console.log("l = " + l);
//          l = undefined;
//          return i;
//        })();
//    }
//  })();

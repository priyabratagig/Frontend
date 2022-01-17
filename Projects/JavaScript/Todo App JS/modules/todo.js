import {
  cardREG,
  commaREG,
  taskSplitREG,
  taskCompletedREG,
  cntrl,
  separator,
  stringTrim,
  nameREG,
} from "./regex.js";
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
} from "./utils.js";
console.log("todo.js");
//id gnerator
window.generateNextNumber = (() => {
  let generate = (function* () {
    let i = 0;
    let k;
    while (true) {
      if (typeof k === "number") {
        i = k;
        k = undefined;
      }
      k = yield i++;
    }
  })();
  return (k) => {
    if (typeof k != "number" || isNaN(k)) return generate.next().value;
    return generate.next(k).value;
  };
})();
//string trim
const trim = (s) => {
  if (typeof s == "string" && s.length) {
    s = s.replace(cntrl, "");
    s = s.replace(separator, "");
    s = s.replace(stringTrim, "");
  }
  return s;
};
//inputbox maker
export function createInputBox(fname, ...fagrs) {
  if (fagrs.length) {
    fagrs = fagrs.reduce((previous, current) => previous + ", " + current);
    fagrs += ", ";
  } else fagrs = "";
  let inputbox = buildElement("div", {
    class: "todo__tasks__list__task--input",
  });
  inputbox.id = "inputbox";
  inputbox.append(
    buildElement(
      "lable",
      {
        class: "material-icons",
        onclick: `${fname}(${fagrs}document.getElementById('input-taskname').value)`,
      },
      "check",
      { color: "greenyellow" }
    )
  );
  inputbox.append(
    buildElement("textarea", {
      id: "input-taskname",
      onkeydown: `if (event.key == 'Enter') ${fname}(${fagrs}this.value)`,
    })
  );
  return inputbox;
}
//toggler
export const inputToggler = (parent, ele, ...toggle) => {
  if (!parent.contains(ele)) {
    for (let item of toggle) item.style.display = "none";
    parent.append(ele);
    let listener = (event) => {
      if (!parent.contains(event.target)) {
        inputToggler(parent, ele, ...toggle);
        document.body.removeEventListener("click", listener, true);
      }
    };
    document.body.addEventListener("click", listener, true);
  } else {
    ele.remove();
    for (let item of toggle) item.removeAttribute("style");
  }
};
//pop-up
window.popup = popup;
window.popupClose = popupClose;
//add new tasks
window.taskInput = (card) => {
  let parent = card.querySelector(".todo__tasks__list__icon ");
  let inputbox = createInputBox(
    "saveTask",
    "this.closest('.todo__tasks__list')"
  );
  inputToggler(parent, inputbox, ...parent.children);
  inputbox.children[1].focus();
};
window.saveTask = (card, name) => {
  document.body.click();
  name = trim(name);
  if (name.length < 1) return null;
  let ele = card.querySelector(".todo__tasks__list__icon");
  ele.children[0].style = "";
  ele.children[1].style = "";
  let task = createTask(name);
  ele = card.querySelector(".todo__tasks__list__task--scroll");
  if (ele == undefined || ele == null) {
    ele = buildElement("div", { class: "todo__tasks__list__task--scroll" });
    card.insertBefore(ele, card.querySelector(".todo__tasks__list__icon"));
  }
  ele.append(task);
  task = taskToObject(task); //code for inserting new task in sessionstorage
  task = task.toString();
  let reg = findAllTasks(card.id);
  if (reg == null) return 0;
  sessionStorageUpdate(reg.index, reg[0].length, reg[0], task);
  console.log(window.sessionStorage.tasklists);
  console.log(window.sessionStorage.tasklists.length);
};
//add new list
window.addNewList = function (name, popup) {
  document.querySelector(`#${popup} input`).value = "";
  name = trim(name);
  if (name.length < 1) return null;
  window.popupClose(popup);
  window.popup("loading-animation");
  let listcard = creatreListCard(name, window.generateNextNumber());
  document.getElementsByClassName("todo__tasks")[0].append(listcard);
  if (window.sessionStorage.tasklists == undefined)
    window.sessionStorage.tasklists = [cardToObject(listcard)].toString();
  else if (window.sessionStorage.tasklists.length < 3)
    window.sessionStorage.tasklists = [cardToObject(listcard)].toString();
  else {
    sessionStorageUpdate(
      window.sessionStorage.tasklists.length - 1,
      0,
      ",",
      cardToObject(listcard).toString()
    );
  }
  console.log(window.sessionStorage.tasklists);
};
//task status change
window.changeStatus = (ele) => {
  let index = Array.prototype.indexOf.call(ele.parentNode.children, ele);
  let reg = findAllTasks(ele.closest(".todo__tasks__list").id);
  let tasks = reg[0].split(taskSplitREG(ele.closest(".todo__tasks__list").id));
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
  window.popup("loading-animation");
  let reg = cardREG(id);
  window.sessionStorage.tasklists = window.sessionStorage.tasklists.replace(
    reg,
    ""
  );
  window.sessionStorage.tasklists = window.sessionStorage.tasklists.replace(
    commaREG,
    ""
  );
  document.getElementById(id).remove();
  console.log(window.sessionStorage.tasklists);
  console.log(window.sessionStorage.tasklists.length);
};
//delete completed task
window.deleteCompletedTask = (card, icon) => {
  icon.style.color = "transparent";
  icon.style.animation = "rotate 1s infinite";
  setTimeout(() => {
    icon.removeAttribute("style");
  }, 1000);
  let tasks = card.querySelectorAll(".todo__tasks__list__task");
  if (tasks != null || tasks != undefined) {
    for (let i = 0; i < tasks.length; i++)
      if (tasks[i].children[0].checked) tasks[i].remove();
    if (tasks.length) {
      let reg = findAllTasks(card.id);
      tasks = reg[0].split(taskSplitREG(card.id));
      for (let i = 0, isdone = taskCompletedREG(card.id); i < tasks.length; i++)
        if (isdone.test(tasks[i])) tasks[i] = "";
      sessionStorageUpdate(reg.index, reg[0].length, ...tasks);
      window.sessionStorage.tasklists = window.sessionStorage.tasklists.replace(
        commaREG,
        ""
      );
    }
  }
  console.log(window.sessionStorage.tasklists);
  console.log(window.sessionStorage.tasklists.length);
};
//change card name
window.changeCardName = (cardID) => {
  let inputbox = createInputBox("saveCardNewName", cardID);
  let parent = document.getElementById(cardID).children[0];
  inputbox.children[1].value = parent.children[0].innerText;
  inputToggler(parent, inputbox, ...parent.children);
  inputbox.children[1].focus();
};
//save card new name
window.saveCardNewName = (cardID, name) => {
  document.body.click();
  let card = document.getElementById(cardID);
  name = trim(name);
  if (name != card.children[0].children[0].innerText) {
    card.children[0].children[0].innerText = name;
    let cardString = findCard(cardID);
    let nameString = nameREG.exec(cardString[0]);
    sessionStorageUpdate(
      cardString.index + nameString.index,
      nameString[0].length,
      name
    );
  }
};
//task modification
window.taskMod = (cardID, taskEle) => {
  if (taskEle.querySelector(".todo__tasks__list__task--mod") == null) {
    let index = document
      .getElementById(cardID)
      .querySelectorAll(".todo__tasks__list__task");
    index = Array.prototype.indexOf.call(index, taskEle);
    let insert = buildElement("div", { class: "todo__tasks__list__task--mod" });
    insert.append(
      buildElement("button", {
        onclick: "taskChangeName(this.parentNode.parentNode)",
      })
    );
    insert.append(
      buildElement("button", {
        onclick: "deleteTask(this.parentNode.parentNode)",
      })
    );
    inputToggler(taskEle, insert);
  }
};
//task new name save
window.taskChangeName = (taskEle) => {
  let inputbox = createInputBox(
    "taskNameUpdate",
    "this.closest('.todo__tasks__list__task')"
  );
  inputbox.children[1].value = taskEle.querySelector("lable").innerText;
  inputToggler(taskEle, inputbox, ...taskEle.children);
};
//save task new name
window.taskNameUpdate = (tasksEle, name) => {
  document.body.click();
  name = trim(name);
  let lable = tasksEle.querySelector("lable");
  if (name != lable.innerText) {
    lable.innerText = name;
    let index = Array.prototype.indexOf.call(
      tasksEle.parentNode.children,
      tasksEle
    );
    let taskAll = findAllTasks(tasksEle.closest(".todo__tasks__list").id);
    let tasks = taskAll[0].split(
      taskSplitREG(tasksEle.closest(".todo__tasks__list").id)
    );
    tasks[index] = tasks[index].toObject();
    tasks[index].name = name;
    tasks[index] = tasks[index].toString();
    sessionStorageUpdate(taskAll.index, taskAll[0].length, ...tasks);
  }
};
//delete selected task
window.deleteTask = (tasksEle) => {
  let index = Array.prototype.indexOf.call(
    tasksEle.parentNode.children,
    tasksEle
  );
  let id = tasksEle.closest(".todo__tasks__list").id;
  tasksEle.remove();
  let tasks = findAllTasks(id);
  tasksEle = tasks[0].split(taskSplitREG(id));
  tasksEle[index] = "";
  sessionStorageUpdate(tasks.index, tasks[0].length, ...tasksEle);
};

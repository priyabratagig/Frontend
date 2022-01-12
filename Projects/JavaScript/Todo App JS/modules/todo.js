import {
  cardREG,
  commaREG,
  taskSplitREG,
  taskCompletedREG,
  taskREG,
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
  let ele = card.querySelector(".todo__tasks__list__icon ");
  ele.children[0].style.display = "none";
  ele.children[1].style.display = "none";
  ele.append(inputbox);
};
window.saveTask = (card, name) => {
  card.querySelector(".todo__tasks__list__task--input").remove();
  let ele = card.querySelector(".todo__tasks__list__icon");
  ele.children[0].style = "";
  ele.children[1].style = "";
  let task = createTask(name);
  ele = card.querySelector(".todo__tasks__list__task--scroll");
  if ((ele == undefined) | (ele == null)) {
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
  let listcard = creatreListCard(name, generateNextNumber());
  document.getElementsByClassName("todo__tasks")[0].append(listcard);
  popupClose(popup);
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
  let tasks = reg[0].split(
    new RegExp(taskSplitREG(ele.closest(".todo__tasks__list").id))
  );
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
  let reg = new RegExp(cardREG(id));
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
  if ((tasks != null) | (tasks != undefined)) {
    for (let i = 0; i < tasks.length; i++)
      if (tasks[i].children[0].checked) tasks[i].remove();
    if (tasks.length) {
      let reg = findAllTasks(card.id);
      tasks = reg[0].split(new RegExp(taskSplitREG(card.id)));
      for (
        let i = 0, isdone = new RegExp(taskCompletedREG(card.id));
        i < tasks.length;
        i++
      )
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

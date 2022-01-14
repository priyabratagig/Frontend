import "./string_and_object.js";
import { cardREG, tasksAllREG } from "./regex.js";
console.log("utils.js");
//creating dynamic elements
export function buildElement(tag, attributes, text = "", style = "") {
  const element = document.createElement(tag);
  if (typeof attributes === "object") {
    for (let attr in attributes) {
      element.setAttribute(attr, attributes[attr]);
    }
  }
  if (typeof style == "object") {
    for (let item in style) {
      element.style[item] = style[item];
    }
  }
  element.innerText = text;
  return element;
}
//add new list
export function creatreListCard(name, id) {
  let card = buildElement("div", { class: "todo__tasks__list" });
  if (id != undefined) card.id = id;
  let temp = buildElement("div", { class: "todo__tasks__list__name" });
  temp.append(
    buildElement("a", { class: "todo__tasks__list__name__link" }, name)
  );
  temp.append(
    buildElement("div", { class: "todo__tasks__list__name--delete" })
  );
  temp.children[1].append(
    buildElement("span", {
      class: "material-icons",
      onclick: "deleteTaskCard(this.closest('.todo__tasks__list').id)",
    })
  );
  let href = window.location.pathname;
  href = href.slice(href.lastIndexOf("/") + 1);
  if (href == "index.html")
    temp.children[0].setAttribute("href", `./index2.html?card=${id}`);
  else {
    temp.append(
      buildElement("div", { class: "todo__tasks__list__name--back" })
    );
    temp.children[2].append(
      buildElement("a", { class: "material-icons", href: "./index.html" })
    );
  }
  card.append(temp);
  temp = buildElement("div", { class: "todo__tasks__list__icon" });
  temp.append(
    buildElement("span", {
      class: "material-icons",
      onclick: "taskInputToggle(this.closest('.todo__tasks__list'))",
    })
  );
  temp.append(
    buildElement("span", {
      class: "material-icons",
      onclick: "deleteCompletedTask(this.closest('.todo__tasks__list'),this)",
    })
  );
  card.append(temp);
  return card;
}
//pop container active child count
let popCounter = 0;
//popup open
export function popup(id) {
  popCounter++;
  let ele = document.getElementById(id);
  if (id == "loading-animation") {
    ele.style.visibility = "visible";
    ele.style.opacity = 1;
    ele.style.top = "50%";
    ele.parentNode.style["z-index"] = 1;
    ele.children[0].style.animationIterationCount = "infinite";
    setTimeout(() => {
      if (ele.hasAttribute("style")) popupClose(ele.id);
    }, 3000);
  } else {
    ele.parentNode.style["z-index"] = 1;
    ele.style.visibility = "visible";
    ele.style.opacity = 1;
    ele.style.top = "50%";
  }
  if (id == "newTaskList") ele.querySelector("input, textarea").focus();
  if (ele.querySelector(`#${id} .pop-up__close`) == null)
    ele.parentNode.setAttribute(
      "onclick",
      `if(event.target.id == this.id) popupClose('${id}')`
    );
}
//popup close
export function popupClose(id) {
  popCounter--;
  let ele = document.getElementById(id);
  if (id == "loading-animation") {
    if (popCounter == 0) {
      ele.parentNode.removeAttribute("onclick");
      ele.parentNode.removeAttribute("style");
    }
    ele.removeAttribute("style");
  } else {
    ele.removeAttribute("style");
    setTimeout(() => {
      if (popCounter == 0) {
        ele.parentNode.removeAttribute("onclick");
        ele.parentNode.removeAttribute("style");
      }
    }, 100);
  }
}
//tasklist to object
export function taskToObject(ele) {
  let object = {};
  object.name = ele.children[1].innerText;
  object.status = ele.children[0].checked;
  return object;
}
export function cardToObject(ele) {
  let object = {};
  object.id = String(ele.id);
  object.name = ele.children[0].children[0].innerText;
  object.tasks = [];
  let tasks = ele.querySelectorAll(".todo__tasks__list__task");
  if (typeof tasks == "object") {
    for (let task of tasks) object.tasks.push(taskToObject(task));
  }
  return object;
}
//object to tasklist
export function ObjectToCard(object) {
  let card = creatreListCard(object.name, object.id);
  let tasks = buildElement("div", { class: "todo__tasks__list__task--scroll" });
  for (let task of object.tasks) {
    tasks.append(createTask(task.name, task.status));
  }
  card.insertBefore(tasks, card.children[1]);
  return card;
}
//add task
export function createTask(taskname, isDone = false) {
  let task = buildElement("div", { class: "todo__tasks__list__task" });
  task.append(
    buildElement("input", {
      type: "checkbox",
      onchange: "changeStatus(this.parentNode)",
    })
  );
  if (isDone) task.children[0].setAttribute("checked", "");
  task.innerHTML += "\n";
  task.append(buildElement("lable", {}, taskname));
  return task;
}
//find card
export function findCard(id) {
  let reg = cardREG(id);
  reg = reg.exec(window.sessionStorage.tasklists);
  let card = [reg[0]];
  card.index = reg.index;
  return card;
}
//find all task in tasks
export function findAllTasks(id) {
  let temp = findCard(id);
  if (temp == null) return null;
  let reg = tasksAllREG(id);
  let tasks = reg.exec(temp[0]);
  tasks.index += temp.index;
  temp = [tasks[0]];
  temp.index = tasks.index;
  return temp;
}
//sessionStorage update
export function sessionStorageUpdate(foundat, length, ...strings) {
  if (strings.length) {
    strings = strings.reduce((previous, ele) => {
      if (previous == "") return ele;
      if (ele == "") return previous;
      if (previous == "," || ele == ",") return previous + ele;
      return previous + "," + ele;
    });
  } else strings = "";
  window.sessionStorage.tasklists =
    window.sessionStorage.tasklists.slice(0, foundat) +
    strings +
    window.sessionStorage.tasklists.slice(foundat + length);
}

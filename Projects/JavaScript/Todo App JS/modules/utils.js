//creating dynamic elements
export function buildElement(tag, attributes, text = "", style) {
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
export let creatreListCard = (name) => {
  let card = buildElement("div", { class: "todo__tasks__list" });
  card.append(buildElement("div", { class: "todo__tasks__list--fold" }));
  let temp = buildElement("div", { class: "todo__tasks__list__name" });
  temp.append(buildElement("a", { href: "./index2.html" }, name));
  temp.append(
    buildElement("span", {
      class: "material-icons",
      onclick: "deleteTaskCard(this.parentNode.parentNode.id)",
    })
  );
  card.append(temp);
  temp = buildElement("div", { class: "todo__tasks__list__icon" });
  temp.append(
    buildElement(
      "span",
      {
        class: "material-icons",
        onclick: "addTask(this.closest('.todo__tasks__list__task'))",
      },
      "add_box"
    )
  );
  temp.append(
    buildElement(
      "span",
      {
        class: "material-icons",
        onclick: "deleteList(this.closest('.todo__tasks__list__task'))",
      },
      "delete_sweep"
    )
  );
  card.append(temp);
  return card;
};
//popup open
export let popup = (id) => {
  let ele = document.getElementById(id);
  ele.parentNode.style["z-index"] = 1;
  if (document.querySelector(`#${id} .pop-up__close`) == null) {
    ele.parentNode.setAttribute(
      "onclick",
      `if (event.target.id==='${ele.parentNode.id}') popupClose('${id}')`
    );
  }
  ele.style["opacity"] = 1;
  ele.style["top"] = "50%";
};
//popup close
export let popupClose = (id) => {
  let ele = document.getElementById(id);
  ele.style = {};
  setTimeout(() => {
    ele = ele.parentNode;
    ele.removeAttribute("onclick");
    ele.style = {};
  }, 100);
};
//tasklist to object
export function taskToObject(ele) {
  let object = {};
  object.name = ele.children[1].innerText;
  object.status = ele.children[0].checked;
  return object;
}
export function cardToObject(ele) {
  let object = {};
  object.id = ele.id;
  object.name = ele.children[1].children[0].innerText;
  object.tasks = [];
  let tasks = ele.querySelectorAll(".todo__tasks__list__task");
  if (typeof tasks == "object") {
    for (let task of tasks) object.tasks.push(taskToObject(task));
  }
  return object;
}
//object to tasklist
export function ObjectToCard(object) {
  let card = creatreListCard(object.name);
  card.id = object.id;
  let before = card.querySelector(".todo__tasks__list__icon");
  for (let task of object.tasks) {
    card.insertBefore(createTask(task.name, task.status), before);
  }
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
  let reg = `(?<=[\\[,]){"id":"${id}",.*?,"tasks":\\[.*?\\]}(?=[,\\]])`;
  reg = new RegExp(reg, "i");
  reg = reg.exec(window.sessionStorage.tasklists);
  let card = [reg[0]];
  card.index = reg.index;
  return card;
}
//find all task in tasks
export function findAllTasks(id) {
  let temp = findCard(id);
  let tasks = /,"tasks":\[(?<tasks>.*?)\]/.exec(temp[0]);
  tasks.index += temp.index + 10;
  temp = [tasks.groups.tasks];
  temp.index = tasks.index;
  return temp;
}
//sessionStorage update
export function sessionStorageUpdate(foundat, length, ...strings) {
  if (strings.length) {
    strings = strings.reduce((previous, ele) => {
      return previous + "," + ele;
    });
  } else strings = "";
  window.sessionStorage.tasklists =
    window.sessionStorage.tasklists.slice(0, foundat) +
    strings +
    window.sessionStorage.tasklists.slice(foundat + length);
}

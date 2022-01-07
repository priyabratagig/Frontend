console.log("string_and_object.js");
console.log("Object to string to objects functions");
//string pre processing
window.stringPreprocess = (s) => {
  s = s.replace(/\\/g, "\\\\");
  s = s.replace(/"/g, '\\"');
  return s;
};
//string post processing
function stringPostprocessing(s) {
  s = s.replace(/\\"/g, '"');
  s = s.replace(/\\\\/g, "\\");
  return s;
}
//Object to string
Object.prototype.toString = function () {
  let string = "{";
  let keys = Object.keys(this);
  keys.sort();
  for (let key of keys) {
    if (string != "{") string += ",";
    string +=
      (typeof key == "string" ? '"' + stringPreprocess(key) + '"' : key) + ":";
    if (typeof this[key] == "object") {
      string += String(this[key]);
    } else {
      string +=
        typeof this[key] == "string"
          ? '"' + stringPreprocess(this[key]) + '"'
          : this[key];
    }
  }
  return string + "}";
};
//array to string
Array.prototype.toString = function () {
  let string = "[";
  for (let i of this) {
    if (string != "[") string += ",";
    string +=
      typeof i == "object"
        ? String(i)
        : typeof i == "string"
        ? '"' + stringPreprocess(i) + '"'
        : i;
  }
  return string + "]";
};
//from string to object
Object.defineProperty(Object.prototype, "toObject", {
  value: function (s) {
    if (typeof s == "string") {
      return Object.fromString.bind(s)();
    }
    let reg =
      /[{}\[\],:]|(?<=[,:{\[]")(?:(?:\\\\\\\\|[^\\"]).*?)(?:(?=\\\\\\\\")....|(?=[^\\]").(?="[:,\]}]))|(?<nonString>(?<=[{\[:,])\w+(?=[,:\]}]))|(?<=[,:{\[])(?<empty>"")(?=[:,\]}])/g;
    let stack = [];
    stack.arrayShow = function () {
      if (this.length === 0) {
        return 0;
      }
      return this[this.length - 1];
    };
    stack.stackInsert = function (temp) {
      if (this.length > 0) {
        let show = this.arrayShow();
        if (Array.isArray(show)) {
          show.push(temp);
        } else {
          this[this.length - 2][show] = temp;
        }
      }
      this.push(temp);
    };
    for (
      let match = reg.exec(this), temp;
      match !== null;
      match = reg.exec(this)
    ) {
      if (
        match.groups.nonString != null ||
        match.groups.nonString != undefined
      ) {
        match = match.groups.nonString;
        match = isNaN(match) ? /true/i.test(match) : Number(match);
      } else if (
        match.groups.empty != null ||
        match.groups.empty != undefined
      ) {
        match = "";
      } else if (match[0].length > 1) match = stringPostprocessing(match[0]);
      else match = match[0];
      switch (match) {
        case "{":
          temp = {};
          stack.stackInsert(temp);
          continue;
        case "[":
          temp = [];
          stack.stackInsert(temp);
          continue;
        case "}":
        case "]":
          if (stack.length == 1) break;
          stack.pop();
          if (typeof stack.arrayShow() == "string") {
            stack.pop();
          }
          temp = stack.arrayShow();
          continue;
        case ":":
          if (typeof temp != "string") match = reg.exec(this);
          continue;
        case ",":
          continue;
        default:
          if (Array.isArray(temp)) {
            temp.push(match);
          } else if (typeof temp == "object") {
            temp = match;
            stack.push(temp);
          } else if (typeof temp == "string") {
            stack[stack.length - 2][temp] = match;
            stack.pop();
            temp = stack.arrayShow();
          }
          continue;
      }
    }
    return stack.pop();
  },
});
//(?<=[{,]["']id["']:"2asa".*,"tasks":\[).*?(?=\])|(?<=[{,]"tasks":\[).*?(?=\].*,["']id["']:"2asa")
//(?<=[{,]"id":"01").*?(?=,"tasks":\[(?<tasksAfter>.*?)\][,}])
//(?<=[{,]"id":"03")(?<ac>.*?)(?=,"tasks":\[(?<after>.*?)\][,}])|(?<=[{,]"tasks":\[)(?<before>.*?)\](?<bc>.*?)(?="id":"03")
//(?<="tasks":\[)(?<b>.*?)(?=\],)(?<bc>.*?)(?="id":"02")
//(?<="id":"02",)(?<ac>.*?)(?="tasks":\[)(?<a>.*?)(?=\][,}])
//new
//(?<=[,:{\[]")(?:(?:\\\\\\\\|[^\\"']).*?)(?:(?=\\\\\\\\")....|(?=[^\\]"[:,\]}]).)
//[{}\[\],:]|(?<=[,:{\[]")(?:(?:\\\\\\\\|[^\\"]).*?)(?:(?=\\\\\\\\")....|(?=[^\\]").(?="[:,\]}]))|(?<=[{\[:,])\w+(?=[,:\]}])|(?<=[,:{\[])(?<n>"")(?=[:,\]}])

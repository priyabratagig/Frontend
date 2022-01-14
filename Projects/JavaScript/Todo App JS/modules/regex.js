console.log("regex.js");
//string to object regex
export const objectKeyValueREG =
  /[{}\[\],:]|(?<=[,:{\[]").*?(?:(?=\\\\\\\\")....|(?=[^\\]").(?="[:,\]}]))|(?<nonString>(?<=[{\[:,])\w+(?=[,:\]}]))|(?<=[,:{\[])(?<empty>"")(?=[:,\]}])/g;
//taskcard regex
export const cardREG = (id) => {
  let reg = `(?<=[\\[,]){"id":"${id}","name":".*?","tasks":\\[.*?\\]}(?=\\]$|,{"id")`;
  return new RegExp(reg);
};
//tasks all regex
export const tasksAllREG = (id) => {
  let reg = `(?<=,"tasks":\\[).*?(?=\\]}$)`;
  return new RegExp(reg);
};
//task reg ex
export const taskREG = (id) => {
  let reg = `{"name":".*?","status":(true|false)}`;
  return new RegExp(reg);
};
// task split
export const taskSplitREG = (id) => {
  let reg = `(?<={"name":".*?","status":(?:true|false)}),`;
  return new RegExp(reg);
};
//complete task
export const taskCompletedREG = (id) => {
  let reg = `^{"name":".*?","status":true}$`;
  return new RegExp(reg);
};
//extra comma
export const commaREG =
  /(?<=\[),+(?={"(?:id|name)":)|(?<=},),+(?={"(?:id|name)":)|,+(?=\]$|\]}(?:,+{"id":|,*\]$))|(?<=,"tasks":\[),+(?=\]$)/g;
//card search
export const urlSearchParamREG = /(?<=\?card=).*$/;
//string trim
export const stringTrim = /^\s+|(?<=\s)\s+|\s+$/gu;
//control characters
export const cntrl = /[\u{0000}-\u{001F}]|\u{007F}|[\u{0080}-\u{009F}]/gu;
//separators line separators and paragraph separator
export const separator = /\u{2028}|\u{2029}/gu;

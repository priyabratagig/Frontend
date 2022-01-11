console.log("regex.js");
//taskcard regex
export const cardREG = (id) => {
  return `(?<=[\\[,]){"id":"${id}","name":".*?","tasks":\\[.*?\\]}(?=\\]$|,{"id")`;
};
//tasks all regex
export const tasksAllREG = (id) => {
  return `(?<=,"tasks":\\[).*?(?=\\]}$)`;
};
//task reg ex
export const taskREG = (id) => {
  return `{"name":".*?","status":(true|false)}`;
};
// task split
export const taskSplitREG = (id) => {
  return `(?<={"name":".*?","status":(?:true|false)}),`;
};
//complete task
export const taskCompletedREG = (id) => {
  return `^{"name":".*?","status":true}$`;
};
//extra comma
export const commaREG =
  /(?<=\[),+(?={"(?:id|name)":)|(?<=},),+(?={"(?:id|name)":)|,(?=\]$)|,+(?=(?:\]$|\]}(?:,+{"id":|,*\]$)))|^\[,+\]$|(?<=,"tasks":\[),+(?=\]$)/g;
//card search
export const cardSearchREG = /(?<=\?card=).*$/;

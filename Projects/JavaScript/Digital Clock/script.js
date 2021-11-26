window.onload = setInterval(() => {
  let time = new Date();
  let hrs = time.getHours();
  document.getElementById("hrs").innerText = (hrs>=12? hrs-12 :hrs);
  document.getElementById("mins").innerText = time.getMinutes();
  document.getElementById("secs").innerText = time.getSeconds();
  document.getElementById("meridiem").innerText = (hrs>=12? "PM" : "AM");
  console.log(1);
},1000);
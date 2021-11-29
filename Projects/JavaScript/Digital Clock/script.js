let morning, lunch , dinner;
let setAlarm = ()=>{
  morning = parseInt(document.getElementById("wake-up").value);
  lunch = parseInt(document.getElementById("lunch").value);
  dinner = parseInt(document.getElementById("dinner").value);
  if((lunch-1<=dinner && dinner <= lunch+1) || (morning-1<=dinner && dinner <= morning+1) || (morning-1<=lunch && lunch <= morning+1)){
    alert("You should do one job at a time")
    morning = lunch = dinner = undefined;
  };
};
let worldClock = window.onload = () =>{
  return () => {
    let time = new Date();
    let hrs = time.getHours();
    document.getElementById("hrs").innerText = (hrs>=12? hrs-12 :hrs);
    document.getElementById("mins").innerText = time.getMinutes();
    document.getElementById("secs").innerText = time.getSeconds();
    document.getElementById("meridiem").innerText = (hrs>=12? "PM" : "AM");
    // alarm code
    if(morning <= hrs && hrs <= morning+1){
      alert("wake up sid");
      document.getElementById("message").setAttribute("src","./morning.png");
      morning = undefined;
    }
    else if(lunch <= hrs && hrs <= lunch+1){
      alert("lunch time");
      document.getElementById("message").setAttribute("src","./lunch.png");
      lunch = undefined;
    }
    else if(dinner <= hrs && hrs <= dinner+1){
      alert("Go to bed");
      document.getElementById("message").setAttribute("src","./night.png");
      dinner = undefined;
    }
    // alarm code end
  };
};
document.onload = setInterval(worldClock(),1000);
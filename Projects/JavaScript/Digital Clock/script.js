let morning, lunch , dinner;
let counter={
  hour: 0,
  mins: 0,
  seconds: 0,
};
let setInnerText = (...args)=>{
  document.getElementById(args.shift()).innerText = args.reduce((a , b )=>{
    return String(a) + String(b);
  });
};
let setAlarm = ()=>{
  let _wakeUp = document.getElementById("wake-up");
  let _lunch = document.getElementById("lunch");
  let _dinner = document.getElementById("dinner");
  morning = parseInt(_wakeUp.value);
  lunch = parseInt(_lunch.value);
  dinner = parseInt(_dinner.value);
  if((lunch-1<=dinner && dinner <= lunch+1) || (morning-1<=dinner && dinner <= morning+1) || (morning-1<=lunch && lunch <= morning+1)){
    alert("You should do one job at a time");
    morning = lunch = dinner = undefined;
    return false;
  }
  else if((morning===23 || lunch===23 || dinner===23) && (morning===0 || lunch===0 || dinner===0))
  {
    alert("You should do one job at a time");
    morning = lunch = dinner = undefined;
    return false;
  };
  document.getElementById("alarms-display").style.display="block";
  let text = _wakeUp.options[_wakeUp.selectedIndex].text;
  setInnerText("wake-up-alarm", text);
  console.log(text);
  text = _lunch.options[_lunch.selectedIndex].text;
  setInnerText("lunch-alarm", text);
  console.log(text);
  text = _dinner.options[_dinner.selectedIndex].text;
  setInnerText("dinner-alarm", text);
  console.log(text);
};
let worldClock = window.onload = () =>{
  return () => {
    let time = new Date();
    let hrs = time.getHours();
    setInnerText("hrs", (hrs>=12? hrs-12 :hrs));
    setInnerText("mins",time.getMinutes());
    setInnerText("secs",time.getSeconds());
    setInnerText("meridiem",(hrs>=12? "PM" : "AM"));
    // alarm code
    if(morning<=  hrs && hrs < morning+2){
      document.getElementById("message").setAttribute("src","./morning.png");
      morning = undefined;
    }
    else if(lunch<=hrs && hrs < lunch+2){
      document.getElementById("message").setAttribute("src","./lunch.png");
      lunch = undefined;
    }
    else if(dinner<=hrs && hrs < dinner+2){
      document.getElementById("message").setAttribute("src","./night.png");
      dinner = undefined;
    }
    // cocunter code
    counter.seconds++;
    if(counter.seconds===60){
      counter.mins++;
      counter.seconds=0;
    }
    if(counter.mins===60){
      counter.hour++;
      counter.mins=0;
    }
    setInnerText("counter",counter.hour,':',counter.mins,':',counter.seconds);
    //greet
    switch(true){
      case hrs>=5 && hrs<12:
        setInnerText("greet-text","GOOD MORNING!");
        break;
      case hrs>=12 && hrs<17:
        setInnerText("greet-text","GOOD AFTERNOON!");
        break;
      default: setInnerText("greet-text","GOOD EVENING!");
    };
  };
};
document.onload = setInterval(worldClock(),1000);
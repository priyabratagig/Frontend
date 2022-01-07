function getWheather(city = "") {
  let apiKEY = "4590bf7ab8e53e7311c6c3d5d55ca62f";
  let url = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKEY}`;
  let a = $.ajax();
}

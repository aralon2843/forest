let getPositionByBrowser = new Promise((resolve) => {
  navigator.geolocation.getCurrentPosition((pos) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&appid=ea516a7f9e0e55490e7b63ea06b65f54`;
    resolve(url);
  }, getPositionByIP);
}).then((url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      renderCurrentWeather(data);
    });
});

async function getPositionByIP() {
  return new Promise((resolve) => {
    ymaps.ready(init);

    function init() {
      var geolocation = ymaps.geolocation;

      geolocation
        .get({
          provider: "yandex",
        })
        .then(() => geolocation.get())
        .then((data) => resolve(data));
    }
  })
    .then(
      (data) =>
        `https://api.openweathermap.org/data/2.5/weather?lat=${data.geoObjects.position[0]}&lon=${data.geoObjects.position[1]}&units=metric&appid=ea516a7f9e0e55490e7b63ea06b65f54`
    )
    .then((url) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          renderCurrentWeather(data);
        });
    });
}

function renderCurrentWeather(data) {
  console.log(data);
  document.querySelector(".weather__info-city").innerHTML = data.name;
  document.querySelector(
    ".weather__info-date"
  ).innerHTML = `${getCurrentMonth()} ${new Date().getDate()}, ${new Date().getFullYear()}`;
  document.querySelector(
    ".weather__info-img"
  ).style.backgroundImage = `url('http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png'`;
  document.querySelector(".weather__info-descr").innerHTML =
    data.weather[0].description;
  document.querySelector(".weather__deg-current").innerHTML = `${parseInt(
    data.main.temp
  )}°`;
  document.querySelector(".weather__deg-max").innerHTML = `${parseInt(
    data.main.temp_max
  )}°<span>/</span>`;
  document.querySelector(".weather__deg-min").innerHTML = `${parseInt(
    data.main.temp_min
  )}°`;
}

function getCurrentMonth() {
  switch (new Date().getMonth()) {
    case 0:
      return "January";

    case 1:
      return "February";

    case 2:
      return "March";

    case 3:
      return "April";

    case 4:
      return "May";

    case 5:
      return "June";

    case 6:
      return "July";

    case 7:
      return "August";

    case 8:
      return "September";

    case 9:
      return "October";

    case 10:
      return "November";

    case 11:
      return "December";
  }
}

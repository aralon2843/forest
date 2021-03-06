getPositionByIP();
setInterval(updateClock, 1000);
updateClock();
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
    .then((data) => {
      getForecastData(data);
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${data.geoObjects.position[0]}&lon=${data.geoObjects.position[1]}&units=metric&appid=ea516a7f9e0e55490e7b63ea06b65f54`;
      return url;
    })
    .then((url) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          renderCurrentWeather(data);
        });
    });
}

function getForecastData(data) {
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.geoObjects.position[0]}&lon=${data.geoObjects.position[1]}&units=metric&exclude=current,minutely,alerts&appid=ea516a7f9e0e55490e7b63ea06b65f54`;
  fetch(url)
    .then((response) => response.json())
    .then(renderForecastWeather);
}

function renderForecastWeather(forecastData) {
  document.querySelectorAll(".weather__item").forEach((item, i) => {
    item.classList.remove("placeholder");
    item.querySelectorAll(".weather__item-day").forEach((item) => {
      item.style.opacity = "1";
      item.innerHTML = getCurrentDay(new Date().getDay() + 1 + i)
        .substring(0, 3)
        .toUpperCase();
    });
    item.querySelectorAll(".weather__item-image").forEach((item) => {
      item.style.opacity = "1";
      item.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${
          forecastData.daily[1 + i].weather[0].icon
        }@4x.png`
      );
    });
    item.querySelectorAll(".weather__item-deg").forEach((item) => {
      item.textContent = `${parseInt(
        forecastData.daily[1 + i].temp.min
      )}°/${parseInt(forecastData.daily[1 + i].temp.max)}°`;
    });
  });
}

function renderCurrentWeather(data) {
  const currentWeatherImage = document.querySelector(".weather__current-image");
  document.querySelector(".weather__current").classList.remove("placeholder");
  document.querySelector(".info__location-city").innerHTML = data.name;
  document.querySelector(".weather__current-day").style.opacity = '1'
  document.querySelector(".info__location-country").innerHTML =
    data.sys.country;
    document.querySelector(".info__date-day").innerHTML = `${getCurrentDay(
    new Date().getDay()
  )}, ${new Date().getDate()} ${getCurrentMonth()} ${new Date().getFullYear()}`;
  currentWeatherImage.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
  );
  currentWeatherImage.style.opacity = "1";
  document.querySelector(".weather__current-descr").innerHTML =
    data.weather[0].description;
  document.querySelector(".weather__current-deg").innerHTML = `${parseInt(
    data.main.temp
  )}°`;
}

function updateClock() {
  document.querySelector(".info__date-time").innerHTML = `${getZeroNum(
    new Date().getHours()
  )}:${getZeroNum(new Date().getMinutes())}`;
}

function getZeroNum(num) {
  if (num < 10) {
    return `0${num}`;
  } else return num;
}

function getCurrentDay(currentDay) {
  switch (currentDay) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 7:
      return "Sunday";
    case 8:
      return "Monday";
    case 9:
      return "Tuesday";
    case 10:
      return "Wednesday";
    case 11:
      return "Thursday";
    case 12:
      return "Friday";
    case 13:
      return "Saturday";
  }
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

let promise = new Promise((resolve) => {
  navigator.geolocation.getCurrentPosition((pos) => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=ea516a7f9e0e55490e7b63ea06b65f54`;
    resolve(url);
  });
}).then((url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector('.header__city h2').textContent = data.city.name
    })
});

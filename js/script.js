let getPos = new Promise((resolve) => {
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
      `https://api.openweathermap.org/data/2.5/forecast?lat=${data.geoObjects.position[0]}&lon=${data.geoObjects.position[1]}&units=metric&appid=ea516a7f9e0e55490e7b63ea06b65f54`
  )
  .then((url) => {
    fetch(url)
      .then((response) => response.json())
      .then((position) =>{
        document.querySelector('.header__city h2').innerHTML = position.city.name
      } );
  });

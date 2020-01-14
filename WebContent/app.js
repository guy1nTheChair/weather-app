window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureElement = document.querySelector(".temperature-degree");
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let timeZoneElement = document.querySelector(".location-timezone");
  let temperatureSetion = document.querySelector(".degree-section");
  let temperatureSpan = document.querySelector(".degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      //console.log("Longitude:" + long + "--Latitude: " + lat);
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/9ebd4792b78285989e29c7793a34e9c8/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          //console.log(data);
          const { temperature, summary, icon } = data.currently;
          const timeZone = data.timezone;
          let celsius = Math.floor((temperature - 32) * (5 / 9));
          temperatureElement.textContent = temperature;
          temperatureDescription.textContent = summary;
          timeZoneElement.textContent = timeZone;
          setIcons(icon, document.querySelector(".icon"));

          //change F to C
          temperatureSetion.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureElement.textContent = celsius;
            } else {
              temperatureSpan.textContent = "F";
              temperatureElement.textContent = temperature;
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});

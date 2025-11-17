const d = document;
const unitsBut = d.getElementById('units-but');
const formSearch = d.getElementById('search');
const navImMe = d.getElementById('nav-imp-met');
const templeteCitys = d.getElementById('search-citys').content;
const templetePainel = d.getElementById("tem-painel").content;
const painelInfo = d.querySelector(".painel-info");
const fragment = d.createDocumentFragment();
const search = d.querySelector("#search-opt");
const searchInput = d.getElementById('search-input');
const feelsLikeP = d.getElementById("feels");
const humidityP = d.getElementById("humidity");
const windP = d.getElementById("wind");
const precP = d.getElementById("precipitation");

// console.log(feelsLike)
let latitude, logitud;
let temperature = null,
   windSpeed = null,
   precipitation = null,
   hours = null;
let todayHrs = new Date().getHours();
let todayDay = new Date().getDate();

async function getCity(el) {
   try {
      let res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${el.lat}&longitude=${el.long}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation&hourly=weather_code`);
      let json = await res.json();
      console.log(json)
      let resCity = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${el.lat}&longitude=${el.long}&localityLanguage=es`);

      let hereCity = await resCity.json();
      console.log(hereCity);

      let datos = {
         hereLocation: hereCity.city + ', ' + hereCity.countryName,
         time: json.hourly.time,
         temp: json.hourly.temperature_2m,
         prec: json.hourly.precipitation,
         windS: json.hourly.wind_speed_10m,
         cod: json.hourly.weather_code,
         feelsL: json.hourly.apparent_temperature,
         humity: json.hourly.relative_humidity_2m
      }

      return datos;
   } catch (er) {
      console.error("Error de peticion " + er);
   }
}

function setPainelFeelsLike(datos) {
   for (let i = 0; i < datos.time.length; i++) {
         if (todayHrs == datos.time[i].slice(11, 13) && todayDay == datos.time[i].slice(8, 10)) {
            // setPainelFeelsLike(datos, i);
            templetePainel.querySelector("#painel-city").textContent = datos.hereLocation;
            templetePainel.querySelector("#painel-week").textContent = "Tuedary";
            templetePainel.querySelector("img").src = getIconImg(datos.cod[i]);
            templetePainel.querySelector("#painel-temp").textContent = datos.temp[i] + "º";
            painelInfo.appendChild(templetePainel);
            feelsLikeP.textContent = datos.feelsL[i];
            humidityP.textContent = datos.humity[i];
            precP.textContent = datos.prec[i];
            windP.textContent = datos.windS[i];
         }
      }

}

function getIconImg(valor) {

   let temp = "";
   switch (true) {
      case valor == 0: temp = 'assets/images/icon-sunny.webp';
         break;
      case valor == 1 || valor == 2: temp = 'assets/images/icon-partly-cloudy.webp';
         break;
      case valor == 3: temp = 'assets/images/icon-overcast.webp';
         break;
      case valor == 45 || valor == 46: temp = 'assets/images/icon-fog.webp';
         break;
      case (valor >= 51 && valor <= 57): temp = 'assets/images/icon-drizzle.webp';
         break;
      case ((valor >= 61 && valor <= 67) || valor >= 80 && valor <= 82): temp = 'assets/images/icon-rain.webp';
         break;
      case (valor >= 71 && valor <= 77) || valor == 85 || valor == 86: temp = 'assets/images/icon-snow.webp';
         break;
      case valor >= 95 && valor <= 99: temp = 'assets/images/icon-storm.webp';
         break;
      default: "imagen no found!!"
   }
   return temp;
}


const city = [
   {
      name: 'Sevilla',
      lat: 37.3828,
      long: -5.9732
   },
   {
      name: 'Cadiz',
      lat: 36.5267,
      long: 36.5267
   },
   {
      name: 'Malaga',
      lat: 36.7202,
      long: -4.4203
   },
   {
      name: 'Madrid',
      lat: 40.4165,
      long: 40.4165
   }
]

window.addEventListener("click", (e) => {
   e.preventDefault();

   if (e.target.matches("#units-but *")) {
      navImMe.classList.toggle("onDisplay");
   }

   // if (e.target.matches("#search-input")) {
   // search.classList.add("onDisplay");
   // while (search.querySelectorAll("button").length == 0) {
   // city.forEach(e => {
   // templeteCitys.querySelector("button").textContent = e.name;
   // templeteCitys.querySelector('button').id = e.name;
   // let clone = d.importNode(templeteCitys, true);
   // fragment.appendChild(clone);
   // })
   // search.appendChild(fragment);
   // }
   // }
   if (!e.target.matches("#search-but")) {
      search.classList.remove("onDisplay");
      search.replaceChildren();
   }


   if (e.target.matches("#search-but")) {
      console.log(searchInput.value)
      let valueSearch = searchInput.value;
      // search.replaceChildren();
      if (searchInput.value != "") {
         city.forEach(e => {
            if (e.name.toLowerCase().includes(valueSearch.toLowerCase())) {
               templeteCitys.querySelector("button").textContent = e.name;
               templeteCitys.querySelector("button").id = e.name;
               let clone = d.importNode(templeteCitys, true);
               fragment.appendChild(clone);
            }
         })
         search.appendChild(fragment);
         search.classList.add("onDisplay");
      }

   }
   city.forEach(el => {
      if (e.target.id == el.name) {
           getCity({ lat: el  , long: el.long }).then(datos => {

              setPainelFeelsLike(datos);
              console.log(datos)
           })
         


      }
   })
})

window.addEventListener("load", (e) => {
   navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
       let datos = await getCity({ lat: lat, long: long });
      console.log(logitud, latitude)
      setPainelFeelsLike(datos);

   }, (error) => {
      alert("Este Browser no aporta localiacion el App!! Error: " + error);
   })
})










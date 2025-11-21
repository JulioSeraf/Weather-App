const d = document;
const unitsBut = d.getElementById('units-but');
const formSearch = d.getElementById('search');
const navImMe = d.getElementById('nav-imp-met');
const templeteCitys = d.getElementById('search-citys').content;
// const painel = d.getElementById("tem-ppainelInfot;
const painelInfo = d.querySelector(".painel-info");
const fragment = d.createDocumentFragment();
const search = d.querySelector("#search-opt");
const searchInput = d.getElementById('search-input');
const feelsLikeP = d.getElementById("feels");
const humidityP = d.getElementById("humidity");
const windP = d.getElementById("wind");
const precP = d.getElementById("precipitation");
const templeteDaily = d.getElementById("daily-templete").content;
   
// console.log(feelsLike)
let latitude, logitud;
let temperature = null,
   windSpeed = null,
   precipitation = null,
   hours = null;
let todayHrs = new Date().getHours();
let todayDay = new Date().getDate();
const todayWeek = new Date().getDay();
console.log(todayWeek)

async function getNameCity(el) {
   try {
      let resCity = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${el.lat}&longitude=${el.long}&localityLanguage=es`);
      let hereCity = await resCity.json();

      let city = hereCity.city + ', ' + hereCity.countryName
      return city;
   } catch (err) {
      console.error("Error de peticion " + er);
   }
}


async function getCityDatos(el) {
   try {
      let res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${el.lat}&longitude=${el.long}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation&hourly=weather_code`);
      let json = await res.json();
      console.log(json)
      let datos = {
         time: json.hourly.time,
         temp: json.hourly.temperature_2m,
         prec: json.hourly.precipitation,
         windS: json.hourly.wind_speed_10m,
         wCod: json.hourly.weather_code,
         feelsL: json.hourly.apparent_temperature,
         humity: json.hourly.relative_humidity_2m
      }

      return datos;
   } catch (er) {
      console.error("Error de peticion " + er);
   }
}

function setPainelFeelsLike(datos, nameCity) {


   for (let i = 0; i < datos.time.length; i++) {
      if (todayHrs == datos.time[i].slice(11, 13) && todayDay == datos.time[i].slice(8, 10)) {
         // setPainelFeelsLike(datos, i);
         console.log(nameCity)
         painelInfo.querySelector("#painel-city").textContent = nameCity;
         painelInfo.querySelector("#painel-week").textContent = "Tuedary";
         painelInfo.querySelector("img").src = getIconImg(datos.wCod[i]);
         painelInfo.querySelector("#painel-temp").textContent = datos.temp[i] + "º";
         feelsLikeP.textContent = datos.feelsL[i];
         humidityP.textContent = datos.humity[i];
         precP.textContent = datos.prec[i];
         windP.textContent = datos.windS[i];

      }
   }

}
function getDayWeek(datos, day) {
   let conDay = 0;
   let ordenSemana = [];
   let semana = [
      {
         id: 1,
         name: "Monday",
         days: []

      },
      {
         id: 2,
         name: "Tuesday",
         days: []
      },
      {
         id: 3,
         name: "Wednesday",
         days: []
      },
      {
         id: 4,
         name: "Thursday",
         days: []
      },
      {
         id: 5,
         name: "Friday",
         days: []
      },
      {
         id: 6,
         name: "Saturday",
         days: []
      },
      {
         id: 7,
         name: "Sunday",
         days: []
      }
   ]

   let cont = 0;
   // console.log(semana[7].id)
   while (semana[cont].id !== day) {
      console.log(semana[cont].id)
      ordenSemana[cont] = semana[cont];
      cont = cont +1;
   }
   ordenSemana = semana.slice(day - 1, semana.length).concat(ordenSemana);

   for (let t = 0; t < datos.length; t++) {
      ordenSemana[conDay].days.push(datos[t]);
      if (ordenSemana[conDay].days.length == 24) {
         conDay++;
      }
   }
   console.log(ordenSemana)
   return ordenSemana;
}

function getDailyForecast(datos){
   getDayWeek(datos.temp,todayWeek).forEach(el => {
      templeteDaily.querySelector("#sigla-semanal").textContent = el.name.substring(0,3);
      templeteDaily.querySelector('img').src = getIconImg(datos.wCod[0]);
      templeteDaily.querySelector('.day-min').textContent = el.days.sort()[el.days.length-1];
      templeteDaily.querySelector('.day-max').textContent = el.days.sort()[0];
      let clone = d.importNode(templeteDaily, true);
      fragment.appendChild(clone);
   })
   d.querySelector('.div-daily').appendChild(fragment);
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
      name: 'Sevilla, España',
      lat: 37.3828,
      long: -5.9732
   },
   {
      name: 'Cadiz, España',
      lat: 36.5267,
      long: 36.5267
   },
   {
      name: 'Malaga, España',
      lat: 36.7202,
      long: -4.4203
   },
   {
      name: 'Madrid, España',
      lat: 40.4165,
      long: 40.4165
   }
]



document.addEventListener("click", (e) => {
   e.preventDefault();

   if (e.target.matches("#units-but *")) {
      navImMe.classList.toggle("onDisplay");
   }

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
         getCityDatos({ lat: el.lat, long: el.long }).then(res => {
            setPainelFeelsLike(res, el.name);
            getDayWeek(res.temp, todayWeek);

         })
      }
   })
})

window.addEventListener("DOMContentLoaded", (e) => {
   navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      const cord = {
         lat: lat,
         long: long
      }
      try {
         const res = await getCityDatos(cord);
         const name = await getNameCity(cord);
         setPainelFeelsLike(res, name);
         getDailyForecast(res);
      } catch (err) {
         console.error(err);
      }

   }, (error) => {
      alert("Este Browser no aporta localiacion el App!! Error: " + error);
   });

})










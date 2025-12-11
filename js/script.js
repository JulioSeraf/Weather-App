const d = document,
   unitsBut = d.getElementById('units-but'),
   formSearch = d.getElementById('search'),
   navImMe = d.getElementById('nav-imp-met'),
   templeteCitys = d.getElementById('search-citys').content,
   painelInfo = d.querySelector(".painel-info"),
   fragment = d.createDocumentFragment(),
   search = d.querySelector("#search-opt"),
   searchInput = d.getElementById('search-input'),
   feelsLikeP = d.getElementById("feels"),
   humidityP = d.getElementById("humidity"),
   windP = d.getElementById("wind"),
   precP = d.getElementById("precipitation"),
   templeteDaily = d.getElementById("daily-templete").content,
   templeteOptHourly = d.getElementById("opt-hourly").content,
   templeteHourly = d.getElementById("hourly-templete").content,
   hourlySelect = d.getElementById('hourly-select'),
   todayHrs = new Date().getHours(),
   todayDay = new Date().getDate(),
   todayWeek = new Date().getDay();

let latitude, logitud,
   temperature = null,
   windSpeed = null,
   precipitation = null,
   hours = null,
   fullDate = new Date().toDateString();
async function getNameCity(el) {
   try {
      let resCity = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${el.lat}&longitude=${el.long}&localityLanguage=es`);
      let hereCity = await resCity.json();
      let city = hereCity.city + ', ' + hereCity.countryName;
      return city;
   } catch (err) {
      console.error("Error de peticion " + er);
   }
}


async function getCityDatos(el) {
   try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${el.lat}&longitude=${el.long}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation&hourly=weather_code`);

      if(!res.ok){
         throw new Error(`Error HTTP ${res.status} ${res.statusText}`);
      }
      const json = await res.json();

      if(!json.hourly) throw new Error('Api no devolvió los datos');
      return {
         time: json.hourly.time,
         temp: json.hourly.temperature_2m,
         prec: json.hourly.precipitation,
         windS: json.hourly.wind_speed_10m,
         wCod: json.hourly.weather_code,
         feelsL: json.hourly.apparent_temperature,
         humity: json.hourly.relative_humidity_2m
      }
   } catch (er) {
      console.error('Eroor en la petición',er.message);
   }
}

async function latLongProvincias() {
   try {
      const res = await fetch('citys.json');
      if(!res.ok) throw new Error(`Error HTTP: ${res.status} ${res.statusText}`);
      const citys = res.json();
      if(citys == undefined) throw new Error('Archivo json no encontrado');
      return citys;
   } catch (err) {
      console.error('ERROR en la petición',err);
   }
}

function setPainelFeelsLike(datos, nameCity) {
   for (let i = 0; i < datos.time.length; i++) {
      if (todayHrs == datos.time[i].slice(11, 13) && todayDay == datos.time[i].slice(8, 10)) {
         let date = getDayWeek(datos, todayWeek)[0].name;
         painelInfo.querySelector("#painel-city").textContent = nameCity;
         painelInfo.querySelector("#painel-week").textContent = fullDate.replace(date.substring(0, 3), date);
         painelInfo.querySelector("img").src = getIconImg(datos.wCod[i]);
         painelInfo.querySelector("#painel-temp").textContent = datos.temp[i] + "º";
         feelsLikeP.textContent = datos.feelsL[i] + "º";
         humidityP.textContent = datos.humity[i] + "%";
         precP.textContent = datos.prec[i] + " mm";
         windP.textContent = datos.windS[i] + " km/h";

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
         daysTemp: [],
         cod: []

      },
      {
         id: 2,
         name: "Tuesday",
         daysTemp: [],
         cod: []

      },
      {
         id: 3,
         name: "Wednesday",
         daysTemp: [],
         cod: []

      },
      {
         id: 4,
         name: "Thursday",
         daysTemp: [],
         cod: []

      },
      {
         id: 5,
         name: "Friday",
         daysTemp: [],
         cod: []

      },
      {
         id: 6,
         name: "Saturday",
         daysTemp: [],
         cod: []

      },
      {
         id: 7,
         name: "Sunday",
         daysTemp: [],
         cod: []

      }
   ]

   let cont = 0;
   while (semana[cont].id !== day) {
      ordenSemana[cont] = semana[cont];
      cont = cont + 1;
   }
   ordenSemana = semana.slice(day - 1, semana.length).concat(ordenSemana);

   for (let i = 0; i < datos.temp.length; i++) {
      ordenSemana[conDay].cod.push(datos.wCod[i]);
      ordenSemana[conDay].daysTemp.push(datos.temp[i]);
      if (ordenSemana[conDay].daysTemp.length == 24) {
         conDay++;
      }
   }
   return ordenSemana;

}
function getDailyForecast(datos) {
   getDayWeek(datos, todayWeek).forEach(el => {
      let max = Math.max(...el.daysTemp);
      let indexMax = el.daysTemp.indexOf(max);
      let min = Math.min(...el.daysTemp);
      templeteDaily.querySelector("#sigla-semanal").textContent = el.name.substring(0, 3);
      templeteDaily.querySelector('img').src = getIconImg(el.cod[indexMax]);
      templeteDaily.querySelector('.day-min').textContent = min + "º";
      templeteDaily.querySelector('.day-max').textContent = max + "º";
      let clone = d.importNode(templeteDaily, true);
      fragment.appendChild(clone);
   })
   d.querySelector('.div-daily').replaceChildren(fragment);
}



function getIconImg(valor) {
   let imgTemp = "";
   switch (true) {
      case valor == 0: imgTemp = 'assets/images/icon-sunny.webp';
         break;
      case valor == 1 || valor == 2: imgTemp = 'assets/images/icon-partly-cloudy.webp';
         break;
      case valor == 3: imgTemp = 'assets/images/icon-overcast.webp';
         break;
      case valor >= 45 && valor <= 50: imgTemp = 'assets/images/icon-fog.webp';
         break;
      case (valor >= 51 && valor <= 59): imgTemp = 'assets/images/icon-drizzle.webp';
         break;
      case ((valor >= 60 && valor <= 69) || valor >= 80 && valor <= 82): imgTemp = 'assets/images/icon-rain.webp';
         break;
      case (valor >= 70 && valor <= 89): imgTemp = 'assets/images/icon-snow.webp';
         break;
      case valor >= 90 && valor <= 99: imgTemp = 'assets/images/icon-storm.webp';
         break;
      default: imgTemp = "imagen no found!!"
   }
   return imgTemp;
}
function getSelectHourly(datos) {
   getDayWeek(datos, todayWeek).forEach(e => {
      templeteOptHourly.querySelector('option').value = e.id;
      templeteOptHourly.querySelector('option').textContent = e.name;
      let clone = d.importNode(templeteOptHourly, true);
      fragment.appendChild(clone);
   })
   hourlySelect.replaceChildren(fragment);
}
function createHourlyForecast(dato, value) {
   let codPosition = 0;
   getDayWeek(dato, todayWeek).forEach((el) => {
      if (value == el.id) {
         el.daysTemp.forEach(t => {
            let pmAm = (codPosition >= 13) ? " PM" : " AM";
            templeteHourly.querySelector('img').src = getIconImg(el.cod
            [codPosition]);
            templeteHourly.querySelector('#hour-hourly').textContent =
               codPosition + pmAm;
            templeteHourly.querySelector('#temp-hourly').textContent = t + "º";
            let clone = d.importNode(templeteHourly, true);
            fragment.appendChild(clone);
            codPosition++;
         })
         document.querySelector('.box-hourly').replaceChildren(fragment);
      }
   })

}

document.addEventListener("click", (e) => {

   if (e.target.matches("#units-but *")) {
      navImMe.classList.toggle("onDisplay");
   }

   if (!e.target.matches("#search-but")) {
      search.classList.remove("onDisplay");
      search.replaceChildren();
   }


   if (e.target.matches("#search-but")) {
      e.preventDefault();
      let valueSearch = searchInput.value;
      if (searchInput.value != "") {
         latLongProvincias().then(citys => {
            citys.forEach(e => {
               if (e.name.toLowerCase().includes(valueSearch.toLowerCase())) {
                  templeteCitys.querySelector("button").textContent = e.name;
                  templeteCitys.querySelector("button").id = e.name;
                  let clone = d.importNode(templeteCitys, true);
                  fragment.appendChild(clone);
               }
            })
            search.appendChild(fragment);
            search.classList.add("onDisplay");

         })
      }
   }
   if (e.target.matches(".butCitys")) {
      latLongProvincias().then(citys => {
         cityFind:
         for (let city of citys) {
            if (e.target.id == city.name) {
               getCityDatos({ lat: city.lat, long: city.long }).then(datos => {
                  setPainelFeelsLike(datos, city.name);
                  getDailyForecast(datos);
                  let firsOptToday = hourlySelect.querySelector('option').value;
                  createHourlyForecast(datos, firsOptToday)
                  hourlySelect.addEventListener('input', (e) => {
                     createHourlyForecast(datos, e.target.value);
                  })
               })
               break cityFind;
            }
         }
      })
   }

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
         const dato = await getCityDatos(cord);
         const name = await getNameCity(cord);
         setPainelFeelsLike(dato, name);
         getDailyForecast(dato);
         getSelectHourly(dato);
         let firsOptToday = hourlySelect.querySelector('option').value;
         createHourlyForecast(dato, firsOptToday);
         hourlySelect.addEventListener('input', (e) => {
            createHourlyForecast(dato, e.target.value);
         })
      } catch (err) {
         console.error(err);
      }

   }, (error) => {
      alert("Este Browser no aporta localiacion el App!! Error: " + error);
   });

})






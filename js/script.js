const d = document;
const unitsBut = d.getElementById('units-but');
const formSearch = d.getElementById('search');
const navImMe = d.getElementById('nav-imp-met');
const templeteCitys = d.getElementById('search-citys').content;
const fragment = d.createDocumentFragment();
const search = d.querySelector("#search-opt");
const searchInput = d.getElementById('search-input');
console.log(search)
let latitude, logitud;
let temperature;
let windSpeed;
let precipitation;










function setCitys(cityId,citys) {
   citys.forEach(el => {
      if(cityId == el.name){
         fetch(`https://api.open-meteo.com/v1/forecast?
              latitude=${el.lat}&longitude=${el.long}&current=precipitation,
               temperature_2m,relative_humidity_2m,wind_speed_10m&
               wind_speed_unit=mph&temperature_unit=fahrenheit&
               precipitation_unit=inch`).then(res => res.json()).then(json => {
               console.log(json)
          })
        }
   })
}
const city = [
   {
      name: 'Sevilla',
      lat:37.3828,
      long:-5.9732
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
       if(searchInput.value != ""){
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

   // setCitys(e.target, city);
   let info = setCitys(e.target.id, city);
   console.log(info)
})


// sea.addEventListener("keydown", (e) => {
   
   
   
   
   
   
   
   
   
   
   
   
   
      
// })




  
  
//






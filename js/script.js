const d = document;
const unitsBut = d.getElementById('units-but');
const formSearch = d.getElementById('search');
const navImMe = d.getElementById('nav-imp-met');
const templeteCitys = d.getElementById('search-citys');
const fragment = d.createDocumentFragment();
const search = d.getElementsByTagName("form");
console.log(search)
let latitude, logitud;
let temperature;
let windSpeed;
let precipitation;
const city = {
     "sevilla":{
        lat:37.3828,
        long:-5.9732
     },
     "cadiz":{
        lat:36.5267,
        long:36.5267
     },
     "malaga":{
        lat:36.7202,
        long:-4.4203
     },
     "madrid":{
        lat:40.4165,
        long:40.4165
     }
}
window.addEventListener("click",(e)=>{
     e.preventDefault();
    console.log()
    if(e.target.matches("#units-but *")){
        navImMe.classList.toggle("onDisplay");
    }
    if(e.target.matches("#search-but")){
       for(let e in city){
            
       }
    }
})
// fetch("https://api.open-meteo.com/v1/forecast?latitude=40&longitude=-4&hourly=temperature_2m,wind_speed_10m,temperature_80m,wind_direction_10m,relative_humidity_2m,apparent_temperature&timezone=Europe%2FBerlin&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch&bounding_box=-90,-180,90,180")
// .then(res => res.json()).then(res => {
//     temperature
// })






const d = document;
const unitsBut = d.getElementById('units-but');
const formSearch = d.getElementById('search');
const navImMe = d.getElementById('nav-imp-met');

let latitude, logitud;
let temperature;
let windSpeed;
let precipitation;


window.addEventListener("click",(e)=>{
    console.log()
    if(e.target.matches("#units-but *")){
        navImMe.classList.toggle("onDisplay");
    }
})
fetch("https://api.open-meteo.com/v1/forecast?latitude=40&longitude=-4&hourly=temperature_2m,wind_speed_10m,temperature_80m,wind_direction_10m,relative_humidity_2m,apparent_temperature&timezone=Europe%2FBerlin&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch&bounding_box=-90,-180,90,180")
.then(res => res.json()).then(res => {
    temperature
})






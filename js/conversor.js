export function unitsChange(navImMe,citys) {
    const kmh = document.getElementById('kmh');
    const mph = document.getElementById('mph');
    const millim = document.getElementById('millimeters');
    const inches = document.getElementById('inches');
    const cels = document.getElementById('cels');
    const fah = document.getElementById('fah');
    const measuresSwitch = document.getElementById('switch-measures');
    const iconCheck = document.createElement('img');
    let datos = JSON.parse(sessionStorage.getItem('citys'));
    let extraUrl = sessionStorage.getItem('extraUrl');; 
    
    function marckChange(el1, el2) {
        el1.querySelector('img').classList.toggle('off-check');
        el2.querySelector('img').classList.toggle('off-check');
    }
    navImMe.querySelectorAll('button').forEach(but => {
        but.addEventListener('click', (e) => {
            if (e.target.closest('#kmh')) {
                marckChange(kmh,mph);
                citys.windS = citys.windS.map(el => el * 0.621371)
                console.log(citys)
            }
            if (e.target.closest('#mph')) {
                  marckChange(kmh,mph);
            }
            if (e.target.closest('#millimeters')) {
                marckChange(millim, inches);
            }
            if (e.target.closest('#inches')) {
                marckChange(millim, inches);
            }
            if (e.target.closest('#cels')) {
                marckChange(cels,fah);
            }
            if (e.target.closest('#fah')) {
                marckChange(cels,fah);
                
            }
            if (e.target.closest('#switch-measures')) {
                let total = navImMe.querySelectorAll('img');
                total.forEach(el => el.classList.toggle('off-check'))
            }
        })
    })
    return citys;
}

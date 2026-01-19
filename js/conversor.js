export function unitsChange(citys, extrasObj) {
    const navImMe = document.getElementById('nav-imp-met');
    const kmh = document.getElementById('kmh');
    const mph = document.getElementById('mph');
    const millim = document.getElementById('millimeters');
    const inches = document.getElementById('inches');
    const cels = document.getElementById('cels');
    const fah = document.getElementById('fah');
    const measuresSwitch = document.getElementById('switch-measures');
    let listener = [];
    let proxyCity = new Proxy(citys, {
        set(target, props, value) {
            target[props] = value;
            listener.forEach(func => {
                func(target, extrasObj);
            })
            return true;
        }
    })
    function marckChange(elAdd, elDel) {
        if (elAdd.querySelector('img').classList.contains('off-check')) {
            elAdd.querySelector('img').classList.remove('off-check');
        }
        elDel.querySelector('img').classList.add('off-check');
    }

    let celsActivo = true;
    let FahActivo = true;
    let inchActivo = true;
    navImMe.querySelectorAll('button').forEach(but => {
        but.addEventListener('click', (e) => {
            if (e.target.closest('#kmh')) {
                marckChange(kmh, mph);

            }
            if (e.target.closest('#mph')) {
                marckChange(mph, kmh);
            }
            if (e.target.closest('#millimeters')) {
                marckChange(millim, inches);
            }
            if (e.target.closest('#inches')) {
                marckChange(inches, millim);
            }
            if (e.target.closest('#cels')) {
                marckChange(cels, fah);
            }
            if (e.target.closest('#fah')) {
                marckChange(fah, cels);

            }
            if (e.target.closest('#switch-measures')) {
                if (e.target.dataset.activo == 'false') {
                    e.target.dataset.activo = 'true';
                    navImMe.querySelectorAll('img').forEach(el => {
                        if (el.classList.contains('measuresUSA')) {
                            el.classList.add('off-check');
                        } else if(!el.classList.contains('measuresUSA')){
                            el.classList.remove('off-check');
                        }
                    })
                } else if(e.target.dataset.activo == 'true') {
                    e.target.dataset.activo = 'false';
                    navImMe.querySelectorAll('img').forEach(el => {
                        if (el.classList.contains('measuresUSA')) {
                            el.classList.remove('off-check');
                        } else if(!el.classList.contains('measuresUSA')) {
                            el.classList.add('off-check');
                        }
                    })
                }
            }
            
            if (!kmh.querySelector('img').classList.contains('off-check') && !FahActivo) {
                proxyCity.windS = citys.windS.map(el => el * 1.609 );
                FahActivo = true;
            }else if(!mph.querySelector('img').classList.contains('off-check') && FahActivo){
                proxyCity.windS = citys.windS.map(el => el / 1.609 );
                FahActivo = false;
            }
             
            if (!cels.querySelector('img').classList.contains('off-check') && !celsActivo) {
                proxyCity.temp = citys.temp.map(el => (el - 32) * 5/9);
                celsActivo = true;
            }else if(!fah.querySelector('img').classList.contains('off-check') && celsActivo){
                proxyCity.temp = citys.temp.map(el => el * 9/5 + 32 );
                celsActivo = false;
            }
             
            if (!millim.querySelector('img').classList.contains('off-check') && !inchActivo) {
                proxyCity.prec = citys.prec.map(el => Math.round(el * 25.4));
                inchActivo = true;
            }else if(!inches.querySelector('img').classList.contains('off-check') && inchActivo){
                proxyCity.prec = citys.prec.map(el => Math.round(el / 25.4));
                inchActivo = false;
            }
        })

    })

    return {
        state: proxyCity,
        subscribe(func) {
            listener.push(func)
        }
    };
}

export function unitsChange(citys) {
    const navImMe = document.getElementById('nav-imp-met');
    const kmh = document.getElementById('kmh');
    const mph = document.getElementById('mph');
    const millim = document.getElementById('millimeters');
    const inches = document.getElementById('inches');
    const cels = document.getElementById('cels');
    const fah = document.getElementById('fah');
    const measuresSwitch = document.getElementById('switch-measures');
    const iconCheck = document.createElement('img');
    function marckChange(elAdd, elDel) {
        if (elAdd.querySelector('img').classList.contains('off-check')) {
            elAdd.querySelector('img').classList.remove('off-check');
        }
        elDel.querySelector('img').classList.add('off-check');
    }
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
                        } else {
                            el.classList.remove('off-check');
                        }
                    })
                } else {
                    e.target.dataset.activo = 'false';
                    navImMe.querySelectorAll('img').forEach(el => {
                        if (el.classList.contains('measuresUSA')) {
                            el.classList.remove('off-check');
                        } else {
                            el.classList.add('off-check');
                        }

                    })
                }
            }
            // window.location.reload();

        })
    })
    // crear filtro de datos aqui
}

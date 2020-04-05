"use strict";

$('.card').each(function(e) {
    if ($(this).hasClass('card_size_s')) {
        $(this).css({'border-radius': '22px'})
    } else {
        $(this).css({'border-radius': '54px'})
    }
});


let curValue;
let curRotate;
let maxRotate = 0.42; // 150 градусов
let minRotate = -0.42; // -150 градусов

const MIN_VALUE = 26;
const MAX_VALUE = 35;
const INDICATOR_OFFSET = 265;

const rotateToValue = function(rotate) {
    return Math.floor((Math.abs(rotate * 360 * 1.73 + INDICATOR_OFFSET) / 53) + MIN_VALUE);
}


/**
 * @param {Number} rotate Количество оборотов от нейтриального положения.
 */
function setRotate(rotate) {
    if (rotate > maxRotate) {
        rotate = maxRotate;
    } else if (rotate < minRotate) {
        rotate = minRotate;
    }

    curRotate = rotate;
    curValue = rotateToValue(rotate);

    document.querySelector('.knob__value').innerHTML = '+' + curValue;
    document.querySelector('.knob__indicator').style.strokeDasharray = curRotate * 360 * 1.73 + INDICATOR_OFFSET + ' 629';
    document.querySelector('.knob__arrow').style.transform = 'rotate(' + (curRotate * 360) + 'deg)';
}

function getPosition(elem) {
    const rect = elem.getBoundingClientRect();

    return [
        rect.left + (rect.right - rect.left) / 2,
        rect.top + (rect.bottom - rect.top) / 2
    ];
}

function getMouseAngle(event, centerElem) {
    const pos = getPosition(centerElem);
    let cursor = [event.clientX, event.clientY];
    let rad;

    if (event.targetTouches && event.targetTouches[0]) {
        cursor = [event.targetTouches[0].clientX, event.targetTouches[0].clientY];
    }

    rad = Math.atan2(cursor[1] - pos[1], cursor[0] - pos[0]);
    rad += Math.PI / 2;

    return rad;
}

let knobDragged;
let prevAngleRad = null;
let prevRotate = null;

function startDragging(e) {
    e.preventDefault();
    e.stopPropagation();
    const rad = getMouseAngle(e, document.querySelector('.knob_center'));

    knobDragged = true;
    prevAngleRad = rad;
    prevRotate = curRotate;
}

function stopDragging(e) {
    knobDragged = false;
}

function dragRotate(e) {
    if (!knobDragged) {
        return;
    }

    const old = prevAngleRad;
    let rad = getMouseAngle(e, document.querySelector('.knob_center'));
    let delta = rad - old;

    prevAngleRad = rad;

    if (delta < 0) {
        delta += Math.PI * 2;
    }
    if (delta > Math.PI) {
        delta -= Math.PI * 2;
    }

    const deltaRotate = delta / Math.PI / 2;
    const rotate = prevRotate + deltaRotate;

    prevRotate = rotate;
    setRotate(rotate);
}

function setEvtListeners() {
    const elem = document.querySelector('.knob-container');

}

setEvtListeners();


const TEMPS = {
    'manual': -10,
    'cold': 0,
    'warm': 23,
    'hot': 30
}

document.addEventListener("DOMContentLoaded", function () {
    $('.card').each(function(e) {
        if ($(this).hasClass('card_size_s')) {
            $(this).css({'border-radius': '22px'})
        } else {
            $(this).css({'border-radius': '23px'})
        }
    });
    var waterContainer = document.querySelector('.card.card_size_s:last-child');

    waterContainer.innerHTML = 
                '<div class="card-heading">' +
                    '<div class="card-icon-wrap">' +
                        '<img class="card-icon" src="img/kettle.svg">' +
                    '</div>' +
                    '<h3 class="card-title">Вода вскипела</h3>' +
               ' </div>' +
                '<div class="card-specs">' +
                    '<p class="card-source">Чайник</p>' +
                    '<p class="card-time card-time_block">16:20, Сегодня</p>' +
                '</div>'

});


const selectButton = document.querySelector('.filter__select-button');
const selectButtonText = document.querySelector('.filter__select-button .button__text');
const selectOptions = document.querySelectorAll('.filter__select-item');
const popup = document.querySelector('.filter__select-popup');



let widths = '';
window.addEventListener('scroll', function() {
    widths += document.querySelectorAll('body')[0].offsetWidth;

});

selectOptions.forEach(o => {
    o.addEventListener('click', function(e) {
        document.querySelector('#' + e.target.dataset.group).checked = true;

        selectOptions.forEach(opt => opt.classList.toggle('filter__select-item_checked', false));
        e.target.classList.toggle('filter__select-item_checked', true);
        popup.classList.toggle('filter__select-popup_open', false);
        selectButtonText.innerText = e.target.innerText;
    })
});



var storage, initCriticalCam = function () {
    var u, m, p, v, h, y = new Array, g = document.querySelector(".critical-cam"), f = 0, S = 100, q = 100;
    g.style.backgroundPosition = "0px 0px", g.style.backgroundSize = "100%", g.style.filter = "brightness(100%)";
    var x = function (e, t) {
        return t < e ? e - t : t - e
    }, t = function (e) {
        for (var t = 0; t < y.length; t++) if (e.pointerId == y[t].pointerId) {
            y[t] = e;
            break
        }
        if (1 == y.length && (g.style.backgroundPosition = p + e.clientX - m + "px " + (v + e.clientY - u) + "px"), 2 == y.length) {
            var n = (r = y[0].clientX, i = y[0].clientY, c = y[1].clientX, a = y[1].clientY, l = x(r, c), s = x(i, a), d = Math.sqrt(Math.pow(l, 2) + Math.pow(s, 2)), d);
            f < n ? q += 1 : q -= 1, g.style.backgroundSize = q + "%", f = n, zoomText.textContent = q;
            var o = Math.atan2(y[1].clientY - y[0].clientY, y[1].clientX - y[0].clientX) * (180 / Math.PI);
            h < o ? S += 2 : S -= 2, g.style.filter = "brightness(" + S + "%)", h = o, brightText.textContent = S
        }
        var r, i, c, a, l, s, d
    }, e = function (e) {
        g.removeEventListener("pointermove", t), n(e)
    }, n = function (e) {
        for (var t = 0; t < y.length; t++) if (y[t].pointerId == e.pointerId) {
            y.splice(t, 1);
            break
        }
    };
    g.addEventListener("pointerdown", function (e) {
        y.push(e), m = e.clientX, u = e.clientY, p = parseInt(g.style.backgroundPositionX, 10), v = parseInt(g.style.backgroundPositionY, 10), 2 == y.length && (h = Math.atan2(y[1].clientY - y[0].clientY, y[1].clientX - y[0].clientX) * (180 / Math.PI)), g.addEventListener("pointermove", t)
    }), document.addEventListener("pointerup", e), g.addEventListener("onpointerup", e)
};

function status(e) {
    return 200 <= e.status && e.status < 300 ? Promise.resolve(e) : Promise.reject(new Error(e.statusText))
}

function json(e) {
    return e.json()
}

document.addEventListener("DOMContentLoaded", function () {
    const buttonsContainer = document.querySelector(".buttons-wrap");
    const fridgeInfoContainer = document.querySelector(".card_size_m:nth-child(8) .card-description");
    setTimeout(function() {
        const confirmPurchaseButton = document.querySelector(".buttons-wrap .button_yellow");
        const purchaseListContainer = document.createElement('div');
        const purchaseListTitle = document.createElement('p');
        const purchaseList = document.createElement('ol');
        const purchaseListItemOne = document.createElement('li');
        const purchaseListItemTwo = document.createElement('li');

        purchaseListContainer.setAttribute('class', 'purchase-list-wrap');
        purchaseListTitle.setAttribute('class', 'card-description card-description_big description_critical');
        purchaseListTitle.textContent = 'Список покупок:';
        purchaseList.setAttribute('class', 'purchase-list');
        purchaseListItemOne.setAttribute('class', 'purchase-list__item');
        purchaseListItemOne.textContent = 'Хлеб';
        purchaseListItemTwo.setAttribute('class', 'purchase-list__item');
        purchaseListItemTwo.textContent = 'Молоко';

        purchaseListContainer.appendChild(purchaseListTitle);
        purchaseListContainer.appendChild(purchaseList);
        purchaseList.appendChild(purchaseListItemOne);
        purchaseList.appendChild(purchaseListItemTwo);

        confirmPurchaseButton.onclick = () => {
            fridgeInfoContainer.replaceWith(purchaseListContainer)
            buttonsContainer.style.display = "none";
        }
    }, 500)
   

    document.getElementsByClassName("header-menu__switcher")[0].addEventListener("click", function () {
        document.getElementsByClassName("header-menu")[0].classList.toggle("header-menu_active")
    })
}, !1);

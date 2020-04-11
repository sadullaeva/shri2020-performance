"use strict";

function fetchEvents() {
    return fetch('https://raw.githubusercontent.com/sadullaeva/shri2020-performance/master/assets/events.json')
        .then(response => response.json())
        .catch(err => { console.log(err) })
}

function renderEvents(events = []) {
    return events.map(event => {
        const {
            type,
            title,
            source,
            time,
            description,
            icon,
            size,
            data
        } = event;
        let cardData = '';

        switch (icon) {
            case 'stats':
                cardData = `
                    <div class="card-data card-data_graph">
                        <img class="card-data_graph-img" src="img/data-graph.png" alt="График расходов">
                    </div>
                `;
                break;
            case 'thermal':
                cardData = `
                    <div class="card-data card-data_climat">
                        <div class="climat-block">
                            Температура: <em class="climat-block_data climat-block_data__temp">${data.temperature} C</em>
                        </div>
                        <div class="climat-block hum-block">
                            Влажность: <em class="climat-block_data climat-block_data__hum">${data.humidity}%</em>
                        </div>
                    </div>
                `;
                break;
            case 'music':
                cardData = `
                    <div class="card-data card-data_music">
                        <div class="song-area">
                            <div class="cover-wrap">
                                <img class="cover" src="${data.albumcover}" alt="High As Hope">
                            </div>
                            <div class="song-data">
                                <h4 class="song-title">${data.artist} - ${data.track.name}</h4>
                                <div class="song-timeline-wrap">
                                    <label for="song-range" style="display: none">Текущая композиция</label>
                                    <input id="song-range" type="range" class="song-range" name="song-range" min="0" max="100" value="" step="1">
                                    <div class="song-length">${data.track.length}</div>
                                </div>
                            </div>
                        </div>
                        <div class="player-controls">
                            <button class="player-control player-control_prev" aria-label="Предыдущая композиция">
                                <img src="img/Prev.svg" alt="Предыдущая композиция">
                            </button>
                            <button class="player-control player-control_next" aria-label="Следующая композиция">
                                <img src="img/Prev.svg" alt="Следующая композиция">
                            </button>
                            <label for="volume-range" style="display: none">Регулировка громкости</label>
                            <input id="volume-range" type="range" class="volume-range" name="volume-range" min="0" max="100" value="50" step="1">
                            <div class="song-volume">${data.volume}%</div>
                        </div>
                    </div>
                `;
                break;
            case 'fridge':
                cardData = `
                    <div class="buttons-wrap">
                        <button class="button button_yellow" type="button" aria-label="Да">Да</button><button class="button" aria-label="Нет">Нет</button>
                    </div>
                `;
                break;
            case 'cam':
                cardData = `
                    <div class="critical-cam" touch-action="none" style="background-position: 0 0; background-size: 100%; filter: brightness(100%);">
                    </div>
                `;
                break;
            default:
                break;
        }

        return `
            <div class="card card_size_${size} ${type === 'critical' ? 'critical' : ''}">
                <div class="card-heading ${type === 'critical' ? 'heading-critical' : ''}">
                    <div class="card-icon-wrap" style="${icon === 'cam' ? 'overflow: hidden;' : ''}">
                        <img class="card-icon" src="img/${icon}.svg" alt="${source}">
                    </div>
                    <h3 class="card-title">${title}</h3>
                </div>
                <div class="card-specs ${type === 'critical' ? 'specs-critical' : ''}">
                    <p class="card-source">${source}</p>
                    <p class="card-time ${size === 's' ? 'card-time_block' : ''}">${time}</p>
                </div>
                ${description ? `<p class="card-description card-description_big ${(type === 'critical' || (size === 'm' && icon !== 'thermal') || (icon === 'battery')) ? 'description_critical' : ''}">${description}</p>` : ''}
                ${cardData}
            </div>
        `;
    }).join('\n');
}

function onAddToPurchase() {
    const confirmPurchaseButton = document.querySelector(".buttons-wrap .button_yellow");

    confirmPurchaseButton.onclick = () => {
        const buttonsContainer = document.querySelector(".buttons-wrap");
        const fridgeInfoContainer = document.querySelector(".card_size_m:nth-child(8) .card-description");
        const purchaseListContainer = document.createElement('div');
        purchaseListContainer.innerHTML =
            '<div class="purchase-list-wrap">' +
            '<p class="card-description card-description_big description_critical">Список покупок:</p>' +
            '<ol class="purchase-list">' +
            '<li class="purchase-list__item">Хлеб</li>' +
            '<li class="purchase-list__item">Молоко</li>' +
            '</ol>' +
            '</div>';
        fridgeInfoContainer.replaceWith(purchaseListContainer);
        buttonsContainer.style.display = "none";
    };
}

document.addEventListener("DOMContentLoaded", function () {
    fetchEvents()
        .then(response => {
            const events = renderEvents(response.events);
            const content = document.querySelector('.content-block.content');
            content.innerHTML = events;

            onAddToPurchase();
        });


    document.getElementsByClassName("header-menu__switcher")[0].addEventListener("click", function () {
        document.getElementsByClassName("header-menu")[0].classList.toggle("header-menu_active")
    })
});

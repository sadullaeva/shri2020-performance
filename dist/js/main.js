"use strict";function fetchEvents(){return fetch("https://raw.githubusercontent.com/sadullaeva/shri2020-performance/master/assets/events.json").then(a=>a.json()).catch(a=>{console.log(a)})}function renderEvents(a=[]){return a.map(a=>{const{type:e,title:n,source:t,time:c,description:s,icon:i,size:l,data:r}=a;let o="";switch(i){case"stats":o='\n                    <div class="card-data card-data_graph">\n                        <img class="card-data_graph-img" src="img/data-graph.png" alt="График расходов">\n                    </div>\n                ';break;case"thermal":o=`\n                    <div class="card-data card-data_climat">\n                        <div class="climat-block">\n                            Температура: <em class="climat-block_data climat-block_data__temp">${r.temperature} C</em>\n                        </div>\n                        <div class="climat-block hum-block">\n                            Влажность: <em class="climat-block_data climat-block_data__hum">${r.humidity}%</em>\n                        </div>\n                    </div>\n                `;break;case"music":o=`\n                    <div class="card-data card-data_music">\n                        <div class="song-area">\n                            <div class="cover-wrap">\n                                <img class="cover" src="${r.albumcover}" alt="High As Hope">\n                            </div>\n                            <div class="song-data">\n                                <h4 class="song-title">${r.artist} - ${r.track.name}</h4>\n                                <div class="song-timeline-wrap">\n                                    <label for="song-range" style="display: none">Текущая композиция</label>\n                                    <input id="song-range" type="range" class="song-range" name="song-range" min="0" max="100" value="" step="1">\n                                    <div class="song-length">${r.track.length}</div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="player-controls">\n                            <button class="player-control player-control_prev" aria-label="Предыдущая композиция">\n                                <img src="img/Prev.svg" alt="Предыдущая композиция">\n                            </button>\n                            <button class="player-control player-control_next" aria-label="Следующая композиция">\n                                <img src="img/Prev.svg" alt="Следующая композиция">\n                            </button>\n                            <label for="volume-range" style="display: none">Регулировка громкости</label>\n                            <input id="volume-range" type="range" class="volume-range" name="volume-range" min="0" max="100" value="50" step="1">\n                            <div class="song-volume">${r.volume}%</div>\n                        </div>\n                    </div>\n                `;break;case"fridge":o='\n                    <div class="buttons-wrap">\n                        <button class="button button_yellow" type="button" aria-label="Да">Да</button><button class="button" aria-label="Нет">Нет</button>\n                    </div>\n                ';break;case"cam":o='\n                    <div class="critical-cam" touch-action="none" style="background-position: 0 0; background-size: 100%; filter: brightness(100%);">\n                    </div>\n                '}return`\n            <div class="card card_size_${l} ${"critical"===e?"critical":""}">\n                <div class="card-heading ${"critical"===e?"heading-critical":""}">\n                    <div class="card-icon-wrap" style="${"cam"===i?"overflow: hidden;":""}">\n                        <img class="card-icon" src="img/${i}.svg" alt="${t}">\n                    </div>\n                    <h3 class="card-title">${n}</h3>\n                </div>\n                <div class="card-specs ${"critical"===e?"specs-critical":""}">\n                    <p class="card-source">${t}</p>\n                    <p class="card-time ${"s"===l?"card-time_block":""}">${c}</p>\n                </div>\n                ${s?`<p class="card-description card-description_big ${"critical"===e||"m"===l&&"thermal"!==i||"battery"===i?"description_critical":""}">${s}</p>`:""}\n                ${o}\n            </div>\n        `}).join("\n")}function onAddToPurchase(){document.querySelector(".buttons-wrap .button_yellow").onclick=(()=>{const a=document.querySelector(".buttons-wrap"),e=document.querySelector(".card_size_m:nth-child(8) .card-description"),n=document.createElement("div");n.innerHTML='<div class="purchase-list-wrap"><p class="card-description card-description_big description_critical">Список покупок:</p><ol class="purchase-list"><li class="purchase-list__item">Хлеб</li><li class="purchase-list__item">Молоко</li></ol></div>',e.replaceWith(n),a.style.display="none"})}document.addEventListener("DOMContentLoaded",function(){fetchEvents().then(a=>{const e=renderEvents(a.events);document.querySelector(".content-block.content").innerHTML=e,onAddToPurchase()}),document.getElementsByClassName("header-menu__switcher")[0].addEventListener("click",function(){document.getElementsByClassName("header-menu")[0].classList.toggle("header-menu_active")})});
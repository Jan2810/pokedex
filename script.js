const BASE_URL = "https://pokeapi.co/api/v2/"

let pokemonData = [];
let pokemonEvolutions = [];
let index = 0;


function init() {
    fetchPokemonData();
    setTimeout(closeIntro, 2700);
}

function closeIntro() {
    document.getElementById('intro').classList.add('d-none');
    enableScrollbarFromBody();
}

async function fetchPokemonData() {
    disableLoadButton();
    for (let i = index; i < index + 30; i++) {
        let response = await fetch(BASE_URL + `pokemon/${i + 1}`);
        let responseAsJson = await response.json();
        pokemonData.push(responseAsJson);
    }
    console.log(pokemonData)
    showPokemon();
    index += 30;
}

async function fetchPokemonEvolutions(id) {
    let response = await fetch(BASE_URL + `evolution-chain/${id}`);
    let responseAsJson = await response.json();
    console.log(responseAsJson);
    return responseAsJson;
}

function showPokemon() {
    let pokemonSection = document.getElementById('pokemon-section');
    pokemonSection.innerHTML = '';

    for (let i = 0; i < pokemonData.length; i++) {
        let name = pokemonData[i].name;
        let modName = name[0].toUpperCase() + name.slice(1);
        let type = pokemonData[i].types;
        if (type.length > 1) {
            pokemonSection.innerHTML += `
        <div onclick="showSinglePokemon(${i})" class="bg-${type[0].type.name}" id="pokemon-box">
            <div class="row-sb">
                <h3>${modName}</h3>
                <div>#${i + 1}</div>
            </div>
            <img id="pokemon-box-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png">
            <div class="row-sa">
                <div class="type-field type-field-${type[0].type.name}">${type[0].type.name}</div>
                <div class="type-field type-field-${type[1].type.name}">${type[1].type.name}</div>
            </div>
        </div>`
        } else {
            pokemonSection.innerHTML += `
            <div onclick="showSinglePokemon(${i})" class="bg-${type[0].type.name}" id="pokemon-box">
                <div class="row-sb">
                    <h3>${modName}</h3>
                    <div>#${i + 1}</div>
                </div>
                <img id="pokemon-box-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png">
                <div class="type-field type-field-${type[0].type.name}">${type[0].type.name}</div>
            </div>`
        };
    };
    enableLoadButton();
}

function showSinglePokemon(i) {
    document.getElementById('single-pokemon-bg').classList.remove('d-none');
    disableScrollbarFromBody();
    let name = pokemonData[i].name;
    let modName = name[0].toUpperCase() + name.slice(1);
    let type = pokemonData[i].types;
    let stats = pokemonData[i].stats;
    let singlePokemonBG = document.getElementById('single-pokemon-bg')
        singlePokemonBG.innerHTML = `
        <img id="button-left "class="arrow-buttons" onclick="lastPokemon(${i}); event.stopPropagation();" src="./assets/icons/arrow-left-icon.png" alt="last pokemon">
        <div id="single-pokemon-box" class="bg-${type[0].type.name} onclick="event.stopPropagation();">
            <div class="single-pokemon-box-top" onclick="event.stopPropagation();">
                <div class="row-sb-width100">
                    <h2>${modName}</h2>
                    <h2>#${i + 1}</h2>
                </div>
                    <div class="single-pokemon-img">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png" alt="">
                    </div>
                </div>
                <div class="single-pokemon-box-bottom" onclick="event.stopPropagation();">

                <div class="stats-header">
                    <img onclick="showStats(${i})"src="./assets/icons/statbar.png" alt="stats">
                    <img onclick="fetchPokemonEvolutions(${i})" src="./assets/icons/evolution-egg.png" alt="evolutions">
                    <img onclick="showInfos(${i})" src="./assets/icons/info-drawn-grey.png" alt="info">
                </div>

                <div id="stats-content">
                    <canvas id="statsChart"></canvas>
                </div>

            </div>
        </div>
        <img id="" class="arrow-buttons" onclick="nextPokemon(${i}); event.stopPropagation();" src="./assets/icons/arrow-right-icon.png" alt="next pokemon">
    `;
    createStatsChart(stats);
}

function createStatsChart(stats) {
    const ctx = document.getElementById('statsChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: stats.map(stat => stat.stat.name),
            datasets: [{
                label: 'Base Stats',
                data: stats.map(stat => stat.base_stat),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
        }
    });
}

function showStats(id) {
    let statsContent = document.getElementById('stats-content');
    let stats = pokemonData[id].stats;
    statsContent.innerHTML = `<canvas id="statsChart"></canvas>`;
    createStatsChart(stats);
}

function showInfos(id) {
    let info = pokemonData[id];
    let statsContent = document.getElementById('stats-content');
    if (info.abilities.length < 2) {
        statsContent.innerHTML = `
        <table class="stats-table">
        <tr>
            <th>Attribute</th>
            <th>Value</th>
        </tr>
        <tr>
            <td>Height</td>
            <td>${info.height} inch</td>
        </tr>
        <tr>
            <td>Weight</td>
            <td>${info.weight} pound</td>
        </tr>
        <tr>
            <td>Base Experience</td>
            <td>${info.base_experience}</td>
        </tr>
        <tr>
            <td>Abilities</td>
            <td id="abilities">${info.abilities[0].ability.name}</td>
        </tr>
        <tr>
            <td>Moves</td>
            <td>${info.moves[0].move.name}, ${info.moves[1].move.name}</td>
        </tr>
        <tr>
            <td>Type</td>
            <td>${info.types[0].type.name}</td>
        </tr>
    </table> 
    `
    } else {
    statsContent.innerHTML = `
        <table class="stats-table">
        <tr>
            <th>Attribute</th>
            <th>Value</th>
        </tr>
        <tr>
            <td>Height</td>
            <td>${info.height} inch</td>
        </tr>
        <tr>
            <td>Weight</td>
            <td>${info.weight} pound</td>
        </tr>
        <tr>
            <td>Base Experience</td>
            <td>${info.base_experience}</td>
        </tr>
        <tr>
            <td>Abilities</td>
            <td id="abilities">${info.abilities[0].ability.name}, ${info.abilities[1].ability.name}</td>
        </tr>
        <tr>
            <td>Moves</td>
            <td>${info.moves[0].move.name}, ${info.moves[1].move.name}</td>
        </tr>
        <tr>
            <td>Type</td>
            <td>${info.types[0].type.name}</td>
        </tr>
    </table> 
    `
    }
}

function lastPokemon(id) {
    if (id > 0) {
        showSinglePokemon(id - 1);
    }
}

function nextPokemon(id) {
    if (id < pokemonData.length -1) {
        showSinglePokemon(id + 1);
    } else {
        fetchPokemonData();
    }
}

function closeSinglePokemon() {
    enableScrollbarFromBody();
    document.getElementById('single-pokemon-bg').classList.add('d-none');
}

function disableLoadButton() {
    document.getElementById('loading-button').classList.add('d-none');
    document.getElementById('loading-gif').classList.remove('d-none');
}

function enableLoadButton() {
    document.getElementById('loading-gif').classList.add('d-none');
    document.getElementById('loading-button').classList.remove('d-none');
}

function disableScrollbarFromBody() {
    document.getElementById('body').classList.add('no-scroll');
}

function enableScrollbarFromBody() {
    document.getElementById('body').classList.remove('no-scroll');
}

function startFilterPokemon() {
    if (document.getElementById('search').value.length >= 3) {
        filterPokemon();
    }
}

function filterPokemon() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    console.log(search);
}
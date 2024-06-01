let pokemonData = [];
let index = 0;

const BASE_URL = "https://pokeapi.co/api/v2/"


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

function showPokemon() {
    let pokemonSection = document.getElementById('pokemon-section');
    pokemonSection.innerHTML = '';

    for (let i = 0; i < pokemonData.length; i++) {
        let name = pokemonData[i].name;
        let type = pokemonData[i].types;
        pokemonSection.innerHTML += `
            <div onclick="showSinglePokemon(${i})" class="bg-${type[0].type.name}" id="pokemon-box">
                <div class="row-sb">
                    <h3>${name}</h3>
                    <div>#${i + 1}</div>
                </div>
                <img id="pokemon-box-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png">
                <div class="type-field-${type[0].type.name}">${type[0].type.name}</div>
            </div>
        `
    }
    enableLoadButton();
}

function showSinglePokemon(i) {
    document.getElementById('single-pokemon-bg').classList.remove('d-none');
    disableScrollbarFromBody();
    let name = pokemonData[i].name;
    let type = pokemonData[i].types;
    let stats = pokemonData[i].stats;
    let singlePokemonBG = document.getElementById('single-pokemon-bg')
    singlePokemonBG.innerHTML = `
        <img id="button-left "class="arrow-buttons" onclick="lastPokemon(${i}); event.stopPropagation();" src="./assets/icons/arrow-left-icon.png" alt="last pokemon">
        <div id="single-pokemon-box" class="bg-${type[0].type.name} onclick="event.stopPropagation();">
            <div class="single-pokemon-box-top" onclick="event.stopPropagation();">
                <div class="row-sb-width100">
                    <h2>#${name}</h2>
                    <h2>#${i+1}</h2>
                </div>
                <div class="single-pokemon-type-field-${type[0].type.name}">${type[0].type.name}</div>
                    <div class="single-pokemon-img">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i+1}.png" alt="">
                    </div>
                </div>
                <div class="single-pokemon-box-bottom" onclick="event.stopPropagation();">

                <div class="stats-header">
                    <img src="./assets/icons/statbar.png" alt="stats">
                    <img src="./assets/icons/evolution-egg.png" alt="evolutions">
                    <img src="./assets/icons/info-drawn-grey.png" alt="info">
                </div>

                <div id="stats-content">
                    <canvas id="statsChart"></canvas>
                </div>

            </div>
        </div>
        <img class="arrow-buttons" onclick="nextPokemon(${i}); event.stopPropagation();" src="./assets/icons/arrow-right-icon.png" alt="next pokemon">
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
            }
        }
    });
}

function lastPokemon(id) {
    if (id > 0) {
        showSinglePokemon(id - 1);
    } else {
        showSinglePokemon(id);
    }
}

function nextPokemon(id) {
    if (id < pokemonData.length) {
        showSinglePokemon(id + 1);
    } else {
        showSinglePokemon(id);
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
    if (document.getElementById('search').value.length >= 2) {
        filterPokemon();
    }
}

function filterPokemon() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    console.log(search);
    showPokemon();

    let pokemonSection = document.getElementById('pokemon-section');
    pokemonSection.innerHTML = '';

    for (let i = 0; i < pokemonData.length; i++) {
        let name = pokemonData[i].name;
        let type = pokemonData[i].types[0].type.name;
        if (name.toLowerCase().includes(search)) {
            pokemonSection.innerHTML += `
            <div id="pokemon-box">
                <h3>${name}</h3>
                <div>#${i + 1}</div>
                <img id="pokemon-box-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png"
                <div>${type}</div>
            </div>
        `
        }
    }
}
const BASE_URL = "https://pokeapi.co/api/v2/"

let pokemonData = [];
let pokemonEvolutions = [];
let offset = 0;



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
    for (let i = offset; i < offset + 30; i++) {
        let response = await fetch(BASE_URL + `pokemon/${i + 1}`);
        let responseAsJson = await response.json();
        pokemonData.push(responseAsJson);
    }
    showPokemon();
    offset += 30;
}


function showPokemon() {
    let pokemonSection = document.getElementById('pokemon-section');
    pokemonSection.innerHTML = '';

    for (let i = 0; i < pokemonData.length; i++) {
        pokemonSection.innerHTML += createShowPokemonHTML(i);
    }
    enableLoadButton();
}


function showFilteredPokemon(pokemon) {
    let pokemonSection = document.getElementById('pokemon-section');
    pokemonSection.innerHTML = '';

    for (let i = 0; i < pokemon.length; i++) {
        pokemonSection.innerHTML += createFilteredPokemonHTML(pokemon, i);
    };
    enableLoadButton();
}


function showSinglePokemon(i) {
    document.getElementById('single-pokemon-bg').classList.remove('d-none');
    disableScrollbarFromBody();

    let stats = pokemonData[i].stats;
    let singlePokemonBG = document.getElementById('single-pokemon-bg')
    singlePokemonBG.innerHTML = createSinglePokemonHTML(i);
    createStatsChart(stats);
    greyscaleArrow(i +=1);
}


function showStats(id) {
    let statsContent = document.getElementById('stats-content');
    let stats = pokemonData[id].stats;
    statsContent.innerHTML = `<canvas id="statsChart"></canvas>`;
    createStatsChart(stats);
}


function showInfos(id) {
    let statsContent = document.getElementById('stats-content');
    statsContent.innerHTML = createShowInfoHTML(id);
}


function playSound(soundUrl) {
    let audio = new Audio(soundUrl);
    audio.volume = 0.5;
    audio.play();
}


function lastPokemon(id) {
    if (id > 0) {
        showSinglePokemon(id - 1);
    }
}


function nextPokemon(id) {
    if (id < pokemonData.length - 1) {
        showSinglePokemon(id + 1);
    } else {
        fetchPokemonData();
    }
}


function startFilterPokemon() {
    if (document.getElementById('search').value.length >= 3) {
        filterPokemon();
    } else {
        showPokemon();
    }
}


function filterPokemon() {
    let search = document.getElementById('search').value.toLowerCase();
    let filteredPokemon = pokemonData.filter(pokemon => pokemon.name.toLowerCase().includes(search));
    showFilteredPokemon(filteredPokemon);
}
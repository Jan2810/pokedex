const BASE_URL = "https://pokeapi.co/api/v2/"

let pokemonData = [];
let pokemonEvolutions = [];
let offset = 0;


/**
 * This function triggers the functions needed to load the Homepage
 */
function init() {
    fetchPokemonData();
    setTimeout(closeIntro, 2700);
}


/**
 * This function closes the intro and enables the scrollbar
 */
function closeIntro() {
    document.getElementById('intro').classList.add('d-none');
    enableScrollbarFromBody();
}


/**
 * This function disables the load-button, then fetches the data for the first 30 Pokemon from the API, triggers the next function and encreases the offset by 30
 */
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


/**
 * showPokemon() is renders the the data into the HTML-document, then enables the load-button again
 */
function showPokemon() {
    let pokemonSection = document.getElementById('pokemon-section');
    pokemonSection.innerHTML = '';

    for (let i = 0; i < pokemonData.length; i++) {
        pokemonSection.innerHTML += createShowPokemonHTML(i);
    }
    enableLoadButton();
}


/**
 * showFilteredPokemon() shows the pokemon filtered by the user and enables the load-button 
 * 
 * @param {array} pokemon - This is the name of the pokemon
 */
function showFilteredPokemon(pokemon) {
    let pokemonSection = document.getElementById('pokemon-section');
    pokemonSection.innerHTML = '';

    for (let i = 0; i < pokemon.length; i++) {
        pokemonSection.innerHTML += createFilteredPokemonHTML(pokemon, i);
    };
    enableLoadButton();
}


/**
 * showSinglePokemon() shows the single Pokemon which clicked on by the user
 * 
 * @param {number} i - this is the id of the pokemon which u want to open in single-view
 */
function showSinglePokemon(i) {
    document.getElementById('single-pokemon-bg').classList.remove('d-none');
    disableScrollbarFromBody();

    let stats = pokemonData[i].stats;
    let singlePokemonBG = document.getElementById('single-pokemon-bg')
    singlePokemonBG.innerHTML = createSinglePokemonHTML(i);
    createStatsChart(stats);
    greyscaleArrow(i +=1);
}


/**
 * showStats() shows the stats in the single-view
 * 
 * @param {number} id - this is the id of the pokemon whose stats you want to show
 */
function showStats(id) {
    let statsContent = document.getElementById('stats-content');
    let stats = pokemonData[id].stats;
    statsContent.innerHTML = `<canvas id="statsChart"></canvas>`;
    createStatsChart(stats);
}


/**
 * showInfos() shows the infos in the single-view
 * 
 * @param {number} id - this is the id of the pokemon whose infos you want to show
 */
function showInfos(id) {
    let statsContent = document.getElementById('stats-content');
    statsContent.innerHTML = createShowInfoHTML(id);
}


/**
 * playSound() plays the sound of a pokemon
 * 
 * @param {URL} soundUrl - this is the URL from the API tp play the sound
 */
function playSound(soundUrl) {
    let audio = new Audio(soundUrl);
    audio.volume = 0.5;
    audio.play();
}


/**
 * lastPokemon() shows the previous pokemon
 * 
 * @param {number} id - this is the id of the current pokemon
 */
function lastPokemon(id) {
    if (id > 0) {
        showSinglePokemon(id - 1);
    }
}


/**
 * nextPokemon() shows the following pokemon
 * 
 * @param {number} id - this is the id of the current pokemon
 */
function nextPokemon(id) {
    if (id < pokemonData.length - 1) {
        showSinglePokemon(id + 1);
    } else {
        fetchPokemonData();
    }
}


/**
 * startFilterPokemon() ensures that the filter function is only triggered as soon as there are at least 3 letters in the search-field
 */
function startFilterPokemon() {
    if (document.getElementById('search').value.length >= 3) {
        filterPokemon();
    } else {
        showPokemon();
    }
}


/**
 * filterPokemon() filters the pokemon by the value of the search-field
 */
function filterPokemon() {
    let search = document.getElementById('search').value.toLowerCase();
    let filteredPokemon = pokemonData.filter(pokemon => pokemon.name.toLowerCase().includes(search));
    showFilteredPokemon(filteredPokemon);
}
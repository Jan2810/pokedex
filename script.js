let pokemonNames = [];
let pokemonInfos = [];

const BASE_URL = "https://pokeapi.co/api/v2/"


function init(){
    fetchPokemonNames();
}

async function fetchPokemonNames() {
    let response = await fetch(BASE_URL + `pokemon?limit=10&offset=0`);
    let responseAsJson = await response.json()
    pokemonNames = responseAsJson;
    console.log(pokemonNames);
    showPokemon();
}

function showPokemon() {
    let pokemonSection = document.getElementById('pokemon-section');
    pokemonSection.innerHTML = '';

    for (let i = 0; i < pokemonNames.results.length; i++) {
        let name = pokemonNames.results[i].name;
        let element = '';
        pokemonSection.innerHTML += `
            <div id="pokemon-box">
                <h3>${name}</h3>
                <div>#${i + 1}</div>
                <img id="pokemon-box-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png"
                <div>element</div>
            </div>
        `
    }
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

    for (let i = 0; i < pokemon.results.length; i++) {
        let name = pokemon.results[i].name;
        if (name.toLowerCase().includes(search)) {
            pokemonSection.innerHTML += `
            <div id="pokemon-box">
                <h3>${name}</h3>
                <div>#${i + 1}</div>
                <img id="pokemon-box-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png"
                <div>element</div>
            </div>
        `
        }
    }
}
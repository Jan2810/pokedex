let pokemonData = [];
let index = 0;

const BASE_URL = "https://pokeapi.co/api/v2/"


function init() {
    fetchPokemonData();
}

async function fetchPokemonData() {
    for (let i = index; i < index +30; i++) {
        let response = await fetch(BASE_URL + `pokemon/${i+1}`);
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
        let type = pokemonData[i].types[0].type.name;
        pokemonSection.innerHTML += `
            <div class="bg-${type}" id="pokemon-box">
                <div class="row-sb">
                    <h3>${name}</h3>
                    <div>#${i + 1}</div>
                </div>
                <img id="pokemon-box-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png">
                <div class="type-field-${type}">${type}</div>
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
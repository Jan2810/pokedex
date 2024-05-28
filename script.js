let pokemon = [

]

const BASE_URL = "https://pokeapi.co/api/v2/"

async function fetchPokemon() {
    let response = await fetch(BASE_URL + "pokemon?limit=50&offset=0");
    let responseAsJson = await response.json()
    pokemon = responseAsJson;
    console.log(pokemon);
    showPokemon();
}

function showPokemon() {
    let pokemonSection = document.getElementById('pokemon-section');
    pokemonSection.innerHTML = '';

    for (let i = 0; i < pokemon.results.length; i++) {
        let name = pokemon.results[i].name;
        pokemonSection.innerHTML += `
            <div id="pokemon-box">
                <h3>${name}</h3>
                <img id="pokemon-box-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i+1}.png"
                <div>element</div>
            </div>
        `
    }
}

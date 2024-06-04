function createShowPokemonHTML(i) {
    let name = pokemonData[i].name;
    let modName = name[0].toUpperCase() + name.slice(1);
    let type = pokemonData[i].types;

    if (type.length > 1){
        return`
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
        return`
            <div onclick="showSinglePokemon(${i})" class="bg-${type[0].type.name}" id="pokemon-box">
                <div class="row-sb">
                    <h3>${modName}</h3>
                    <div>#${i + 1}</div>
                </div>
                <img id="pokemon-box-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png">
                <div class="type-field type-field-${type[0].type.name}">${type[0].type.name}</div>
            </div>`
    }
}


function createFilteredPokemonHTML(pokemon,i) {
    let name = pokemon[i].name;
    let modName = name[0].toUpperCase() + name.slice(1);
    let type = pokemon[i].types;
    let id = pokemon[i].id;

    if (type.length > 1) {
        return`
            <div onclick="showSinglePokemon(${id})" class="bg-${type[0].type.name}" id="pokemon-box">
                <div class="row-sb">
                    <h3>${modName}</h3>
                    <div>#${id}</div>
                </div>
                <img id="pokemon-box-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png">
                <div class="row-sa">
                    <div class="type-field type-field-${type[0].type.name}">${type[0].type.name}</div>
                    <div class="type-field type-field-${type[1].type.name}">${type[1].type.name}</div>
                </div>
            </div>`
    } else {
        return`
            <div onclick="showSinglePokemon(${id})" class="bg-${type[0].type.name}" id="pokemon-box">
                <div class="row-sb">
                    <h3>${modName}</h3>
                    <div>#${id}</div>
                </div>
                <img id="pokemon-box-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png">
                <div class="type-field type-field-${type[0].type.name}">${type[0].type.name}</div>
            </div>`
    };
}


function createSinglePokemonHTML(i) {
    let name = pokemonData[i].name;
    let modName = name[0].toUpperCase() + name.slice(1);
    let type = pokemonData[i].types;
    return`
        <img id="arrow-left" class="arrow-buttons" onclick="lastPokemon(${i}); greyscaleArrow(${i}); event.stopPropagation();" src="./assets/icons/arrow-left-icon.png" alt="last pokemon">
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
                    <img onclick="showInfos(${i})" src="./assets/icons/info-drawn-grey.png" alt="info">
                    <img onclick="playSound('https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${i+1}.ogg')" src="./assets/icons/sound.png" alt="sound">
                </div>

                <div id="stats-content">
                    <canvas id="statsChart"></canvas>
                </div>

            </div>
        </div>
        <img id="arrow-right" class="arrow-buttons" onclick="nextPokemon(${i}); event.stopPropagation();" src="./assets/icons/arrow-right-icon.png" alt="next pokemon">
        <div class="responsive-arrows">
            <img id="arrow-left-responsive" class="arrow-buttons" onclick="lastPokemon(${i}); greyscaleArrow(${i}); event.stopPropagation();" src="./assets/icons/arrow-left-icon.png" alt="last pokemon">
            <img class="arrow-buttons" onclick="closeSinglePokemon()" src="./assets/icons/close.png" alt="close">
            <img id="arrow-right-responsive" class="arrow-buttons" onclick="nextPokemon(${i}); event.stopPropagation();" src="./assets/icons/arrow-right-icon.png" alt="next pokemon">
        </div>
    `;
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


function createShowInfoHTML(id) {
    let info = pokemonData[id];
    if (info.abilities.length < 2) {
        return`
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
        return`
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


function greyscaleArrow(id) {
    if (id == 1) {
        document.getElementById('arrow-left').classList.add('greyscale');
        document.getElementById('arrow-left-responsive').classList.add('greyscale');
    }
}
function getTemplatePokemonOnArray(id, name) {
    let pokemonData = {
        'id': id,
        'name': loadPokemonName(),
        'flavor': loadPokemonFlavor(),
        'img': currentPokemonDataOverview['sprites']['other']['official-artwork']['front_default'],
        'types': loadPokemonTypes(),
        'color': currentPokemonDataSpecies['color']['name'],
        'species': loadPokemonSpecies(),
        'height': currentPokemonDataOverview['height'],
        'weight': currentPokemonDataOverview['weight'],
        'abilities': loadPokemonAbilities(),
        'genderRate': currentPokemonDataSpecies['gender_rate'],
        'eggGroups': loadPokemonEggGroups(),
        'baseStats': loadPokemonBaseStats(),
        'moves': loadPokemonMoves(),

    };
    return pokemonData;
}

function getTemplatePokedex(name, i, id, img, types, color) {
    return `<div onclick="openCard(${i}); return false" class="poke-card mini-card ${color}">
                <img src="./img/pokeball.png" class="card-bg">            
                <div class="card-header">           
                    <h4>${name}</h4>
                    <p>${id}</p>
                </div>
                <div class="container-items fd-column">${types}</div>
                <img class="pokemon-img" src="${img}">
            </div>`;
}

function getTemplateUpperCard(name, id, img, types, color) {
    return `<div class="upperCard ${color}">
                <img onclick="closeCard(); return false;" class="dialog-icon arrow-back" src="./img/closed.png">
                <img onclick="nextPokemon(); return false;" id="btn-nextPoke" class="dialog-icon arrow-next" src="./img/forward.png">
                <img onclick="previousPokemon(); return false;" id="btn-prevPoke" class="dialog-icon arrow-previous" src="./img/back.png">
                <img src="./img/pokeball.png" class="card-bg">            
                <div class="card-header">           
                    <h1>${name}</h1>
                    <p>${id}</p>
                </div>
                <div class="container-items fd-column">${types}</div>        
                <img class="pokemon-img big-img" src="${img}">
            </div>`;
}

function getTemplateLowerCard() {
    return `<div class="lowerCard">
                <div class="description-categories">
                    <a onclick="renderCardAbout(); return false" class="description-category" id="card-link-0" href="#">Über</a>
                    <a onclick="renderCardBaseStats(); return false" class="description-category inactive" id="card-link-1" href="#">Werte</a>
                    <a onclick="renderCardMoves(); return false" class="description-category inactive" id="card-link-3" href="#">Fähigkeiten</a>
                </div>
                <div id="description-content">
                </div>
            </div>`;
}

function getTemplateAbout() {
    return `<div class="container-table grey" id="pokemon-flavor">
            </div>
            <div class="container-table grey">
                <table>
                    <tr>
                        <td>Spezies</td>
                        <td id="pokemon-species"></td>
                    </tr>
                    <tr>
                        <td>Größe</td>
                        <td id="pokemon-height"></td>
                    </tr>
                    <tr>
                        <td>Gewicht</td>
                        <td id="pokemon-weight"></td>
                    </tr>
                    <tr>
                        <td>Fähigkeiten</td>
                        <td id="pokemon-abilities"></td>
                    </tr>
                    <tr>
                        <td>Geschlecht</td>
                        <td id="pokemon-gender"></td>
                    </tr>
                </table>
            </div>`
}

function getTemplateBaseStats() {
    return `<div class="container-table grey">
                 <table>
                    <tr>
                        <td>HP</td>
                        <td id="pokemon-bs0-number"></td>
                        <td id="pokemon-bs0-graph"></td>                    
                    </tr>
                    <tr>
                        <td>Angriff</td>
                        <td id="pokemon-bs1-number"></td>
                        <td id="pokemon-bs1-graph"></td>                    
                    </tr>
                    <tr>
                        <td>Abwehr</td>
                        <td id="pokemon-bs2-number"></td>
                        <td id="pokemon-bs2-graph"></td>                    
                    </tr>
                    <tr>
                        <td>Sp. Ang</td>
                        <td id="pokemon-bs3-number"></td>
                        <td id="pokemon-bs3-graph"></td>                    
                    </tr>
                    <tr>
                        <td>Sp. Abw</td>
                        <td id="pokemon-bs4-number"></td>
                        <td id="pokemon-bs4-graph"></td>                    
                    </tr>
                    <tr>
                        <td>Speed</td>
                        <td id="pokemon-bs5-number"></td>
                        <td id="pokemon-bs5-graph"></td>                    
                    </tr>
                    <tr>
                        <td>Gesamt</td>
                        <td id="pokemon-bs6-number"></td>
                        <td id="pokemon-bs6-graph"></td>                    
                    </tr>
                </table>
            </div>`
}

function createBaseStatsGraph(data, maxValue) {
    let progress = data / maxValue * 100;
    let colour;
    if (data < maxValue * 0.5) {
        colour = 'bg-danger';
    } else {
        colour = 'bg-success';
    };

    return `<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="${maxValue}">
                <div class="progress-bar ${colour}" style="width: ${progress}%"></div>
            </div>`;
}

function getTemplateMovesContainer() {
    return `<div id="moves" class="container-items"></div>`;
}

function getTemplateMoves(move) {
    return `<div class="item grey">${move}</div>`
}

function getTemplateGenderFeMale(chanceMale, chanceFemale) {
    return `<div class="gender">
                <div>
                    <img src="./img/male.png">
                    ${chanceMale}%
                </div>
                <div>
                    <img src="./img/female.png">
                    ${chanceFemale}%
                </div>
            </div>`
}

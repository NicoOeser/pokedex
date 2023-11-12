function openCard(i) {
    document.getElementById('dialog').classList.remove('d-none');
    disableScroll();
    renderCard(i);
}

function closeCard() {
    document.getElementById('dialog').classList.add('d-none');
    enableScroll();
}

function nextPokemon() {
    let i = checkWhereIdIsInArray(+openedPokemon.id + 1, allPokemonOnArray)
    if (i >= 0) {
        renderCard(i);
    }
}

function previousPokemon() {
    let i = checkWhereIdIsInArray(+openedPokemon.id - 1, allPokemonOnArray)
    if (i >= 0) {
        renderCard(i);
    }
}

async function renderCard(i) {
    openedPokemon = allPokemonOnArray[i];
    renderUpperCard();
    renderLowerCard();
    renderCardAbout();
}

function renderUpperCard() {
    let formattedId = formatNumber(openedPokemon.id, 3);
    let capitalizedName = capitalizeFirstLetter(openedPokemon.name);
    let types = getPokemonTypes(openedPokemon);
    document.getElementById('card').innerHTML = '';
    document.getElementById('card').innerHTML = getTemplateUpperCard(capitalizedName, formattedId, openedPokemon.img, types, openedPokemon.color);
    toggleNextPreviousButton();
}

function renderLowerCard() {
    document.getElementById('card').innerHTML += getTemplateLowerCard();
}

function renderCardAbout() {
    toggleDescriptionLinkEffects(0);
    document.getElementById('description-content').innerHTML = getTemplateAbout();
    document.getElementById('pokemon-flavor').innerHTML = openedPokemon.flavor;
    document.getElementById('pokemon-species').innerHTML = openedPokemon.species;
    document.getElementById('pokemon-height').innerHTML = getPokemonHeight();
    document.getElementById('pokemon-weight').innerHTML = getPokemonWeight();
    document.getElementById('pokemon-abilities').innerHTML = getPokemonAbility();
    document.getElementById('pokemon-gender').innerHTML = getPokemonGender();
}

function renderCardBaseStats() {
    toggleDescriptionLinkEffects(1);
    document.getElementById('description-content').innerHTML = getTemplateBaseStats();
    let total = 0;
    for (i = 0; i < openedPokemon.baseStats.length; i++) {
        let data = openedPokemon.baseStats[i];
        document.getElementById(`pokemon-bs${i}-number`).innerHTML = data;
        document.getElementById(`pokemon-bs${i}-graph`).innerHTML = createBaseStatsGraph(data, 150);
        total = total + data;
    }
    document.getElementById(`pokemon-bs6-number`).innerHTML = total;
    document.getElementById(`pokemon-bs6-graph`).innerHTML = createBaseStatsGraph(total, 700);
}

function renderCardMoves(color) {
    toggleDescriptionLinkEffects(2);
    document.getElementById('description-content').innerHTML = getTemplateMovesContainer();
    for (let i = 0; i < openedPokemon.moves.length; i++) {
        let move = capitalizeFirstLetter(openedPokemon.moves[i]);
        document.getElementById('moves').innerHTML += getTemplateMoves(move);
    }
}
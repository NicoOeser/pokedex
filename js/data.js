async function fetchAllPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=${pokemonLimit}&offset=0`;
    let response = await fetch(url);
    allPokemon = await response.json();
}

async function fetchPokemonData(id) {
    await Promise.all([fetchPokemonOverview(id), fetchPokemonSpecies(id)]);
}

async function fetchPokemonOverview(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    currentPokemonDataOverview = await response.json();
}

async function fetchPokemonSpecies(id) {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`
    let response = await fetch(url);
    currentPokemonDataSpecies = await response.json();
}

async function buildPokemonOnArray() {
    let endIndex = Math.min(load, pokemonLimit);
    for (let i = alreadyLoaded; i < endIndex; i++) {
        let id = extractStringBetweenSlashes(allPokemon['results'][i]['url']);
        let j = checkWhereIdIsInArray(id, allPokemonOnArray);
        if (j < 0) {
            await loadPokemonForOnArray(id);
        }
        let progress = ((i + 1) / pokemonLimit) * 100;
        updateLoadingProgress(progress);
    }
}

async function loadPokemonForOnArray(id) {
    let j = checkWhereIdIsInArray(id, allPokemonOnArray);
    if (j < 0) {
        await fetchPokemonData(id);
        let name = currentPokemonDataOverview['name'];
        let pokemonData = getTemplatePokemonOnArray(id, name);
        allPokemonOnArray.push(pokemonData);
    }
}

async function getIndexExistingPokemonOrFetchNew(id) {
    let i = checkWhereIdIsInArray(id, allPokemonOnArray);
    if (i >= 0) {
        return i;
    } else {
        await loadPokemonForOnArray(id);
        i = checkWhereIdIsInArray(id, allPokemonOnArray);
        return i;
    };
}

function loadGermanData(entries, key) {
    for (let i = 0; i < entries.length; i++) {
        if (entries[i]['language']['name'] === 'de') {
            return entries[i][key];
        }
    }
    return null;
}

function loadPokemonName() {
    const names = currentPokemonDataSpecies['names'];
    return loadGermanData(names, 'name');
}

function loadPokemonSpecies() {
    const species = currentPokemonDataSpecies['genera'];
    return loadGermanData(species, 'genus');
}

function loadPokemonFlavor() {
    const flavors = currentPokemonDataSpecies['flavor_text_entries'];
    return loadGermanData(flavors, 'flavor_text');
}

function extractDataFromObjectArray(array, key) {
    return array.map(item => item[key]);
}

function loadPokemonTypes() {
    const types = currentPokemonDataOverview['types'];
    return extractDataFromObjectArray(types, 'type').map(type => type['name']);
}

function loadPokemonAbilities() {
    const abilities = currentPokemonDataOverview['abilities'];
    return extractDataFromObjectArray(abilities, 'ability').map(ability => ability['name']);
}

function loadPokemonMoves() {
    const moves = currentPokemonDataOverview['moves'];
    return extractDataFromObjectArray(moves, 'move').map(move => move['name']);
}

function loadPokemonEggGroups() {
    const eggGroups = currentPokemonDataSpecies['egg_groups'];
    return extractDataFromObjectArray(eggGroups, 'name');
}

function loadPokemonBaseStats() {
    const baseStats = currentPokemonDataOverview['stats'];
    return extractDataFromObjectArray(baseStats, 'base_stat');
}

function loadPokemonEvolutionId() {
    let url = currentPokemonDataSpecies['evolution_chain']['url'];
    let id = extractStringBetweenSlashes(url);
    return id;
}



function getPokemonTypes(pokemon) {
    let formattedTypes = '';
    for (let i = 0; i < pokemon.types.length; i++) {
        formattedTypes += `<div class="item ${pokemon.color}-item">${pokemon.types[i]}</div>`;
    }
    return formattedTypes;
}

function getPokemonHeight() {
    let cm = openedPokemon.height * 10;
    let feet = Math.floor(cm / 30.48);
    let inches = ((cm % 30.48) / 2.54).toFixed(1);
    let feetInch = `${feet}’${inches}"`;
    let m = (cm / 100).toFixed(2);
    return `${feetInch} (${m} m)`;
}

function getPokemonWeight() {
    let kg = openedPokemon.weight / 10;
    let lbs = (kg * 2.20462).toFixed(1);
    let kgString = kg.toFixed(1);
    return `${lbs} lbs (${kgString} kg)`;
}

function getPokemonAbility() {
    let formattedAbilities = [];
    for (let i = 0; i < openedPokemon.abilities.length; i++) {
        let ability = openedPokemon.abilities[i];
        formattedAbilities.push(ability.charAt(0).toUpperCase() + ability.slice(1));
    }
    return formattedAbilities.join(", ");
}

function getPokemonGender() {
    let genderRate = openedPokemon.genderRate;
    if (genderRate >= 0) {
        let chanceMale = (100 - genderRate * 12.5);
        let chanceFemale = genderRate * 12.5;
        return getTemplateGenderFeMale(chanceMale, chanceFemale);
    } else {
        let chanceGenderless = 100;
        return getTemplateGenderGenderless(chanceGenderless);
    }
}

let openedPokemon;
let currentPokemon;
let currentPokemonDataOverview;
let currentPokemonDataSpecies;
let allPokemon = [];
let allPokemonOnArray = [];
let searchArray = [];
let alreadyLoaded = 0;
let load = 24;
let pokemonLimit = 1000;
const zeroPad = (num, places) => String(num).padStart(places, '0');

let loadingOverlay = document.getElementById('loadingOverlay');
let loadingBar = document.getElementById('loadingBar');
let loadingProgress = document.getElementById('loadingProgress');
let isLoadingMore = false;


async function init() {
    await fetchAllPokemon();
    await buildPokemonOnArray();
    await renderPokedex(alreadyLoaded);
    await buildAllPokemonOnArray();
}

async function buildAllPokemonOnArray() {
    for (let i = 0; i < pokemonLimit; i++) {
        let id = extractStringBetweenSlashes(allPokemon['results'][i]['url']);
        await loadPokemonForOnArray(id);
    }
}

async function renderPokedex(startIndex) {
    if (!isLoadingMore) {
        showLoadingOverlay();
    }
    for (let i = startIndex; i < load; i++) {
        await renderPokedexElement(i + 1);
        alreadyLoaded++;
    }
    hideLoadingOverlay();
    if (alreadyLoaded >= pokemonLimit) {
        document.getElementById('btn-loadMore').classList.add('d-none');
    } else {
        document.getElementById('btn-loadMore').classList.remove('d-none');
    }
}

async function renderSearchPokemon(searchArray) {
    document.getElementById('btn-loadMore').classList.add('d-none');
    document.getElementById('pokedex').innerHTML = ''; 
    for (let i = 0; i < searchArray.length; i++) {
        await renderPokedexElement(searchArray[i]);
    }
}

async function renderPokedexElement(id) {
    let j = await getIndexExistingPokemonOrFetchNew(id);
    currentPokemon = allPokemonOnArray[j];
    let capitalizedName = capitalizeFirstLetter(currentPokemon.name);
    let formattedId = formatNumber(currentPokemon.id, 3);
    let formattedTypes = getPokemonTypes(currentPokemon);
    document.getElementById('pokedex').innerHTML += getTemplatePokedex(capitalizedName, j, formattedId, currentPokemon.img, formattedTypes, currentPokemon.color);
}

async function loadMore() {
    isLoadingMore = true;
    load = load + 24;
    document.getElementById('btn-loadMore').classList.add('d-none');
    showLoadingOverlay();
    await buildPokemonOnArray();
    renderPokedex(alreadyLoaded);
    hideLoadingOverlay();
    isLoadingMore = false;
    document.getElementById('btn-loadMore').classList.remove('d-none');
}

async function searchPokemon() {
    let searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm !== '') {
        let searchResults = allPokemonOnArray.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
        let searchArray = searchResults.map(pokemon => pokemon.id);
        await renderSearchPokemon(searchArray);
    } else {
        document.getElementById('pokedex').innerHTML = '';
        alreadyLoaded = 0;
        renderPokedex(alreadyLoaded);
    }
}


function toggleDescriptionLinkEffects(id) {
    for (let i = 0; i < 3; i++) {
        if (i === id) {
            let linkElement = document.getElementById(`card-link-${i}`);
            if (linkElement) {
                linkElement.classList.remove('inactive');
            }
        } else {
            let linkElement = document.getElementById(`card-link-${i}`);
            if (linkElement) {
                linkElement.classList.add('inactive');
            }
        }
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatNumber(id, numbers) {
    return '#' + zeroPad(id, numbers);
}

function disableScroll() {
    document.body.classList.add("stop-scrolling");
}

function enableScroll() {
    document.body.classList.remove("stop-scrolling");
}

function extractStringBetweenSlashes(inputUrl) {
    let url = inputUrl;
    let lastSlashIndex = url.lastIndexOf('/');
    let secondLastSlashIndex = url.lastIndexOf('/', lastSlashIndex - 1);
    let id = url.substring(secondLastSlashIndex + 1, lastSlashIndex);
    return id;
}

function checkWhereIdIsInArray(id, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i]['id'] == id) {
            return i;
        }
    }
    return -1;
}

function toggleNextPreviousButton() {
    let i = checkWhereIdIsInArray(+openedPokemon.id + 1, allPokemonOnArray);
    if (i < 0) {
        document.getElementById('btn-nextPoke').classList.add('d-none');
    }
    let j = checkWhereIdIsInArray(+openedPokemon.id - 1, allPokemonOnArray);
    if (j < 0) {
        document.getElementById('btn-prevPoke').classList.add('d-none');
    }
}

function showLoadingOverlay() {
    loadingOverlay.style.display = 'flex';
    loadingBar.style.width = '0%'; 
    loadingProgress.textContent = 'Laden'; 
}

function updateLoadingProgress(percentage) {
    loadingBar.style.width = percentage + '%'; 
}

function hideLoadingOverlay() {
    loadingOverlay.style.display = 'none';
    loadingBar.style.width = '0%'; 
    loadingProgress.textContent = ''; 
}
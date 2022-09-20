const pokemonName: HTMLSpanElement = document.querySelector('.pokemon-name');
const pokemonNumber: HTMLSpanElement = document.querySelector('.pokemon-number');
const pokemonImage: HTMLImageElement = document.querySelector('.pokemon-image');

const form: HTMLFormElement = document.querySelector('.form');
const input: HTMLInputElement = document.querySelector('.input-search');
const buttonPrev: HTMLButtonElement = document.querySelector('.btn-prev');
const buttonNext: HTMLButtonElement = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon: string) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon: string) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data.sprites.front_default;
        input.value = '';

        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :c';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value);
})

buttonNext.addEventListener('click', () => {
        renderPokemon(`${searchPokemon + 1}`);
})

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        renderPokemon(`${searchPokemon - 1}`);
    }
})

renderPokemon(`${searchPokemon}`);
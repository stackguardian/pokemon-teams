const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => getPokemon(trainers))

    const getPokemon = trainerArray => {
        for(const trainer of trainerArray){
            const trainerPokemons = trainer.pokemons 
            renderTrainer(trainer)
            touchPokemon(trainerPokemons)
        }
    }

    const renderTrainer = trainer => {
        const mainTag = document.querySelector('main')
        const pokemonArray = trainer.pokemons
        mainTag.insertAdjacentHTML("beforeend", `

         <div class="card" data-id="${trainer.id}"> 
            <p> ${trainer.name} </p>
            <button data-trainer="${trainer.id}">Add Pokemon</button>
            <ul class="pokemon-container" data-trainer-id="${trainer.id}"> </ul>
         </div>
         `)
         const ul = document.querySelector(`.pokemon-container[data-trainer-id="${trainer.id}"]`)

        for(const pokemon of pokemonArray){
            const li = document.createElement('li')
            li.insertAdjacentHTML('beforeend', `
            ${pokemon.nickname} (${pokemon.species})
            <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
            `)
            ul.append(li)
        }

    }

    const touchPokemon = pokemonArray => {
        for(const pokemon of pokemonArray){
            renderPokemon(pokemon)
        }
    }

    const renderPokemon = pokemon => {
        if (pokemon.trainer_id) {

        }
    }


    

// getPokemon()
// renderTrainer()
})



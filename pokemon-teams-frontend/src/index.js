const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons/`

document.addEventListener("DOMContentLoaded", function(e) {
    
    const init = () =>{
        fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(trainers => getPokemon(trainers))
    }

    const getPokemon = trainerArray => {
        for(const trainer of trainerArray){
            const trainerPokemons = trainer.pokemons 
            renderTrainer(trainer)
        }
    }

    const renderTrainer = trainer => {
        const mainTag = document.querySelector('main')
        const pokemonArray = trainer.pokemons
        mainTag.insertAdjacentHTML("beforeend", `

         <div class="card" data-id="${trainer.id}"> 
            <p> ${trainer.name} </p>
            <button class="add" data-trainer="${trainer.id}">Add Pokemon</button>
            <ul class="pokemon-container" data-trainer-id="${trainer.id}"> </ul>
         </div>
         `)
         const ul = document.querySelector(`.pokemon-container[data-trainer-id="${trainer.id}"]`)

        for(const pokemon of pokemonArray){
            renderPoke(pokemon, ul)
        }

    }

    const renderPoke = (pokemon, list) => {
        const li = document.createElement('li')
        li.insertAdjacentHTML('beforeend', `
            ${pokemon.nickname} (${pokemon.species})
            <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
        `)
        list.append(li)
    }

    const clickHandler = () => {
        document.addEventListener("click", e => {
            if (e.target.matches(".add")) {
                const trainerId = e.target.dataset.trainer
                const ul = document.querySelector(`.pokemon-container[data-trainer-id="${trainerId}"]`)
                
                const addPokemon = (id) => {
                    const options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "trainer_id": id
                        })
                    }               
                        
                    fetch(POKEMONS_URL, options)
                        .then(res => res.json())
                        .then(pokemon => {
                            renderPoke(pokemon, ul)
                        })
                }
                addPokemon(trainerId)
            } else if (e.target.matches(".release")) {
                const button = e.target 
                const pokeId = button.dataset.pokemonId
                
                const deletePoke = (id) => {
                    const options = {
                        method: "DELETE"
                    }

                    fetch(POKEMONS_URL + id, options)
                }
                deletePoke(pokeId)
                button.parentNode.remove()
            }
        })   
    }


init()   
clickHandler()
// getPokemon()
// renderTrainer()
})



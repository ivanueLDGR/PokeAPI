const axios = require('axios');

class GetPokemons{

findPokeID(pokemonAllInfo){
        let pokemon = {
            pokeID: pokemonAllInfo.id,
            pokeName: pokemonAllInfo.name,
        };
        return(dados = [pokemon.pokeID, pokemon.pokeName]);
}

findPokemonSpecies(ID){
        pokemonSpeciesUrl = callPokemonAPI(ID)
        result = pokemonSpeciesUrl
        pokemonSpecies = result.species.url.split('/')[6]
        return (pokemonSpecies)
}
    
callPokemonAPI(ID){
        const pokemonAllInfo = { 
            method: 'GET',
            url: `https://pokeapi.co/api/v2/pokemon/${ID}`,
            headers: { 'accept-encoding': null}
        };
        const result = axios.request(pokemonAllInfo);
        return result.data
};
    
callPokemonSpecies(speciesID){
        const options = { 
            method: 'GET',
            url: `https://pokeapi.co/api/v2/pokemon-species/${speciesID}/`,
            headers: { 'accept-encoding': null}
          };
            const result = axios.request(options);
            return (result.data)
}
    
findEvolutionChain(pokemonSpeciesData){
        return (pokemonSpeciesData.evolution_chain.url)
}
    
callEvolutionChain(evolutionChainUrl){
        const options = { 
            method: 'GET',
            url: `${evolutionChainUrl}`,
            headers: { 'accept-encoding': null}
          };
            const evolutionChainData = axios.request(options);
            return (evolutionChainData.data)
}
    
mapEvolutions(evolutionChainLinks, evolutionChainData, evolutionLevel){
        evolutionLevel = evolutionLevel + 1
        hasEvolution = Object.hasOwn(evolutionChainData, "evolves_to")
        if(hasEvolution == true){
            for (i in evolutionChainData.evolves_to){
                evolutionEvolutionChainData = evolutionChainData.evolves_to[i]
                mapEvolutions(evolutionChainLinks, evolutionEvolutionChainData, evolutionLevel)
            }
        }
        evolutionChainLinks.unshift([evolutionChainData.species.name, evolutionLevel])
        return evolutionChainLinks
}
    
findPokemonTypes(pokemonAllInfo){
        pokemonTypes = []
        for (i in pokemonAllInfo.types){
            pokemonTypes.push(pokemonAllInfo.types[i].type.name)
        } 
        return (pokemonTypes)
}
    
findThisTypePokemons(type){
        const options = { 
            method: 'GET',
            url: `https://pokeapi.co/api/v2/type/${type}`,
            headers: { 'accept-encoding': null}
          };
            const thisTypeData = axios.request(options);
            return (thisTypeData.data)
}
    
mapThisTypePokemons(thisTypeData){
        pokemons = []
        for (i in thisTypeData.pokemon){
            pokemons.push(thisTypeData.pokemon[i].pokemon.name)
        }
        return pokemons
}
    
findAreaEncountersUrl(pokemon, pokemonAllInfo){
        // pokemonAllInfo = callPokemonAPI(pokemon)
        areaEncountersUrl = pokemonAllInfo.location_area_encounters
        return areaEncountersUrl
}
    
callPokemonAreaEncounters(areaEncountersUrl){
        const options = { 
            method: 'GET',
            url: `${areaEncountersUrl}`,
            headers: { 'accept-encoding': null}
          };
            const pokemonAreaEncountersData = axios.request(options);
            return (pokemonAreaEncountersData.data)
}
    
listPokemonAreaEncounters(pokemonAreaEncountersData){  //xD, perguntar pra alguem q manja mais
        pokemonAreaEncountersArray = []
        for(i in pokemonAreaEncountersData){
            versions = ''
            for (j in pokemonAreaEncountersData[i].version_details){
                versions = versions.concat(pokemonAreaEncountersData[i].version_details[j].version.name, ', ')
            }
        versions = versions.slice(0, -2)
        pokemonAreaEncountersArray.push([pokemonAreaEncountersData[i].location_area.name, versions])
        }
        if (pokemonAreaEncountersArray.length === 0){
            pokemonAreaEncountersArrayErrorMessage = "This pokemon is a starter... or the code is broken"
            return pokemonAreaEncountersArrayErrorMessage
        }
        return pokemonAreaEncountersArray
}
    
findPokemonSprite(pokemonAllInfo){
        let pokemonSpriteUrl = pokemonAllInfo.sprites.front_default
        return pokemonSpriteUrl
}
    
    //VSC não abre arquivo de imagem? o q fazer?
    
    // async function callPokemonSpriteUrl(pokemonSpriteUrl){
    //     const options = { 
    //         method: 'GET',
    //         url: `${pokemonSpriteUrl}`,
    //         headers: { 'accept-encoding': null}
    //       };
    //     const pokemonSprite = await axios.request(options);
    //     return (pokemonSprite.data)
    // }
    
pokemonOutput(dados, types, evolutionLinks, pokemonAreaEncountersList, pokemonSpriteUrl){
        let pokemonOutput = dados
        pokemonOutput.flat()
        for(i = 1; i < arguments.length; i++){
            pokemonOutput.push(arguments[i])
        }
        return pokemonOutput
}

}

module.exports = new GetPokemons()
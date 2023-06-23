// import { evolutionTreeNode } from './src/database/DBMethodsFolder/pokemonClass.js';
// let pokemonTreeNodeTeste = new evolutionTreeNode(a, b, legal)

// import axios from "axios";
//pesquisar modal

class evolutionTreeNode{
    constructor(id, pokeName, image){
        this.id = id
        this.pokeName = pokeName
        this.image = image
    }
}

function findPokeID(pokemonAllInfo){
    let pokemon = {
        pokeID: pokemonAllInfo.id,
        pokeName: pokemonAllInfo.name,
    };
    return(dados = [pokemon.pokeID, pokemon.pokeName]);
}

async function findPokemonSpecies(ID){
    pokemonSpeciesUrl = await callPokemonAPI(ID)
    result = pokemonSpeciesUrl
    pokemonSpecies = result.species.url.split('/')[6]
    return (pokemonSpecies)
}

async function findEvolutionChainSprites(evolutionLinks){
    let evolutionChainSprites = []
    for(i in evolutionLinks){
        pokemonAllInfo = await callPokemonAPI(evolutionLinks[i][0])
        evolutionChainSprites.push([findPokemonSprite(pokemonAllInfo), evolutionLinks[i][1]])
    }
    return(evolutionChainSprites)
}

async function callPokemonAPI(ID){
    const pokemonAllInfo = { 
        method: 'GET',
        url: `https://pokeapi.co/api/v2/pokemon/${ID}`,
        headers: { 'accept-encoding': null},
        timeout: 5000,
      };
      
      try {
        const result = await axios.request(pokemonAllInfo);
        return result.data;
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        throw error;
      }
    };

async function callPokemonSpecies(speciesID){
    const options = { 
        method: 'GET',
        url: `https://pokeapi.co/api/v2/pokemon-species/${speciesID}/`,
        headers: { 'accept-encoding': null}
      };
        const result = await axios.request(options);
        return (result.data)
}


function findEvolutionChain(pokemonSpeciesData){
    return (pokemonSpeciesData.evolution_chain.url)
}

async function callEvolutionChain(evolutionChainUrl){
    const options = { 
        method: 'GET',
        url: `${evolutionChainUrl}`,
        headers: { 'accept-encoding': null}
      };
        const evolutionChainData = await axios.request(options);
        return (evolutionChainData.data)
}

function mapEvolutions(evolutionChainLinks, evolutionChainData, evolutionLevel){
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

function findPokemonTypes(pokemonAllInfo){
    pokemonTypes = []
    for (i in pokemonAllInfo.types){
        pokemonTypes.push(pokemonAllInfo.types[i].type.name)
    } 
    return (pokemonTypes)
}

async function findThisTypePokemons(type){
    const options = { 
        method: 'GET',
        url: `https://pokeapi.co/api/v2/type/${type}`,
        headers: { 'accept-encoding': null}
      };
        const thisTypeData = await axios.request(options);
        return (thisTypeData.data)
}

function mapThisTypePokemons(thisTypeData){
    thisTypePokemons = []
    for (i in thisTypeData.pokemon){
        thisTypePokemons.push(thisTypeData.pokemon[i].pokemon.name)
    }
    return thisTypePokemons
}

function findAreaEncountersUrl(pokemon, pokemonAllInfo){
    // pokemonAllInfo = callPokemonAPI(pokemon)
    areaEncountersUrl = pokemonAllInfo.location_area_encounters
    return areaEncountersUrl
}

async function callPokemonAreaEncounters(areaEncountersUrl){
    const options = { 
        method: 'GET',
        url: `${areaEncountersUrl}`,
        headers: { 'accept-encoding': null}
      };
        const pokemonAreaEncountersData = await axios.request(options);
        return (pokemonAreaEncountersData.data)
}

function listPokemonAreaEncounters(pokemonAreaEncountersData){  //xD, perguntar pra alguem q manja mais
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
        pokemonAreaEncountersArrayErrorMessage = "This pokemon isn't found anywhere"
        return pokemonAreaEncountersArrayErrorMessage
    }
    return pokemonAreaEncountersArray
}

function findPokemonSprite(pokemonAllInfo){
    pokemonSpriteUrl = pokemonAllInfo.sprites.front_default
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

function pokemonOutput(dados, types, evolutionLinks, pokemonAreaEncountersList, pokemonSpriteUrl){
    let pokemonOutput = dados
    pokemonOutput.flat()
    for(i = 1; i < arguments.length; i++){
        pokemonOutput.push(arguments[i])
    }
    return pokemonOutput
}

function evolutionChainPageInfoProviderStringfy(evolutionChainPageInfoProviderOutput){
    evolutionChainPageInfoProviderOutput
    return (evolutionChainPageInfoProviderOutput)
}

async function evolutionChainPageInfoProvider(ID){ //adicionar informações para o modal do pokemon??
    pokemonAllInfo = await callPokemonAPI(ID)
    dados = findPokeID(pokemonAllInfo)
    pokemonSpecies = await findPokemonSpecies(dados[0])
    pokemonSpeciesData = await callPokemonSpecies(pokemonSpecies)
    evolution_chainUrl = await findEvolutionChain(pokemonSpeciesData)
    evolutionChainData = await callEvolutionChain(evolution_chainUrl)
    evolutionLinks = await mapEvolutions([], evolutionChainData.chain, 0)
    evolutionChainSprites = await findEvolutionChainSprites(evolutionLinks)
    return[evolutionLinks, evolutionChainSprites]
}

async function evolutionTreeBuilder(ID){
    evolutionChainPageInfoProviderOutput = await evolutionChainPageInfoProvider(ID)
    let thisEvolutionTreeNode = []
    let evolutionTree = []
    let column = 0
    for (i = 0; i < evolutionChainPageInfoProviderOutput[0].length; i++){
        column = (evolutionChainPageInfoProviderOutput[0][i][1] - 1)
        if (!evolutionTree[column]) {
            evolutionTree[column] = []
        }
        pokemonSpriteUrl = evolutionChainPageInfoProviderOutput[1][i][0]
        match = pokemonSpriteUrl.match(/\d+/)
        if (match){
            pokemonID = parseInt(match[0])
        }
        thisEvolutionTreeNode[i] = new evolutionTreeNode(pokemonID, evolutionChainPageInfoProviderOutput[0][i][0], evolutionChainPageInfoProviderOutput[1][i][0])
        evolutionTree[column].unshift(thisEvolutionTreeNode[i])  
    }
    return(evolutionTree)
}

async function pokemonPageInfoProvider(ID){
    pokemonAllInfo = await callPokemonAPI(ID)
    dados = findPokeID(pokemonAllInfo)
    thisPokemon = dados[0]
    types = findPokemonTypes(pokemonAllInfo)
    areaEncountersUrl = findAreaEncountersUrl(thisPokemon, pokemonAllInfo)
    pokemonAreaEncountersData = await callPokemonAreaEncounters(areaEncountersUrl)
    pokemonAreaEncountersList = listPokemonAreaEncounters(pokemonAreaEncountersData)
    pokemonSpriteUrl = findPokemonSprite(pokemonAllInfo)
    pokemonOutputArray = pokemonOutput(dados, types, pokemonAreaEncountersList, pokemonSpriteUrl)
    console.log(pokemonOutputArray)
}

async function typePageInfoProvider(type){
    thisTypePokemonsFullData = []
    thisTypeData = await findThisTypePokemons(type)
    thisTypePokemons = mapThisTypePokemons(thisTypeData)
    for (i in thisTypePokemons){
        pokemonAllInfo = await callPokemonAPI(thisTypePokemons[i])
        dados = findPokeID(pokemonAllInfo)
        types = findPokemonTypes(pokemonAllInfo)
        pokemonSpriteUrl = findPokemonSprite(pokemonAllInfo)
        dados = dados.flat()
        thisTypePokemonsFullData.push([dados, types, pokemonSpriteUrl])
    }
    return thisTypePokemonsFullData
}

async function modalContentInfoProvider(ID){
    pokemonAllInfo = await callPokemonAPI(ID)
    dados = findPokeID(pokemonAllInfo)
    thisPokemon = dados[0]
    types = findPokemonTypes(pokemonAllInfo)
    areaEncountersUrl = findAreaEncountersUrl(thisPokemon, pokemonAllInfo)
    pokemonAreaEncountersData = await callPokemonAreaEncounters(areaEncountersUrl)
    pokemonAreaEncountersList = listPokemonAreaEncounters(pokemonAreaEncountersData)
    pokemonSpriteUrl = findPokemonSprite(pokemonAllInfo)
    pokemonOutputArray = pokemonOutput(dados, types, pokemonAreaEncountersList, pokemonSpriteUrl)
    return(pokemonOutputArray)
}

async function main(ID){
pokemonAllInfo = await callPokemonAPI(ID)
dados = findPokeID(pokemonAllInfo)
thisPokemon = dados[0]
pokemonSpecies = await findPokemonSpecies(thisPokemon)
pokemonSpeciesData = await callPokemonSpecies(pokemonSpecies)
evolution_chainUrl = await findEvolutionChain(pokemonSpeciesData)
evolutionChainData = await callEvolutionChain(evolution_chainUrl)
evolutionLinks = await mapEvolutions([], evolutionChainData.chain, 0)
types = findPokemonTypes(pokemonAllInfo)
thisTypeData = await findThisTypePokemons(types[0])
thisTypePokemons = mapThisTypePokemons(thisTypeData)
areaEncountersUrl = findAreaEncountersUrl(thisPokemon, pokemonAllInfo)
pokemonAreaEncountersData = await callPokemonAreaEncounters(areaEncountersUrl)
pokemonAreaEncountersList = listPokemonAreaEncounters(pokemonAreaEncountersData)
pokemonSpriteUrl = findPokemonSprite(pokemonAllInfo)
// pokemonSprite = await callPokemonSpriteUrl(pokemonSpeciesUrl)
pokemonOutputArray = pokemonOutput(dados, types, evolutionLinks, pokemonAreaEncountersList, pokemonSpriteUrl)
evolutionChainSprites = await findEvolutionChainSprites(evolutionLinks)
// console.log(pokemonOutputArray)
return(pokemonOutputArray)
}

async function evolutionChainPageInfoProviderteste(ID){
    evolutionChainPageInfoProviderOutput = await evolutionChainPageInfoProvider(ID)
    console.log(evolutionChainPageInfoProviderStringfy(evolutionChainPageInfoProviderOutput))
}

async function getPokemonAllTypes(){
const options = { 
    method: 'GET',
    url: `https://pokeapi.co/api/v2/type`,
    headers: { 'accept-encoding': null}
  };
    const pokemonAllTypes = await axios.request(options);
    return (pokemonAllTypes.data)
}
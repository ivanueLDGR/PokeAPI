class pokemon{
    constructor(id, pokeName, type, evolveFrom, evolveTo, areaEncounters, image){
    this.id = id
    this.pokeName = pokeName
    this.type = type
    this.evolveFrom = evolveFrom
    this.evolveTo = evolveTo
    this.areaEncounters = areaEncounters
    this.image = image
    }
}

export class evolutionTreeNode{
    constructor(id, pokeName, image){
        this.id = id
        this.pokeName = pokeName
        this.image = image
    }
}

function createPokemon(id, pokeName, type, evolveFrom, evolveTo, areaEncounters, image){
    let thisPokemon = new pokemon(id, pokeName, type, evolveFrom, evolveTo, areaEncounters, image);
    return(thisPokemon)
}
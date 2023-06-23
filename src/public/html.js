async function generateTypeButtons(){
  let allTypesData = await getPokemonAllTypes()
  let typeButtonsParagraph = document.createElement("p")
  for (let i = 0; i < allTypesData.results.length; i++) {
    const typeButton = document.createElement('button');
    typeButton.className = "typeButton"
    typeButton.textContent = allTypesData.results[i].name;
    typeButton.innerHTML = allTypesData.results[i].name //verificar outro atributo
    typeButtonsParagraph.appendChild(typeButton);
  }
  return(typeButtonsParagraph)
}

function generateEvolutionColumn(evolutionTreeColumn, tester){
  let column = document.createElement("div");
  column.className = "evolutionTreeColumn";
  for (j in evolutionTreeColumn){
    let pokemonButton = document.createElement("Button");
    pokemonButton.className = "pokemonButton";
    pokemonButton.image = new Image();
    pokemonButton.image.src = evolutionTreeColumn[j].image;
    pokemonButton.image.addEventListener("load", function() {
    pokemonButton.style.backgroundSize = "auto 100%";
    pokemonButton.style.backgroundImage = `url(${pokemonButton.image.src})`;
  });
    pokemonButton.id = evolutionTreeColumn[j].id;
    column.appendChild(pokemonButton);
  } 
  if (tester == true){
    let arrow = document.createElement("div");
    arrow.className = "arrow";
    column.appendChild(arrow);
  }
  document.getElementById("evolutionTreeContainer").append(column);
}

// document.addEventListener("click", function(event) {
//   if (event.target.classList.contains("pokemonButton")) {
//     event.stopPropagation();
//     event.preventDefault();
//     // event.target.disabled = true;
//     console.log(document.getElementsByClassName("pokemonButton"))
//     document.getElementsByClassName("pokemonButton").disabled = true
//     console.log(event.target.id)
//     let id = JSON.parse(event.target.id);
//     createPokemonModal(id)
//       .then(() => {
//         setTimeout(() => {
//           event.target.disabled = false;
//         }, 3000);
//       })
//       .catch((error) => {
//         console.error(error);
//         event.target.disabled = false;
//       });
//   }
// });

document.addEventListener("click", async function(event) {
  if (event.target.classList.contains("pokemonButton")) {
    let id = JSON.parse(event.target.id)
    await createPokemonModal(id);
  }
});

async function createPokemonModal(id){
  pokemonOutputArray = await modalContentInfoProvider(id)
  let modal = document.createElement("div");
  modal.className = "modal";
  let modalContentElement = document.createElement("div");
  let modalContentElementFlexcontainer = document.createElement("flex-container")
  modalContentElement.className = "modal-content";
  let closeButton = document.createElement("span");
  closeButton.className = "close-button";
  closeButton.textContent = "x";
  closeButton.addEventListener("click", function() {
    modal.remove();
  });

  let areaEncountersList = document.createElement("div")
  areaEncountersList.id = "areaEncountersListDiv"
  if (pokemonOutputArray[3] == "This pokemon isn't found anywhere") {
    areaEncountersList.innerHTML = pokemonOutputArray[3]
  }else{
    for(i in pokemonOutputArray[3]){
      areaEncountersList.innerHTML += `<p> In 
      <span style="color: red; font-weight: bold"> ${pokemonOutputArray[3][i][1]} </span>
      is found at 
      <span style="color: cyan; font-weight: bold"> ${pokemonOutputArray[3][i][0].replaceAll('-', ' ')}</span> </p>`
    }
  }

  // console.log(areaEncountersList)

  let imageElement = document.createElement("img");
  imageElement.src = pokemonOutputArray[4];

  let idParagraph = document.createElement("p");
  idParagraph.textContent = [pokemonOutputArray[0], pokemonOutputArray[1]];

  let typesParagraph = document.createElement("p");
  for (let i = 0; i < pokemonOutputArray[2].length; i++) {
    const typeButton = document.createElement('button');
    typeButton.className = "typeButton"
    typeButton.textContent = pokemonOutputArray[2][i];
    typeButton.innerHTML = pokemonOutputArray[2][i] //verificar outro atributo
    typesParagraph.appendChild(typeButton);
  }

  modalContentElementFlexcontainer.appendChild(idParagraph);
  modalContentElementFlexcontainer.appendChild(imageElement);
  modalContentElementFlexcontainer.appendChild(typesParagraph);

  modalContentElement.appendChild(closeButton);
  modalContentElement.appendChild(modalContentElementFlexcontainer);
  modalContentElement.appendChild(areaEncountersList)
  modal.appendChild(modalContentElement);
  document.body.appendChild(modal);
}

document.addEventListener("click", async function(event) {
  if (event.target.classList.contains("typeButton")) {
    let type = event.target.innerHTML
    sessionStorage.setItem('type', JSON.stringify(type));
    window.location.href = "typePage.html";
  }
});


const express = require('express');
const router  = express.Router(); 
const pokeapiController = require('../controllers/pokeapi');

router.get('/pokemon', pokeapiController.getAllPokemon);
router.post('/pokemon', pokeapiController.newPokemon);
router.delete('/pokemon', pokeapiController.deleteAllPokemon);

router.get('/pokemon/:ID', pokeapiController.getOnePokemon);
router.post('/pokemon/:ID', pokeapiController.newPokemonComment);
router.delete('/pokemon/:ID', pokeapiController.deleteOnePokemon);

router.get('/type', pokeapiController.getAlltype);
router.post('/type', pokeapiController.newType);
router.delete('/type', pokeapiController.deleteAllType);

router.get('/type/:type', pokeapiController.getOneType);
router.post('/type/:type', pokeapiController.newTypeComment);
router.delete('/type/:type', pokeapiController.deleteOneType);

module.exports = router;
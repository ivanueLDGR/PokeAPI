const express = require('express')

const app = express();
app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.send('a lista de rota da API é: /pokemon{{id ou nome}}')
})

app.get('/pokemon/:id', (req, res) => {
    res.send('retornei hello world')
})

app.listen(8001, () =>{
    console.log('servidor ligado')
})

/*
rota para retornar informações filtradas do pokemon, incluindo evoluções
    - Receber id, pokeName, type, evolveFrom, evolveTo, areaEncounters, image
*/
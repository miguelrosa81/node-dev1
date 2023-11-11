const express = require('express');


const app = express();

app.get('/', (request, response) => response.status(200).send('Olá Mundo!'))

app.listen(8888, () => console.log('porta 3333'));
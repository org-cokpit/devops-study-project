# devops-study-project

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello DevOps!');
});

app.listen(3000, () => {
  console.log('Rodando');
});


//exemplo para subir na nova branch teste

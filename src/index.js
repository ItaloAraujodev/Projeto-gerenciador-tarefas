const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;
  const filterUser = users.find((element) => element.username === username);

  if(filterUser){
    return response.status(400).json({error: 'Usuario já existe !!'});
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: [],
  }
  users.push(user);
  
  return response.status(201).json(user)
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
 /*  const { username } = request.headers
  const filterUser = users.filter((element) => element.username === username)
  const listaUser = filterUser.todos;
  */
  return response.status(201).send('Caiu aqui');
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
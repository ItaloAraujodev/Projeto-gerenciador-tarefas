const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
    const { username } = request.headers
    const user = users.find((element) => element.username === username);

    if(!user) {
      return response.status(400).json({error: 'Usuario não encontrado!'})
    }
    request.user = user;
    return next();
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
  console.log(user);
  return response.status(201).json(user)
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const list = request.user.todos;
  return response.status(201).json(list);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const list = request.user.todos;
  const { title, deadline } = request.body;
  const todo = {
    id: uuidv4(),
	  title,
	  done: false, 
	  deadline: new Date(deadline), 
	  created_at: new Date()
  }

  list.push(todo)
  return response.status(201).json(todo);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const list = request.user.todos;
  const { title, deadline } = request.body;
  const { id } = request.params;

  const verifId = list.find(todo => todo.id === id);

  if(!verifId){
    return response.status(404).json({error: "Todo not found!"})
  }

  verifId.title = title;
  verifId.deadline = new Date(deadline);

  return response.status(200).json(verifId);

});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const list = request.user.todos;
  const { id } = request.params;

  const verifId = list.find(todo => todo.id === id);

  if(!verifId){
    return response.status(404).json({error: "Todo not found!"})
  }

  verifId.done = true;

  return response.status(200).json(verifId);
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  //FindIndex retorna a posição daquele elemento do array, senão existir retorna -1
  const verifIdIndex = user.todos.findIndex(todo => todo.id === id);

  if(verifIdIndex === -1){
    return response.status(404).json({error: "Not found"})
  }

  user.todos.splice(verifIdIndex, 1);

  return response.status(204).json();
});

module.exports = app;
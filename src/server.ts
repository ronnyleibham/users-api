import express from 'express';
const app = express();
const port = 3000;

// Custom middleware to log requests
app.use((request, _response, next) => {
  console.log('Request received', request.url);
  next();
});

// Middleware for parsing application/json
app.use(express.json());

const users = ['Homer', 'Bart', 'Marge', 'Lisa'];

app.post('/api/users', (request, response) => {
  const newUserName = request.body.name;
  if (users.includes(newUserName)) {
    response.status(409).send('User already exist. RTFM!');
  } else {
    users.push(newUserName);
    response.send(`${newUserName} added`);
  }
});

app.delete('/api/users/:name', (request, response) => {
  const usersIndex = users.indexOf(request.params.name);
  if (usersIndex === -1) {
    response.status(404).send("User doesn't exist. Check another Castle 🏰");
    return;
  }

  users.splice(usersIndex, 1);
  response.send('Deleted');
});

app.get('/api/users/:name', (request, response) => {
  const isNameKnow = users.includes(request.params.name);
  if (isNameKnow) {
    response.send(request.params.name);
  } else {
    response.status(404).send('This page is not here. Check another Castle 🏰');
  }
});

app.get('/api/users', (_request, response) => {
  response.send(users);
});

app.get('/', (_req, res) => {
  res.send('Hello World 🐱‍👤!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

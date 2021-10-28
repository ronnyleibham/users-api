import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
// const port = 3000;

// Custom middleware to log requests
app.use((request, _response, next) => {
  console.log('Request received', request.url);
  next();
});
// Middleware for parsing application/json
app.use(express.json());

// Middleware for parsing cookies
app.use(cookieParser());

const users = [
  {
    name: 'Manuel',
    username: 'manuel123',
    password: '123abc',
  },
  {
    name: 'Leon',
    username: 'lmachens',
    password: 'asdc',
  },
  {
    name: 'Anke',
    username: 'anke9000',
    password: 'ab',
  },
  {
    name: 'Philipp',
    username: 'phgrtz',
    password: 'pw123!',
  },
];

app.get('/api/me', (request, response) => {
  const username = request.cookies.username;
  const foundUser = users.find((user) => user.username === username);
  if (foundUser) {
    response.send(foundUser);
  } else {
    response.status(404).send('User not found');
  }
});

app.post('/api/login', (request, response) => {
  const credentials = request.body;
  const existingUser = users.find(
    (user) =>
      user.username === credentials.username &&
      user.password === credentials.password
  );

  if (existingUser) {
    response.setHeader('Set-Cookie', `username=${existingUser.username}`);
    response.send('Logged in');
  } else {
    response.status(401).send('You shall not pass');
  }
});
app.post('/api/users', (request, response) => {
  const newUser = request.body;
  if (
    typeof newUser.name !== 'string' ||
    typeof newUser.username !== 'string' ||
    typeof newUser.password !== 'string'
  ) {
    response.status(400).send('Missing properties');
    return;
  }
  if (users.some((user) => user.username === newUser.username)) {
    response.status(409).send('User already exists');
  } else {
    users.push(newUser);
    response.send(`${newUser.name} added`);
  }
});

import express from 'express';

const app = express();
const port = 3000;

app.get('/api/users/:username', (_request, response) => {
  response.send(_request.params.username);
});

app.get('/api/users', (_request, response) => {
  const users = ['Homer', 'Lisa', 'Marge', 'Bart'];
  response.send(users);
});

app.get('/', (_req, res) => {
  res.send('Hello World 🐱‍👤!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

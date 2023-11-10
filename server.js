import express, { response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/search', (req, res) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.sendStatus(500);
  }
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.MOVIE_ACCESS_TOKEN}`,
    },
  };
  fetch(`https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1`, options) //
    .then((response) => response.json())
    .then((response) => res.send(response));
});

app.listen(port, () => {
  console.log('listening on port');
});

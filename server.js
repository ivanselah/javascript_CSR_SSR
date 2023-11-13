import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import { getInitialHTML } from './dist/index.js';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.static('dist'));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

const getMovies = async (query) => {
  const { keyword } = query;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.MOVIE_ACCESS_TOKEN}`,
    },
  };
  return (
    await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1`,
      options
    )
  ).json();
};

app.get('/', (req, res) => {
  fs.readFile('index.html', (err, data) => {
    res.send(data.toString().replace('<!--__NEXT_DATA__-->', getInitialHTML['/']));
  });
});

app.get('/search', async (req, res) => {
  const movies = await getMovies(req.query);
  const initialData = {
    movies,
  };
  fs.readFile('index.html', (err, data) => {
    res.send(
      data.toString().replace(
        '<!--__NEXT_DATA__-->',
        `
      <script>
        window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}
      </script>
    ` + getInitialHTML['/search'](initialData)
      )
    );
  });
});

app.get('/api/search', async (req, res) => {
  const movies = await getMovies(req.query);
  return res.send(movies);
});

app.listen(port);

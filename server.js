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

app.get('/', (req, res) => {
  fs.readFile('index.html', (err, data) => {
    res.send(data.toString().replace('<!--__NEXT_DATA__-->', getInitialHTML['/']));
  });
});

app.get('/search', (req, res) => {
  const { keyword } = req.query;
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
  console.log(`Start Server 🚀 http://localhost:${port}`);
});

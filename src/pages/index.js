import { goToPage } from '../router';

export const getInitialHTML = () => {
  return `
     <h1>Movie Info</h1>
     <form>
          <input type="search" name="keyword" />
          <button type="submit">Search</button>
     </form>
  `;
};

export const renderIndex = () => {
  document.querySelector('#next').innerHTML = getInitialHTML();
  document.body.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    goToPage(`/search?keyword=${event.target.keyword.value}`, { isPush: true });
  });
};

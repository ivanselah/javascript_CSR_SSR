const routes = {
  '/': renderIndex,
  '/search': renderSearch,
};

window.addEventListener('popstate', (event) => {
  const targetRender = event.target.location.pathname;
  if (targetRender) {
    routes[targetRender]();
  }
});

const goToPage = (url) => {
  const pathname = url.split('?')[0];
  const targetRender = routes[pathname];
  if (targetRender) {
    history.pushState({}, '', url);
    targetRender();
    return;
  }
  location.href = url;
};

function renderIndex() {
  document.querySelector('#app').innerHTML = `<h1>Movie Info</h1>
   <form>
        <input type="search" name="keyword" />
        <button type="submit">Search</button>
   </form>
  `;
  document.body.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    goToPage(`/search?keyword=${event.target.keyword.value}`);
  });
}

function renderSearch() {
  document.querySelector('#app').innerHTML = `<h1>Search Page</h1>`;
}

renderIndex();

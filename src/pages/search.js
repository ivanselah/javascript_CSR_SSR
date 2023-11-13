export const getInitialHTML = (initialData) => {
  const { movies } = initialData;
  const isNotData = movies.results.length === 0;
  return `
    <h1>Search Page</h1>
    ${
      isNotData
        ? `<h5>검색하신 키워드에 매칭되는 데이터가 없습니다.</h5>`
        : `<ul>${movies.results.map((movie, index) => `<li key=${index}>${movie.title}</li>`).join('')}</ul>`
    }
  `;
};

export const renderSearch = async ({ searchParams, initialData }) => {
  const APP = document.querySelector('#next');
  const defaultInnerHTML = `
     <h1>Search Page</h1>
     <h4>Searching....</h4>
  `;
  APP.innerHTML = defaultInnerHTML;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };
  try {
    if (!searchParams.keyword) {
      throw new Error('no keyword');
    }
    if (!initialData) {
      const url = import.meta.env.DEV ? 'http://localhost:3000' : '';
      const movies = await (await fetch(`${url}/api/search?keyword=${searchParams.keyword}`, options)).json();
      APP.innerHTML = getInitialHTML({ movies });
      return;
    }
    APP.innerHTML = getInitialHTML(initialData);
  } catch (error) {
    APP.innerHTML = `
    <h1>Search Page</h1>
    <h4>검색 키워드가 잘못되었습니다.</h4>
    `;
  }
};

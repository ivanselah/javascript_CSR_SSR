export const renderSearch = async ({ searchParams }) => {
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
  const movies = await (await fetch(`http://localhost:3000/search?keyword=${searchParams.keyword}`, options)).json();
  const results = movies.results;
  const isNotData = results.length === 0;
  APP.innerHTML = `
      <h1>Search Page</h1>
      <h4>SearchKeyword : ${searchParams.keyword}</h4>
      ${
        isNotData
          ? `<h5>검색하신 키워드에 매칭되는 데이터가 없습니다.</h5>`
          : `<ul>${movies.results.map((movie, index) => `<li key=${index}>${movie.title}</li>`).join('')}</ul>`
      }
    `;
};

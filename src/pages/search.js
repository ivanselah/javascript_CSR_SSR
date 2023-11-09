export const renderSearch = ({ searchParams }) => {
  document.querySelector('#app').innerHTML = `<h1>Search Page</h1>
      <h4>SearchKeyword : ${searchParams.keyword}</h4>
    `;
};

class Routes {
  #routes = {};
  set setRoutes(params) {
    this.routes = params.routes;
  }
  get getRoutes() {
    return this.routes;
  }
}

const router = new Routes();

window.addEventListener('popstate', (event) => {
  const targetRender = event.target.location.pathname;
  if (targetRender) {
    router.getRoutes[targetRender]();
  }
});

export const goToPage = (url, { isPush } = {}) => {
  const [pathname, SearchKeyworld] = url.split('?');
  const params = Object.fromEntries(new URLSearchParams(SearchKeyworld));
  const targetRender = router.getRoutes[pathname];
  if (targetRender) {
    isPush && history.pushState({}, '', url);
    targetRender({
      searchParams: params,
    });
    return;
  }
  location.href = url;
};

export const start = (params) => {
  router.setRoutes = params;
  goToPage(location.pathname + location.search);
};

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

const getTargetValue = (url) => {
  const [pathname, SearchKeyworld] = url.split('?');
  const params = Object.fromEntries(new URLSearchParams(SearchKeyworld));
  return { pathname, params };
};

export const goToPage = (url, { isPush } = {}) => {
  const { pathname, params } = getTargetValue(url);
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

  window.addEventListener('popstate', (event) => {
    const targetLocation = event.target.location;
    const { pathname: targetRender, params } = getTargetValue(targetLocation.pathname + targetLocation.search);
    if (targetRender) {
      router.getRoutes[targetRender]({
        searchParams: params,
      });
    }
  });

  goToPage(location.pathname + location.search);
};

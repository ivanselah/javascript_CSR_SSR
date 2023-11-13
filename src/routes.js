import { renderIndex } from './pages';
import { renderSearch } from './pages/search';
import { getInitialHTML as getInitialHTMLForIndex } from './pages/index';
import { getInitialHTML as getInitialHTMLForSearch } from './pages/search';

export const routes = {
  '/': renderIndex,
  '/search': renderSearch,
};

export const getInitialHTML = {
  '/': getInitialHTMLForIndex,
  '/search': getInitialHTMLForSearch,
};

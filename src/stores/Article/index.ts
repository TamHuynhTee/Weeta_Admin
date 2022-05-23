import { ARTICLE_MODEL } from '@/models/Article.model';
import { createHook, createStore } from 'react-sweet-state';
import {
  getListArticleAsync,
  getListTopArticleAsync,
  loadMoreArticleAsync,
  getDetailArticleAsync,
  setDetailArticle,
} from './article.action';
import { selector } from './article.selector';

export type State = {
  article: {
    list: Array<ARTICLE_MODEL>;
    total: number;
    isOver: boolean;
    loading: boolean;
  };
  topArticle: {
    list: Array<ARTICLE_MODEL>;
    total: number;
    isOver: boolean;
    loading: boolean;
  };
  articleDetail: ARTICLE_MODEL | undefined;
};

const initialState: State = {
  article: {
    list: [],
    total: 0,
    isOver: false,
    loading: false,
  },
  topArticle: {
    list: [],
    total: 0,
    isOver: false,
    loading: false,
  },
  articleDetail: undefined,
};

const actions = {
  getListArticleAsync,
  getListTopArticleAsync,
  loadMoreArticleAsync,
  getDetailArticleAsync,
  setDetailArticle,
};

const Store = createStore({
  initialState,
  actions,
});

export const useArticle = createHook(Store, { selector: selector });

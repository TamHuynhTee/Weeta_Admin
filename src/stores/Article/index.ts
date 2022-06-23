import { ARTICLE_MODEL } from '@/models/Article.model';
import { createHook, createStore } from 'react-sweet-state';
import {
  getListArticleAsync,
  getListPendingArticleAsync,
  getDetailArticleAsync,
  setDetailArticle,
  approveArticleAsync,
  rejectArticleAsync,
  setDetailPending,
} from './article.action';
import { selector } from './article.selector';

export type State = {
  article: {
    list: Array<ARTICLE_MODEL>;
    total: number;
    isOver: boolean;
    loading: boolean;
  };
  pendingArticle: {
    list: Array<ARTICLE_MODEL>;
    total: number;
    isOver: boolean;
    loading: boolean;
  };
  articleDetail: ARTICLE_MODEL | undefined;
  pendingDetail: ARTICLE_MODEL | undefined;
};

const initialState: State = {
  article: {
    list: [],
    total: 0,
    isOver: false,
    loading: false,
  },
  pendingArticle: {
    list: [],
    total: 0,
    isOver: false,
    loading: false,
  },
  articleDetail: undefined,
  pendingDetail: undefined,
};

const actions = {
  getListArticleAsync,
  getListPendingArticleAsync,
  getDetailArticleAsync,
  setDetailArticle,
  approveArticleAsync,
  rejectArticleAsync,
  setDetailPending,
};

const Store = createStore({
  initialState,
  actions,
});

export const useArticle = createHook(Store, { selector: selector });

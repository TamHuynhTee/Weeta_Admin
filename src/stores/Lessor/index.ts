import { ACCOUNT_MODEL } from '@/models/Account.model';
import { ARTICLE_MODEL } from '@/models/Article.model';
import { createHook, createStore } from 'react-sweet-state';
import {
  getLessorArticleAsync,
  getListLessorAsync,
  getListPendingLessorAsync,
} from './lessor.action';
import { selector } from './lessor.selector';

export type State = {
  articles: {
    list: Array<ARTICLE_MODEL>;
    isOver: boolean;
    total: number;
    loading: boolean;
  };
  lessors: {
    list: Array<ACCOUNT_MODEL>;
    isOver: boolean;
    total: number;
    loading: boolean;
  };
  pendingLessors: {
    list: Array<ACCOUNT_MODEL>;
    isOver: boolean;
    total: number;
    loading: boolean;
  };
};

const initialState: State = {
  articles: {
    list: [],
    isOver: false,
    total: 0,
    loading: false,
  },
  lessors: {
    list: [],
    isOver: false,
    total: 0,
    loading: false,
  },
  pendingLessors: {
    list: [],
    isOver: false,
    total: 0,
    loading: false,
  },
};

const actions = {
  getLessorArticleAsync,
  getListLessorAsync,
  getListPendingLessorAsync,
};

const Store = createStore({
  initialState,
  actions,
});

export const useLessor = createHook(Store, { selector: selector });

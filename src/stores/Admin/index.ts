import { STATISTICS_MODEL } from '@/models/Admin.model';
import { createHook, createStore } from 'react-sweet-state';
import {
  getArticleOfWeekStatisticAsync,
  getTransactionAnnuallyStatisticAsync,
} from './admin.action';
import { selector } from './admin.selector';

export type State = {
  weeklyArticle: STATISTICS_MODEL[];
  annuallyRevenue: STATISTICS_MODEL[];
};

const initialState: State = {
  weeklyArticle: [],
  annuallyRevenue: [],
};

const actions = {
  getArticleOfWeekStatisticAsync,
  getTransactionAnnuallyStatisticAsync,
};

const Store = createStore({
  initialState,
  actions,
});

export const useAdmin = createHook(Store, { selector: selector });

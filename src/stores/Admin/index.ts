import { STATISTICS_MODEL } from '@/models/Admin.model';
import { createHook, createStore } from 'react-sweet-state';
import {
  getArticleOfWeekStatisticAsync,
  getTransactionAnnuallyStatisticAsync,
  getDashboardTotalStatisticAsync,
} from './admin.action';
import { selector } from './admin.selector';

export type State = {
  weeklyArticle: STATISTICS_MODEL[];
  annuallyRevenue: STATISTICS_MODEL[];
  dashboardTotalStatistic: [
    {
      totalTransactions: number;
      totalTransactionPrevMonth: number;
      totalTransactionInMonth: number;
    },
    {
      totalArticle: number;
      totalArticlePrevMonth: number;
      totalArticleInMonth: number;
    },
    {
      totalUser: number;
      totalUserPrevMonth: number;
      totalUserInMonth: number;
    },
    {
      totalLessor: number;
      totalLesorPrevMonth: number;
      totalLessorInMonth: number;
    }
  ];
};

const initialState: State = {
  weeklyArticle: [],
  annuallyRevenue: [],
  dashboardTotalStatistic: [
    {
      totalTransactions: 0,
      totalTransactionPrevMonth: 0,
      totalTransactionInMonth: 0,
    },
    {
      totalArticle: 0,
      totalArticlePrevMonth: 0,
      totalArticleInMonth: 0,
    },
    {
      totalUser: 0,
      totalUserPrevMonth: 0,
      totalUserInMonth: 0,
    },
    {
      totalLessor: 0,
      totalLesorPrevMonth: 0,
      totalLessorInMonth: 0,
    },
  ],
};

const actions = {
  getArticleOfWeekStatisticAsync,
  getTransactionAnnuallyStatisticAsync,
  getDashboardTotalStatisticAsync,
};

const Store = createStore({
  initialState,
  actions,
});

export const useAdmin = createHook(Store, { selector: selector });

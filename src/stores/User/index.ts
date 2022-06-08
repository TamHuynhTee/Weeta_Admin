import { ACCOUNT_MODEL } from '@/models/Account.model';
import { createHook, createStore } from 'react-sweet-state';
import { getListUserAsync, getLisBlockedUserAsync } from './user.action';
import { selector } from './user.selector';

export type State = {
  users: {
    list: Array<ACCOUNT_MODEL>;
    isOver: boolean;
    total: number;
    loading: boolean;
  };
  blockedUsers: {
    list: Array<ACCOUNT_MODEL>;
    isOver: boolean;
    total: number;
    loading: boolean;
  };
};

const initialState: State = {
  users: {
    list: [],
    isOver: false,
    total: 0,
    loading: false,
  },
  blockedUsers: {
    list: [],
    isOver: false,
    total: 0,
    loading: false,
  },
};

const actions = {
  getListUserAsync,
  getLisBlockedUserAsync,
};

const Store = createStore({
  initialState,
  actions,
});

export const useUser = createHook(Store, { selector: selector });

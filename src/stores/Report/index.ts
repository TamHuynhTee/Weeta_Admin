import { REASON_MODEL } from '@/models/Reason.model';
import { createHook, createStore } from 'react-sweet-state';
import {
  getListReasonAsync,
  createReasonAsync,
  updateReasonAsync,
  deleteReasonAsync,
  setDetailReason,
} from './report.action';
import { selector } from './report.selector';

export type State = {
  reasons: {
    list: Array<REASON_MODEL>;
    isOver: boolean;
    total: number;
    loading: boolean;
  };
  reasonDetail: REASON_MODEL | undefined;
};

const initialState: State = {
  reasons: {
    list: [],
    isOver: false,
    total: 0,
    loading: false,
  },
  reasonDetail: undefined,
};

const actions = {
  getListReasonAsync,
  createReasonAsync,
  updateReasonAsync,
  deleteReasonAsync,
  setDetailReason,
};

const Store = createStore({
  initialState,
  actions,
});

export const useReport = createHook(Store, { selector: selector });

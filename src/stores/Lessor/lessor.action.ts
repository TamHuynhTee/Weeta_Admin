import { notifyError } from '@/helpers/toast.helpers';
import {
  approveIdentityService,
  getListLessorService,
  getListPendingLessorService,
} from '@/services/apis/Admin';
import { IParamGetListLessor } from '@/services/apis/Admin/Admin.interface';
import { getLessorArticleService } from '@/services/apis/Lessor';
import { IReqGetLessorArticles } from '@/services/apis/Lessor/Lessor.interface';
import { defaultRegistry } from 'react-sweet-state';
import { State } from '.';
import { Store } from '../Auth';

type Actions = { setState: any; getState: () => State; dispatch: any };
const authInstance = defaultRegistry.getStore(Store);

export const getLessorArticleAsync =
  (params: Partial<IReqGetLessorArticles>) =>
  async ({ setState, getState }: Actions) => {
    authInstance.actions.setAppLoading(true);
    const result = await getLessorArticleService(params);
    authInstance.actions.setAppLoading(false);
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          articles: {
            list: result.data.articles,
            total: result.data.total,
          },
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const getListLessorAsync =
  (params: Partial<IParamGetListLessor>) =>
  async ({ setState, getState, dispatch }: Actions) => {
    dispatch(setLoadingLessor(true));
    const result = await getListLessorService(params);
    dispatch(setLoadingLessor(false));
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          lessors: {
            list: result.data.users,
            total: result.data.total,
          },
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const getListPendingLessorAsync =
  (params: Partial<IParamGetListLessor>) =>
  async ({ setState, getState, dispatch }: Actions) => {
    //   Chưa có api
    dispatch(setLoadingPendingLessor(true));
    const result = await getListPendingLessorService(params);
    dispatch(setLoadingPendingLessor(false));
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          pendingLessors: {
            list: result.data.users,
            total: result.data.total,
          },
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const approveIdentityAsync =
  (accountId: string) =>
  async ({ setState, getState }: Actions) => {
    const result = await approveIdentityService(accountId);
    if (result.error !== undefined) {
      if (!result.error) {
        const newList = [...getState().pendingLessors.list].filter(
          (item) => item._id === accountId
        );
        setState({
          ...getState(),
          pendingLessors: {
            list: newList,
            total: getState().pendingLessors.total - 1,
          },
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

const setLoadingLessor = (loading: boolean) => (actions: Actions) => {
  actions.setState({
    ...actions.getState(),
    lessors: {
      ...actions.getState().lessors,
      loading: loading,
    },
  });
};

const setLoadingPendingLessor = (loading: boolean) => (actions: Actions) => {
  actions.setState({
    ...actions.getState(),
    pendingLessors: {
      ...actions.getState().pendingLessors,
      loading: loading,
    },
  });
};

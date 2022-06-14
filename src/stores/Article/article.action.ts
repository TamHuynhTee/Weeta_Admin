import { notifyError } from '@/helpers/toast.helpers';
import { ARTICLE_MODEL } from '@/models/Article.model';
import {
  approveArticleService,
  rejectArticleService,
} from '@/services/apis/Admin';
import {
  getDetailArticleService,
  getListArticleService,
} from '@/services/apis/Article';
import { IParamGetArticle } from '@/services/apis/Article/Article.interface';
import { defaultRegistry } from 'react-sweet-state';
import { State } from '.';
import { Store } from '../Auth';

type Actions = { setState: any; getState: () => State; dispatch: any };
const authInstance = defaultRegistry.getStore(Store);

export const getListArticleAsync =
  (params: Partial<IParamGetArticle>) =>
  async ({ getState, setState, dispatch }: Actions) => {
    dispatch(setLoadingArticle(true));
    const result = await getListArticleService({
      ...params,
      isApproved: true,
    });
    dispatch(setLoadingArticle(false));
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          article: {
            ...getState().article,
            list: result.data.listData,
            total: result.data.total,
            isOver: result.data.isOver,
          },
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const getListPendingArticleAsync =
  (params: Partial<IParamGetArticle>) =>
  async ({ getState, setState, dispatch }: Actions) => {
    dispatch(setLoadingPendingArticle(true));
    const result = await getListArticleService({
      ...params,
      isApproved: false,
    });
    dispatch(setLoadingPendingArticle(false));
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          pendingArticle: {
            ...getState().pendingArticle,
            list: result.data.listData,
            total: result.data.total,
            isOver: result.data.isOver,
          },
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const getDetailArticleAsync =
  (articleId: string) =>
  async ({ getState, setState }: Actions) => {
    authInstance.actions.setAppLoading(true);
    const result = await getDetailArticleService(articleId);
    authInstance.actions.setAppLoading(false);
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          articleDetail: result.data,
        });
        return true;
      }
    }
    // notifyError(result.message);
    return false;
  };

export const setDetailArticle =
  (article: ARTICLE_MODEL | undefined) =>
  ({ setState, getState }: Actions) => {
    setState({
      ...getState(),
      articleDetail: article,
    });
  };

const setLoadingArticle = (loadingArticle: boolean) => (actions: Actions) => {
  actions.setState({
    ...actions.getState(),
    article: {
      ...actions.getState().article,
      loading: loadingArticle,
    },
  });
};

const setLoadingPendingArticle =
  (loadingArticle: boolean) => (actions: Actions) => {
    actions.setState({
      ...actions.getState(),
      pendingArticle: {
        ...actions.getState().pendingArticle,
        loading: loadingArticle,
      },
    });
  };

export const approveArticleAsync =
  (payload: { email: string; articleId: string }) =>
  async ({ getState, setState }: Actions) => {
    const result = await approveArticleService(payload);
    if (result.error !== undefined) {
      if (!result.error) {
        const newList = [...getState().pendingArticle.list].filter(
          (item) => item._id !== payload.articleId
        );
        setState({
          ...getState(),
          pendingArticle: {
            ...getState().pendingArticle,
            list: newList,
            total: getState().pendingArticle.total - 1,
          },
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const rejectArticleAsync =
  (payload: { email: string; articleId: string; reasonReject: string }) =>
  async ({ getState, setState }: Actions) => {
    const result = await rejectArticleService(payload);
    if (result.error !== undefined) {
      if (!result.error) {
        const newList = [...getState().pendingArticle.list].filter(
          (item) => item._id !== payload.articleId
        );
        setState({
          ...getState(),
          pendingArticle: {
            ...getState().pendingArticle,
            list: newList,
            total: getState().pendingArticle.total - 1,
          },
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

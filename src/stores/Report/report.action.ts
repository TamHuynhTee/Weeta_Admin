import { notifyError, notifySuccess } from '@/helpers/toast.helpers';
import { REASON_MODEL } from '@/models/Reason.model';
import {
  createReasonService,
  deleteReasonService,
  getReasonService,
  updateReasonService,
} from '@/services/apis/Reason';
import {
  IReqCreateReason,
  IReqUpdateReason,
} from '@/services/apis/Reason/Reason.interface';
import { State } from '.';

type Actions = { setState: any; getState: () => State; dispatch: any };

export const getListReasonAsync =
  () =>
  async ({ setState, getState, dispatch }: Actions) => {
    dispatch(setLoadingReason(true));
    const result = await getReasonService();
    dispatch(setLoadingReason(false));
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          reasons: {
            list: result.data.reasons,
            total: result.data.total,
          },
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const createReasonAsync =
  (payload: IReqCreateReason) =>
  async ({ setState, getState }: Actions) => {
    const result = await createReasonService(payload);
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          reasons: {
            list: [...getState().reasons.list, result.data],
            total: getState().reasons.total + 1,
          },
        });
        notifySuccess('Đã tạo lý do mới');
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const updateReasonAsync =
  (id: string, payload: IReqUpdateReason) =>
  async ({ setState, getState }: Actions) => {
    const result = await updateReasonService(id, payload);
    if (result.error !== undefined) {
      if (!result.error) {
        const newList = getState().reasons.list.map((item) => {
          if (item._id === id) return result.data;
          return item;
        });
        setState({
          ...getState(),
          reasons: {
            list: newList,
          },
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const deleteReasonAsync =
  (id: string) =>
  async ({ setState, getState }: Actions) => {
    const result = await deleteReasonService(id);
    if (result.error !== undefined) {
      if (!result.error) {
        const newList = getState().reasons.list.filter(
          (item) => item._id !== id
        );
        setState({
          ...getState(),
          reasons: {
            list: newList,
          },
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const setDetailReason =
  (reason: REASON_MODEL | undefined) =>
  ({ setState, getState }: Actions) => {
    setState({
      ...getState(),
      reasonDetail: reason,
    });
  };

const setLoadingReason = (loading: boolean) => (actions: Actions) => {
  actions.setState({
    ...actions.getState(),
    reasons: {
      ...actions.getState().reasons,
      loading: loading,
    },
  });
};

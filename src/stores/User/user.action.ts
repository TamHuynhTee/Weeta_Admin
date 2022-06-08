import { notifyError } from '@/helpers/toast.helpers';
import { getListUserService } from '@/services/apis/Admin';
import { IParamGetListUser } from '@/services/apis/Admin/Admin.interface';
import { State } from '.';

type Actions = { setState: any; getState: () => State; dispatch: any };

export const getListUserAsync =
  (params: Partial<IParamGetListUser>) =>
  async ({ setState, getState, dispatch }: Actions) => {
    dispatch(setLoadingUser(true));
    const result = await getListUserService(params);
    dispatch(setLoadingUser(false));
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          users: {
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

export const getLisBlockedUserAsync =
  (params: Partial<IParamGetListUser>) =>
  async ({ setState, getState, dispatch }: Actions) => {
    dispatch(setLoadingBlockedUser(true));
    const result = await getListUserService({ ...params, isActive: false });
    dispatch(setLoadingBlockedUser(false));
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          blockedUsers: {
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

const setLoadingUser = (loading: boolean) => (actions: Actions) => {
  actions.setState({
    ...actions.getState(),
    users: {
      ...actions.getState().users,
      loading: loading,
    },
  });
};

const setLoadingBlockedUser = (loading: boolean) => (actions: Actions) => {
  actions.setState({
    ...actions.getState(),
    blockedUsers: {
      ...actions.getState().blockedUsers,
      loading: loading,
    },
  });
};

import { State } from './index';
export const selector = (state: State) => {
  return {
    users: state.users,
    blockedUsers: state.blockedUsers,
  };
};

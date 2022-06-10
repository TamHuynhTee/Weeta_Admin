import { State } from './index';
export const selector = (state: State) => {
  return {
    reasons: state.reasons,
    reasonDetail: state.reasonDetail,
  };
};

import { State } from './index';
export const selector = (state: State) => {
  return {
    articles: state.articles,
    lessors: state.lessors,
    pendingLessors: state.pendingLessors,
    lessorDetail: state.lessorDetail,
  };
};

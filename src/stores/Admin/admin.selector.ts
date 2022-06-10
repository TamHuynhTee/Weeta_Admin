import { State } from './index';
export const selector = (state: State) => {
  return {
    weeklyArticle: state.weeklyArticle,
    annuallyRevenue: state.annuallyRevenue,
  };
};

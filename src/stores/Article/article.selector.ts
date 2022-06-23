import { State } from './index';
export const selector = (state: State) => {
  return {
    articles: state.article,
    pendingArticles: state.pendingArticle,
    articleDetail: state.articleDetail,
    pendingDetail: state.pendingDetail,
  };
};

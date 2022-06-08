import { ARTICLE_MODEL } from '@/models/Article.model';

export type resGetListArticle = {
  listData: Array<ARTICLE_MODEL>;
  total: number;
  isOver: boolean;
};

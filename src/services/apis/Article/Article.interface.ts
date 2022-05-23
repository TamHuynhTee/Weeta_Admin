import { GET_LIST_PARAMS } from '@/services/interfaces';

export interface IParamGetArticle extends GET_LIST_PARAMS {
  'area[gte]': string;
  'area[lte]': string;
  'price[gte]': string;
  'price[lte]': string;
  'startDate[gte]': string;
  district: string;
  ward: string;
  isApproved: boolean;
}

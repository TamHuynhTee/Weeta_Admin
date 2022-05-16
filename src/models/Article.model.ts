import { ENUM_TYPE_ARTICLE } from '@/constants/base.constants';
import { ACCOUNT_MODEL } from './Account.model';

export interface ARTICLE_MODEL {
  readonly _id: string;
  title: boolean;
  image: Array<string>;
  price: number;
  area: number;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  description: string;
  isApproved: boolean;
  isAvailable: boolean;
  isDelete: boolean;
  createdAt: string;
  servicePackageId: string;
  servicePackageName: ENUM_TYPE_ARTICLE;
  startDate: string;
  endDate: string;
  timeService: number;
  lessor: ACCOUNT_MODEL;
}

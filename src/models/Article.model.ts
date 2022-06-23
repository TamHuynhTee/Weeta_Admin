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
  facilities: FACILITIES_MODEL;
}

export type FACILITIES_MODEL = {
  typeUser: number[];
  electric: {
    price: number | null;
    unit: 'kWh';
  };
  water: {
    price: number | null;
    unit: 'perCapita' | 'block';
  };
  wifi: {
    price: number | null;
    unit: 'perCapita';
  };
  places_around: number[];
  limitTime: string;
  parking: boolean;
  liveWithOwner: boolean;
};

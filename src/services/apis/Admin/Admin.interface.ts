import { GET_LIST_PARAMS } from '@/services/interfaces';

export interface IParamGetListUser extends GET_LIST_PARAMS {
  isActive: boolean;
}

export interface IParamGetListLessor extends GET_LIST_PARAMS {
  isActive: boolean;
  isAutoApproved: boolean;
}

import { ENUM_TYPE_REASON } from '@/constants/base.constants';

export type IReqCreateReason = {
  title: string;
  type: ENUM_TYPE_REASON;
};

export type IReqUpdateReason = {
  title: string;
};

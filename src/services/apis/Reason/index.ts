import { RouteApi } from '@/constants/routeApi.constants';
import { REASON_MODEL } from '@/models/Reason.model';
import API from '../_config/repositoryApi';
import { ReturnResponse } from '../_config/response.interface';
import { IReqCreateReason, IReqUpdateReason } from './Reason.interface';
import { resGetReasons } from './Reason.type';

const url = RouteApi.reportReason;

export const createReasonService = (
  payload: IReqCreateReason
): Promise<ReturnResponse<REASON_MODEL>> => {
  return API.post(`${url}/`, {
    body: { ...payload },
  }) as any;
};

export const updateReasonService = (
  id: string,
  payload: IReqUpdateReason
): Promise<ReturnResponse<REASON_MODEL>> => {
  return API.patch(`${url}/${id}`, {
    body: { ...payload },
  }) as any;
};

export const deleteReasonService = (
  id: string
): Promise<ReturnResponse<any>> => {
  return API.delete(`${url}/${id}`) as any;
};

export const getReasonService = (): Promise<ReturnResponse<resGetReasons>> => {
  return API.get(`${url}/`) as any;
};

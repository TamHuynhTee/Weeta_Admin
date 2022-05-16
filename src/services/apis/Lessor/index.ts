import { RouteApi } from '@/constants/routeApi.constants';
import API from '../_config/repositoryApi';
import { ReturnResponse } from '../_config/response.interface';
import {
  IReqGetLessorArticles,
  IReqSendOPT,
  IReqVerifyOPT,
} from './Lessor.interface';
import { resGetLessorArticles } from './Lessor.type';

const url = RouteApi.lessor;

export const registerLessorService = (
  payload: IReqSendOPT
): Promise<ReturnResponse<string>> => {
  return API.post(`${url}/identifyPhoneNumber`, {
    body: { ...payload },
  }) as any;
};

export const verifyOTPService = (
  payload: IReqVerifyOPT
): Promise<ReturnResponse<any>> => {
  return API.post(`${url}/verifyOtp`, {
    body: { ...payload },
  }) as any;
};

export const getLessorArticleService = (
  params: Partial<IReqGetLessorArticles>
): Promise<ReturnResponse<resGetLessorArticles>> => {
  return API.get(`${url}/articles`, { ...params }) as any;
};

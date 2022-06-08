import { RouteApi } from '@/constants/routeApi.constants';
import API from '../_config/repositoryApi';
import { ReturnResponse } from '../_config/response.interface';
import { IParamGetListLessor, IParamGetListUser } from './Admin.interface';
import { resGetListUser } from './Admin.type';

const url = RouteApi.admin;

export const approveArticleService = ({
  email,
  articleId,
}: {
  email: string;
  articleId: string;
}): Promise<ReturnResponse<any>> => {
  return API.post(`${url}/approvedArticle/${articleId}`, {
    body: { email },
  }) as any;
};

export const rejectArticleService = ({
  email,
  articleId,
  reasonReject,
}: {
  email: string;
  articleId: string;
  reasonReject: string;
}): Promise<ReturnResponse<any>> => {
  return API.post(`${url}/rejectArticle/${articleId}`, {
    body: { email, reasonReject },
  }) as any;
};

export const approveIdentityService = (
  accountId: string
): Promise<ReturnResponse<any>> => {
  return API.post(`${url}/approvedIDCard/${accountId}`) as any;
};

export const getListUserService = (
  params: Partial<IParamGetListUser>
): Promise<ReturnResponse<resGetListUser>> => {
  return API.get(`${url}/get-list-user`, { ...params }) as any;
};

export const getListLessorService = (
  params: Partial<IParamGetListLessor>
): Promise<ReturnResponse<resGetListUser>> => {
  return API.get(`${url}/get-list-lessor`, { ...params }) as any;
};

export const getListPendingLessorService = (
  params: Partial<IParamGetListLessor>
): Promise<ReturnResponse<resGetListUser>> => {
  return API.get(`${url}/list-lessor-need-autoapproved`, { ...params }) as any;
};

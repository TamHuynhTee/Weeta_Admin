import { ENUM_PAYMENT_TYPE } from '@/constants/base.constants';
import { RouteApi } from '@/constants/routeApi.constants';
import { STATISTICS_MODEL } from '@/models/Admin.model';
import API from '../_config/repositoryApi';
import {
  ReturnListResponse,
  ReturnResponse,
} from '../_config/response.interface';
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

export const rejectIdentityService = (
  accountId: string
): Promise<ReturnResponse<any>> => {
  return API.post(`${url}/rejectIDCard/${accountId}`) as any;
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

export const getArticleOfWeekStatisticService = (): Promise<
  ReturnListResponse<STATISTICS_MODEL>
> => {
  return API.get(`${url}/article-of-week`) as any;
};

export const getTransactionAnnuallyStatisticService = (
  type: ENUM_PAYMENT_TYPE
): Promise<ReturnListResponse<STATISTICS_MODEL>> => {
  return API.get(`${url}/statistical-transaction?type=${type}`) as any;
};

export const getDashboardTotalStatisticService = (): Promise<
  ReturnResponse<
    [
      {
        totalTransactions: number;
        totalTransactionPrevMonth: number;
        totalTransactionInMonth: number;
      },
      {
        totalArticle: number;
        totalArticlePrevMonth: number;
        totalArticleInMonth: number;
      },
      {
        totalUser: number;
        totalUserPrevMonth: number;
        totalUserInMonth: number;
      },
      {
        totalLessor: number;
        totalLesorPrevMonth: number;
        totalLessorInMonth: number;
      }
    ]
  >
> => {
  return API.get(`${url}/total`) as any;
};

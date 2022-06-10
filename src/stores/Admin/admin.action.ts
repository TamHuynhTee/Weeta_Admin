import { ENUM_PAYMENT_TYPE } from '@/constants/base.constants';
import { notifyError } from '@/helpers/toast.helpers';
import {
  getArticleOfWeekStatisticService,
  getTransactionAnnuallyStatisticService,
} from '@/services/apis/Admin';
import { State } from '.';
type Actions = { setState: any; getState: () => State; dispatch: any };

export const getArticleOfWeekStatisticAsync =
  () =>
  async ({ getState, setState }: Actions) => {
    // dispatch(setLoadingArticle(true));
    const result = await getArticleOfWeekStatisticService();
    // dispatch(setLoadingArticle(false));
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          weeklyArticle: result.data,
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const getTransactionAnnuallyStatisticAsync =
  (type: ENUM_PAYMENT_TYPE) =>
  async ({ getState, setState }: Actions) => {
    const result = await getTransactionAnnuallyStatisticService(type);
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          annuallyRevenue: result.data,
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

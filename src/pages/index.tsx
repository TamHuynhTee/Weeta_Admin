import Breadcrumb from '@/components/common/BreadCrumb';
import CardDashboardInfo from '@/components/common/CardDashboardInfo';
import CustomAreaChart from '@/components/common/CustomAreaChart';
import CustomLineChart from '@/components/common/CustomLineChart';
import LineHorizontal from '@/components/common/LineHorizontal';
import LayoutCommon from '@/components/layout/LayoutCommon';
import { ENUM_PAYMENT_TYPE } from '@/constants/base.constants';
import { formatMoney } from '@/helpers/base.helpers';
import { useAdmin } from '@/stores/Admin';
import dayjs from 'dayjs';
import React from 'react';

const Home = () => {
  const [stateAdmin, actionAdmin] = useAdmin();
  const dashboardStatistic = stateAdmin.dashboardTotalStatistic;

  const getRate = React.useCallback((prev: number, current: number): number => {
    // const distance = current - prev;
    const denominator = prev > 0 ? prev : 1;
    return +(current / denominator / 100).toFixed(2);
  }, []);

  const fetchData = async () => {
    await actionAdmin.getDashboardTotalStatisticAsync();
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <LayoutCommon isVisibleSearchBar>
        <div className="w-full px-[10px] py-[10px]">
          <Breadcrumb arr_link={[{ value: 'Dashboard', href: '/' }]} />
          {/* Info */}
          <div className="flex items-center justify-between">
            <p className="mt-[5px] text-[14px]">
              <span className="font-bold text-gray-500">
                Cập nhật mới nhất:
              </span>{' '}
              {dayjs().format('DD-MM-YYYY')}
            </p>
            <button
              className="h-[20px] w-[20px] mr-[10px] ml-[10px] hover:rotate-180 transition-all"
              onClick={fetchData}
            >
              <img src={`/icons/ic_reload.png`} alt="icons" />
            </button>
          </div>
          <div className="mt-[5px] grid grid-cols-4 gap-x-[10px]">
            <CardDashboardInfo
              amount={formatMoney(dashboardStatistic[0].totalTransactions)}
              rate={getRate(
                dashboardStatistic[0].totalTransactionPrevMonth,
                dashboardStatistic[0].totalTransactionInMonth
              )}
              title="Doanh thu (VND)"
              icon="/icons/ic_sidebar_revenue.svg"
            />
            <CardDashboardInfo
              amount={`${dashboardStatistic[1].totalArticle}`}
              rate={getRate(
                dashboardStatistic[1].totalArticlePrevMonth,
                dashboardStatistic[1].totalArticleInMonth
              )}
              title="Bài viết"
              icon="/icons/ic_sidebar_article.svg"
            />
            <CardDashboardInfo
              amount={`${dashboardStatistic[2].totalUser}`}
              rate={getRate(
                dashboardStatistic[2].totalUserPrevMonth,
                dashboardStatistic[2].totalUserInMonth
              )}
              title="Người dùng"
              icon="/icons/ic_sidebar_user.svg"
            />
            <CardDashboardInfo
              amount={`${dashboardStatistic[3].totalLessor}`}
              rate={getRate(
                dashboardStatistic[3].totalLesorPrevMonth,
                dashboardStatistic[3].totalLessorInMonth
              )}
              title="Môi giới"
              icon="/icons/ic_sidebar_lessor.svg"
            />
          </div>
          {/* Chart */}
          <div className="mt-[10px] grid grid-cols-2 gap-x-[10px]">
            <AnnuallyTransaction />
            <WeeklyArticle />
          </div>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

const WeeklyArticle = () => {
  const [stateAdmin, actionAdmin] = useAdmin();

  React.useEffect(() => {
    (async () => {
      await actionAdmin.getArticleOfWeekStatisticAsync();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="col-span-1 p-[20px] border rounded-md bg-white">
      <div className="rounded-md">
        <p className="text-[16px] font-semibold">Bài viết trong tuần</p>
      </div>
      <LineHorizontal className="my-[5px]" />
      <div className="w-full mt-[20px] h-[300px]">
        <CustomLineChart data={stateAdmin.weeklyArticle} />
      </div>
    </div>
  );
};

const AnnuallyTransaction = () => {
  const [stateAdmin, actionAdmin] = useAdmin();

  React.useEffect(() => {
    (async () => {
      await actionAdmin.getTransactionAnnuallyStatisticAsync(
        ENUM_PAYMENT_TYPE.SERVICE_PACKAGE
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="col-span-1 p-[20px] border rounded-md bg-white">
      <div className="rounded-md">
        <p className="text-[16px] font-semibold">
          Doanh thu trong vòng 12 tháng
        </p>
      </div>
      <LineHorizontal className="my-[5px]" />
      <div className="w-full mt-[20px] h-[300px]">
        <CustomAreaChart data={stateAdmin.annuallyRevenue} />
      </div>
    </div>
  );
};

export default Home;

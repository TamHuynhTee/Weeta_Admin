import Breadcrumb from '@/components/common/BreadCrumb';
import CardDashboardInfo from '@/components/common/CardDashboardInfo';
import CustomAreaChart from '@/components/common/CustomAreaChart';
import CustomLineChart from '@/components/common/CustomLineChart';
import LineHorizontal from '@/components/common/LineHorizontal';
import LayoutCommon from '@/components/layout/LayoutCommon';
import { ENUM_PAYMENT_TYPE } from '@/constants/base.constants';
import { useAdmin } from '@/stores/Admin';
import dayjs from 'dayjs';
import React from 'react';

const Home = () => {
  const fetchData = () => {
    console.log('first');
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <LayoutCommon title="Weeta Dashboard" isVisibleSearchBar>
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
              amount={1000000}
              rate={14.25}
              title="Doanh thu"
              icon="/icons/ic_sidebar_revenue.svg"
            />
            <CardDashboardInfo
              amount={100}
              rate={-0.25}
              title="Bài viết"
              icon="/icons/ic_sidebar_article.svg"
            />
            <CardDashboardInfo
              amount={50}
              rate={0}
              title="Người dùng"
              icon="/icons/ic_sidebar_user.svg"
            />
            <CardDashboardInfo
              amount={20}
              rate={62}
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

import Breadcrumb from '@/components/common/BreadCrumb';
import CardDashboardInfo from '@/components/common/CardDashboardInfo';
import LayoutCommon from '@/components/layout/LayoutCommon';
import dayjs from 'dayjs';
import React from 'react';

const Home = () => {
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
            <button className="h-[20px] w-[20px] mr-[10px] ml-[10px] hover:rotate-180 transition-all">
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
          <div className="mt-[10px] grid grid-cols-8 gap-x-[10px]">
            <div className="col-span-5 p-[20px] border rounded-md bg-white"></div>
            <div className="col-span-3 p-[20px] border rounded-md bg-white"></div>
          </div>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

export default Home;

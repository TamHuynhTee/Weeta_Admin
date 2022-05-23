import LayoutCommon from '@/components/layout/LayoutCommon';
import Link from 'next/link';
import React from 'react';

const Home = () => {
  return (
    <React.Fragment>
      <LayoutCommon title="Weeta Dashboard" isVisibleSearchBar>
        <div className="w-full px-[10px] py-[10px]">
          <div className="flex justify-between items-center my-[30px]">
            <p className="text-[25px] font-bold text-[rgb(44_44_44)]">
              Khám phá
            </p>
            <Link href={'/thue-tro'}>
              <a className="text-[15px] hover:text-baseColor text-[rgb(44_44_44)]">
                Xem tất cả
              </a>
            </Link>
          </div>
          <div className="w-full flex flex-wrap"></div>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

export default Home;

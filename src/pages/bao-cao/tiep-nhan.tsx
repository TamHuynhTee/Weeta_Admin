import Breadcrumb from '@/components/common/BreadCrumb';
import LayoutCommon from '@/components/layout/LayoutCommon';
import React from 'react';

// type Props = {}
// const LIMIT = 10;

const Report = () => {
  return (
    <React.Fragment>
      <LayoutCommon>
        <div className="w-full px-[10px] py-[10px]">
          <Breadcrumb
            arr_link={[
              { value: 'Dashboard', href: '/' },
              { value: 'Báo cáo', href: '#!' },
            ]}
          />
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

export default Report;

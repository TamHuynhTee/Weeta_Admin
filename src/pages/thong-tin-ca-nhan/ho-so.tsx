import LayoutCommon from '@/components/layout/LayoutCommon';
import BoxProfile from '@/components/pages/thong-tin-ca-nhan/BoxProfile';
import Authentication from '@/HOC/auth.hoc';
import React from 'react';

const Profile = () => {
  //   console.log(router.query);
  return (
    <React.Fragment>
      <LayoutCommon title="Thông  tin cá nhân" isVisibleSearchBar>
        {/* <ContainerProfile> */}
        <BoxProfile />
        {/* </ContainerProfile> */}
      </LayoutCommon>
    </React.Fragment>
  );
};

export default Authentication(Profile, { requiredLogin: true });
// export default Profile;

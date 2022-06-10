import { DEFAULT_AVATAR } from '@/constants/base.constants';
import { useAuth } from '@/stores/Auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const NavLogged = () => {
  const router = useRouter();
  const [stateAuth, actionAuth] = useAuth();
  //   console.log(`stateAuth`, stateAuth);

  const handleLogout = () => {
    actionAuth.logoutAsync();
    router.push('/');
  };

  return (
    <div className="flex items-center ml-[25px] md:ml-[20px] gap-x-[20px]">
      <div className="wrap_menuAvatar">
        <div className="flex items-center gap-3">
          <div className="h-[40px] w-[40px] rounded-[50%] iconAvatar">
            <img
              src={stateAuth.auth ? stateAuth.auth.avatar : DEFAULT_AVATAR}
              className="w-full h-full object-cover rounded-[50%] user_avatar"
              alt="avatar"
            />
          </div>
          <span className="text-white font-semibold text-[18px] leading-[36px]">
            {stateAuth.auth?.fullname}
          </span>
        </div>
        <div className="wrap_contentHover">
          <div className="contentHover py-[16px]">
            <Link href="/thong-tin-ca-nhan/ho-so">
              <a className="menuProfile menuLinkHover">Thông tin cá nhân</a>
            </Link>
            <div className="lineMenu"></div>
            <button
              className="menuProfile menuLinkHover !text-red-500 font-bold"
              onClick={handleLogout}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavLogged;

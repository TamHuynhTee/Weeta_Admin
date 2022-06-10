import { getSplitPathName } from '@/helpers/base.helpers';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import MenuList from '../SideBarMenuList';
import styles from './styles.module.css';

const SideBar = ({ className }: { className?: string }) => {
  const router = useRouter();

  const SIDEBAR_MANAGE_LIST = [
    {
      href: '/',
      icons: '/icons/ic_sidebar_dashboard.svg',
      label: 'Dashboard',
      isLink: true,
      activeCondition: getSplitPathName(router.pathname, 1) === '',
      childList: [],
    },
    {
      href: '/danh-sach-bai-dang',
      icons: '/icons/ic_sidebar_article.svg',
      label: 'Bài đăng',
      isLink: false,
      activeCondition:
        getSplitPathName(router.pathname, 1) === 'danh-sach-bai-dang',
      childList: [
        {
          href: '/danh-sach-bai-dang/cho-duyet',
          icons: '/icons/ic_sidebar_pending_confirm.svg',
          label: 'Chờ duyệt',
          activeCondition: getSplitPathName(router.pathname, 2) === 'cho-duyet',
        },
        {
          href: '/danh-sach-bai-dang/danh-sach-bai-dang',
          icons: '/icons/ic_sidebar_list.svg',
          label: 'Danh sách',
          activeCondition:
            getSplitPathName(router.pathname, 2) === 'danh-sach-bai-dang',
        },
      ],
    },
    {
      href: '/danh-sach-nguoi-dung',
      icons: '/icons/ic_sidebar_user.svg',
      label: 'Người dùng',
      isLink: false,
      activeCondition:
        getSplitPathName(router.pathname, 1) === 'danh-sach-nguoi-dung',
      childList: [
        {
          href: '/danh-sach-nguoi-dung/danh-sach-nguoi-dung',
          icons: '/icons/ic_sidebar_list.svg',
          label: 'Danh sách',
          activeCondition:
            getSplitPathName(router.pathname, 2) === 'danh-sach-nguoi-dung',
        },
        {
          href: '/danh-sach-nguoi-dung/da-chan',
          icons: '/icons/ic_sidebar_blocked.svg',
          label: 'Đã chặn',
          activeCondition: getSplitPathName(router.pathname, 2) === 'da-chan',
        },
      ],
    },
    {
      href: '/danh-sach-moi-gioi',
      icons: '/icons/ic_sidebar_lessor.svg',
      label: 'Nhà môi giới',
      isLink: false,
      activeCondition:
        getSplitPathName(router.pathname, 1) === 'danh-sach-moi-gioi',
      childList: [
        {
          href: '/danh-sach-moi-gioi/danh-sach-moi-gioi',
          icons: '/icons/ic_sidebar_list.svg',
          label: 'Danh sách',
          activeCondition:
            getSplitPathName(router.pathname, 2) === 'danh-sach-moi-gioi',
        },
        {
          href: '/danh-sach-moi-gioi/duyet-cmnd',
          icons: '/icons/ic_sidebar_identity.svg',
          label: 'Duyệt CMND',
          activeCondition:
            getSplitPathName(router.pathname, 2) === 'duyet-cmnd',
        },
      ],
    },
    {
      href: '/doanh-thu',
      icons: '/icons/ic_sidebar_revenue.svg',
      label: 'Doanh thu',
      isLink: true,
      activeCondition: getSplitPathName(router.pathname, 1) === 'doanh-thu',
      childList: [],
    },
    {
      href: '/bao-cao',
      icons: '/icons/ic_sidebar_report.svg',
      label: 'Báo cáo',
      isLink: false,
      activeCondition: getSplitPathName(router.pathname, 1) === 'bao-cao',
      childList: [
        {
          href: '/bao-cao/tiep-nhan',
          icons: '/icons/ic_sidebar_receive.svg',
          label: 'Tiếp nhận',
          activeCondition: getSplitPathName(router.pathname, 2) === 'tiep-nhan',
        },
        {
          href: '/bao-cao/ly-do',
          icons: '/icons/ic_sidebar_reason.svg',
          label: 'Lý do',
          activeCondition: getSplitPathName(router.pathname, 2) === 'ly-do',
        },
      ],
    },
  ];

  const SIDEBAR_PROFILE_LIST = [
    {
      href: '/thong-tin-ca-nhan',
      icons: '/icons/ic_sidebar_profile.svg',
      label: 'Hồ sơ cá nhân',
      isLink: false,
      activeCondition:
        getSplitPathName(router.pathname, 1) === 'thong-tin-ca-nhan',
      childList: [
        {
          href: '/thong-tin-ca-nhan/ho-so',
          icons: '/icons/ic_sidebar_info.svg',
          label: 'Thông tin',
          activeCondition: getSplitPathName(router.pathname, 2) === 'ho-so',
        },
        {
          href: '/thong-tin-ca-nhan/doi-mat-khau',
          icons: '/icons/ic_sidebar_password.svg',
          label: 'Đổi mật khẩu',
          activeCondition:
            getSplitPathName(router.pathname, 2) === 'doi-mat-khau',
        },
      ],
    },
  ];

  return (
    <div
      className={`shadow transition-all delay-100 ${styles.sidebar} ${className}`}
      id="sidebar"
    >
      <div className="my-[10px]">
        <div className="px-[calc(0.325rem+16px)] flex items-center gap-3">
          <div className="h-[28px] w-[28px]">
            <img
              src="/favicon.ico"
              className="h-full w-full object-contain"
              alt="logo"
            />
          </div>
          <p className="leading-[36px] text-[22px] text-baseColor font-semibold">
            WEETA ADMIN
          </p>
        </div>
      </div>
      {/* List */}
      <MenuList caption="Quản lý" list={SIDEBAR_MANAGE_LIST} />
      <MenuList caption="Cá nhân" list={SIDEBAR_PROFILE_LIST} />
      {/* Footer */}
      <div className="mt-auto my-[10px] px-[16px] pt-[10px]">
        <p className="text-center text-[14px] font-semibold">
          &#169; WEETA HOUSING - {dayjs().get('year')}
        </p>
      </div>
    </div>
  );
};

export default SideBar;

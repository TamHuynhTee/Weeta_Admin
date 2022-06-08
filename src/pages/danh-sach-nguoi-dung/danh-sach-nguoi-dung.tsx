import Breadcrumb from '@/components/common/BreadCrumb';
import LineHorizontal from '@/components/common/LineHorizontal';
import LoadingComponent from '@/components/common/LoadingComponent';
import PaginationState from '@/components/common/PaginationState';
import LayoutCommon from '@/components/layout/LayoutCommon';
import NoResults from '@/components/pages/thue-tro/NoResults';
import { useUser } from '@/stores/User';
import React from 'react';

// type Props = {}
const LIMIT = 10;

const UserList = () => {
  return (
    <React.Fragment>
      <LayoutCommon>
        <div className="w-full px-[10px] py-[10px]">
          <Breadcrumb
            arr_link={[
              { value: 'Dashboard', href: '/' },
              { value: 'Danh sách người dùng', href: '#!' },
            ]}
          />
          <div className="mt-[10px]">
            <TableUser />
          </div>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

const TableUser = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [stateUser, actionUser] = useUser();

  const showRangeResult = `${
    stateUser.users.total > 0 ? (currentPage - 1) * LIMIT + 1 : 0
  } - ${
    LIMIT * currentPage > stateUser.users.total
      ? stateUser.users.total
      : LIMIT * currentPage
  }`;

  React.useEffect(() => {
    (async () => {
      await actionUser.getListUserAsync({
        limit: LIMIT,
        page: currentPage,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return stateUser.users.loading ? (
    <LoadingComponent />
  ) : stateUser.users.list.length > 0 ? (
    <>
      <table className="w-full">
        <thead className="bg-baseColor text-white rounded-[3px]">
          <tr>
            <th>STT</th>
            <th>Username</th>
            <th>Họ tên</th>
            <th>Điện thoại</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody className="">
          {stateUser.users.list.map((item, index) => (
            <tr key={index} className="hover:bg-slate-100 cursor-pointer">
              <td>{index + 1 + (currentPage - 1) * LIMIT}</td>
              <td>{item.username}</td>
              <td className="max_line-1">{item.fullname}</td>
              <td>{item.phoneNumber}</td>
              <td>Hành động</td>
            </tr>
          ))}
        </tbody>
      </table>
      <LineHorizontal className="my-[20px]" />
      <div className="flex items-center justify-between">
        <div className="">
          <p className="">
            Đang hiển thị{' '}
            <span className="text-baseColor font-bold">{showRangeResult}</span>{' '}
            trong{' '}
            <span className="text-baseColor font-bold">
              {stateUser.users.total}
            </span>{' '}
            người dùng
          </p>
        </div>
        <PaginationState
          total={stateUser.users.total}
          limit={LIMIT}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  ) : (
    <NoResults icon="/icons/ic_no_users.png" text="Chưa có người dùng" />
  );
};

export default UserList;

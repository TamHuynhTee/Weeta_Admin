import Breadcrumb from '@/components/common/BreadCrumb';
import LineHorizontal from '@/components/common/LineHorizontal';
import LoadingComponent from '@/components/common/LoadingComponent';
import PaginationState from '@/components/common/PaginationState';
import LayoutCommon from '@/components/layout/LayoutCommon';
import NoResults from '@/components/pages/thue-tro/NoResults';
import { useLessor } from '@/stores/Lessor';
import React from 'react';

// type Props = {}
const LIMIT = 10;

const PendingIdentityConfirmList = () => {
  return (
    <React.Fragment>
      <LayoutCommon>
        <div className="w-full px-[10px] py-[10px]">
          <Breadcrumb
            arr_link={[
              { value: 'Dashboard', href: '/' },
              { value: 'Danh sách chờ duyệt CMND', href: '#!' },
            ]}
          />
          <div className="mt-[10px]">
            <TableLessorPendingIdentity />
          </div>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

const TableLessorPendingIdentity = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [stateLessor, actionLessor] = useLessor();

  const showRangeResult = `${
    stateLessor.pendingLessors.total > 0 ? (currentPage - 1) * LIMIT + 1 : 0
  } - ${
    LIMIT * currentPage > stateLessor.pendingLessors.total
      ? stateLessor.pendingLessors.total
      : LIMIT * currentPage
  }`;

  React.useEffect(() => {
    (async () => {
      await actionLessor.getListPendingLessorAsync({
        limit: LIMIT,
        page: currentPage,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return stateLessor.pendingLessors.loading ? (
    <LoadingComponent />
  ) : stateLessor.pendingLessors.list.length > 0 ? (
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
          {stateLessor.pendingLessors.list.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-slate-100 cursor-pointer"
              //   onClick={function () {
              //     actionArticle.setDetailArticle(item);
              //   }}
            >
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
              {stateLessor.pendingLessors.total}
            </span>{' '}
            lượt chờ duyệt
          </p>
        </div>
        <PaginationState
          total={stateLessor.pendingLessors.total}
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

export default PendingIdentityConfirmList;

import Breadcrumb from '@/components/common/BreadCrumb';
import PaginationState from '@/components/common/PaginationState';
import LayoutCommon from '@/components/layout/LayoutCommon';
import { useArticle } from '@/stores/Article';
import dayjs from 'dayjs';
import React from 'react';

// type Props = {}
const LIMIT = 10;

const ArticleList = () => {
  return (
    <React.Fragment>
      <LayoutCommon>
        <div className="w-full px-[10px] py-[10px]">
          <Breadcrumb
            arr_link={[
              { value: 'Dashboard', href: '/' },
              { value: 'Danh sách bài đăng', href: '#!' },
            ]}
          />
          <div className="mt-[10px]">
            <TableArticleNotVerified />
          </div>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

const TableArticleNotVerified = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [stateArticle, actionArticle] = useArticle();

  React.useEffect(() => {
    (async () => {
      await actionArticle.getListArticleAsync({
        isApproved: false,
        limit: LIMIT,
        page: currentPage,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <>
      <p className="">Danh sách chưa duyệt</p>
      <table className="w-full">
        <thead className="bg-baseColor text-white rounded-[3px]">
          <tr>
            <th>STT</th>
            <th>Tên bài</th>
            <th>Ngày đăng</th>
            <th>Người đăng</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody className="">
          {stateArticle.articles.list.map((item, index) => (
            <tr key={index} className="hover:bg-slate-100 cursor-pointer">
              <td>{index + 1}</td>
              <td className="max_line1">{item.title}</td>
              <td>{dayjs(item.createdAt).format('DD/MM/YYYY')}</td>
              <td>{item.lessor?.fullname}</td>
              <td>Hành động</td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationState
        total={stateArticle.articles.total}
        limit={LIMIT}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default ArticleList;

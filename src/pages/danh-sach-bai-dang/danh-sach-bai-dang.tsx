import Breadcrumb from '@/components/common/BreadCrumb';
import LineHorizontal from '@/components/common/LineHorizontal';
import LoadingComponent from '@/components/common/LoadingComponent';
import PaginationState from '@/components/common/PaginationState';
import LayoutCommon from '@/components/layout/LayoutCommon';
import NoResults from '@/components/pages/thue-tro/NoResults';
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
              { value: 'Danh sách bài viết', href: '#!' },
            ]}
          />
          <div className="mt-[10px]">
            <TableArticle />
          </div>
        </div>
      </LayoutCommon>
    </React.Fragment>
  );
};

const TableArticle = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [stateArticle, actionArticle] = useArticle();

  const showRangeResult = `${
    stateArticle.articles.total > 0 ? (currentPage - 1) * LIMIT + 1 : 0
  } - ${
    LIMIT * currentPage > stateArticle.articles.total
      ? stateArticle.articles.total
      : LIMIT * currentPage
  }`;

  React.useEffect(() => {
    (async () => {
      await actionArticle.getListArticleAsync({
        limit: LIMIT,
        page: currentPage,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return stateArticle.articles.loading ? (
    <LoadingComponent />
  ) : stateArticle.articles.list.length > 0 ? (
    <>
      <table className="w-full">
        <thead className="bg-baseColor text-white rounded-[3px]">
          <tr>
            <th>STT</th>
            <th>Tên bài</th>
            <th>Ngày đăng</th>
            <th>Người đăng</th>
            {/* <th>Chi tiết</th> */}
          </tr>
        </thead>
        <tbody className="">
          {stateArticle.articles.list.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-slate-100 cursor-pointer"
              onClick={function () {
                actionArticle.setDetailArticle(item);
              }}
            >
              <td>{index + 1 + (currentPage - 1) * LIMIT}</td>
              <td className="max_line-1">{item.title}</td>
              <td>{dayjs(item.createdAt).format('DD/MM/YYYY')}</td>
              <td>{item.lessor?.fullname}</td>
              {/* <td>Hành động</td> */}
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
              {stateArticle.articles.total}
            </span>{' '}
            kết quả
          </p>
        </div>
        <PaginationState
          total={stateArticle.articles.total}
          limit={LIMIT}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  ) : (
    <NoResults icon="/icons/ic_no_articles.png" text="Chưa có bài viết" />
  );
};

export default ArticleList;

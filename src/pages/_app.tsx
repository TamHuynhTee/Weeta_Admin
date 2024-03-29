import Head from 'next/head';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAuth } from '@/stores/Auth';
import { getFromLocalStorage } from '@/helpers/base.helpers';
import socketService from '@/services/sockets/baseSocket';
import { BASE_CONSTANTS } from '@/constants/base.constants';
import SlideUpModal from '@/components/common/ContainerSlideUp';
import { useArticle } from '@/stores/Article';
import BoxDetailPendingArticle from '@/components/pages/bai-dang/BoxDetailPendingArticle';
import { useLessor } from '@/stores/Lessor';
import BoxDetailPending from '@/components/pages/duyet-cmnd/BoxDetailPending';
import BoxArticleDetail from '@/components/pages/bai-dang/BoxDetailArticle';

const MyApp = ({ Component, pageProps }: any) => {
  const Layout = Component.Layout || EmptyLayout;
  const [stateAuth] = useAuth();
  const [stateArticle, actionArticle] = useArticle();
  const [stateLessor, actionLessor] = useLessor();

  React.useEffect(() => {
    const token = getFromLocalStorage('token');
    if (token && stateAuth.isLoggedIn)
      (async () => {
        await socketService
          .connect(BASE_CONSTANTS.BASE_URL, token)
          //   .then(() => console.log('connected to socket'))
          .catch((err: any) => {
            console.log('err', err);
          });
      })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateAuth.isLoggedIn]);

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no"
        ></meta>
      </Head>
      <Layout>
        <Component {...pageProps} />
        {/* {stateAuth.loading && <LoadingComponent />} */}
        <Toaster reverseOrder={false} position="top-center" />
        {/* Slide up */}
        <SlideUpModal
          isVisible={!!stateArticle.pendingDetail}
          closeModal={function () {
            actionArticle.setDetailPending(undefined);
          }}
          title="Duyệt bài viết"
        >
          <BoxDetailPendingArticle />
        </SlideUpModal>
        <SlideUpModal
          isVisible={!!stateArticle.articleDetail}
          closeModal={function () {
            actionArticle.setDetailArticle(undefined);
          }}
          title="Chi tiết bài viết"
        >
          <BoxArticleDetail />
        </SlideUpModal>
        <SlideUpModal
          isVisible={!!stateLessor.pendingDetail}
          closeModal={function () {
            actionLessor.setDetailPending(undefined);
          }}
          title="Duyệt CMND"
        >
          <BoxDetailPending />
        </SlideUpModal>
      </Layout>
    </React.Fragment>
  );
};

const EmptyLayout = (props: { children: React.ReactElement }) => {
  return <>{props.children}</>;
};

export default MyApp;

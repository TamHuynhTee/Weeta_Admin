// import HeaderSearchSkill from 'components/common/HeaderSearchSkill';
// import NavLang from 'components/common/NavLang';
import { getSplitPathName } from '@/helpers/base.helpers';
import Authentication from '@/HOC/auth.hoc';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import ContainerModal from '../common/ContainerModal';
import NavLogged from '../common/NavLogged';
import ModalCreateLessor from '../pages/ModalCreateLessor';
import ModalFullOfArticle from '../pages/ModalFullOfArticle';

interface IProps {
  children: React.ReactElement;
  isVisibleSearchBar?: boolean;
  title?: string;
}

const LayoutCommon: FC<IProps> = ({
  children,
  //   isVisibleSearchBar = false,
  title = 'Weeta',
}: IProps) => {
  const [modalCreateLessor, setModalCreateLessor] = React.useState(false);
  const [modalFullOfArticle, setModalFullOfArticle] = React.useState(false);

  const closeCreateLessorModal = () => setModalCreateLessor(false);
  const closeFullOfArticleModal = () => setModalFullOfArticle(false);

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <header className="w-full sticky top-0z-[100] bg-green-400">
        <div className="mx-auto px-[20px]">
          <div className="flex items-center justify-between h-[60px]">
            <div className="flex items-center">
              <button className="font-bold text-[24px] leading-[36px] md:text-[24px] text-white flex items-center gap-3">
                <div className="h-[28px] w-[28px]">
                  <img
                    src="/icons/ic_hamburger_box.png"
                    className="h-full w-full object-contain"
                    alt=""
                  />
                </div>
              </button>
            </div>

            <div className="flex items-center">
              <NavLogged />
            </div>
          </div>
        </div>
      </header>
      <main className="flex h-[calc(100vh-60px)]">
        <SideBar />
        <div className="container_app mx-auto flex-1 max-h-[100%] overflow-y-auto">
          <div className="mx-[30px]">{children}</div>
        </div>
      </main>
      <ContainerModal
        isVisible={modalCreateLessor}
        closeModal={closeCreateLessorModal}
      >
        <ModalCreateLessor closeModal={closeCreateLessorModal} />
      </ContainerModal>
      <ContainerModal
        isVisible={modalFullOfArticle}
        closeModal={closeFullOfArticleModal}
      >
        <ModalFullOfArticle closeModal={closeFullOfArticleModal} />
      </ContainerModal>
    </React.Fragment>
  );
};

const SideBar = () => {
  const router = useRouter();
  return (
    <div className="min-w-[100px] max-w-[250px] h-[100%] border-r bg-[#f1f3f6] shadow">
      <div className="my-[10px]">
        <div className="px-[calc(0.325rem+16px)] flex items-center gap-3">
          <div className="h-[28px] w-[28px]">
            <img
              src="/favicon.ico"
              className="h-full w-full object-contain"
              alt=""
            />
          </div>
          <p className="leading-[36px] text-[24px] text-baseColor font-semibold">
            WEETA ADMIN
          </p>
        </div>
      </div>
      <ul className="my-[10px]">
        <li className="nav-item-caption">
          <span className="text-gray-500 pl-3">Quản lý</span>
        </li>
        <li
          className={`nav-item ${
            getSplitPathName(router.pathname, 1) === '' ? 'active' : ''
          }`}
        >
          <Link href={`/`}>
            <a className="nav-item-link">Dashboard</a>
          </Link>
        </li>
        <li
          className={`nav-item ${
            getSplitPathName(router.pathname, 1) === 'danh-sach-bai-dang'
              ? 'active'
              : ''
          }`}
        >
          <Link href={`/danh-sach-bai-dang`}>
            <a className="nav-item-link">Bài đăng</a>
          </Link>
        </li>
        <li className="nav-item-caption">
          <span className="text-gray-500 pl-3">Khác</span>
        </li>
        <li
          className={`nav-item ${
            getSplitPathName(router.pathname, 1) === 'thong-tin-ca-nhan'
              ? 'active'
              : ''
          }`}
        >
          <Link href={`/thong-tin-ca-nhan`}>
            <a className="nav-item-link">Profile</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Authentication(LayoutCommon, { requiredLogin: true });

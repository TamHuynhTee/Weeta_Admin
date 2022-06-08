// import HeaderSearchSkill from 'components/common/HeaderSearchSkill';
// import NavLang from 'components/common/NavLang';
import Authentication from '@/HOC/auth.hoc';
import Head from 'next/head';
import React, { FC } from 'react';
import ContainerModal from '../common/ContainerModal';
import NavLogged from '../common/NavLogged';
import SideBar from '../common/SideBar';
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
      <main className="flex h-screen">
        <input type="checkbox" id="toggle_sidebar" hidden />
        <SideBar className="" />
        <div className="container_app mx-auto flex-1">
          <header className="w-full sticky top-0 z-[100] bg-green-400">
            <div className="mx-auto px-[20px]">
              <div className="flex items-center justify-between h-[60px]">
                <div className="flex items-center">
                  <label
                    htmlFor="toggle_sidebar"
                    className="font-bold text-[24px] leading-[36px] md:text-[24px] text-white flex items-center gap-3 cursor-pointer"
                  >
                    <div className="h-[28px] w-[28px]">
                      <img
                        src="/icons/ic_hamburger_box.png"
                        className="h-full w-full object-contain"
                        alt=""
                      />
                    </div>
                  </label>
                </div>

                <div className="flex items-center">
                  <NavLogged />
                </div>
              </div>
            </div>
          </header>
          <div className="max-h-[calc(100%-60px)] overflow-y-auto">
            <div className="mx-[30px]">{children}</div>
          </div>
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

export default Authentication(LayoutCommon, { requiredLogin: true });

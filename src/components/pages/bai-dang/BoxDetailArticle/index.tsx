import ContainerModal from '@/components/common/ContainerModal';
import FacilitiesView from '@/components/common/FacilitiesView';
import GoogleMap from '@/components/common/GoogleMap';
import ImageSlide from '@/components/pages/bai-dang/ImageSlide';
import WidgetLessor from '@/components/pages/bai-dang/WidgetLessor';
import { formatMoney } from '@/helpers/base.helpers';
import { useArticle } from '@/stores/Article';
import dayjs from 'dayjs';
import React from 'react';
import ModalStopArticle from '../ModalStopArticle';

const BoxArticleDetail = () => {
  const [modalConfirm, setModalConfirm] = React.useState(false);
  const [stateArticle] = useArticle();

  const stopArticle = () => setModalConfirm(true);

  const data = stateArticle.articleDetail;

  return (
    <React.Fragment>
      <div className="px-[50px] py-[20px]">
        <div className="grid grid-cols-6 gap-[30px] h-full">
          {/* Detail */}
          <div className="col-span-4 h-full w-full">
            <ImageSlide images={data?.image} />
            <div className="mt-[20px]">
              <p className="font-bold text-[24px]">{data?.title}</p>
              <div className="flex items-center mt-[10px]">
                <div className="h-[24px] w-[24px]">
                  <img
                    src="/icons/ic_location.png"
                    className="w-full h-full object-contain"
                    alt="location"
                  />
                </div>
                <p className="font-normal text-[20px] leading-[30px]">
                  {data?.address}
                </p>
              </div>
              <p className="text-[36px] font-bold max_line-2 text-baseColor mt-[10px]">
                {formatMoney(data?.price || 0)}đ
              </p>
            </div>
            <div className="mt-[20px]">
              <p className="text-black-100 text-[18px] font-bold">
                Thông tin chính
              </p>
              <ul className="list-disc list-inside mt-[10px] grid grid-cols-2">
                <li className="col-span-1">
                  Diện tích:{' '}
                  <span className="text-baseColor">
                    {data?.area} m<sup>2</sup>
                  </span>
                </li>
                <li className="col-span-1">
                  Ngày đăng:{' '}
                  <span className="text-baseColor">
                    {dayjs(data?.createdAt).format('DD/MM/YYYY')}
                  </span>
                </li>
              </ul>
            </div>

            {data?.facilities && (
              <div className="mt-[20px]">
                <p className="text-black-100 text-[18px] font-bold">Tiện ích</p>
                <FacilitiesView facilities={data.facilities} />
              </div>
            )}

            <div className="mt-[20px]">
              <p className="text-black-100 text-[18px] font-bold">Giới thiệu</p>
              <p
                className="text-[16px] mt-[10px]"
                dangerouslySetInnerHTML={{
                  __html: data?.description || '',
                }}
              ></p>
            </div>
            <div className="mt-[20px]">
              <p className="text-black-100 text-[18px] font-bold">Bản đồ</p>
              <div className="w-full h-[400px] mt-[10px]">
                <GoogleMap />
              </div>
            </div>
          </div>
          {/* Lessor */}
          <div className="col-span-2 h-full w-full">
            <div className="sticky top-0">
              <WidgetLessor data={data?.lessor} />
              <div className="mt-[20px]">
                <button
                  className="button-outline-primary-red w-full mt-[10px]"
                  onClick={stopArticle}
                >
                  Khóa bài viết
                </button>
              </div>
            </div>
          </div>
        </div>
        <ContainerModal
          isVisible={modalConfirm}
          closeModal={() => setModalConfirm(false)}
        >
          <ModalStopArticle closeModal={() => setModalConfirm(false)} />
        </ContainerModal>
      </div>
    </React.Fragment>
  );
};

export default BoxArticleDetail;

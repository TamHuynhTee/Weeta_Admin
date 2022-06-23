import ContainerModal from '@/components/common/ContainerModal';
import LineHorizontal from '@/components/common/LineHorizontal';
import { DEFAULT_AVATAR } from '@/constants/base.constants';
import { useLessor } from '@/stores/Lessor';
import dayjs from 'dayjs';
import React from 'react';
import ImageSlide from '../../bai-dang/ImageSlide';
import ModalConfirm from '../ModalConfirm';

const BoxDetailPending = () => {
  const [modalConfirm, setModalConfirm] = React.useState({
    visible: false,
    confirm: false,
  });
  const [stateLessor] = useLessor();

  const confirm = () => setModalConfirm({ visible: true, confirm: true });
  const reject = () => setModalConfirm({ visible: true, confirm: false });

  const data = stateLessor.pendingDetail;

  return (
    <React.Fragment>
      <div className="px-[50px] py-[20px] grid grid-cols-12 gap-x-[50px]">
        <div className="col-span-4">
          <div className="flex flex-col justify-center items-center">
            <div className="h-[100px] w-[100px] rounded-[50%]">
              <img
                src={data?.avatar ? data.avatar : DEFAULT_AVATAR}
                className="w-full h-full object-cover rounded-[50%]"
                alt="avatar"
              />
            </div>
            <div className="h-full">
              <p className="text-black text-[20px] text-center font-bold hover:text-baseColor">
                {data?.fullname}
              </p>
            </div>
          </div>
          <LineHorizontal className="my-[20px]" />
          <div>
            <RowData label="Tên đăng nhập" value={data?.username} />
            <RowData label="Số điện thoại" value={data?.phoneNumber} />
            <RowData label="Email" value={data?.email} />
            <RowData
              label="Xác thực mail"
              value={data?.isEmailVerified ? 'Đã xác thực' : 'Chưa xác thực'}
            />
            <RowData label="Giới thiệu" value={data?.introduction} />
            <RowData
              label="Ngày đăng ký"
              value={dayjs(data?.createdAt).format('DD-MM-YYYY')}
            />
            <div className="mt-[20px]">
              <button className="button-primary w-full" onClick={confirm}>
                Duyệt
              </button>
              <button
                className="button-outline-primary-red w-full mt-[10px]"
                onClick={reject}
              >
                Không duyệt
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-8">
          <ImageSlide images={data?.IDCard} />
        </div>
        <ContainerModal
          isVisible={modalConfirm.visible}
          closeModal={() =>
            setModalConfirm({ ...modalConfirm, visible: false })
          }
        >
          <ModalConfirm
            closeModal={() =>
              setModalConfirm({ ...modalConfirm, visible: false })
            }
            confirm={modalConfirm.confirm}
          />
        </ContainerModal>
      </div>
    </React.Fragment>
  );
};

const RowData = ({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) => (
  <p className="mt-[10px] first:mt-0">
    <span className="font-bold text-baseColor">{label}</span>: {value}
  </p>
);

export default BoxDetailPending;

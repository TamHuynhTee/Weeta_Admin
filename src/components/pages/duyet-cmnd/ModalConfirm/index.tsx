import { useLessor } from '@/stores/Lessor';

/**
 * confirm: boolean
 * true: dong y
 * false: khong dong y
 */

interface ModalConfirmProps {
  closeModal: () => void;
  confirm: boolean;
}

const ModalConfirm = (props: ModalConfirmProps) => {
  const { closeModal, confirm } = props;
  const [stateLessor, actionLessor] = useLessor();

  const handleConfirm = async () => {
    const result = await actionLessor.approveIdentityAsync(
      stateLessor.pendingDetail?._id || ''
    );
    if (result) {
      closeModal();
      actionLessor.setDetailPending(undefined);
    }
  };

  const handleReject = async () => {
    const result = await actionLessor.rejectIdentityAsync(
      stateLessor.pendingDetail?._id || ''
    );
    if (result) {
      closeModal();
      actionLessor.setDetailPending(undefined);
    }
  };

  return (
    <div className="px-[18px] py-[25px] bg-white rounded-[12px] min-w-[400px]">
      <p className="text-[20px] font-bold text-black-100 text-center">
        {confirm ? 'Xác nhận duyệt CMND' : 'Xác nhận không duyệt CMND'}
      </p>
      {confirm ? (
        <div className="my-[15px]">
          <p className="text-center">Bạn xác nhận muốn duyệt CMND chứ?</p>
          <div className="my-[15px]">
            <button className="button-primary w-full" onClick={handleConfirm}>
              Xác nhận
            </button>
            <button
              className="button-outline-primary-grey w-full mt-[10px]"
              onClick={closeModal}
            >
              Hủy
            </button>
          </div>
        </div>
      ) : (
        <div className="my-[15px]">
          <p className="text-center">
            Bạn xác nhận muốn huỷ lượt duyệt CMND chứ?
          </p>
          <div className="my-[15px]">
            <button className="button-red w-full" onClick={handleReject}>
              Bỏ duyệt
            </button>
            <button
              className="button-outline-primary-grey w-full mt-[10px]"
              onClick={closeModal}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalConfirm;

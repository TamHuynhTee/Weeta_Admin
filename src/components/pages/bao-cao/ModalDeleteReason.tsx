import { useReport } from '@/stores/Report';

const ModalDeleteReason = ({ closeModal }: { closeModal: () => void }) => {
  const [stateReport, actionReport] = useReport();

  const handleDeleteReason = async () => {
    if (stateReport.reasonDetail) {
      const result = await actionReport.deleteReasonAsync(
        stateReport.reasonDetail._id
      );
      if (result) closeModal();
    }
  };

  return (
    <div className="px-[18px] py-[25px] bg-white rounded-[5px] min-w-[400px]">
      <p className="text-[22px] font-bold text-center mb-[16px]">
        Bạn muốn xóa lý do này ?
      </p>
      <div className="grid grid-cols-2 gap-x-[10px]">
        <button
          className="button-outline-primary-grey mt-[10px] w-full"
          type="button"
          onClick={closeModal}
        >
          Hủy
        </button>
        <button
          className="button-primary mt-[10px] w-full"
          type="button"
          onClick={handleDeleteReason}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default ModalDeleteReason;

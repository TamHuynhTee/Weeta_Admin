import { useArticle } from '@/stores/Article';

interface ModalConfirmProps {
  closeModal: () => void;
}

const ModalStopArticle = (props: ModalConfirmProps) => {
  const { closeModal } = props;
  const [stateArticle, actionArticle] = useArticle();

  const handleConfirm = async () => {
    // const result = await actionArticle.approveArticleAsync({
    //   articleId: stateArticle.articleDetail?._id || '',
    //   email: stateArticle.articleDetail?.lessor.email || '',
    // });
    // if (result) {
    //   closeModal();
    //   actionArticle.setDetailPending(undefined);
    // }
  };

  return (
    <div className="px-[18px] py-[25px] bg-white rounded-[12px] min-w-[400px]">
      <p className="text-[20px] font-bold text-black-100 text-center">
        Xác nhận khóa bài viết
      </p>
      <div className="my-[15px]">
        <p className="text-center">Bạn xác nhận khóa bài viết chứ?</p>
        <div className="my-[15px]">
          <button className="button-red w-full" onClick={handleConfirm}>
            Khóa
          </button>
          <button
            className="button-outline-primary-grey w-full mt-[10px]"
            onClick={closeModal}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalStopArticle;

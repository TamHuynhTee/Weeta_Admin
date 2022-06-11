import ErrorText from '@/components/common/ErrorText';
import LimitedTextArea from '@/components/common/LimitedTextArea';
import { useArticle } from '@/stores/Article';
import React from 'react';
import { useForm } from 'react-hook-form';

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
  const [stateArticle, actionArticle] = useArticle();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleConfirm = async () => {
    await actionArticle.approveArticleAsync({
      articleId: stateArticle.articleDetail?._id || '',
      email: stateArticle.articleDetail?.lessor.email || '',
    });
  };

  const handleReject = async (data: any) => {
    await actionArticle.rejectArticleAsync({
      articleId: stateArticle.articleDetail?._id || '',
      email: stateArticle.articleDetail?.lessor.email || '',
      reasonReject: data.reasonReject,
    });
  };

  return (
    <div className="px-[18px] py-[25px] bg-white rounded-[12px] min-w-[400px]">
      <p className="text-[20px] font-bold text-black-100 text-center">
        {confirm ? 'Xác nhận duyệt bài' : 'Xác nhận không duyệt bài'}
      </p>
      {confirm ? (
        <div className="my-[15px]">
          <p className="text-center">Bạn xác nhận muốn duyệt bài chứ?</p>
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
        <form className="my-[15px]" onSubmit={handleSubmit(handleReject)}>
          <div className="">
            <label
              htmlFor="reasonReject"
              className="block font-semibold mb-[10px]"
            >
              Xin hãy cho người cho thuê biết tại sao bài đăng của họ không được
              duyệt
            </label>
            <LimitedTextArea
              name="reasonReject"
              id="reasonReject"
              registerForm={register('reasonReject', {
                required: 'Xin hãy nhập lý do không duyệt bài',
              })}
              limit={600}
              value=""
              placeholder="Lý do không duyệt"
            />
            {errors.reasonReject && (
              <ErrorText>{errors.reasonReject.message}</ErrorText>
            )}
          </div>
          <button type="submit" className="button-primary w-full mt-[10px]">
            Xác nhận
          </button>
          <button
            type="button"
            className="button-outline-primary-grey w-full mt-[10px]"
            onClick={closeModal}
          >
            Hủy
          </button>
        </form>
      )}
    </div>
  );
};

export default ModalConfirm;

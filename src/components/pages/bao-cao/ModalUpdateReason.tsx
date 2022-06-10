import ErrorText from '@/components/common/ErrorText';
import InputField from '@/components/common/InputField';
import { ENUM_TYPE_REASON } from '@/constants/base.constants';
import { useReport } from '@/stores/Report';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Vui lòng nhập lý do'),
  type: yup.string().required('Vui lòng chọn loại phản ánh'),
});

const ModalUpdateReason = ({ closeModal }: { closeModal: () => void }) => {
  const [stateReport, actionReport] = useReport();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const reason = stateReport.reasonDetail;

  React.useEffect(() => {
    if (reason) {
      setValue('title', reason.title);
      setValue('type', reason.type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reason]);

  const handleUpdateReason = async (data: any) => {
    if (reason) {
      const result = await actionReport.updateReasonAsync(reason._id, {
        ...data,
      });
      if (result) closeModal();
    }
  };

  return (
    <div className="px-[18px] py-[25px] bg-white rounded-[5px] min-w-[400px]">
      <p className="text-[24px] font-bold text-center mb-[16px]">
        Chỉnh sửa lý do
      </p>
      <form className="" onSubmit={handleSubmit(handleUpdateReason)}>
        <div>
          <InputField
            type="text"
            register={register('title')}
            name="title"
            label="Tiêu đề lý do"
            errors={errors}
            placeholder="Nhập lý do"
          />
        </div>
        <div className="mt-[20px]">
          <label className="block font-semibold mb-[10px]">Loại</label>
          <div className="grid grid-cols-2 gap-x-[5px] items-center">
            <div className="col-span-1 flex items-center gap-x-[10px]">
              <input
                type="radio"
                id="article"
                {...register('type')}
                name="type"
                value="article"
                defaultChecked={reason?.type === ENUM_TYPE_REASON.ARTICLE}
              />
              <label htmlFor="article">Bài viết</label>
            </div>
            <div className="col-span-1 flex items-center gap-x-[10px]">
              <input
                type="radio"
                id="lessor"
                {...register('type')}
                name="type"
                value="lessor"
                defaultChecked={reason?.type === ENUM_TYPE_REASON.LESSOR}
              />
              <label htmlFor="lessor">Nhà môi giới</label>
            </div>
          </div>
          {errors.type && <ErrorText>{errors.type.message}</ErrorText>}
        </div>
        <button className="button-primary mt-[10px] w-full" type="submit">
          Cập nhật
        </button>
        <button
          className="button-outline-primary-grey mt-[10px] w-full"
          type="button"
          onClick={closeModal}
        >
          Hủy
        </button>
      </form>
    </div>
  );
};

export default ModalUpdateReason;

import ErrorText from '@/components/common/ErrorText';
import InputField from '@/components/common/InputField';
import { useReport } from '@/stores/Report';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Vui lòng nhập lý do'),
  type: yup.string().required('Vui lòng chọn loại phản ánh'),
});

const ModalCreateReason = ({ closeModal }: { closeModal: () => void }) => {
  const [, actionReport] = useReport();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const handleCreateReason = async (data: any) => {
    const result = await actionReport.createReasonAsync({ ...data });
    if (result) {
      reset();
      closeModal();
    }
  };

  return (
    <div className="px-[18px] py-[25px] bg-white rounded-[5px] min-w-[400px]">
      <p className="text-[24px] font-bold text-center mb-[16px]">
        Tạo lý do mới
      </p>
      <form className="" onSubmit={handleSubmit(handleCreateReason)}>
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
                defaultChecked
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
              />
              <label htmlFor="lessor">Nhà môi giới</label>
            </div>
          </div>
          {errors.type && <ErrorText>{errors.type.message}</ErrorText>}
        </div>
        <button className="button-primary mt-[10px] w-full" type="submit">
          Tạo
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

export default ModalCreateReason;

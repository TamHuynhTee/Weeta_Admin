import ContainerModal from '@/components/common/ContainerModal';
import InputField from '@/components/common/InputField';
import { useAuth } from '@/stores/Auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import BoxMenuAvatar from '../BoxAvatar';
import ModalAvatar from '../ModalAvatar';

const BoxProfile = () => {
  const [stateAuth, actionAuth] = useAuth();
  const [modalAvatar, setModalAvatar] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  React.useEffect(() => {
    if (stateAuth.auth) {
      setValue('username', stateAuth.auth.username);
      setValue('fullname', stateAuth.auth.fullname);
      setValue('email', stateAuth.auth.email);
      setValue('phoneNumber', stateAuth.auth.phoneNumber);
    }
  }, [stateAuth.auth, setValue]);

  const handleEditProfile = async (data: any) => {
    if (stateAuth.auth) {
      await actionAuth.updateProfileAsync(data);
    }
  };

  //   console.log(stateAuth.auth);

  return (
    <div className="mx-auto max-w-[700px] my-[50px]">
      <p className="text-black-100 text-[24px] font-bold">Thông tin cá nhân</p>
      <BoxMenuAvatar openModal={() => setModalAvatar(true)} />
      <form className="w-full" onSubmit={handleSubmit(handleEditProfile)}>
        <div className="mt-[20px]">
          <InputField
            type="text"
            register={register('username')}
            name="username"
            label="Tên đăng nhập"
            errors={errors}
            placeholder="Username"
          />
        </div>
        <div className="mt-[20px]">
          <InputField
            type="text"
            register={register('fullname')}
            name="fullname"
            label="Họ tên"
            errors={errors}
            placeholder="Họ tên của bạn"
          />
        </div>
        <div className="mt-[20px]">
          <InputField
            type="email"
            register={register('email')}
            name="email"
            label="Email"
            errors={errors}
            placeholder="Email của bạn"
            disabled
          />
        </div>
        <div className="mt-[20px]">
          <InputField
            type="text"
            register={register('phoneNumber')}
            name="phoneNumber"
            label="Số điện thoại"
            errors={errors}
            placeholder="Số điện thoại của bạn"
            disabled
          />
        </div>
        <input
          type="submit"
          className="button-primary w-32 mt-[30px] h-[40px] md:mt-[20px] md:h-[30px]"
          value="Lưu"
        />
      </form>
      <ContainerModal
        isVisible={modalAvatar}
        closeModal={() => setModalAvatar(false)}
      >
        <ModalAvatar closeModal={() => setModalAvatar(false)} />
      </ContainerModal>
    </div>
  );
};

export default BoxProfile;

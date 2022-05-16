import InputField from '@/components/common/InputField';
import { useAuth } from '@/stores/Auth';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schemaVerifyOTP = yup.object().shape({
  otp: yup
    .string()
    .required('Bạn chưa nhập mã OTP')
    .max(6, 'Mã OTP chỉ có 6 chữ số')
    .min(6, 'Mã OTP có 6 chữ số'),
});

const VerifyOTPPage = () => {
  const [, actionAuth] = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaVerifyOTP) });

  const handleSubmitOTP = async (data: any) => {
    const { otp } = data;
    const params = new URLSearchParams(window.location.search);
    const result = await actionAuth.verifyOTPAsync({
      otp,
      token: params.get('token') as string,
    });
    if (result) {
      router.push('/goi-dich-vu');
    }
  };

  const handleSendPhoneNumber = async () => {
    const params = new URLSearchParams(window.location.search);
    const phone = params.get('phoneNumber') as string;
    const result = await actionAuth.registerLessorAsync({
      phoneNumber: phone,
    });
    if (result.success) {
      router.push(`/xac-thuc-otp?phoneNumber=${phone}&token=${result.token}`);
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Xác thực số điện thoại</title>
      </Head>
      <div className="w-[100vw] h-[100vh] flex md:flex-col">
        <div className="w-[40%] md:w-full h-full px-[60px] md:px-[90px] py-[30px] overflow-y-auto">
          <Link href={'/'}>
            <a>
              <div className="flex items-center">
                <div className="h-[20px] w-[20px]">
                  <img
                    src="/favicon.ico"
                    className="w-full h-full object-fill"
                    alt=""
                  />
                </div>
                <h3 className="text-[24px] font-bold text-[#85b6ff] ml-[10px]">
                  Weeta Housing
                </h3>
              </div>
            </a>
          </Link>
          <div className="mt-[20px]">
            <h2 className="text-[36px] md:text-center font-bold lg:text-[28px]">
              Xác thực số điện thoại chủ cho thuê
            </h2>
            <p className="mt-[10px] text-[18px] md:text-center font-semibold text-[rgb(119_119_119)]">
              Hãy điền mã OTP được gửi vào số điện thoại của bạn để tiếp tục
            </p>
          </div>

          <form className="mt-[25px]" onSubmit={handleSubmit(handleSubmitOTP)}>
            <div>
              <InputField
                type="number"
                register={register('otp')}
                name="otp"
                label="Nhập mã OTP"
                errors={errors}
                placeholder="Cho xin cái otp"
              />
            </div>
            <button
              className="w-full bg-[rgb(0_132_137)] mt-[20px] text-[17px] text-white items-center h-[57px] font-bold flex justify-center rounded-[3px]"
              type="submit"
            >
              Xác thực
            </button>
            <button
              className="w-full bg-[#dee2e2] mt-[20px] text-[17px] text-gray-500 items-center h-[57px] font-bold flex justify-center rounded-[3px]"
              type="button"
              onClick={handleSendPhoneNumber}
            >
              Chưa nhận được mã, gửi lại
            </button>
          </form>
        </div>
        <div className="relative flex-1 h-full md:bg-none bg-[url('/images/login_background.png')] bg-center"></div>
      </div>
    </React.Fragment>
  );
};

export default VerifyOTPPage;

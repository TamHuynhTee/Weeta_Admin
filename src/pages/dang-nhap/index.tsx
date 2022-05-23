import InputField from '@/components/common/InputField';
import { useAuth } from '@/stores/Auth';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Email không được để trống'),
  //   phone: yup
  //     .string()
  //     .required('Chưa nhập số điện thoại')
  //     .matches(
  //       /(84|0[3|5|7|8|9|1|2|4|6])+([0-9]{8})\b/,
  //       'Số điện thoại không hợp lệ'
  //     ),
  password: yup.string().required('Mật khẩu không được để trống'),
});

const LoginPage = () => {
  const [, actionAuth] = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaLogin) });

  const handleSubmitLogin = async (data: any) => {
    const { email, password } = data;
    // console.log(`email`, email);
    const result = await actionAuth.loginAsync({ email, password });
    if (result) {
      router.push('/');
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <div className="w-[100vw] h-[100vh] flex justify-center">
        <div className="w-[40%] h-full px-[60px] md:px-[90px] py-[30px] overflow-y-auto">
          <Link href={'/'}>
            <a>
              <div className="flex items-center justify-center">
                <div className="h-[40px] w-[40px]">
                  <img
                    src="/favicon.ico"
                    className="w-full h-full object-fill"
                    alt=""
                  />
                </div>
              </div>
            </a>
          </Link>
          <div className="mt-[20px]">
            <h2 className="text-[36px] md:text-center font-bold lg:text-[28px] text-center">
              Đăng nhập
            </h2>
          </div>
          <form
            className="mt-[25px]"
            onSubmit={handleSubmit(handleSubmitLogin)}
          >
            <div>
              <InputField
                type="email"
                register={register('email')}
                name="email"
                label="Email"
                errors={errors}
                placeholder="Cho xin cái email"
              />
            </div>
            {/* <div>
              <InputField
                type="text"
                register={register('phone')}
                name="phone"
                label="Số điện thoại"
                errors={errors}
                placeholder="Nhập số điện thoại để đăng nhập"
              />
            </div> */}
            <div className="mt-[20px]">
              <InputField
                type="password"
                register={register('password')}
                name="password"
                label="Mật khẩu"
                placeholder="Nhập cho đúng nha"
                errors={errors}
              />
            </div>
            {/* <div className="my-[30px] flex justify-between items-center">
              <ToggleSwitch
                registerForm={register('rememberMe')}
                idToggleSw={'rememberMe'}
                labelText="Giữ đăng nhập"
                defaultChecked={false}
              />
              <Link href={`/quen-mat-khau`}>
                <a className="hover:no-underline hover:border-b-0">
                  <div>
                    <p className="text-[rgb(0_132_137)] text-[15px] font-bold">
                      Quên mật khẩu ?
                    </p>
                  </div>
                </a>
              </Link>
            </div> */}
            <button
              className="w-full my-[30px] bg-[rgb(0_132_137)] text-[17px] text-white items-center h-[57px] font-bold flex justify-center rounded-[3px]"
              type="submit"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;

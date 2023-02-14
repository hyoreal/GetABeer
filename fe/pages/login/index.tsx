import SubmitBtn from '@/components/button/SubmitBtn';
import { Input } from '@/components/inputs/Input';
import Head from 'next/head';
import { IoClose } from 'react-icons/io5';
import NaverBtn from '@/components/login/NaverBtn';
import GoogleBtn from '@/components/login/Googlebtn';
import KakaoBtn from '@/components/login/KakaoBtn';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { accessToken } from '@/atoms/login';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
interface IFormValues {
  email: string;
  password: string;
  text: string;
}
export default function Login() {
  const [, setAccessToken] = useRecoilState(accessToken);
  const [showLoginError, setShowLoginError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const handleClickLogin = () => {
    const reqBody = {
      email: inputEmail,
      password: inputPw,
    };
    axios
      .post('/api/login', reqBody)
      .then((res) => {
        console.log(res);
        console.log(res.headers.authorization);
        setAccessToken(res.headers.authorization);
      })
      .catch((err) => {
        console.log(err);
        setShowLoginError(true);
      });
  };

  const handleClick = () => {};
  const [inputEmail, setinputEmail] = useState('');
  const [inputPw, setInputPw] = useState('');
  return (
    <>
      <Head>
        <title>GetABeer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main className="m-auto h-screen max-w-4xl">
        <Link href={'/'}>
          <button className="m-4">
            <IoClose className="w-6 h-6" />
          </button>
        </Link>
        <div className="my-4 text-center text-lg bg-white rounded-lg font-semibold">
          로그인
        </div>
        <form onSubmit={handleSubmit(handleClickLogin)}>
          <div className="m-auto max-w-md">
            <Input
              type="email"
              placeholder="email@gmail.com"
              inputState={inputEmail}
              register={register}
              required
              setInputState={setinputEmail}
            />
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요."
              inputState={inputPw}
              register={register}
              required
              setInputState={setInputPw}
            />
            {showLoginError ? (
              <div className="m-3 text-red-500 text-xs">
                이메일 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을
                확인해주세요.
              </div>
            ) : null}
            <div className="m-2">
              <button
                type="submit"
                className="flex justify-center items-center w-full h-11 rounded-xl bg-y-gold hover:bg-orange-400 text-xs"
              >
                로그인
              </button>
            </div>
            <div className="my-3 flex justify-center gap-1.5 text-sm">
              <div className="text-y-gray font-light">만약 계정이 없다면?</div>
              <Link href={'/signup/email'}>
                <button className="flex text-y-brown">회원가입</button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2 my-6">
            <span className="h-px w-3/12  bg-gray-200"></span>
            <span className="text-y-gray text-sm font-light">
              소셜 계정 로그인
            </span>
            <span className="h-px w-3/12 bg-gray-200"></span>
          </div>
          <div className="flex justify-center gap-5">
            <KakaoBtn onClick={handleClick} />
            <NaverBtn onClick={handleClick} />
            <GoogleBtn onClick={handleClick} />
          </div>
        </form>
      </main>
    </>
  );
}

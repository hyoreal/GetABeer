import SubmitBtn from '@/components/button/SubmitBtn';
import NavBar from '@/components/NavBar';
import { Input } from '@/components/inputs/Input';
import Head from 'next/head';
import { IoChevronBack } from 'react-icons/io5';
import GenderBtn from '@/components/signup/GenderBtn';
import AgeBox from '@/components/signup/AgeBox';

export default function Information() {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {};
  return (
    <>
      <Head>
        <title>GetABeer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main className="m-auto h-screen max-w-4xl">
        <button className="m-4">
          <IoChevronBack className="w-6 h-6" />
        </button>
        <div className="my-8 text-center text-lg bg-white rounded-lg font-semibold">
          회원 정보 입력
        </div>
        <div className="m-auto max-w-md">
          <div className="flex justify-between">
            <div className="m-3 self-center">성별</div>
            <GenderBtn />
          </div>
          <div className="flex justify-between">
            <div className="m-3 self-center">연령</div>
            <AgeBox />
          </div>
          <SubmitBtn onClick={handleClick}>등록하기</SubmitBtn>
          <div className="my-3 flex justify-center gap-1.5 text-sm">
            <div className="text-y-gray font-light">
              나중에 입력하고 싶다면?
            </div>
            <button className="flex text-y-brown">Skip</button>
          </div>
        </div>
        <NavBar />
      </main>
    </>
  );
}

import Head from 'next/head';
import {
  IoHeartOutline,
  IoChevronForwardOutline,
  IoChatboxEllipsesOutline,
  IoLogOutOutline,
} from 'react-icons/io5';
import {
  HiPencil,
  HiOutlinePencil,
  HiOutlineChartPie,
  HiOutlineMapPin,
} from 'react-icons/hi2';
export default function Mypage() {
  return (
    <>
      <Head>
        <title>GetABeer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main className="m-auto h-screen max-w-4xl ">
        <div className="my-6 text-center text-lg bg-white font-semibold">
          마이 페이지
        </div>
        <div className="flex flex-col items-center my-6">
          <div className="w-28 h-28 bg-y-cream rounded-xl"></div>
          <div className="flex justify-center items-center gap-1 mt-2">
            <div>성유미님</div>
            <button className="w-5 h-5 text-y-brown">
              <HiPencil className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="m-2 border divide-y divide-gray-200 rounded-xl text-sm">
          <button className="flex w-full p-5 rounded-t-xl justify-between hover:bg-gray-200 ">
            <div className="flex gap-2">
              <IoHeartOutline className="self-center w-5 h-5" />
              위시 페이지
            </div>
            <IoChevronForwardOutline className="w-5 h-5 " />
          </button>
          <button className="flex w-full p-5 justify-between hover:bg-gray-200 ">
            <div className="flex gap-2 ">
              <HiOutlinePencil className="self-center w-5 h-5" />
              나의 코멘트
            </div>
            <IoChevronForwardOutline className="w-5 h-5" />
          </button>
          <button className="flex w-full p-5 justify-between hover:bg-gray-200 ">
            <div className="flex gap-2 ">
              <HiOutlineChartPie className="self-center w-5 h-5" />
              나의 페어링
            </div>
            <IoChevronForwardOutline className="w-5 h-5" />
          </button>
          <button className="flex w-full p-5 justify-between hover:bg-gray-200">
            <div className="flex gap-2 ">
              <IoChatboxEllipsesOutline className="self-center w-5 h-5" />
              나의 댓글
            </div>
            <IoChevronForwardOutline className="w-5 h-5" />
          </button>
          <button className="flex w-full p-5 justify-between hover:bg-gray-200">
            <div className="flex gap-2 ">
              <HiOutlineMapPin className="self-center w-5 h-5" />
              관심 가게
            </div>
            <IoChevronForwardOutline className="w-5 h-5" />
          </button>
          <button className="flex w-full p-5 rounded-b-xl justify-between hover:bg-gray-200">
            <div className="flex gap-2 ">
              <IoLogOutOutline className="self-center w-5 h-5" />
              로그아웃
            </div>
          </button>
        </div>
      </main>
    </>
  );
}

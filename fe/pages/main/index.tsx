import Head from 'next/head';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import SmallCardController from '@/components/smallCards/SmallCardController';
import SmallpairingController from '@/components/smallCards/SmallpairingController';
import BigInput from '@/components/inputs/BigInput';

export default function Main() {
  const cardProps = [
    {
      id: 1,
      star: 4.0,
      nickName: '유진님',
      description:
        '펠롱은 반짝이라는 의미의 제주 사투리 입니다.펠롱은 반짝이라는 의미제주 사투리 입니다,펠롱은 반짝이라는 의미의 제주 사투리 입니다,펠롱은반짝이라는 의미의 제주 사투리 입니다',
      date: '2023.41.30',
      comments: 5,
      thumbs: 10,
    },
    {
      id: 2,
      star: 4.0,
      nickName: '테스트',
      description:
        '펠롱은 반짝이라는 의미의 제주 사투리 입니다.펠롱은 반짝이라는 의미제주 사투리 입니다,펠롱은 반짝이라는 의미의 제주 사투리 입니다,펠롱은반짝이라는 의미의 제주 사투리 입니다',
      date: '2023.41.30',
      comments: 5,
      thumbs: 10,
    },
  ];
  const pairingProps = [
    {
      id: 1,
      pairing: '튀김',
      nickName: '유진님',
      description:
        '펠롱은 반짝이라는 의미의 제주 사투리 입니다.펠롱은 반짝이라는 의미제주 사투리 입니다,펠롱은 반짝이라는 의미의 제주 사투리 입니다,펠롱은반짝이라는 의미의 제주 사투리 입니다',
      date: '2023.41.30',
      comments: 5,
      thumbs: 10,
    },
    {
      id: 2,
      pairing: '구이',
      nickName: '테스트',
      description:
        '펠롱은 반짝이라는 의미의 제주 사투리 입니다.펠롱은 반짝이라는 의미제주 사투리 입니다,펠롱은 반짝이라는 의미의 제주 사투리 입니다,펠롱은반짝이라는 의미의 제주 사투리 입니다',
      date: '2023.41.30',
      comments: 5,
      thumbs: 10,
    },
    {
      id: 3,
      pairing: '견과류',
      nickName: '어렵네',
      description:
        '펠롱은 반짝이라는 의미의 제주 사투리 입니다.펠롱은 반짝이라는 의미제주 사투리 입니다,펠롱은 반짝이라는 의미의 제주 사투리 입니다,펠롱은반짝이라는 의미의 제주 사투리 입니다',
      date: '2023.41.30',
      comments: 5,
      thumbs: 10,
    },
  ];
  return (
    <>
      <Head>
        <title>GetABeer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <div className="h-screen m-auto max-w-4xl">
        <div>
          <main className="m-auto border-2 pb-14">
            <div className="py-2 bg-gray-200 text-black">상단헤더</div>
            <BigInput placeholder="페어링을 추천하는 이유를 적어주세요" />
            <Image
              className="m-auto"
              src="/images/adv.jpg"
              alt="adv"
              width={500}
              height={500}
              priority
            />
            <div className="m-auto">
              레이팅 소 카드
              <SmallCardController cardProps={cardProps} />
              페어링 소 카드
              <SmallpairingController pairingProps={pairingProps} />
            </div>
          </main>
          <NavBar />
        </div>
      </div>
    </>
  );
}

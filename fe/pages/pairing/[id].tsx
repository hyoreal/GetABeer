import Head from 'next/head';
import DetailCard from '@/components/pairing/DetailCard';
import NavBar from '@/components/NavBar';
import SpeechBalloon from '@/components/SpeechBalloon';
import CommentInput from '@/components/inputs/CommentInput';

// export interface PairingInfo {
//   id: number;
//   title: string;
//   nickname: string;
//   date: string;
//   category: string;
//   thumb: number;
//   image?: any;
//   description?: string;
// }

export default function PairingDetail() {
  const pairingProps: any = {
    beerId: 1,
    pairingId: 1,
    userId: 1,
    nickname: '닉네임1',
    content: '페어링 안내',
    imageList: [
      {
        pairingImageId: 1,
        imageUrl:
          'https://getabeer.s3.ap-northeast-2.amazonaws.com/image/2023-02-09-13-57-53-233/pairing_images_1_1.png',
        fileName: 'image/2023-02-09-13-57-53-233/pairing_images_1_1.png',
      },
      {
        pairingImageId: 2,
        imageUrl:
          'https://getabeer.s3.ap-northeast-2.amazonaws.com/image/2023-02-09-13-57-53-713/pairing_images_1_1.png',
        fileName: 'image/2023-02-09-13-57-53-713/pairing_images_1_1.png',
      },
    ],
    commentList: [
      {
        pairingId: 1,
        pairingCommentId: 1,
        userId: 1,
        nickname: '닉네임1',
        content: '페어링 댓글',
        createdAt: '2023-02-09T13:58:20.330872',
        modifiedAt: '2023-02-09T13:58:20.330872',
      },
      {
        pairingId: 1,
        pairingCommentId: 2,
        userId: 1,
        nickname: '닉네임1',
        content: '페어링 댓글',
        createdAt: '2023-02-09T13:58:23.619436',
        modifiedAt: '2023-02-09T13:58:23.619436',
      },
    ],
    category: 'GRILL',
    likeCount: 3,
    commentCount: 2,
    isUserLikes: true,
    createdAt: '2023-02-09T13:57:53.875197',
    modifiedAt: '2023-02-09T13:58:23.621731',
  };
  return (
    <>
      <Head>
        <title>GetABeer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main className="m-auto h-screen max-w-4xl">
        <div className="text-xl mt-4 mb-3 text-center font-semibold">
          페어링
        </div>
        <div className="rounded-lg bg-white text-y-black text-xs border-2 mx-2">
          <DetailCard pairingProps={pairingProps} />
          <div className="mx-3 mb-5">{/* <CommentInput /> */}</div>
          {pairingProps.commentList.map((el: any) => {
            // return <SpeechBalloon props={el} key={el.pairingCommentId} />;
          })}
        </div>
        <NavBar />
      </main>
    </>
  );
}

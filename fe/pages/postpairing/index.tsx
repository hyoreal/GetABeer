import Head from 'next/head';
import BigInput from '@/components/inputs/BigInput';
import PairingSelect from '@/components/selectBox/PairingSelect';
import ImageUpload from '../../components/postPairingPage/ImageUpload';
import PostDetailCard from '@/components/postPairingPage/PostDetailCard';
import CloseBtn from '@/components/button/CloseBtn';
import SubmitBtn from '@/components/button/SubmitBtn';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { currentBeer } from '@/atoms/currentBeer';
import axios from '@/pages/api/axios';

export default function PostPairing() {
  const router = useRouter();
  const [beerInfo] = useRecoilState(currentBeer);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('카테고리');
  const [isValid, setIsValid] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [jsonData, setJsonData] = useState({
    beerId: beerInfo.beerId,
    userId: 1,
    content: '',
    category: '',
  });
  const [finalData, setFinalData] = useState<any>('');
  // userId 로직 짜야함

  useEffect(() => {
    if (content.length >= 3 && category !== '카테고리') setIsValid(true);
    else setIsValid(false);
  }, [content, category]);

  const handleSubmit = () => {
    setJsonData({
      beerId: beerInfo.beerId,
      userId: 1,
      content: content,
      category: category,
    });

    const formData = new FormData();

    for (const file of imageData) {
      formData.append('files', file);
    }

    formData.append(
      'post',
      new Blob([JSON.stringify(jsonData)], { type: 'application/json' })
    );

    setFinalData(formData);
    // axios
    //   .post(`/pairings`, formData, config)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => console.log(error));
  };

  // 제출 로직 -> 500 뜨는거, 즉 한번에 잘 안들어가는거 행결해야함!!!
  useEffect(() => {
    const TOKEN = localStorage.getItem('accessToken');
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    if (finalData !== '') {
      console.log('finalData', finalData.get('post'));
      axios
        .post(`/pairings`, finalData, config)
        .then((response) => {
          console.log(response);
          router.back();
        })
        .catch((error) => console.log(error));
    }
  }, [finalData, router]);

  return (
    <>
      <Head>
        <title>GetABeer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <main className="m-auto h-screen max-w-4xl">
        <div className="p-5">
          <PostDetailCard beerInfo={beerInfo} />
          <div className="mt-6 mb-2 text-base font-semibold">
            페어링 카테고리
          </div>
          <PairingSelect category={category} setCategory={setCategory} />
          <ImageUpload imageData={imageData} setImageData={setImageData} />
          <div className="mt-6 mb-2 text-base font-semibold">설명</div>
          <BigInput
            placeholder="세글자 이상 적어주세요"
            inputState={content}
            setInputState={setContent}
          />
        </div>
        <div className="flex">
          <div className="flex-1">
            <CloseBtn onClick={() => router.back()}>나가기</CloseBtn>
          </div>
          <div className="flex-1">
            {isValid ? (
              <SubmitBtn onClick={handleSubmit}>등록하기</SubmitBtn>
            ) : (
              <div className="flex justify-center items-center w-full h-11 rounded-xl m-2 bg-red-100 text-xs text-red-500 -ml-[1px]">
                카테고리와 내용을 추가하세요
              </div>
            )}
          </div>
        </div>
        <div className="h-20"></div>
      </main>
    </>
  );
}

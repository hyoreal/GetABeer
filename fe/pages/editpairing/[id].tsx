import Head from 'next/head';
import BigInput from '@/components/inputs/BigInput';
import PairingSelect from '@/components/selectBox/PairingSelect';
import EditImage from '../../components/editPairingPage/EditImage';
import PostDetailCard from '@/components/postPairingPage/PostDetailCard';
import CloseBtn from '@/components/button/CloseBtn';
import SubmitBtn from '@/components/button/SubmitBtn';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CategoryMatcherToKor } from '@/utils/CategryMatcher';
import axios from '@/pages/api/axios';

export default function EditPairing() {
  const router = useRouter();
  const pairingId = router.query.id;
  const [beerInfo, setBeerInfo] = useState<any>();

  const [content, setContent] = useState<any>('');
  const [category, setCategory] = useState<any>('');

  // 이미지 관련 데이터
  const [imageData, setImageData] = useState([]);
  const [url, setUrl] = useState<any>([]);
  const [types, setTypes] = useState<any>([]);
  const [finalData, setFinalData] = useState<any>('');

  useEffect(() => {
    if (pairingId !== undefined) {
      axios
        .get(`/api/pairings/${pairingId}`)
        .then((response) => {
          setCategory(response.data.category);
          setContent(response.data.content);

          if (url.length === 0) {
            const tmpImageData = response.data.imageList;
            const tmpType = [];
            const tmpUrl = [];
            // 이미지 데이터 넣기
            for (const image of tmpImageData) {
              tmpType.push(`url=${image.pairingImageId}`);
              tmpUrl.push(image.imageUrl);
            }
            if (tmpType.length > 0) setTypes(tmpType);
            if (tmpUrl.length > 0) setUrl(tmpUrl);
          }
          // 맥주 상세 정보
          axios
            .get(`/api/beers/${response.data.beerId}`)
            .then((response) => setBeerInfo(response.data));
        })
        .catch((error) => console.log(error));
    }
  }, [pairingId, types, url]);

  // Vaild 로직
  const [isValid, setIsValid] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    if (content.length >= 3 && category !== '카테고리') setIsValid(true);
    else setIsValid(false);
  }, [content, category]);

  // Post 제출 로직
  const handleSubmit = () => {
    const beerId = beerInfo?.beerId;
    const finalTypeList = [];
    const finalIdList = [];
    for (const check of types) {
      if (check[3] === '=') {
        let tmpType = check.split('=');
        finalTypeList.push(tmpType[0]);
        finalIdList.push(Number(tmpType[1]));
      } else {
        finalTypeList.push('file');
      }
    }
    let jsonData = {
      beerId: beerId,
      type: finalTypeList,
      url: finalIdList,
      content: content,
      category: category,
    };
    const formData = new FormData();
    for (const file of imageData) {
      formData.append('files', file);
    }
    formData.append(
      'patch',
      new Blob([JSON.stringify(jsonData)], { type: 'application/json' })
    );

    setFinalData(formData);
  };
  // Submit 과 formData 변경 감지 후 로직
  useEffect(() => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    if (finalData !== '' && !isSubmit) {
      setIsSubmit(true);
      // console.log('finalData', finalData.get('patch'));
      axios
        .patch(`/api/pairings/${pairingId}`, finalData, config)
        .then((response) => {
          router.push(`/beer/${beerInfo.beerId}`);
        })
        .catch((error) => console.log(error));
    }
  }, [finalData, router, isSubmit, beerInfo, pairingId]);

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
          <EditImage
            imageData={imageData}
            setImageData={setImageData}
            url={url}
            setUrl={setUrl}
            type={types}
            setType={setTypes}
          />
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

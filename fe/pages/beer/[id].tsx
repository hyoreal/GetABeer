import Head from 'next/head';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import SmallRatingCard from '@/components/smallCards/SmallRatingCard';
import SmallPairingCard from '@/components/smallCards/SmallPairingCard';
import SimilarBeer from '@/components/smallCards/SimilarBeer';
import RatingTitle from '@/components/beerPage/RatingTitle';
import PairingTitle from '@/components/beerPage/PairingTitle';
import BeerDetailCard from '@/components/beerPage/BeerDetailCard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentBeer } from '@/atoms/currentBeer';
import {
  BeerInfo,
  RatingInfo,
  PairingInfo,
  SimilarBeerProps,
  RatingCardProps,
  PairingCardProps,
} from '@/components/beerPage/BeerDeclare';
import axios from '@/pages/api/axios';
import { useRecoilValue } from 'recoil';
import { userId } from '@/atoms/login';
import Loading from '@/components/postPairingPage/Loading';
import { accessToken } from '@/atoms/login';
export default function Beer() {
  const router = useRouter();
  const [curRoute, setCurRoute] = useState<number | undefined>();
  useEffect(() => {
    if (router.query.id !== undefined) {
      setCurRoute(Number(router.query.id));
    }
  }, [router, curRoute]);

  const [beerInfo, setBeerInfo] = useState<BeerInfo>();
  const [, setCurBeer] = useRecoilState(currentBeer);
  const [ratingInfo, setRatingInfo] = useState<RatingInfo>();
  const [pairingInfo, setPairingInfo] = useState<PairingInfo>();
  const [similarBeer, setSimilarBeer] = useState<SimilarBeerProps[]>();
  const [hasRating, setHasRating] = useState<boolean>(false);
  const [myRatingId, setMyRatingId] = useState<number>();
  const USERID: number = useRecoilValue(userId);
  const [TOKEN] = useRecoilState<string>(accessToken);
  useEffect(() => {
    // 특정 맥주 조회
    if (curRoute !== undefined) {
      axios
        .get(`/api/beers/${curRoute}`)
        .then((response) => {
          setBeerInfo(response.data);
          setCurBeer(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [curRoute, setCurBeer]);

  useEffect(() => {
    // 코멘트 페이지 조회
    if (curRoute !== undefined) {
      axios
        .get(`/api/ratings/page/mostlikes?beerId=${curRoute}&page=1&size=5`)
        .then((response) => {
          setRatingInfo(response.data);
          if (USERID === response?.data?.data[0]?.userId) {
            setHasRating(true);
            setMyRatingId(response.data.data[0].ratingId);
          } else {
            setHasRating(false);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [curRoute, USERID]);

  useEffect(() => {
    // 페어링 페이지 조회
    if (curRoute !== undefined) {
      axios
        .get(
          `/api/pairings/page/mostlikes/all?beerId=${curRoute}&page=1&size=5`
        )
        .then((response) => setPairingInfo(response.data))
        .catch((error) => console.log(error));
    }
  }, [curRoute]);

  useEffect(() => {
    // 비슷한 맥주 조회
    if (curRoute !== undefined) {
      axios
        .get(`/api/beers/${curRoute}/similar`)
        .then((response) => {
          setSimilarBeer(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [curRoute]);

  return (
    <>
      <Head>
        <title>GetABeer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <main className="m-auto h-screen max-w-4xl relative">
        <Image
          className=" w-full h-screen left-0 top-0 fixed -z-10 select-none"
          src="/images/background.png"
          alt="bg"
          width={500}
          height={500}
        />
        {beerInfo === undefined ? (
          <div className="inset-0 flex justify-center items-center fixed z-10 ">
            <div className="w-fit m-2 p-5 z-[11] text-base lg:text-lg text-y-gold rounded-lg">
              <Loading />
            </div>
          </div>
        ) : (
          <>
            <div className="m-3">
              <BeerDetailCard
                cardProps={beerInfo}
                hasRating={hasRating}
                myRatingId={myRatingId}
              />
            </div>
            {/* 평가 */}
            <RatingTitle
              ratingCount={ratingInfo?.pageInfo?.totalElements}
              beerId={curRoute}
            />

            <div>
              {ratingInfo === undefined || ratingInfo?.data.length === 0 ? (
                <div className="noneContent text-xs lg:text-sm">
                  <Image
                    className="m-auto pb-3 opacity-50"
                    src="/images/logo.png"
                    alt="logo"
                    width={40}
                    height={40}
                  />
                  등록된 평가가 없습니다.
                </div>
              ) : (
                <Swiper
                  className="w-full h-fit"
                  slidesPerView={2.2}
                  spaceBetween={10}
                  modules={[Pagination]}
                >
                  {ratingInfo?.data.map((el: RatingCardProps) => (
                    <SwiperSlide key={el?.ratingId}>
                      <SmallRatingCard ratingProps={el} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
            {/* 페어링 */}
            {pairingInfo === undefined ? (
              <PairingTitle pairngCount={0} beerId={curRoute} />
            ) : (
              <PairingTitle
                pairngCount={pairingInfo?.pageInfo?.totalElements}
                beerId={curRoute}
              />
            )}
            <div>
              {pairingInfo === undefined || pairingInfo?.data.length === 0 ? (
                <div className="noneContent text-xs lg:text-sm">
                  <Image
                    className="m-auto pb-3 opacity-50"
                    src="/images/logo.png"
                    alt="logo"
                    width={40}
                    height={40}
                  />
                  등록된 페어링이 없습니다.
                </div>
              ) : (
                <Swiper
                  className="w-full h-fit"
                  slidesPerView={2.2}
                  spaceBetween={10}
                  modules={[Pagination]}
                >
                  {pairingInfo?.data.map((el: PairingCardProps) => (
                    <SwiperSlide key={el?.pairingId}>
                      <SmallPairingCard pairingProps={el} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
            <SimilarBeer similarBeer={similarBeer} />

            <div className="h-20"></div>
          </>
        )}
      </main>
    </>
  );
}

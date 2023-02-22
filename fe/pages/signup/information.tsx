import SubmitBtn from '@/components/button/SubmitBtn';
import Head from 'next/head';
import { IoChevronBack } from 'react-icons/io5';
import GenderBtn from '@/components/signup/GenderBtn';
import AgeBox from '@/components/signup/AgeBox';
import InterestTag from '@/components/signup/ InterestTag';
import BeerCategory from '@/components/signup/BeerCategory';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import axios from '@/pages/api/axios';

interface IFormValues {
  userBeerTags: string;
  gender: string;
  age: string;
  userBeerCategories: string;
}

export default function Information() {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      gender: 'REFUSE',
      age: 'REFUSE',
      userBeerCategories: '',
      userBeerTags: '',
    },
    mode: 'onChange',
  });

  const onValid = (data: any) => {
    // 기본으로 data 가져오기
    console.log(data);
    const { gender, age, userBeerCategories, userBeerTags } = getValues();
    signUpClick(gender, age, userBeerCategories, userBeerTags);
  };

  const signUpClick = (
    gender: string,
    age: string,
    userBeerCategories: any,
    userBeerTags: any
  ) => {
    const reqBody = {
      gender: gender,
      age: age,
      userBeerCategories: userBeerCategories,
      userBeerTags: userBeerTags,
    };
    axios
      .post(`/register/user/${Router.query.userId}`, reqBody)
      .then((res) => {
        console.log(res);
        Router.push({
          pathname: '/',
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
        <button className="m-4">
          <IoChevronBack className="w-6 h-6" />
        </button>
        <div className="my-4 text-center text-lg bg-white rounded-lg font-semibold">
          회원정보 입력
        </div>
        <form onSubmit={handleSubmit(onValid)}>
          <div className="m-auto max-w-md mb-10 p-1">
            <div className="border divide-y divide-gray-200 rounded-xl">
              <GenderBtn register={register} />
              <AgeBox register={register} />
              <div>
                <BeerCategory
                  register={register}
                  rules={{
                    validate: {
                      validate: (userBeerCategories) =>
                        userBeerCategories.length < 3 ||
                        '최대 2개까지 선택 가능합니다!',
                    },
                  }}
                />
                {errors.userBeerCategories && (
                  <p className="flex text-xs mx-3 mb-1 gap-0.5 text-red-500 font-light">
                    {errors.userBeerCategories.message}
                  </p>
                )}
              </div>
              <div>
                <InterestTag
                  register={register}
                  rules={{
                    validate: {
                      validate: (userBeerTags) =>
                        userBeerTags.length < 5 ||
                        '최대 4개까지 선택 가능합니다!',
                    },
                  }}
                />
                {errors.userBeerTags && (
                  <p className="flex text-xs  mx-3 mb-1 gap-0.5 text-red-500 font-light">
                    {errors.userBeerTags.message}
                  </p>
                )}
              </div>
              <SubmitBtn onClick={undefined}>등록하기</SubmitBtn>
            </div>
            <div className="mt-2 pb-10 flex justify-center gap-1 text-sm">
              <div className="text-y-gray font-light">
                나중에 입력하고 싶다면?
              </div>
              <button className="flex text-y-brown">Skip</button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}

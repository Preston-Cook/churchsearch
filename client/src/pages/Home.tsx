import background from '../assets/home-background.jpg';
import Featured from '../components/Featured';
import ProductInfo from '../components/ProductInfo';
import SearchBar from '../components/SearchBar';
import { useTitle } from '../hooks/useTitle';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Home() {
  useTitle('Home');

  const location = useLocation();

  useEffect(
    function () {
      if (location.state?.from !== 'login') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    },
    [location.state?.from]
  );

  return (
    <>
      <div className="relative border-b-2 border-[#6AAEBD]">
        <img
          className="relative z-0 h-[100vh] w-[1920px] object-cover"
          src={background}
          alt="background"
        />
        <div className="absolute left-[50%] top-[50%] flex w-[95%] md:max-w-[70%] translate-x-[-50%] translate-y-[-225px] flex-col items-center justify-center gap-10">
          <h1 className="text-center text-3xl text-white md:text-5xl font-semibold">
            Find Your New Church Home
          </h1>
          <SearchBar />
        </div>
      </div>
      <Featured />
      <ProductInfo />
    </>
  );
}

import background from '../assets/search-background.jpg';
import SearchBar from '../components/SearchBar';
import { useEffect, useState } from 'react';
import useScreenSize from '../hooks/useScreenSize';
import Button from '../components/Button';
import { faFilter } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Overlay from '../components/Overlay';
import FilterMenu from '../components/FilterMenu';
import SearchBody from '../components/SearchBody';
import { useTitle } from '../hooks/useTitle';
import { useLocation } from 'react-router-dom';

export default function Search() {
  useTitle('Search');
  const { width } = useScreenSize();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(
    function () {
      if (width >= 1024) {
        setIsOpen(false);
      }
    },
    [width]
  );

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
      <Overlay open={isOpen} onOpen={() => setIsOpen(false)} />
      <FilterMenu open={isOpen} onOpen={() => setIsOpen(false)} />
      <div className="relative border-b-2 border-[#6AAEBD]">
        <img
          className="relative z-0 h-[50vh] w-[1920px] object-cover object-bottom contrast-75 filter"
          src={background}
          alt="background"
        />
        <div className="absolute left-[50%] top-[50%] flex w-[80%] translate-x-[-50%] translate-y-[-100px] flex-col items-center justify-center gap-10">
          <h1 className="text-center text-4xl text-white md:text-5xl font-semibold">
            Find the Perfect Church for You
          </h1>
          <SearchBar />
          <div className="lg:hidden">
            <Button>
              <p className="text-lg" onClick={() => setIsOpen(true)}>
                <FontAwesomeIcon icon={faFilter} />
                &nbsp;Filter Results
              </p>
            </Button>
          </div>
        </div>
      </div>
      <SearchBody />
    </>
  );
}

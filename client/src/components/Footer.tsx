import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { useEffect, useRef } from 'react';

export default function Footer() {
  const bottom = useRef<null | HTMLDivElement>(null);
  const location = useLocation();

  useEffect(
    function () {
      if (location.state?.from === 'login') {
        bottom.current?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [location.state?.from]
  );

  return (
    <footer className="flex flex-col items-center justify-center gap-5 border-t-2 border-[#6AAEBD] py-5">
      <div className="flex w-[90%] flex-row justify-between gap-2 pt-2">
        <div className="hidden text-3xl font-semibold text-[#6AAEBD] lg:block">
          ChurchSearch
        </div>
        <div className="flex w-[30%] flex-col text-center text-[#6AAEBD]">
          <h4 className="text-xl">Useful Links</h4>
          <ul className="mx-auto w-full text-[#9BA3AF] md:w-fit">
            <li className="underline-animation mt-2 py-1">
              <Link to="search">Find Churches</Link>
            </li>
            <li className="underline-animation mt-2 py-1">
              <Link to="add-church">Add Your Church</Link>
            </li>
          </ul>
        </div>
        <div className="flex w-[30%] flex-col text-center text-[#6AAEBD]">
          <h4 className="text-xl">Contact Us</h4>
          <ul className="mx-auto w-full text-[#9BA3AF] md:w-fit">
            <li className="underline-animation mt-2 py-1">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="underline-animation mt-2 py-1">
              <Link to="/feedback">Feedback</Link>
            </li>
          </ul>
        </div>
        <div className="flex w-[30%] flex-col text-center text-[#6AAEBD]">
          <h4 className="text-xl">Our Policy</h4>
          <ul className="mx-auto w-full text-[#9BA3AF] md:w-fit">
            <li className="underline-animation mt-2 py-1">
              <a href="#" rel="noreferrer">
                Cookies
              </a>
            </li>
            <li className="underline-animation mt-2 py-1">
              <a href="#" rel="noreferrer">
                Privacy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-[80%]">
        <hr />
      </div>
      <div className="flex w-[80%] flex-col items-center gap-4 lg:w-[90%] lg:flex-row-reverse lg:justify-between">
        <div className="links flex w-[50%] justify-around text-[#6AAEBD] lg:w-[20%]">
          <a
            href="https://www.facebook.com/profile.php?id=100095166972674&mibextid=LQQJ4d"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} size="xl" />
          </a>
          <a
            href="https://instagram.com/churchsearch_?igshid=MmIzYWVlNDQ5Yg=="
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} size="xl" />
          </a>
          <a
            href="https://www.linkedin.com/company/church-search/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} size="xl" />
          </a>
          <a
            href="https://twitter.com/trentonbalcombe"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} size="xl" />
          </a>
        </div>
        <p className="mt-2 text-center text-[#9BA3AF] lg:mt-0">
          Copyright © ChurchSearch 2023
        </p>
      </div>
      <div ref={bottom}></div>
    </footer>
  );
}

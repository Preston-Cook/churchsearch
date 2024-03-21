import { faFrown } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import background from '../assets/not-found-background.jpg';
import { useTitle } from '../hooks/useTitle';

export default function ErrorElement() {
  useTitle('Error');
  const navigate = useNavigate();

  return (
    <div className="relative border-b-2 border-[#6AAEBD]">
      <img
        className="relative z-0 h-[100vh] w-[1920px] object-cover filter brightness-125"
        src={background}
        alt="background"
      />
      <div className="absolute left-[50%] top-[50%] lg:w-[30%] md:w-[50%] w-[80%] translate-x-[-50%] translate-y-[-200px] md:translate-y-[-280px] text-center space-y-4 bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="md:text-7xl text-[#6AAEBD] text-5xl">Oops!</h1>
        <hr />
        <div className="pb-3 text-[#6AAEBD]">
          <FontAwesomeIcon icon={faFrown} size="5x" />
        </div>
        <p className="md:text-4xl pb-2 text-[#6AAEBD] text-2xl">
          Something Went Wrong
        </p>
        <button
          onClick={() => navigate(-1)}
          className="w-[60%] rounded-full bg-gradient-to-r from-[#a7d3dd] to-[#f9bab1] px-7 py-1 text-lg text-white border-2 mt-2 hover:border-[#6AAEBD] border-transparent transition-all duration-300"
          type="submit"
        >
          <p className="mx-auto w-fit">Go Back</p>
        </button>
      </div>
    </div>
  );
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/pro-light-svg-icons';
import { useNavigate } from 'react-router-dom';
import useScreenSize from '../hooks/useScreenSize';

export default function CarouselItem({
  id,
  name,
  city,
  state,
  image,
  isProfile = false,
}: CarouselItemProps) {
  const navigate = useNavigate();

  const { width } = useScreenSize();

  return (
    <div
      className="overflow-hidden rounded-2xl cursor-pointer"
      id={id}
      onClick={() => {
        let url = '';
        if (width <= 640) {
          const activeId =
            document.querySelector('.slick-active')?.children[0].children[0].id;
          url = `/church/${activeId}`;
        } else {
          url = `/church/${id}`;
        }

        navigate(url);
      }}
    >
      <div
        className="bg-cover bg-center bg-no-repeat transition-all duration-300 hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="flex h-[325px] items-end justify-center rounded-2xl p-8 text-center text-white">
          {!isProfile && (
            <button
              className="rounded-full bg-gradient-to-r from-[#a7d3dd] to-[#e9c4be] p-4 px-5 py-2 text-xs text-white lg:text-sm"
              type="button"
            >
              {name}
              <p>
                <FontAwesomeIcon icon={faMapLocationDot} />
                &nbsp;
                {`${city}, ${state}`}
              </p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

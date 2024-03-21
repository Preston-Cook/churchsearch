import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapLocationDot,
  faHandPeace,
  faMusic,
  faBookBible,
  faPeopleGroup,
  faPeopleRoof,
  faCircleInfo,
  faChurch,
  faHandsHoldingHeart,
  faEarthAmericas,
  faHandHoldingHand,
} from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';

const icons = [
  faChurch,
  faHandPeace,
  faBookBible,
  faMusic,
  faPeopleRoof,
  faPeopleGroup,
  faHandsHoldingHeart,
  faEarthAmericas,
  faHandHoldingHand,
];

export default function ChurchCard({
  id,
  distance,
  denomination,
  vibe,
  preaching,
  worship,
  ministry,
  attendance,
  serviceOpportunities,
  missionTrips,
  counseling,
  name,
  city,
  state,
  image,
}: ChurchCardProps) {
  const attributes = [
    denomination[Math.floor(Math.random() * denomination.length)],
    vibe,
    preaching[Math.floor(Math.random() * preaching.length)],
    worship,
    ministry[Math.floor(Math.random() * ministry.length)],
    attendance,
  ];

  if (serviceOpportunities) {
    attributes.push('Service Ops');
  }

  if (missionTrips) {
    attributes.push('Mission Trips');
  }

  if (counseling) {
    attributes.push('Counseling');
  }

  const tags = [...Array(attributes.length).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  return (
    <div className="max-w-sm overflow-hidden rounded-2xl bg-white pb-4 shadow-2xl text-center lg:w-[325px] flex flex-col">
      <div className="overflow-hidden">
        <Link to={`/church/${id}`}>
          <div
            style={{ backgroundImage: `url(${image})` }}
            className={`h-[225px] bg-cover bg-center bg-no-repeat transition-all duration-300 hover:scale-105 cursor-pointer`}
          ></div>
        </Link>
      </div>
      <div className="px-6 pb-2 pt-4">
        <div className="mb-2 font-semibold sm:text-lg text-[#6AAEBD] lg:h-[80px] flex items-center justify-center">
          <p>{name}</p>
        </div>
        <div>
          <p className="text-sm sm:text-base text-[#6AAEBD]">
            <FontAwesomeIcon icon={faMapLocationDot} size="lg" />
            &nbsp;{city}, {state} &bull; {distance.toFixed(2)} Miles
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 px-6 pb-2 pt-2 h-[115px] items-center overflow-hidden">
        {tags.map(idx => (
          <div
            key={idx}
            className="rounded-lg bg-[#B2D0D7] p-1 text-xs text-white sm:text-sm h-[25px] sm:h-[28px]"
          >
            <FontAwesomeIcon icon={icons[idx]} size="lg" />
            &nbsp;{attributes[idx]}
          </div>
        ))}
      </div>
      <div>
        <Link to={`/church/${id}`}>
          <button
            className="mx-auto mt-2 w-[80%] rounded-2xl bg-gradient-to-r from-[#a7d3dd] to-[#e9c4be] p-4 px-5 py-2 text-sm text-white sm:text-base border-2 border-transparent hover:border-[#6AAEBD] transition-all duration-300"
            type="button"
          >
            See More Details&nbsp;&nbsp;
            <FontAwesomeIcon icon={faCircleInfo} />
          </button>
        </Link>
      </div>
    </div>
  );
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapLocationDot,
  faHandPeace,
  faMusic,
  faBookBible,
  faPeopleGroup,
  faPeopleRoof,
  faChurch,
  faHandsHoldingHeart,
  faEarthAmericas,
  faHandHoldingHand,
} from '@fortawesome/pro-light-svg-icons';

const uppercaseFirst = (word: string) => word[0].toUpperCase() + word.slice(1);

const booleanFields = ['Service Opportunities', 'Mission Trips', 'Counseling'];

export default function ChurchDetails({
  state,
  denomination,
  vibe,
  preaching,
  worship,
  ministry,
  serviceOpportunities,
  missionTrips,
  counseling,
  attendance,
  street,
  city,
  zip,
  children,
}: ChurchDetailsProps) {
  const fields = {
    address: `${street} ${city}, ${state} ${zip}`,
    denomination,
    preaching,
    vibe,
    worship,
    ministry,
    attendance,
    'Service Opportunities': serviceOpportunities,
    'Mission Trips': missionTrips,
    Counseling: counseling,
  };

  const icons = [
    faMapLocationDot,
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

  return (
    <section className="w-[80%] flex flex-col mx-auto items-center justify-center mt-8 gap-8 md:flex-row-reverse">
      <div>{children}</div>
      <div className="border border-[#9AA3AF] w-full rounded-2xl p-5 text-center max-w-[650px]">
        <div className="mb-2 font-semibold text-[#6AAEBD] text-3xl">
          Church Details
          <hr className="mt-3 w-[80%] mb-5 mx-auto" />
        </div>
        <div className="overflow-scroll h-[485px] mobile-scroll">
          {Object.keys(fields).map((field, i) => {
            let value = fields[field as keyof typeof fields];

            if (Array.isArray(value)) {
              value = value.join(', ');
            }

            if (booleanFields.includes(field)) {
              if (!value) {
                return null;
              }
              value = 'Yes';
            }

            return (
              <div key={i}>
                <div className="bg-[#B2D0D7] my-2 px-2 py-1 rounded-xl text-base text-white mx-auto w-[60%] md:w-[50%] md:text-lg">
                  {uppercaseFirst(field)} &nbsp;
                  {<FontAwesomeIcon icon={icons[i]} />}
                </div>
                <div className="text-[#9AA3AF] w-[80%] mx-auto mb-4 text-sm md:text-base">
                  {value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookBible,
  faPeopleGroup,
  faMusic,
  faChurch,
} from '@fortawesome/pro-light-svg-icons';

export default function TestimonialItem({
  name,
  subject,
  text,
}: TestimonialItemsProps) {
  let icon;

  switch (subject) {
    case 'Worship':
      icon = faMusic;
      break;
    case 'Denomination':
      icon = faChurch;
      break;
    case 'Community':
      icon = faPeopleGroup;
      break;
    case 'Preaching':
      icon = faBookBible;
      break;
    default:
      throw new Error('Invalid Subject');
  }

  return (
    <div className="text-center overflow-scroll border border-[#9AA3AF] rounded-2xl py-3">
      <h1 className="text-xl text-[#6AAEBD] pb-2 font-semibold">
        {subject}&nbsp;&nbsp;
        <FontAwesomeIcon icon={icon} />
      </h1>
      <hr className="w-[80%] mx-auto" />
      <div className="px-8">
        <p className="pt-2 h-[250px] overflow-scroll text-[#9AA3AF] mobile-scroll">
          {text}
        </p>
      </div>
      <br />
      <p className="text-lg text-[#6AAEBD] font-semibold">{name}</p>
    </div>
  );
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson } from '@fortawesome/pro-light-svg-icons';

export default function Pastor({ name, description, image }: PastorCardProps) {
  return (
    <div className="w-[400px] md:w-[325px] overflow-hidden rounded-2xl bg-white shadow-lg text-center lg:w-[400px]">
      <div className="overflow-hidden">
        <div
          style={{ backgroundImage: `url(${image})` }}
          className={`h-[325px] bg-cover bg-no-repeat transition-all duration-300 hover:scale-105 cursor-pointer`}
        ></div>
      </div>
      <div className="px-6 pb-2 pt-4">
        <div className="mb-2 font-semibold text-[#6AAEBD] text-3xl">{name}</div>
        <div>
          <p className="text-xl text-[#6AAEBD]">
            Pastor&nbsp;
            <FontAwesomeIcon icon={faPerson} />
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 px-6 pt-2] text-[#9AA3AF] h-fit max-h-[150px] overflow-scroll text-left mobile-scroll">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{description}
      </div>
      <br />
    </div>
  );
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faFilters,
  faChurch,
} from '@fortawesome/pro-light-svg-icons';

export default function ProductInfo() {
  return (
    <section className="mx-auto bg-gradient-to-b from-[#a7d3dd] to-[#e9c4be] p-10 text-center lg:h-[60vh]">
      <h2 className="mb-3 text-3xl text-white lg:text-4xl lg:mt-8 font-semibold">
        How Does ChurchSearch Work?
      </h2>
      <div className="flex flex-col items-center gap-4 pt-12 md:flex-row md:items-stretch lg:mx-auto lg:w-[80%] lg:gap-8 lg:mt-16">
        <div className="w-[80%] rounded-3xl bg-white p-6 shadow-xl">
          <div className="text-[#6AAEBD]">
            <FontAwesomeIcon icon={faLocationDot} size="3x" />
            <div>
              <h4 className="my-6 text-xl">Search By Your City</h4>
              <hr />
              <p className="pt-2 text-[#9BA3AF]">Or Any Keywords</p>
            </div>
          </div>
        </div>
        <div className="w-[80%] rounded-3xl bg-white p-6 shadow-xl">
          <div className="text-[#6AAEBD]">
            <FontAwesomeIcon icon={faFilters} size="3x" />
            <div>
              <h4 className="my-6 text-xl">Filter Your Search</h4>
              <hr />
              <p className="pt-2 text-[#9BA3AF]">Based on Your Preferences</p>
            </div>
          </div>
        </div>
        <div className="w-[80%] rounded-3xl bg-white p-6 shadow-xl">
          <div className="text-[#6AAEBD]">
            <FontAwesomeIcon icon={faChurch} size="3x" />
            <div>
              <h4 className="my-6 text-xl">Get Connected</h4>
              <hr />
              <p className="pt-2 text-[#9BA3AF]">
                With the Perfect Church for You
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

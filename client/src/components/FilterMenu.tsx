import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/pro-light-svg-icons';
import { useSearchParams } from 'react-router-dom';
import {
  DENOMINATIONS,
  WORSHIP,
  MINISTRY,
  PREACHING,
  VIBE,
  ATTENDANCE,
  SERVICE_CATEGORIES,
} from '../utils/constants';
import { ChangeEvent } from 'react';

export default function FilterMenu({ open, onOpen }: FilterMenuProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = searchParams.get('location') ?? '15';
  const serviceCategories = searchParams.get('serviceCategories') ?? '';
  const denomination = searchParams.get('denomination') ?? '';
  const worship = searchParams.get('worship') ?? '';
  const preaching = searchParams.get('preaching') ?? '';
  const ministry = searchParams.get('ministry') ?? '';
  const vibe = searchParams.get('vibe') ?? '';
  const attendance = searchParams.get('attendance') ?? '';
  const counseling = searchParams.get('counseling') === 'true';
  const serviceOpportunities =
    searchParams.get('serviceOpportunities') === 'true';
  const missionTrips = searchParams.get('missionTrips') === 'true';

  function handleFilterChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    if (['serviceOpportunities', 'missionTrips', 'counseling'].includes(name)) {
      const key = searchParams.get(name);
      if (!key) {
        searchParams.set(name, 'true');
      } else {
        searchParams.delete(name);
      }
    } else {
      searchParams.set(name, value);
    }
    setSearchParams(searchParams);
  }

  function handleClearFilters() {
    for (const key of searchParams.keys()) {
      if (key !== 'q') {
        searchParams.delete(key);
      }
    }
    setSearchParams(searchParams);
  }

  let locationMsg;
  const locationQuery = searchParams.get('location');

  if (locationQuery === null) {
    locationMsg = null;
  } else if (locationQuery === '25') {
    locationMsg = '• 25+ Miles';
  } else {
    locationMsg = `• Less than ${location} miles`;
  }

  return (
    <div
      className={`${
        !open ? 'pointer-events-none opacity-0' : 'opacity-100'
      } fixed left-10 right-10 top-24 z-[4500] h-[60vh] overflow-scroll mobile-scroll rounded-3xl  border-[#6AAEBD] bg-white px-8 py-6 transition-all duration-300 lg:pointer-events-none lg:hidden shadow-2xl md:max-w-[60%] mx-auto`}
    >
      <div className="absolute right-2 top-2 cursor-pointer text-[#6AAEBD]">
        <FontAwesomeIcon icon={faCircleXmark} onClick={onOpen} size="2x" />
      </div>
      <h2 className="pb-4 text-center text-3xl font-semibold text-[#6AAEBD]">
        Filter Options
      </h2>
      <hr />
      <section className="space-y-3 pt-2">
        <label
          className="mb-2 block text-sm font-medium text-[#6AAEBD]"
          htmlFor="denomiation"
        >
          Denomination
          <select
            value={denomination}
            onChange={handleFilterChange}
            name="denomination"
            className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500  border-transparent focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
          >
            <option value="">Choose a Denomination</option>
            {DENOMINATIONS.map((denom, i) => {
              return (
                <option key={i} value={denom}>
                  {denom}
                </option>
              );
            })}
          </select>
        </label>
        <label
          className="mb-2 block text-sm font-medium text-[#6AAEBD]"
          htmlFor="location"
        >
          Location&nbsp;
          {locationMsg}
          <input
            value={location}
            onChange={handleFilterChange}
            type="range"
            name="location"
            className="transparent h-1 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-gray-200 accent-[#6AAEBD]"
            min="5"
            step="5"
            max="25"
          />
          <div className="flex justify-between mt-3">
            <div>5&nbsp;&nbsp;&nbsp;</div>
            <div>10</div>
            <div>15</div>
            <div>20</div>
            <div>25</div>
          </div>
        </label>
        <label
          className="mb-2 block text-sm font-medium text-[#6AAEBD]"
          htmlFor="worship"
        >
          Service Times
          <select
            value={serviceCategories}
            onChange={handleFilterChange}
            name="serviceCategories"
            className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500  border-transparent focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
          >
            <option value="">Choose a Service Time</option>
            {SERVICE_CATEGORIES.map((service, i) => (
              <option key={i} value={service}>
                {service}
              </option>
            ))}
          </select>
        </label>
        <label
          className="mb-2 block text-sm font-medium text-[#6AAEBD]"
          htmlFor="worship"
        >
          Worship
          <select
            value={worship}
            onChange={handleFilterChange}
            name="worship"
            className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500  border-transparent focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
          >
            <option value="">Choose a Worship Style</option>
            {WORSHIP.map((worship, i) => (
              <option key={i} value={worship}>
                {worship}
              </option>
            ))}
          </select>
        </label>
        <label
          className="mb-2 block text-sm font-medium text-[#6AAEBD]"
          htmlFor="ministry"
        >
          Ministry
          <select
            onChange={handleFilterChange}
            value={ministry}
            name="ministry"
            className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500  border-transparent focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
          >
            <option value="">Choose a Ministry Type</option>
            {MINISTRY.map((ministry, i) => (
              <option key={i} value={ministry}>
                {ministry}
              </option>
            ))}
          </select>
        </label>
        <label
          className="mb-2 block text-sm font-medium text-[#6AAEBD]"
          htmlFor="preaching"
        >
          Preaching
          <select
            onChange={handleFilterChange}
            value={preaching}
            name="preaching"
            className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500  border-transparent focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
          >
            <option value="">Choose a Preaching Style</option>
            {PREACHING.map((preaching, i) => (
              <option key={i} value={preaching}>
                {preaching}
              </option>
            ))}
          </select>
        </label>
        <label
          className="mb-2 block text-sm font-medium text-[#6AAEBD]"
          htmlFor="vibe"
        >
          Vibe
          <select
            onChange={handleFilterChange}
            value={vibe}
            name="vibe"
            className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500  border-transparent focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
          >
            <option value="">Choose a Vibe</option>
            {VIBE.map((vibe, i) => (
              <option key={i} value={vibe}>
                {vibe}
              </option>
            ))}
          </select>
        </label>
        <label
          className="mb-2 block text-sm font-medium text-[#6AAEBD]"
          htmlFor="attendance"
        >
          Attendance
          <select
            onChange={handleFilterChange}
            value={attendance}
            name="attendance"
            className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500  border-transparent focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
          >
            <option value="">Choose an Attendance Level</option>
            {ATTENDANCE.map((attendance, i) => (
              <option key={i} value={attendance}>
                {attendance}
              </option>
            ))}
          </select>
        </label>
        <label
          className="mb-2 block text-sm font-medium text-[#6AAEBD]"
          htmlFor="serviceOpportunities"
        >
          Service Opportunities
        </label>
        <div className="flex items-center">
          <input
            onChange={handleFilterChange}
            id="link-checkbox"
            name="serviceOpportunities"
            type="checkbox"
            checked={serviceOpportunities}
            className="w-4 h-4 text-[#6AAEBD] bg-gray-100 border-gray-300 rounded accent-[#6AAEBD]"
          />
          <label
            htmlFor="serviceOpportunities"
            className="text-gray-500 text-sm"
          >
            &nbsp;&nbsp;Has Service Opportunities
          </label>
        </div>
        <label
          className="mb-2 block text-sm font-medium text-[#6AAEBD]"
          htmlFor="missionTrips"
        >
          Mission Trips
        </label>
        <div className="flex items-center">
          <input
            onChange={handleFilterChange}
            id="link-checkbox"
            name="missionTrips"
            type="checkbox"
            checked={missionTrips}
            className="w-4 h-4 text-[#6AAEBD] bg-gray-100 border-gray-300 rounded accent-[#6AAEBD]"
          />
          <label htmlFor="missionTrips" className="text-gray-500 text-sm">
            &nbsp;&nbsp;Has Mission Trips
          </label>
        </div>
        <label
          className="mb-2 block text-sm font-medium text-[#6AAEBD]"
          htmlFor="serviceOpportunities"
        >
          Counseling
        </label>
        <div className="flex items-center">
          <input
            onChange={handleFilterChange}
            id="link-checkbox"
            name="counseling"
            type="checkbox"
            checked={counseling}
            className="w-4 h-4 text-[#6AAEBD] bg-gray-100 border-gray-300 rounded accent-[#6AAEBD]"
          />
          <label htmlFor="counseling" className="text-gray-500 text-sm">
            &nbsp;&nbsp;Has Counseling
          </label>
        </div>
        <div className="text-center">
          <button
            onClick={handleClearFilters}
            className="w-[80%] rounded-full bg-gradient-to-r from-[#a7d3dd] to-[#f9bab1] px-7 py-1 text-lg text-white border-2 mt-2 hover:border-[#6AAEBD] border-transparent transition-all duration-300"
            type="submit"
          >
            <p className="mx-auto w-fit">Clear Filters</p>
          </button>
        </div>
      </section>
    </div>
  );
}

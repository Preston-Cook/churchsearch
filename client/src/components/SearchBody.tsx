import { useSearchParams, useLoaderData } from 'react-router-dom';
import SearchResults from '../components/SearchResults';
import Filters from './Filters';
import haversine from 'haversine';

export default function SearchBody() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const loaderData = useLoaderData() as SearchLoaderData;
  const results = loaderData[0];
  const { lat: startLat, lng: startLng } = loaderData[1];
  const query = searchParams.get('q');

  let searchText;

  const filteredResults = results.filter(res => {
    for (const [key, value] of searchParams.entries()) {
      if (key === 'serviceCategories') {
        const serviceCategories = res.serviceTimes.map(time => time.category);
        if (!serviceCategories.includes(value)) {
          return false;
        }
      } else if (Array.isArray(res[key as keyof typeof res])) {
        const values = (res[key as keyof typeof res] as []).map(
          el => el as string
        );
        if (!values.includes(value)) {
          return false;
        }
      } else if (typeof res[key as keyof typeof res] === 'boolean') {
        const isTrue = value === 'true';
        if (res[key as keyof typeof res] !== isTrue) {
          return false;
        }
      } else if (
        typeof res[key as keyof typeof res] === 'string' &&
        (res[key as keyof typeof res] as string) !== value
      ) {
        return false;
      } else if (key === 'location') {
        const [endLng, endLat] = res.location.coordinates;

        const start = {
          latitude: startLat,
          longitude: startLng,
        };

        const end = {
          latitude: endLat,
          longitude: endLng,
        };

        const threshold = Number(value);

        if (threshold !== 25) {
          const distance = haversine(end, start, { unit: 'mile' });
          if (distance >= threshold) {
            return false;
          }
        }
      }
    }
    return true;
  });

  const distances = filteredResults.map(res => {
    const [endLng, endLat] = res.location.coordinates;

    const start = {
      latitude: startLat,
      longitude: startLng,
    };

    const end = {
      latitude: endLat,
      longitude: endLng,
    };

    return haversine(end, start, { unit: 'mile' });
  });

  if (!query) {
    searchText = 'Showing All Results';
  } else if (results.length === filteredResults.length) {
    searchText = `Showing All Results for "${query}"`;
  } else {
    searchText = `Showing ${filteredResults.length} Results for "${query}"`;
  }

  return (
    <section className="min-h-[500px]">
      <div className="text-center">
        <div className="flex">
          <div className="hidden lg:block py-5 border-r-2 border-[#6AAEBD]">
            <Filters />
          </div>
          <div className="grow py-5">
            <h1 className="text-3xl text-[#6AAEBD] font-semibold pb-3">
              {searchText}
            </h1>
            <hr className="w-[90%] mx-auto" />
            <SearchResults
              filteredResults={filteredResults}
              distances={distances}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

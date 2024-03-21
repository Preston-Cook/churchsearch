import ChurchCard from './ChurchCard';
import { faCircleExclamation, faFrown } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SearchResults({
  filteredResults,
  distances,
}: {
  filteredResults: Church[];
  distances: number[];
}) {
  return (
    <div className="mt-6">
      {filteredResults.length === 0 ? (
        <div className="text-center mx-auto w-[50%] h-[350px] text-3xl p-10 flex items-center justify-center filter pt-3 border border-[#9AA3AF] rounded-2xl">
          <p className="bg-white text-[#6AAEBD] px-3 py-2 rounded-2xl text-3xl">
            No Results <FontAwesomeIcon icon={faCircleExclamation} />
            <br />
            <br />
            <br />
            <FontAwesomeIcon icon={faFrown} size="3x" />
          </p>
        </div>
      ) : (
        <div className="flex flex-row flex-wrap justify-center gap-6">
          {filteredResults.map((church, i) => (
            <ChurchCard
              distance={distances[i]}
              id={church._id}
              attendance={church.attendance}
              key={church._id}
              name={church.name}
              city={church.city}
              state={church.state}
              image={(church.images as string[])[0]}
              denomination={church.denomination as string[]}
              vibe={church.vibe}
              preaching={church.preaching}
              worship={church.worship}
              ministry={church.ministry as string[]}
              lng={church.location.coordinates[0]}
              lat={church.location.coordinates[1]}
              serviceOpportunities={church.serviceOpportunities}
              missionTrips={church.missionTrips}
              counseling={church.counseling}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;

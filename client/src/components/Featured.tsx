import { useLoaderData } from 'react-router-dom';
import Carousel from './Carousel';
import CarouselItem from './CarouselItem';

export default function Featured() {
  const churches = useLoaderData();

  return (
    <section className="mx-auto space-y-6 border-b-2 border-[#6AAEBD] p-8 text-center lg:px-32">
      <h3 className="text-3xl lg:text-4xl text-[#6AAEBD] font-semibold">
        Featured Churches
      </h3>
      <hr className="w-full" />
      <div className="py-8 sm:pb-16 pb-10">
        <Carousel>
          {(churches as FeaturedChurches).data.map(church => (
            <CarouselItem
              isProfile={false}
              key={church._id}
              id={church._id}
              name={church.name}
              city={church.city}
              state={church.state}
              image={church.images[0]}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
}

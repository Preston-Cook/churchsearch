import background from '../assets/church-background.jpg';
import Carousel from './Carousel';
import CarouselItem from './CarouselItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/pro-light-svg-icons';

export default function ChurchHeader({
  street,
  zip,
  name,
  images,
  id,
  state,
  city,
}: ChurchHeaderProps) {
  return (
    <section>
      <div
        className="h-[50vh bg-center bg-cover bg-no-repeat border-b-2 border-[#6AAEBD] flex flex-col justify-center items-center gap-10 py-20"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="text-white text-4xl backdrop-blur-md p-8 rounded-2xl text-center space-y-4 w-fit">
          <h1 className="font-semibold">{name}</h1>
          <p className="text-2xl font-normal">
            <FontAwesomeIcon icon={faMapLocationDot} />
            &nbsp;&nbsp;
            {street} {city}, {state} {zip}
          </p>
        </div>
        <div className="w-[80%] lg:w-[70%]">
          <Carousel slides={images.length}>
            {images.map((img, i) => (
              <CarouselItem
                key={i}
                isProfile={true}
                id={id}
                state=""
                name=""
                city=""
                image={img}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

import { useLoaderData, useLocation } from 'react-router-dom';
import ChurchHeader from '../components/ChurchHeader';
import ChurchDetails from '../components/ChurchDetails';
import Pastor from '../components/Pastor';
import Carousel from '../components/Carousel';
import TestimonialItem from '../components/TestimonialItem';
import Connect from '../components/Connect';
import Map from '../components/Map';
import { useTitle } from '../hooks/useTitle';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookBible,
  faPeopleGroup,
  faMusic,
  faChurch,
  faSquareRight,
} from '@fortawesome/pro-light-svg-icons';

const icons = {
  Denomination: faChurch,
  Preaching: faBookBible,
  Worship: faMusic,
  Community: faPeopleGroup,
};

export default function Church() {
  useTitle('Church');
  const loaderData = useLoaderData() as Church;
  const {
    name,
    _id,
    images,
    city,
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
    pastorName,
    pastorImage,
    pastorBio,
    street,
    zip,
    testimonials,
    preferredContact,
    contactType,
  } = loaderData;
  const [lng, lat] = loaderData.location.coordinates;
  const testimonialsObjects = [];

  for (const testimonial of testimonials) {
    const { name, denomination, preaching, worship, community } = testimonial;
    testimonialsObjects.push({
      name,
      subject: 'Denomination',
      text: denomination,
    });
    testimonialsObjects.push({ name, subject: 'Preaching', text: preaching });
    testimonialsObjects.push({ name, subject: 'Worship', text: worship });
    testimonialsObjects.push({ name, subject: 'Community', text: community });
  }

  const location = useLocation();

  useEffect(
    function () {
      console.log(location.state?.from);

      if (location.state?.from !== 'login') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    },
    [location.state?.from]
  );

  return (
    <>
      <ChurchHeader
        street={street}
        zip={zip}
        name={name}
        id={_id}
        images={images as string[]}
        city={city}
        state={state}
      />
      <ChurchDetails
        lat={lng}
        lng={lng}
        state={state}
        street={street}
        zip={zip}
        city={city}
        denomination={denomination as string[]}
        vibe={vibe}
        preaching={preaching}
        worship={worship}
        ministry={ministry as string[]}
        serviceOpportunities={serviceOpportunities}
        missionTrips={missionTrips}
        counseling={counseling}
        attendance={attendance}
      >
        <Pastor name={pastorName} image={pastorImage} description={pastorBio} />
      </ChurchDetails>

      {testimonials.length > 0 ? (
        <div className="w-[80%] mx-auto my-8">
          <div className="hidden sm:block">
            <h1 className="text-center text-3xl text-[#6AAEBD] font-semibold my-5 backdrop-blur-lg">
              Testimonials
              <hr className="my-3 w-[80%] mx-auto" />
            </h1>
            <Carousel>
              {testimonialsObjects.map((testimonial, i) => (
                <TestimonialItem
                  key={i}
                  name={testimonial.name}
                  subject={testimonial.subject}
                  text={testimonial.text}
                />
              ))}
            </Carousel>
          </div>
          <div className="sm:hidden">
            <h1 className="text-center text-3xl text-[#6AAEBD] font-semibold my-5 backdrop-blur-lg">
              Testimonials
              <hr className="my-3 w-[80%] mx-auto" />
              <div className="flex gap-8 overflow-x-scroll">
                {testimonialsObjects.map((testimonial, i) => {
                  const { subject, text, name } = testimonial;
                  return (
                    <div
                      key={i}
                      className="border border-[#9AA3AF] py-3 rounded-2xl mt-2"
                    >
                      <h2 className="text-xl text-[#6AAEBD] font-semibold w-[300px] pb-2">
                        {subject}&nbsp;&nbsp;
                        <FontAwesomeIcon
                          icon={icons[subject as keyof typeof icons]}
                        />
                      </h2>
                      <hr className="w-[80%] mx-auto" />
                      <div className="w-[80%] mx-auto">
                        <p className="pt-2 overflow-scroll text-[#9AA3AF] text-base h-[200px] font-normal">
                          {text}
                        </p>
                      </div>
                      <br />
                      <p className="text-lg text-[#6AAEBD] font-semibold">
                        {name}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 font-normal">
                <FontAwesomeIcon icon={faSquareRight} />
              </div>
            </h1>
          </div>
        </div>
      ) : (
        <div className="mt-8"></div>
      )}
      <section className="flex flex-col-reverse md:flex-row-reverse justify-center items-center gap-8 md:w-[80%] mx-auto mb-8">
        <div className="w-[80%]">
          <Map lat={lat} lng={lng} />
        </div>
        <div className="w-[80%]">
          <Connect
            contactType={contactType}
            preferredContact={preferredContact as string}
          />
        </div>
      </section>
    </>
  );
}

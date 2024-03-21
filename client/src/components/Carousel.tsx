import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/pro-light-svg-icons';

function CarouselNext({
  currentSlide,
  slideCount,
  ...props
}: CarouselArrowProps) {
  return (
    <FontAwesomeIcon
      icon={faChevronRight}
      color="#6AAEBD"
      {...props}
      className={
        'slick-next slick-arrow' +
        (currentSlide === (slideCount as number) - 1 ? ' slick-disabled' : '')
      }
      aria-hidden="true"
      aria-disabled={currentSlide === (slideCount as number) - 1 ? true : false}
      type="button"
    />
  );
}

function CarouselPrev({
  currentSlide,
  slideCount,
  ...props
}: CarouselArrowProps) {
  return (
    <FontAwesomeIcon
      icon={faChevronLeft}
      color="#6AAEBD"
      {...props}
      className={
        'slick-prev slick-arrow' + (currentSlide === 0 ? ' slick-disabled' : '')
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    />
  );
}

export default function Carousel({
  children,
  slides = 3,
}: {
  children: React.ReactNode;
  slides?: number;
}) {
  const settings = {
    autoplay: true,
    autoplaySpeed: 8000,
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: Math.min(3, slides),
    arrows: true,
    dots: false,
    nextArrow: <CarouselNext />,
    prevArrow: <CarouselPrev />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          arrows: true,
          fade: true,
          cssEase: 'linear',
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}

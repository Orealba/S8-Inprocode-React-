import sport1 from '../assets/images/sport1.jpg';
import sport2 from '../assets/images/sport2.jpg';
import sport3 from '../assets/images/sport3.jpg';
import sport4 from '../assets/images/sport4.jpg';
import sport5 from '../assets/images/sport5.jpg';
import { Carousel } from 'flowbite-react';

export const Header = () => {
  return (
    <>
      <div className="fixed inset-0 mt-16">
        <Carousel
          pauseOnHover
          slideInterval={5000}
          className="mt-12 mx-auto max-w-[80%] sm:max-w[80%]">
          <div className="relative h-[calc(100vh-16rem)]">
            <img
              src={sport1}
              className="w-full h-full object-cover"
              alt="sport1"
            />
          </div>
          <div className="relative h-[calc(100vh-16rem)]">
            <img
              src={sport2}
              className="w-full h-full object-cover"
              alt="sport2"
            />
          </div>
          <div className="relative h-[calc(100vh-16rem)]">
            <img
              src={sport3}
              className="w-full h-full object-cover"
              alt="sport3"
            />
          </div>
          <div className="relative h-[calc(100vh-16rem)]">
            <img
              src={sport4}
              className="w-full h-full object-cover"
              alt="sport4"
            />
          </div>
          <div className="relative h-[calc(100vh-16rem)]">
            <img
              src={sport5}
              className="w-full h-full object-cover"
              alt="sport5"
            />
          </div>
        </Carousel>
      </div>
    </>
  );
};

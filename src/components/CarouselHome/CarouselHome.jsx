import { useEffect, useRef, useState } from 'react';
import './CarouselHome.css';
import { Carousel, initTE } from "tw-elements";

// eslint-disable-next-line react/prop-types
function CarouselHome({ renderState, setRenderState }) {

  const timeoutRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    initTE({ Carousel });

    timeoutRef.current = setTimeout(() => {
      if (carouselRef.current) {
        carouselRef.current.click();
      }
    }, 5000);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const uniqueKey = (min, max) => {
    return Math.floor(Math.random()
      * (max - min + 1)) + min;
  };

  const handleClearTimeOut = () => {
    clearTimeout(timeoutRef.current);
  };

  return (
    <>
      <div
        id="carouselExampleCaptions"
        className="lg:relative relative flex justify-center items-center w-full lg:w-7/12 mx-auto lg:mt-6 absolute top-16 lg:top-16 lg:top-0"
        data-te-carousel-init
        data-te-ride="carousel"
        key={uniqueKey}>

        <div
          className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] flex list-none justify-center pb-2 lg:pb-6"
          data-te-carousel-indicators>
          <button
            type="button"
            data-te-target="#carouselExampleCaptions"
            data-te-slide-to="0"
            data-te-carousel-active
            onClick={handleClearTimeOut}
            className="mx-[3px] box-content h-[3px] w-[15px] lg:w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            aria-current="true"
            aria-label="Slide 1"></button>
          <button
            type="button"
            data-te-target="#carouselExampleCaptions"
            data-te-slide-to="1"
            onClick={handleClearTimeOut}
            className="mx-[3px] box-content h-[3px] w-[15px] lg:w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            aria-label="Slide 2"></button>
          <button
            type="button"
            data-te-target="#carouselExampleCaptions"
            data-te-slide-to="2"
            onClick={handleClearTimeOut}
            className="mx-[3px] box-content h-[3px] w-[15px] lg:w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            aria-label="Slide 3"></button>
        </div>

        <div
          className="carousel_text relative w-full overflow-hidden after:clear-both after:block after:content-[''] text-xl lg:rounded-lg md:rounded-lg">

          <div
            className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none text-center"
            data-te-carousel-active
            data-te-carousel-item
          // style="backface-visibility: hidden"
          >
            <img
              src="/img/carousel1.jpg"
              className="block w-full lg:rounded-lg md:rounded-lg"
              alt="..." />
            <div
              className="absolute bottom-5 lg:py-5 text-center text-white md:block mb-3 lg:mb-10 w-full mx-auto">
              <p className="lg:text-4xl text-base mb-1 lg:mb-3 mx-auto">Join to GGCOM</p>
              <p className='text-sm lg:text-lg'>
                Join infinite video videogame communities
              </p>
            </div>
          </div>

          <div
            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-item
          // style="backface-visibility: hidden"
          >
            <img
              src="/img/carousel2.jpg"
              className="block w-full lg:rounded-lg md:rounded-lg"
              alt="..." />
            <div
              className="absolute bottom-5 lg:py-5 text-center text-white md:block mb-3 lg:mb-10 w-full mx-auto">
              <p className="lg:text-4xl text-base mb-1 lg:mb-3">Thousands of games available</p>
              <p className='text-sm lg:text-lg'>
                Enjoy thousands of videogames
              </p>
            </div>
          </div>

          <div
            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-item
          // style="backface-visibility: hidden"
          >
            <img
              src="/img/carousel3.jpg"
              className="block w-full lg:rounded-lg md:rounded-lg"
              alt="..." />
            {/* <div
              className="absolute inset-x-[15%] bottom-5 lg:py-5 text-center text-white md:block mb-3 lg:mb-10"> */}
            <div
              className="absolute bottom-5 lg:py-5 text-center text-white md:block mb-3 lg:mb-10 w-full mx-auto">
              <p className="lg:text-4xl text-base mb-1 lg:mb-3">Create communities</p>
              <p className='text-sm lg:text-lg'>
                Create communities for you and your friends
              </p>
            </div>
          </div>
          <button
            className="carousel_button absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none h-full"
            type="button"
            data-te-target="#carouselExampleCaptions"
            data-te-slide="prev"
            onClick={handleClearTimeOut}>
            <span className="inline-block h-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6">
                <path d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </span>
          </button>

          <button
            className="carousel_button absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none h-full"
            type="button"
            data-te-target="#carouselExampleCaptions"
            data-te-slide="next"
            ref={carouselRef}
            onClick={handleClearTimeOut}>
            <span className="inline-block h-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6">
                <path d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </span>
          </button>
        </div>


      </div>
    </>
  );
}

export default CarouselHome;
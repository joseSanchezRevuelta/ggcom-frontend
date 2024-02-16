// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
// Initialization for ES Users
import './CarouselHome.css';

import {
  Carousel,
  initTE,
} from "tw-elements";

initTE({ Carousel });

function CarouselHome() {

  const uniqueKey = (min, max) => {
    return Math.floor(Math.random()
        * (max - min + 1)) + min;
};

  return (
    <>
      <div
        id="carouselExampleCaptions"
        className="relative flex justify-center pt-36 w-9/12 mx-auto bg-yellow-500"
        data-te-carousel-init
        data-te-ride="carousel"
        key={uniqueKey}>
        <div
          className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] flex list-none justify-center pb-6"
          data-te-carousel-indicators>
          <button
            type="button"
            data-te-target="#carouselExampleCaptions"
            data-te-slide-to="0"
            data-te-carousel-active
            className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            aria-current="true"
            aria-label="Slide 1"></button>
          <button
            type="button"
            data-te-target="#carouselExampleCaptions"
            data-te-slide-to="1"
            className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            aria-label="Slide 2"></button>
          <button
            type="button"
            data-te-target="#carouselExampleCaptions"
            data-te-slide-to="2"
            className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            aria-label="Slide 3"></button>
        </div>

        <div
          className="carousel_text relative w-5/6 overflow-hidden after:clear-both after:block after:content-[''] text-xl">

          <div
            className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-active
            data-te-carousel-item
          // style="backface-visibility: hidden"
          >
            <img
              src="/img/carousel1.jpg"
              className="block w-full rounded-lg"
              alt="..." />
            <div
              className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block mb-10">
              <p className="text-4xl mb-3">Join to ggcom</p>
              <p>
                Some representative placeholder content for the first slide.
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
              className="block w-full rounded-lg"
              alt="..." />
            <div
              className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block mb-10">
              <p className="text-4xl mb-3">Second slide label</p>
              <p>
                Some representative placeholder content for the second slide.
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
              className="block w-full rounded-lg"
              alt="..." />
            <div
              className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block mb-10">
              <p className="text-4xl mb-3">Third slide label</p>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
        </div>

        <button
          className="carousel_button absolute bg-red-500 bottom-0 left-0 top-20 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide="prev">
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              // stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6">
              <path
                // stroke-linecap="round"
                // stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </span>
          {/* <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Previous</span> */}
        </button>

        <button
          className="carousel_button absolute bg-red-400 bottom-0 right-0 top-20 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide="next">
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              // stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6">
              <path
                // stroke-linecap="round"
                // stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </span>
          {/* <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Next</span> */}
        </button>
      </div>
    </>
  );
}

export default CarouselHome;
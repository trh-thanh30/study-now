'use client';
import { SquareArrowOutUpRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards } from 'swiper/modules';
import React from 'react';

export function HeroSection() {
  return (
    <>
      {/* Hero Section */}
      <section className=" text-center flex flex-col gap-7">
        <p className="text-base ont-medium text-gray-600 gap-1 flex items-center justify-center ">
          Created by{' '}
          <Link
            className="underline hover:text-gray-900 transition-colors duration-200 flex items-center gap-1"
            href={'https://www.instagram.com/trh_thanh/'}
          >
            trh_thanh
            <SquareArrowOutUpRight size={14} />
          </Link>
        </p>
        <h1 className="text-4xl md:text-7xl font-semibold max-w-3xl mx-auto">
          Focus better and get daily progress reports
        </h1>
        <p className="text-xl text-gray-500 font-medium max-w-3xl mx-auto">
          Take control of your days by working with purpose.Pomito offers you the tools to organize
          and make progress on your daily goals.
        </p>
        <Link
          className="bg-gray-900 hover:bg-gray-800 w-full text-white group max-w-sm py-2 text-sm rounded font-semibold transition justify-center mx-auto flex items-center gap-2"
          href={'/sign-in'}
        >
          {' '}
          Get Things Done Now
          <ArrowRight size={16} className="group-hover:translate-x-2 transition-all duration-300" />
        </Link>
        {/* <div className="h-full"> */}
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwipe  w-full h-full"
        >
          <SwiperSlide className="w-full h-full bg-gray-950 rounded-xl shadow-2xl">
            <div className=" p-4 flex items-center justify-between w-full">
              <div className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-md text-2xl font-semibold uppercase text-white bg-gray-900">
                <span className="h-fit">S</span>
              </div>
              <div className="flex items-center gap-4 text-base font-medium text-white">
                <span>Task</span>
                <span>Settings</span>
              </div>
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center gap-8 mt-16 pb-24">
              <div className="flex items-center gap-6 text-base font-medium">
                <div className="py-2 px-6 bg-gray-800 rounded-full text-white">Deep Focus</div>
                <div className=" text-gray-200">Break Time</div>
              </div>
              <h2 className="text-8xl font-bold text-white tracking-widest ">60:00</h2>
              <div className="py-2 max-w-sm w-full bg-gray-800 rounded-md text-white flex items-center justify-center text-base font-medium">
                Start
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="w-full h-full bg-slate-400 rounded-xl shadow-2xl">
            <div className=" p-4 flex items-center justify-between w-full">
              <div className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-md text-2xl font-semibold uppercase text-white bg-gray-900">
                <span className="h-fit">S</span>
              </div>
              <div className="flex items-center gap-4 text-base font-medium text-white">
                <span>Task</span>
                <span>Settings</span>
              </div>
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center gap-8 mt-16 pb-24">
              <div className="flex items-center gap-6 text-base font-medium">
                <div className="py-2 px-6 bg-gray-800 rounded-full text-white">Deep Focus</div>
                <div className=" text-gray-200">Break Time</div>
              </div>
              <h2 className="text-8xl font-bold text-white tracking-widest ">60:00</h2>
              <div className="py-2 max-w-sm w-full bg-gray-800 rounded-md text-white flex items-center justify-center text-base font-medium">
                Start
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="w-full h-full bg-yellow-100 rounded-xl shadow-2xl">
            <div className=" p-4 flex items-center justify-between w-full">
              <div className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-md text-2xl font-semibold uppercase text-white bg-gray-900">
                <span className="h-fit">S</span>
              </div>
              <div className="flex items-center gap-4 text-base font-medium text-white">
                <span>Task</span>
                <span>Settings</span>
              </div>
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center gap-8 mt-16 pb-24">
              <div className="flex items-center gap-6 text-base font-medium">
                <div className="py-2 px-6 bg-white rounded-full text-yellow-500">Deep Focus</div>
                <div className=" text-white">Break Time</div>
              </div>
              <h2 className="text-8xl font-bold text-white tracking-widest ">60:00</h2>
              <div className="py-2 max-w-sm w-full bg-yellow-800 rounded-md text-white flex items-center justify-center text-base font-medium">
                Start
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        {/* </div> */}
      </section>
    </>
  );
}

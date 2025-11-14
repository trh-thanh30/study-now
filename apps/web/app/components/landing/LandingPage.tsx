'use client';
import React from 'react';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { WorksTimeLineSection } from './WorksTimeLineSection';
import { FaqSection } from './FaqSection';
import { ArrowUp, Link } from 'lucide-react';
import { Affix, Button, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { Header } from '../Header';

export function LandingPage() {
  const [scroll, scrollTo] = useWindowScroll();
  return (
    <div className="w-full bg-white max-w-6xl mx-auto px-5">
      {/* Navigation */}
      <Header />
      <main className="mt-40 flex flex-col gap-32">
        <HeroSection />
        {/* Features Section */}
        <FeaturesSection />

        {/* How It Works Section */}
        <WorksTimeLineSection />

        {/* Faq Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <footer className="  pb-8 px-4 mt-28">
        <div className=" text-center ">
          <h4 className="text-2xl text-gray-900 font-semibold">Study Now Timer</h4>
          <p className="text-gray-600 text-base w-lg mx-auto mt-2">
            A minimalist study timer app that helps you focus and boost your timer for maximum
            productivity.
          </p>
          <div className="flex justify-center gap-6 text-sm font-medium mt-8 text-gray-600">
            <Link
              href="#"
              className="hover:text-gray-800 hover:underline transition-all duration-200"
            >
              About
            </Link>
            <a href="#" className="hover:text-gray-800 hover:underline transition-all duration-200">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-800 hover:underline transition-all duration-200">
              Terms
            </a>
            <a href="#" className="hover:text-gray-800 hover:underline transition-all duration-200">
              Faq
            </a>
            <a href="#" className="hover:text-gray-800 hover:underline transition-all duration-200">
              Contact
            </a>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Study Now Timer. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              color="rgba(0, 0, 0, 1)"
              leftSection={<ArrowUp size={16} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </div>
  );
}

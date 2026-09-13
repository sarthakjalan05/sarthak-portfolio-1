import React from 'react';
import { Hero } from '../components/Hero';
import { Section1 } from '../components/Section1';

export const Home: React.FC = () => {
  return (
    <div className="home-view">
      {/* Cinematic Repurposed Hero */}
      <Hero />

      {/* House Navigation Grid */}
      <Section1 />
    </div>
  );
};

"use client";
import React from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";

const Hero = () => {
  const handleExploreClick = () => {
    const searchBarElement = document.getElementById('search-bar');
    if (searchBarElement) {
      searchBarElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero">
    
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
        Next Stop: Car Discovery Practice App!
        </h1>
        <p className="hero__subtitle">
        Explore cars while mastering APIs with style. Search by make, model, fuel type, or year to find the perfect match.
        </p>
        <CustomButton
          title="Explore Cars"
          containerStyles="bg-primary-blue text-white rounded-full mt-10"
          handleClick={handleExploreClick}
        />
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image src="/hero.png" alt="hero" fill className="object-contain" />
        </div>
        <div className="hero__image-overlay" />
      </div>
    </div>
  );
};

export default Hero;
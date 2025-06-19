"use client";
import { CarProps } from "@/types";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CarDetails, CustomButton } from "@/components";
import { calculateCarRent, generateCarImageUrl } from "@/utils";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive } = car;
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  
  const carRent = calculateCarRent(city_mpg, year);

  useEffect(() => {
    const loadImage = async () => {
      setIsLoadingImage(true);
      try {
        const url = await generateCarImageUrl(car);
        setImageUrl(url);
      } catch (error) {
        console.error('Failed to load car image:', error);
        setImageUrl('/car-ph.jpg');
      } finally {
        setIsLoadingImage(false);
      }
    };

    loadImage();
  }, [car, make, model]);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p>
      <div className="relative w-full h-40 my-3 object-contain">
        {isLoadingImage ? (
          <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Generating image...</span>
          </div>
        ) : (
          <Image
            src={imageUrl}
            alt={`${make} ${model}`}
            fill
            priority
            className="object-contain rounded-lg"
          />
        )}
      </div>
      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/steering-wheel.svg"
              alt="steering wheel"
              width={20}
              height={20}
              style={{ width: "auto", height: "auto" }}
            />
            <p className="text-[14px]">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/tire.svg"
              alt="tire"
              width={20}
              height={20}
              style={{ width: "auto", height: "auto" }}
            />
            <p>{drive.toUpperCase()}</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/gas.svg" alt="gas" width={20} height={20} />
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  );
};

export default CarCard;
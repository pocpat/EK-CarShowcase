import { MouseEventHandler } from "react";

export interface CustomFilterProps {
  title: string;
}

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;

  handleClick: () => void;
  btnType?: "button" | "submit";
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean;
}
export interface SearchManufacturerProps {
  manufacturer: string;
  setManufacturer: (manufacturer: string) => void;
}
export interface CarProps {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
  id: number;
}
export interface FilterProps {
  manufacturer?: string;
  year?: number;
  model?: string;
  limit?: number;
  fuel?: string;
}

export interface HomeProps {
  searchParams: FilterProps;
}

export interface OptionProps {
  value: string;
  title: string;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}

export interface PageProps {
  searchParams: {
    manufacturer?: string;
    model?: string;
    fuel?: string;
    year?: string;
    limit?: string;
  };
  allCars: CarProps[] | { message: string };
}

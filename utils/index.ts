// ===================================================================================
// COPY FROM the RapidAPI website: https://rapidapi.com/apidojo/api/cars-by-api-ninjas
// ===================================================================================
// after copy "headers and url => delete the following code"
//
//
// const fetch = require('node-fetch');

import { FilterProps } from "@/types";

// const url = 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla&limit=5';
// const options = {
//   method: 'GET',
//   headers: {
//     'x-rapidapi-key': '3c70dc3710msh873b9b5b20ce6eap12c00cjsn35613f000192',
//     'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }
// ===================================================================================
 import { CarProps } from "@/types";
 export async function fetchCars(filters: FilterProps = {}) {
  const { manufacturer = "", year = "", model = "", limit = 5, fuel = "" } = filters;
 
  const headers = {
    "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
    "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  // from const url
  const response = await fetch(
    "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla&limit=5",
    { headers: headers }
  );
    const result = await response.json();
    console.log("API result:", result);
    return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; 
  const mileageFactor = 0.1; 
  const ageFactor = 0.05; 
  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};
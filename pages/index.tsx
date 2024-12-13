import { GetServerSideProps } from "next";
import {
  Hero,
  SearchBar,
  CustomFilter,
  CarCard,
  Navbar,
  Footer,
} from "@/components/index";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import ShowMore from "@/components/ShowMore";
import { CarProps } from "@/types";
import "../app/globals.css";

interface PageProps {
  searchParams: Record<string, string | undefined>;
  allCars: CarProps[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchParams = context.query;

  const manufacturer = Array.isArray(searchParams.manufacturer)
    ? searchParams.manufacturer[0]
    : searchParams.manufacturer || "";
  const model = Array.isArray(searchParams.model)
    ? searchParams.model[0]
    : searchParams.model || "";
  const fuel = Array.isArray(searchParams.fuel)
    ? searchParams.fuel[0]
    : searchParams.fuel || "";
  const year = parseInt(
    Array.isArray(searchParams.year)
      ? searchParams.year[0]
      : searchParams.year || "2022",
    10
  );
  const limit = parseInt(
    Array.isArray(searchParams.limit)
      ? searchParams.limit[0]
      : searchParams.limit || "10",
    10
  );

  const allCars = await fetchCars({ manufacturer, model, fuel, year, limit });

  return {
    props: {
      searchParams,
      allCars,
    },
  };
};

export default function Home({ searchParams, allCars }: PageProps) {
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1;

  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters" id="search-bar">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars.map((car: CarProps) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
            <ShowMore
              pageNumber={parseInt(searchParams.limit || "10") / 10}
              isNext={parseInt(searchParams.limit || "10") > allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>
              {!Array.isArray(allCars) &&
                (allCars as { message: string }).message}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}

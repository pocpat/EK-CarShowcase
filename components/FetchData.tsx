import { Hero, SearchBar, CustomFilter, CarCard } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import ShowMore from "@/components/ShowMore";
import { FilterProps, CarProps } from "@/types";

interface PageProps {
  searchParams: Record<string, string | undefined>;
}

export default async function Page({ searchParams }: PageProps) {
  const manufacturer = searchParams.manufacturer || "";
  const model = searchParams.model || "";
  const fuel = searchParams.fuel || "";
  const year = parseInt(searchParams.year || "2022", 10);
  const limit = parseInt(searchParams.limit || "10", 10);

  const allCars = await fetchCars({ manufacturer, model, fuel, year, limit });

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
        {!Array.isArray(allCars) || allCars.length < 1 ? (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{!Array.isArray(allCars) && (allCars as { message: string }).message}</p>
          </div>
        ) : (
          <section>
            <div className="home__cars-wrapper">
              {allCars.map((car: CarProps) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
            />
          </section>
        )}
      </div>
    </main>
  );
}
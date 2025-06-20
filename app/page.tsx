import { Hero, SearchBar, CustomFilter, CarCard, Navbar, Footer } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import { CarProps } from "@/types";

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function Home({ searchParams }: PageProps) {
  // Await searchParams before accessing its properties
  const params = await searchParams;
  
  const manufacturer = params.manufacturer || "";
  const model = params.model || "";
  const fuel = params.fuel || "";
  const year = parseInt(params.year || "2022", 10);
  const limit = parseInt(params.limit || "10", 10);

  const allCars = await fetchCars({ manufacturer, model, fuel, year, limit });

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
        {!Array.isArray(allCars) || allCars.length < 1 ? (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{!Array.isArray(allCars) && (allCars as { message: string }).message}</p>
          </div>
        ) : (
          <section>
            <div className="home__cars-wrapper">
              {allCars.map((car: CarProps, index: number) => (
                <CarCard key={`${car.make}-${car.model}-${car.year}-${index}`} car={car} />
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </main>
  );
}
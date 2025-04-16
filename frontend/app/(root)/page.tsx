import Category from "@/components/Category";
import Hero from "@/components/Hero";
import Products from "@/components/Listing";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Hero />
      <div className="flex mt-12 justify-between flex-col md:flex-row px-6 gap-6 items-center">
        <div className="hidden md:flex">
          <Category />
        </div>
        <Products />
      </div>
    </div>
  );
};

export default Home;

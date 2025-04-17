import Category from "@/components/Category";
import Hero from "@/components/Hero";
import Products from "@/components/Listing";

export const dynamic = "force-dynamic";

const Home = () => {
  return (
    <div className="container w-full  mx-auto">
      <Hero />
      <div className="flex mt-8">
        <Category />
        <Products />
      </div>
    </div>
  );
};

export default Home;

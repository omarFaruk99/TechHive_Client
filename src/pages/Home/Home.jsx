import FeaturedTrendingProducts from "./FeaturedTrendingProducts";
import HomeCarousel from "./HomeCarousel";

const Home = () => {
  return (
    <div className="bg-base-100">
      <HomeCarousel></HomeCarousel>
      <FeaturedTrendingProducts></FeaturedTrendingProducts>
    </div>
  );
};

export default Home;

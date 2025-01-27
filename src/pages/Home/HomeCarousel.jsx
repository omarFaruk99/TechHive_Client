import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import bImag1 from "../../assets/home/slide4.jpg";
import bImag2 from "../../assets/home/slide2.jpg";
import bImag3 from "../../assets/home/slide3.png";
import bImag5 from "../../assets/home/slide6.jpg";

const HomeCarousel = () => {
  return (
    <div className="w-11/12 mb-2 mt-3 mx-auto">
      <div className="h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]">
        <Carousel
          autoPlay
          infiniteLoop
          className="w-full h-full"
          showStatus={false}
          showThumbs={false}
        >
          <div className="h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] bg-gray-50">
            <img
              src={bImag1}
              className="w-full h-full object-contain sm:object-fill"
              alt="slide 1"
            />
          </div>
          <div className="h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] bg-gray-50">
            <img
              src={bImag2}
              className="w-full h-full object-contain sm:object-fill"
              alt="slide 2"
            />
          </div>
          <div className="h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] bg-gray-50">
            <img
              src={bImag3}
              className="w-full h-full object-contain sm:object-fill"
              alt="slide 3"
            />
          </div>
          <div className="h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] bg-gray-50">
            <img
              src={bImag5}
              className="w-full h-full object-contain sm:object-fill"
              alt="slide 4"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default HomeCarousel;

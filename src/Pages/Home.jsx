import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ServiceCard from "../Components/services/ServiceCard";
import DecoratorCard from "../Components/decorator/DecoratorCard";
import { Link } from "react-router";
import MapComponent from "./MapCoverage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Home = () => {
   
  const { data: services = [],roleLoading} = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/services");
      return res.data;
   
    },
  });

  
  // const { data: decorators = [], isLoading: decoratorLoading } = useQuery({
  //   queryKey: ["decorators"],
  //   queryFn: async () => {
  //     const res = await axios.get("http://localhost:3000/services");
  //     return res.data;
  //   },
  // });
 if(roleLoading) return <span className="loading loading-spinner text-neutral"></span>
  return (
    <div className="min-h-screen">
      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Decorators */}
      {/* <section className="bg-base-200 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Top Decorators
          </h2>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {decorators.map((decorator) => (
              <SwiperSlide key={decorator._id}>
                <DecoratorCard decorator={decorator} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section> */}
      {/* Hero Section */}
      <section className="hero bg-gradient-to-r from-primary to-secondary min-h-[70vh]">
        <div className="hero-content text-center text-white">
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Transform Your Space With{" "}
              <span className="text-accent">StyleDecor</span>
            </motion.h1>
            <p className="text-xl mb-8 opacity-90">
              Professional decoration services for homes, weddings, and
              corporate events
            </p>
            <Link to="/services" className="btn btn-accent btn-lg text-lg">
              Book Decoration Service
            </Link>
          </div>
        </div>
      </section>

   
      {/* Service Coverage Map */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Service Coverage Area</h2>
          <div className="h-[500px] rounded-lg overflow-hidden shadow-xl">
            <MapComponent></MapComponent>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React from "react";
import useTitle from "../../../Hooks/useTitle";
import About from "../About/About";
import Banner from "../Banner/Banner";
import Contact from "../Contact/Contact";
import CountUpSection from "../CountUpSection/CountUpSection";
import ServicesSection from "../Services/ServicesSection";

const Home = () => {
  useTitle("Home");
  return (
    <div>
      <Banner></Banner>
      <About></About>
      <ServicesSection></ServicesSection>
      <CountUpSection></CountUpSection>
      <Contact></Contact>
    </div>
  );
};

export default Home;

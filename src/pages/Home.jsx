import Hero from "../components/home/Hero";
import FleetStats from "../components/home/FleetStats";
import FeatureShowcase from "../components/home/FeatureShowcase";
import RouteStory from "../components/home/RouteStory";
import WhySmallCities from "../components/home/WhySmallCities";
import CTA from "../components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FleetStats />
      <FeatureShowcase />
      <RouteStory />
      <WhySmallCities />
      <CTA />
    </>
  );
}

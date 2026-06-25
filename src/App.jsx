import { Suspense, lazy } from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Routes = lazy(() => import("./pages/Routes"));
const Analytics = lazy(() => import("./pages/Analytics"));
const About = lazy(() => import("./pages/About"));

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-night">
      <Navbar />
      <Suspense fallback={<PageFallback />}>
        <RouterRoutes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/live" element={<Dashboard />} />
          <Route path="/dashboard/settings" element={<Dashboard />} />
          <Route path="/routes" element={<Routes />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/about" element={<About />} />
        </RouterRoutes>
      </Suspense>
      <Footer />
    </div>
  );
}

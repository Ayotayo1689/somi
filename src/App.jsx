import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import About from "./pages/About";
import Clients from "./pages/Clients";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import PhotoPortfolio from "./pages/PhotoPortfolio";
import Services from "./pages/Services";
import VideoPortfolio from "./pages/VideoPortfolio";

function App() {
  return (
    <BrowserRouter>
      <SiteLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/video-portfolio" element={<VideoPortfolio />} />
          <Route path="/photo-portfolio" element={<PhotoPortfolio />} />
          <Route path="/our-clients" element={<Clients />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </SiteLayout>
    </BrowserRouter>
  );
}

export default App;

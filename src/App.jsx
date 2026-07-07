import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContentProvider, useContent } from "./lib/content";
import SiteLayout from "./components/SiteLayout";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Clients from "./pages/Clients";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import PhotoPortfolio from "./pages/PhotoPortfolio";
import Services from "./pages/Services";
import VideoPortfolio from "./pages/VideoPortfolio";

function LoadingScreen() {
  return (
    <main className="bootstrap-loader" aria-busy="true" aria-live="polite">
      <div className="bootstrap-loader-mark">somi</div>
      <div className="bootstrap-loader-spinner" />
      <p>Loading...</p>
    </main>
  );
}

function AppRoutes() {
  const { loading } = useContent();

  if (loading) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route
          path="*"
          element={
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
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ContentProvider>
      <AppRoutes />
    </ContentProvider>
  );
}

export default App;

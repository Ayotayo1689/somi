import { Link } from "react-router-dom";
import ProductCard from "@/componeents/ProductCard";
import { products } from "@/data/products";
import { useEffect, useRef } from "react";

export default function Home({ addToCart }) {
  const featuredProducts = products.slice(0, 12);

  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  useEffect(() => {
    const playVideos = () => {
      [videoRef1.current, videoRef2.current].forEach((video) => {
        if (video) {
          video.muted = true;
          video.playsInline = true;
          video.setAttribute("webkit-playsinline", "true");
          video.setAttribute("x5-playsinline", "true");
          video.play().catch(() => {});
        }
      });
    };

    playVideos();

    // As fallback — play after user first touch
    window.addEventListener("touchstart", playVideos, { once: true });

    return () => {
      window.removeEventListener("touchstart", playVideos);
    };
  }, []);

  return (
    <div>
      <section className="relative h-[80vh] flex items-center justify-center mb-16 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-0 w-full h-full">
          <video
            ref={videoRef1}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="auto"
            webkit-playsinline="true"
            disablePictureInPicture
            controls={false}
          >
            <source
              src="https://www.shutterstock.com/shutterstock/videos/1098864383/preview/stock-footage-silhouette-of-a-man-putting-on-his-jacket-in-dark-room-on-the-background-of-the-window-close-up.webm"
              type="video/mp4"
            />
          </video>

          <video
            ref={videoRef2}
            className="hidden md:block w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="auto"
            webkit-playsinline="true"
            disablePictureInPicture
            controls={false}
          >
            <source
              src="https://www.shutterstock.com/shutterstock/videos/1112105367/preview/stock-footage-content-stylish-young-black-man-in-his-s-enjoys-dancing-while-listening-to-an-online-playlist.webm"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Discover the collective
          </h1>
          <p className="text-gray-200">Premium streetwear and fashion</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-right mt-8">
          <Link
            to="/all-products"
            className="text-sm font-medium hover:underline"
          >
            View all →
          </Link>
        </div>
      </section>

      {/* Lifestyle Section */}
      <section className="bg-gray-100  overflow-clip  mb-16">
        <div className="   ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <div className="md:h-[90vh] aspect-square bg-gray-300 flex items-center justify-center">
              <img
                src="https://img.freepik.com/free-photo/medium-shot-model-wearing-chain-necklace_23-2149439826.jpg"
                alt="Lifestyle"
                className="w-full h-full object-cover"
              />
            </div>
            <div className=" md:h-[90vh] aspect-square bg-gray-300 flex items-center justify-center">
              <img
                src="https://img.freepik.com/free-photo/portrait-young-handsome-male_23-2148884391.jpg"
                alt="Lifestyle"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

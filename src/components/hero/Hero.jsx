import { motion } from "framer-motion";
import HeroSlider from "./HeroSlider";
import SearchBar from "../search/SearchBar";

export default function Hero({ popular }) {
  return (
    <section className="relative h-screen flex items-center justify-center text-white">

      <HeroSlider slides={popular} />

      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="relative z-10 text-center max-w-3xl">
        <motion.h1
          className="text-5xl font-bold"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Explore The World Smarter
        </motion.h1>

        <motion.p
          className="mt-4 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Real-time flights, hotels & destinations
        </motion.p>

        <div className="mt-8">
          <SearchBar />
        </div>

        <button
          className="mt-6 bg-blue-600 px-6 py-3 rounded-full"
          onClick={() =>
            document
              .getElementById("destinations")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Explore Destinations ↓
        </button>
      </div>
    </section>
  );
}
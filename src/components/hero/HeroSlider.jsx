import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSlider({ slides }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  if (!slides.length) return null;

  return (
    <div className="absolute inset-0">
      <AnimatePresence>
        <motion.img
          key={slides[index].city}
          src={`https://source.unsplash.com/1600x900/?${slides[index].city}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
    </div>
  );
}
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSlider({ slides }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 2000
  );

    return () => clearInterval(interval);
  }, [slides]);

  if (!slides.length) return null;

  return (
    <div className="absolute inset-0">
      <AnimatePresence>
        <motion.img
          key={slides[index].city}
          src={`../../hero.jpg`}
          className="w-full h-50 object-cover"
          initial={{ opacity: 10 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 10 }}
        />
      </AnimatePresence>
    </div>
  );
}
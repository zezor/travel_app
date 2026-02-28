export default function Hero() {
  return (
    <div className="relative bg-[url('/hero.jpg')] bg-cover bg-center h-[70vh] flex items-center justify-center text-white">
      <div className="bg-black/50 absolute inset-0"></div>

      <div className="relative text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold">
          Explore The World
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Find flights to your dream destination
        </p>
      </div>
    </div>
  );
}
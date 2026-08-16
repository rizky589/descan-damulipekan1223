export default function CoverStatistikImage() {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 relative bg-white group">
      <img
        src="/statistik.png"
        alt="Cover Statistik"
        className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
    </div>
  );
}

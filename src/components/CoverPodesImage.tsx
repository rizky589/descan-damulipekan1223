export default function CoverPodesImage() {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 relative bg-white group">
      <img
        src="/potensidesa.png"
        alt="Cover Potensi Desa"
        className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
    </div>
  );
}

export default function CoverProfilImage() {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 aspect-[1.414/1] relative bg-gray-100 group">
      <img
        src="/profil.png"
        alt="Cover Profil Desa"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
    </div>
  );
}

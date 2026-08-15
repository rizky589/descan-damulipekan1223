const fs = require('fs');
const file = 'src/app/page.tsx';
let code = fs.readFileSync(file, 'utf8');

const oldContent = `                <motion.div 
                  key={photo.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card-hover relative rounded-3xl overflow-hidden group aspect-[4/3] shadow-sm border border-gray-100 bg-gray-50"
                >
                  <div className={\`w-full h-full bg-gradient-to-br flex items-center justify-center \${i % 4 === 0 ? "from-green-400 to-emerald-600" :
                      i % 4 === 1 ? "from-blue-400 to-blue-600" :
                        i % 4 === 2 ? "from-purple-400 to-purple-600" :
                          "from-amber-400 to-orange-500"
                    }\`}>
                    {photo.imageUrl ? (
                      <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="text-center text-white p-6">
                        <svg className="w-10 h-10 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="font-semibold text-sm">{photo.title}</p>
                      </div>
                    )}
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-bold text-lg leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>{photo.title}</h3>
                      {photo.description && (
                        <p className="text-white/80 text-sm mt-2 line-clamp-2">{photo.description}</p>
                      )}
                    </div>
                  </div>
                </motion.div>`;

const newContent = `                <motion.div 
                  key={photo.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative aspect-[4/3] perspective-1000 cursor-pointer"
                >
                  <div className="w-full h-full relative preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
                    {/* Front side (Photo) */}
                    <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden shadow-md border border-gray-200">
                      <div className={\`w-full h-full bg-gradient-to-br flex items-center justify-center \${i % 4 === 0 ? "from-green-400 to-emerald-600" :
                          i % 4 === 1 ? "from-blue-400 to-blue-600" :
                            i % 4 === 2 ? "from-purple-400 to-purple-600" :
                              "from-amber-400 to-orange-500"
                        }\`}>
                        {photo.imageUrl ? (
                          <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover object-center" />
                        ) : (
                          <div className="text-center text-white p-6">
                            <svg className="w-10 h-10 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Back side (Description) */}
                    <div className="absolute inset-0 backface-hidden rounded-3xl rotate-y-180 bg-gradient-to-br from-green-600 to-green-800 p-6 flex flex-col justify-center items-center text-center shadow-lg border-2 border-green-400 text-white">
                      <h3 className="text-xl font-bold mb-3 drop-shadow-md" style={{ fontFamily: 'Poppins, sans-serif' }}>{photo.title}</h3>
                      {photo.description && (
                        <p className="text-green-50 text-sm leading-relaxed max-h-32 overflow-hidden text-ellipsis">{photo.description}</p>
                      )}
                    </div>
                  </div>
                </motion.div>`;

if (code.includes(oldContent)) {
    code = code.replace(oldContent, newContent);
    fs.writeFileSync(file, code);
    console.log("Replaced successfully!");
} else {
    console.log("Could not find the target code string.");
}
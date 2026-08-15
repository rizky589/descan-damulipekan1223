const fs = require('fs');
const file = 'src/app/struktur-organisasi/page.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
    'const lainnya = pimpinan.filter(p => p.id !== kepalaDesa?.id);',
    `const sekdes = pimpinan.find(p => p.posisi.toLowerCase().includes("sekretaris"));
    const kasiList = pimpinan.filter(p => p.posisi.toLowerCase().includes("seksi"));
    const kaurList = pimpinan.filter(p => p.posisi.toLowerCase().includes("urusan"));`
);

code = code.replace('return (', `
    const CardNode = ({ p, type }: { p: PimpinanOrganisasi, type: 'blue' | 'green' }) => (
        <button
            onClick={() => setSelected(p)}
            className={\`flex flex-col justify-center items-center bg-white border-[3px] rounded-xl p-3 text-center w-36 sm:w-44 h-20 sm:h-24 transition-all z-10 relative cursor-pointer group \${
                type === 'blue' 
                ? 'border-[#1e3a8a] shadow-[4px_4px_0px_#1e3a8a]' 
                : 'border-[#15803d] shadow-[4px_4px_0px_#15803d]'
            } \${selected?.id === p.id ? 'ring-4 ring-offset-2 ring-blue-400 scale-105' : 'hover:-translate-y-1 hover:scale-105'}\`}
        >
            <h3 className={\`font-bold text-[10px] sm:text-xs leading-tight mb-1 \${type === 'blue' ? 'text-[#1e3a8a]' : 'text-[#15803d]'}\`}>
                {p.posisi}
            </h3>
            <p className="text-gray-800 font-extrabold uppercase text-[10px] sm:text-xs tracking-wide line-clamp-2 px-1">
                {p.nama}
            </p>
        </button>
    );

    return (`);

fs.writeFileSync(file, code);

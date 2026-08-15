const fs = require('fs');
const file = 'src/app/struktur-organisasi/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace variables
let old_vars = 'const lainnya = pimpinan.filter(p => p.id !== kepalaDesa?.id);';
let new_vars = `const sekdes = pimpinan.find(p => p.posisi.toLowerCase().includes("sekretaris"));
    const kasiList = pimpinan.filter(p => p.posisi.toLowerCase().includes("seksi"));
    const kaurList = pimpinan.filter(p => p.posisi.toLowerCase().includes("urusan"));`;
code = code.replace(old_vars, new_vars);

let start_str = '<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">';
let end_str = ') : (';

let start_idx = code.indexOf(start_str);
let end_idx = code.indexOf(end_str, start_idx);

if (start_idx === -1 || end_idx === -1) {
    console.log('Boundaries not found');
    process.exit(1);
}

let new_layout = `<div className="flex flex-col items-center">
                            {/* Tree diagram */}
                            <div className="w-full overflow-hidden">
                                <style dangerouslySetInnerHTML={{__html: \`
                                    .org-tree ul { display: flex; justify-content: center; padding-top: 20px; position: relative; padding-left: 0; margin: 0; }
                                    .org-tree li { display: flex; flex-direction: column; align-items: center; position: relative; padding: 20px 10px 0 10px; list-style-type: none; }
                                    .org-tree li::before, .org-tree li::after { content: ''; position: absolute; top: 0; right: 50%; border-top: 2px solid #1e3a8a; width: 50%; height: 20px; }
                                    .org-tree li::after { right: auto; left: 50%; border-left: 2px solid #1e3a8a; }
                                    .org-tree li:only-child::after, .org-tree li:only-child::before { display: none; }
                                    .org-tree li:only-child { padding-top: 0; }
                                    .org-tree li:first-child::before, .org-tree li:last-child::after { border: 0 none; }
                                    .org-tree li:last-child::before { border-right: 2px solid #1e3a8a; border-radius: 0; }
                                    .org-tree ul::before { content: ''; position: absolute; top: 0; left: 50%; border-left: 2px solid #1e3a8a; width: 0; height: 20px; transform: translateX(-50%); }
                                    .org-tree > ul::before { display: none; }
                                \`}} />

                                <div className="org-tree overflow-x-auto pb-8 pt-4 w-full flex justify-center">
                                    <ul>
                                        <li>
                                            {kepalaDesa && <CardNode p={kepalaDesa} type="blue" />}
                                            <ul>
                                                {kasiList.map(kasi => (
                                                    <li key={kasi.id}>
                                                        <CardNode p={kasi} type="green" />
                                                    </li>
                                                ))}
                                                {sekdes && (
                                                    <li>
                                                        <CardNode p={sekdes} type="blue" />
                                                        {kaurList.length > 0 && (
                                                            <ul>
                                                                {kaurList.map(kaur => (
                                                                    <li key={kaur.id}>
                                                                        <CardNode p={kaur} type="blue" />
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </li>
                                                )}
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Detail panel */}
                            {selected && (
                                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 mt-6 w-full max-w-3xl text-left">
                                    <div className="flex items-start gap-5 mb-6">
                                        <div className={\`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br \${getColor(selected.posisi)} flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg flex-shrink-0\`}>
                                            {selected.foto
                                                ? <img src={selected.foto} alt={selected.nama} className="w-full h-full object-cover rounded-2xl" />
                                                : getInitials(selected.nama)}
                                        </div>
                                        <div>
                                            <div className="text-green-600 text-sm font-bold mb-1">{selected.posisi}</div>
                                            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                {selected.nama}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {(selected.periodeAwal || selected.periodeAkhir) && (
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500 font-medium">Masa Jabatan</div>
                                                    <div className="text-sm font-semibold text-gray-900">{selected.periodeAwal || '-'} s/d {selected.periodeAkhir || 'Sekarang'}</div>
                                                </div>
                                            </div>
                                        )}
                                        {selected.pengalaman && (
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500 font-medium">Pengalaman</div>
                                                    <div className="text-sm font-semibold text-gray-900">{selected.pengalaman}</div>
                                                </div>
                                            </div>
                                        )}
                                        {selected.fokus && (
                                            <div className="flex items-start gap-3 md:col-span-2">
                                                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500 font-medium">Fokus & Tugas Utama</div>
                                                    <div className="text-sm font-semibold text-gray-900">{selected.fokus}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2 mt-8 pt-6 border-t border-gray-100">
                                        <button
                                            onClick={() => {
                                                const idx = pimpinan.findIndex(p => p.id === selected.id);
                                                if (idx > 0) setSelected(pimpinan[idx - 1]);
                                            }}
                                            disabled={pimpinan.indexOf(selected) === 0}
                                            className="flex-1 py-2 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                                        >
                                            <span dangerouslySetInnerHTML={{ __html: '&larr; Sebelumnya' }} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                const idx = pimpinan.findIndex(p => p.id === selected.id);
                                                if (idx < pimpinan.length - 1) setSelected(pimpinan[idx + 1]);
                                            }}
                                            disabled={pimpinan.indexOf(selected) === pimpinan.length - 1}
                                            className="flex-1 py-2 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                                        >
                                            <span dangerouslySetInnerHTML={{ __html: 'Berikutnya &rarr;' }} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
`;

code = code.substring(0, start_idx) + new_layout + code.substring(end_idx);

let card_node = `
    const CardNode = ({ p, type }: { p: PimpinanOrganisasi, type: 'blue' | 'green' }) => (
        <button
            onClick={() => setSelected(p)}
            className={\`flex flex-col justify-center items-center bg-white border-[3px] rounded-xl p-3 text-center w-36 sm:w-48 h-24 transition-all z-10 relative cursor-pointer group \${
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

    return (`;

code = code.replace('return (', card_node);

fs.writeFileSync(file, code);
console.log('Success');
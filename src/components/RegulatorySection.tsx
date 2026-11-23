import { useEffect, useState } from 'react';
import { Check, FileText } from 'lucide-react';
import type { RegulatorySectionTab } from '../types.ts';

interface FrameworkResponse {
  company: string;
  nit: string;
  resolution: string;
  dossierPdfUrl: string;
  tabs: RegulatorySectionTab[];
}

export default function RegulatorySection() {
  const [data, setData] = useState<FrameworkResponse | null>(null);
  const [activeId, setActiveId] = useState<string>('resolucion-0303');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadFramework() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/regulatory-framework');
        if (!res.ok) throw new Error('Error de red');
        const payload = (await res.json()) as FrameworkResponse;
        if (mounted) {
          setData(payload);
          if (payload.tabs && payload.tabs.length > 0) {
            setActiveId(payload.tabs[0].id);
          }
        }
      } catch {
        if (mounted) {
          setError('No se pudo cargar la información de la Resolución 0303 de 2021.');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadFramework();
    return () => {
      mounted = false;
    };
  }, []);

  const tabs = data?.tabs || [];
  const activeTab = tabs.find((t) => t.id === activeId) || tabs[0];

  return (
    <section id="licencia" className="py-16 md:py-24 bg-[#EEF1EC] border-b border-[#D9E0D7]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#1B5E3A] mb-2">
              Marco Regulatorio y Licencia Vigente
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#132219] text-balance">
              Resolución Núm. 0303 del 05 de abril de 2021.
            </h2>
            <p className="mt-3 text-base text-[#3B4C42] leading-relaxed">
              Acto administrativo oficial expedido por el Ministerio de Justicia y del Derecho a
              favor de CAÑAMO DEL META S.A.S. ZOMAC (NIT 901.185.114-3).
            </p>
          </div>

          {data?.dossierPdfUrl && (
            <a
              href={data.dossierPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#132219] bg-white border border-[#D9E0D7] rounded-lg hover:bg-[#F7F8F6] transition-colors whitespace-nowrap shrink-0"
            >
              <FileText className="w-4 h-4 text-[#1B5E3A]" />
              <span>Descargar Dossier PDF</span>
            </a>
          )}
        </div>

        {loading ? (
          <div className="bg-white border border-[#D9E0D7] rounded-xl p-8 h-72 animate-pulse" />
        ) : error ? (
          <div className="bg-white border border-[#D7B6B6] rounded-xl p-8 text-sm text-[#7A2727]">
            {error}
          </div>
        ) : activeTab ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Selector Tabs */}
            <div
              role="tablist"
              aria-label="Secciones de la Resolución 0303 de 2021"
              className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto pb-1 lg:pb-0"
            >
              {tabs.map((tab) => {
                const isSelected = tab.id === activeTab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveId(tab.id)}
                    className={`text-left px-4 py-3.5 rounded-xl border transition-colors duration-150 shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#132219] text-white border-[#132219]'
                        : 'bg-white text-[#132219] border-[#D9E0D7] hover:bg-[#F7F8F6]'
                    }`}
                  >
                    <div className="text-sm font-semibold whitespace-nowrap">{tab.shortTitle}</div>
                    <div
                      className={`text-xs mt-0.5 line-clamp-1 ${
                        isSelected ? 'text-[#C6D5CA]' : 'text-[#4F6357]'
                      }`}
                    >
                      {tab.decreeRef}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Panel */}
            <div
              role="tabpanel"
              className="lg:col-span-8 bg-white border border-[#D9E0D7] rounded-xl p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#EAEFE8]">
                <div className="flex items-center gap-4">
                  <img
                    src="/assets/aistudio/Logo_bota_nico_Can_amo_del_Meta1_4237d3b3.png"
                    alt="Cañamo del Meta"
                    referrerPolicy="no-referrer"
                    className="h-11 w-auto object-contain mix-blend-multiply shrink-0 hidden sm:block"
                  />
                  <div>
                    <p className="text-xs font-medium text-[#1B5E3A]">{activeTab.authority}</p>
                    <h3 className="text-2xl font-semibold text-[#132219] mt-1">{activeTab.title}</h3>
                  </div>
                </div>
                <span className="font-['JetBrains_Mono'] text-xs text-[#4F6357] tabular-nums">
                  {activeTab.decreeRef}
                </span>
              </div>

              <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#3B4C42]">
                {activeTab.summary}
              </p>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-[#132219] mb-3">
                    Respaldo jurídico y operativo
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeTab.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#3B4C42]">
                        <Check className="w-4 h-4 text-[#1B5E3A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#F7F8F6] border border-[#E4EAE2] rounded-lg overflow-hidden">
                  <dl className="divide-y divide-[#E4EAE2]">
                    {activeTab.tableRows.map((row) => (
                      <div
                        key={row.concept}
                        className="px-4 py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4"
                      >
                        <dt className="sm:col-span-4 text-xs font-semibold text-[#4F6357]">
                          {row.concept}
                        </dt>
                        <dd className="sm:col-span-8 text-sm text-[#132219]">{row.detail}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

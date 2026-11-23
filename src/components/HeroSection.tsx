import { ArrowRight, FileText } from 'lucide-react';
import ResilientImage from './ResilientImage.tsx';

const HERO_METRICS = [
  {
    value: '< 0,05 USD / g',
    label: 'Costo proyectado en cultivo ecuatorial frente a 1,00–3,00 USD/g indoor'
  },
  {
    value: '> 95%',
    label: 'Recuperación de cannabinoides y terpenos con extracción CO2 supercrítico'
  },
  {
    value: 'Res. 0303 / 2021',
    label: 'Licencia vigente MinJusticia para cultivo de cannabis no psicoactivo'
  },
  {
    value: '12 h / 12 h',
    label: 'Fotoperíodo ecuatorial natural 365 días en San Martín, Meta (250 m s.n.m.)'
  }
];

const DOSSIER_PDF_URL =
  '/assets/aistudio/Dossier_Consolidado_-_Proyecto_Cannabis_No_Psicoactivo_y_Licencia_5794c68f.pdf';

export default function HeroSection() {
  return (
    <section id="inicio" className="pt-10 pb-14 md:pt-14 md:pb-20 border-b border-[#D9E0D7]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Proposition & Primary CTA */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs sm:text-sm font-medium text-[#4F6357] mb-4">
                Cañamo del Meta S.A.S. ZOMAC · NIT 901.185.114-3 · San Martín, Meta
              </p>

              <h1 className="text-[clamp(2.25rem,4vw,3.4rem)] leading-[1.08] font-semibold tracking-tight text-[#132219] text-balance mb-6">
                Proyecto agroindustrial de cannabis no psicoactivo y CBD en el Meta.
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-[#3B4C42] max-w-[54ch] mb-8">
                Operación licenciada bajo la Resolución 0303 de 2021 del Ministerio de Justicia.
                Transformamos el 100% de la biomasa cosechada en extractos de aceite estandarizados
                de grado medicinal e industrial, sin comercialización de flor seca para combustión.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#portafolio"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#1B5E3A] rounded-lg hover:bg-[#14472B] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E3A]"
              >
                <span>Explorar Portafolio B2B</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={DOSSIER_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#132219] hover:text-[#1B5E3A] hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <FileText className="w-4 h-4" />
                <span>Ver Dossier Oficial (PDF)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Dominant 16:9 Architectural Greenhouse Carrier */}
          <div className="lg:col-span-6">
            <div className="h-full min-h-[280px] sm:min-h-[360px] rounded-xl overflow-hidden border border-[#D9E0D7] bg-[#EAEFE8]">
              <ResilientImage
                src="/src/assets/images/hero_colombia_greenhouse_1795394747454.jpg"
                alt="Invernadero de cultivo ecuatorial regulado para cannabis no psicoactivo en Colombia"
                fallbackTitle="Cañamo del Meta — San Martín, Meta"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Quantitative Strip */}
        <div className="mt-10 pt-8 border-t border-[#D9E0D7] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {HERO_METRICS.map((metric) => (
            <div key={metric.value} className="space-y-1.5">
              <div className="font-['JetBrains_Mono'] text-xl font-medium text-[#132219] tabular-nums">
                {metric.value}
              </div>
              <p className="text-sm leading-snug text-[#4F6357]">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

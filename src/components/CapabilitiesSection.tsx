import ResilientImage from './ResilientImage.tsx';

export default function CapabilitiesSection() {
  return (
    <section id="modelo" className="py-16 md:py-24 border-b border-[#D9E0D7]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-medium text-[#1B5E3A] mb-2">
            Síntesis del Modelo Operativo y Comercial
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#132219] text-balance">
            Ventaja ecuatorial colombiana orientada exclusivamente a derivados CBD y cáñamo.
          </h2>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 01 - Wide Card */}
          <article className="md:col-span-2 bg-[#EEF1EC] border border-[#D9E0D7] rounded-xl overflow-hidden grid grid-cols-1 sm:grid-cols-12">
            <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#132219] mb-3">
                  01. Cultivo Ecuatorial y Eficiencia en Costos
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#3B4C42]">
                  Operación al aire libre e invernadero en San Martín (Meta) bajo fotoperíodo
                  natural de 12 horas de luz y 12 de oscuridad los 365 días del año. Frente a costos
                  de 1,00 a 3,00 USD/g en instalaciones indoor de Norteamérica, proyectamos costos
                  inferiores a 0,05 USD/g con menor huella hídrica y energética.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#D9E0D7] flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[#4F6357] tabular-nums">
                <span>Costo proyectado &lt; 0,05 USD/g</span>
                <span aria-hidden="true">·</span>
                <span>Sin iluminación artificial masiva</span>
              </div>
            </div>
            <div className="sm:col-span-5 min-h-[220px]">
              <ResilientImage
                src="/src/assets/images/botanical_flower_cultivation_1795394747983.jpg"
                alt="Cultivo de cepas no psicoactivas ricas en CBD"
                fallbackTitle="Cultivo Ecuatorial"
                className="w-full h-full object-cover"
              />
            </div>
          </article>

          {/* Pillar 02 - CBD Profiles */}
          <article className="bg-white border border-[#D9E0D7] rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-[#132219] mb-3">
                02. Perfiles Dominantes en CBD (20:1)
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#3B4C42]">
                Selección genética orientada a ratios elevados de cannabidiol (proporciones 20:1 con
                THC inferior al 1%), dirigida a aplicaciones terapéuticas y de bienestar en manejo
                del dolor, inflamación, trastornos del sueño, ansiedad y epilepsia.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E4EAE2] text-xs font-['JetBrains_Mono'] text-[#4F6357] tabular-nums">
              THC &lt; 1% · Cannabis No Psicoactivo
            </div>
          </article>

          {/* Pillar 03 - B2B Scaling */}
          <article className="bg-white border border-[#D9E0D7] rounded-xl overflow-hidden flex flex-col">
            <div className="aspect-[4/3] bg-[#EAEFE8]">
              <ResilientImage
                src="/src/assets/images/hemp_industrial_fiber_1795394747521.jpg"
                alt="Cáñamo industrial y derivados estandarizados para canales B2B"
                fallbackTitle="Proyección B2B Wholesale"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-[#132219] mb-2">
                  03. Proyección Comercial B2B y Escalamiento
                </h3>
                <p className="text-sm leading-relaxed text-[#3B4C42]">
                  Modelo enfocado en ventas mayoristas (Wholesale) y suministro continuo a
                  laboratorios y redes de distribución, con infraestructura escalable proyectada a
                  escala superior a 1.000 hectáreas en el sector.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E4EAE2] text-xs text-[#4F6357]">
                Trazabilidad formal · Calidad certificada
              </div>
            </div>
          </article>

          {/* Pillar 04 - Wide Clean Extraction Card */}
          <article className="md:col-span-2 bg-[#132219] text-[#F7F8F6] border border-[#1E3527] rounded-xl overflow-hidden grid grid-cols-1 sm:grid-cols-12">
            <div className="sm:col-span-5 min-h-[220px]">
              <ResilientImage
                src="/src/assets/images/lab_extraction_gmp_1795394747760.jpg"
                alt="Extracción estandarizada con CO2 supercrítico"
                fallbackTitle="Extracción CO2 Supercrítico"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-wide mb-3">
                  04. Extracción Estandarizada y Enfoque Sin Flor Seca
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#D0DBD3]">
                  El 100% de la biomasa cosechada se destina a transformación industrial para
                  extractos de aceite estandarizados, excluyendo la flor seca para combustión. La
                  extracción limpia con CO2 supercrítico recupera más del 95% de cannabinoides
                  activos y terpenos naturales (efecto séquito).
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#263E2F] flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#AFC2B5] tabular-nums">
                <span>100% biomasa a derivados</span>
                <span aria-hidden="true">·</span>
                <span>Recuperación &gt; 95% CO2</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

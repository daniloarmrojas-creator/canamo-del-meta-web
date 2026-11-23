import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import type { FieldEvidenceRecord } from '../types.ts';
import ResilientImage from './ResilientImage.tsx';

interface FieldEvidenceResponse {
  property: string;
  matricula: string;
  captureDate: string;
  records: FieldEvidenceRecord[];
}

export default function FieldVerificationSection() {
  const [data, setData] = useState<FieldEvidenceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadFieldEvidence() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/field-evidence');
        if (!res.ok) throw new Error('Error de red');
        const payload = (await res.json()) as FieldEvidenceResponse;
        if (mounted) {
          setData(payload);
        }
      } catch {
        if (mounted) {
          setError('No fue posible cargar el registro fotográfico del predio.');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadFieldEvidence();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="predio" className="py-16 md:py-24 border-b border-[#D9E0D7]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#1B5E3A] mb-2">
              Verificación en Campo · San Martín, Meta
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#132219] text-balance">
              Registro fotográfico y georreferenciación del Predio «Lote Dos».
            </h2>
          </div>

          {data && (
            <div className="flex items-start gap-2.5 text-xs text-[#4F6357] bg-[#EEF1EC] border border-[#D9E0D7] rounded-lg px-4 py-3">
              <MapPin className="w-4 h-4 text-[#1B5E3A] shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-[#132219]">{data.property}</div>
                <div className="font-['JetBrains_Mono'] mt-0.5 tabular-nums">
                  Matrícula {data.matricula} · Levantamiento {data.captureDate}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stylized Meta Cultivation Process Conceptual Map */}
        <div className="mb-10 bg-white border border-[#D9E0D7] rounded-xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-[#EAEFE8] flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-[#1B5E3A] mb-1">
                Mapa Conceptual del Proceso Productivo · San Martín, Meta
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#132219]">
                Ciclo integrado de cultivo ecuatorial y transformación en derivados CBD
              </h3>
            </div>
            <p className="text-xs font-['JetBrains_Mono'] text-[#4F6357] tabular-nums">
              12h luz / 12h oscuridad · 100% biomasa a extracto
            </p>
          </div>
          <div className="aspect-[16/9] bg-[#F7F8F6]">
            <ResilientImage
              src="/src/assets/images/cultivo_meta_mapa_es_1795395497145.jpg"
              alt="Mapa conceptual del proceso de cultivo ecuatorial en el Meta: semilla certificada, cultivo ecuatorial, cosecha de biomasa y extracción de CBD"
              fallbackTitle="Proceso de Cultivo Ecuatorial en el Meta"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#EAEFE8] border-t border-[#EAEFE8] bg-[#F7F8F6]">
            <div className="p-4 sm:p-5">
              <div className="text-xs font-semibold text-[#132219]">01. Semilla Certificada</div>
              <p className="text-xs text-[#4F6357] mt-1 leading-relaxed">
                Genética no psicoactiva (THC &lt; 1%) con altos ratios de cannabidiol bajo Modalidad 1.
              </p>
            </div>
            <div className="p-4 sm:p-5">
              <div className="text-xs font-semibold text-[#132219]">02. Cultivo Ecuatorial</div>
              <p className="text-xs text-[#4F6357] mt-1 leading-relaxed">
                Invernadero y campo abierto en San Martín aprovechando fotoperíodo natural todo el año.
              </p>
            </div>
            <div className="p-4 sm:p-5">
              <div className="text-xs font-semibold text-[#132219]">03. Cosecha de Biomasa</div>
              <p className="text-xs text-[#4F6357] mt-1 leading-relaxed">
                Costo proyectado &lt; 0,05 USD/g destinado íntegramente a transformación industrial.
              </p>
            </div>
            <div className="p-4 sm:p-5">
              <div className="text-xs font-semibold text-[#132219]">04. Extracción de CBD</div>
              <p className="text-xs text-[#4F6357] mt-1 leading-relaxed">
                CO2 supercrítico con &gt; 95% de recuperación de cannabinoides y terpenos naturales.
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white border border-[#D9E0D7] rounded-xl p-6 h-96 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="bg-white border border-[#D7B6B6] rounded-xl p-8 text-sm text-[#7A2727]">
            {error}
          </div>
        ) : data ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.records.map((record) => (
              <article
                key={record.id}
                className="bg-white border border-[#D9E0D7] rounded-xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] bg-[#EAEFE8] border-b border-[#E4EAE2]">
                    <ResilientImage
                      src={record.imageUrl}
                      alt={`${record.title} — ${record.location}`}
                      fallbackTitle={record.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-[#4F6357] mb-2">
                      <span className="font-medium text-[#1B5E3A]">{record.indexNumber}</span>
                      <span aria-hidden="true">·</span>
                      <span>{record.location}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-[#132219] mb-2">{record.title}</h3>
                    <p className="text-sm leading-relaxed text-[#3B4C42]">{record.description}</p>
                  </div>
                </div>

                <dl className="mx-6 mb-6 pt-2 divide-y divide-[#EAEFE8] border-t border-[#EAEFE8]">
                  <div className="py-2 flex items-baseline justify-between gap-2 text-xs">
                    <dt className="text-[#5A6E62]">Coordenadas</dt>
                    <dd className="font-['JetBrains_Mono'] text-[#132219] text-right tabular-nums">
                      {record.coordinates}
                    </dd>
                  </div>
                  <div className="py-2 flex items-baseline justify-between gap-2 text-xs">
                    <dt className="text-[#5A6E62]">Altitud / Rumbo</dt>
                    <dd className="font-['JetBrains_Mono'] text-[#132219] text-right tabular-nums">
                      {record.altitude} · {record.bearing}
                    </dd>
                  </div>
                  <div className="py-2 flex items-baseline justify-between gap-2 text-xs">
                    <dt className="text-[#5A6E62]">Captura</dt>
                    <dd className="font-['JetBrains_Mono'] text-[#132219] text-right tabular-nums">
                      {record.capturedAt}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

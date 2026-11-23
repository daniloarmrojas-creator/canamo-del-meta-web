import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ContactSectionProps {
  selectedInterest: string;
}

const INTEREST_OPTIONS = [
  'Extracto de Aceite Estandarizado Rico en CBD',
  'Insumo Base de CBD para Laboratorios',
  'Producción de Grano y Semillas para Siembra',
  'Biomasa y Derivados de Cáñamo Industrial',
  'Suministro Mayorista B2B y Alianzas Productivas',
  'Consulta Institucional — Resolución 0303 de 2021'
];

export default function ContactSection({ selectedInterest }: ContactSectionProps) {
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [lineaInteres, setLineaInteres] = useState(INTEREST_OPTIONS[0]);
  const [mensaje, setMensaje] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{ referenceId: string; createdAt: string } | null>(null);

  useEffect(() => {
    if (selectedInterest) {
      setLineaInteres(selectedInterest);
    }
  }, [selectedInterest]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          empresa,
          correo,
          telefono,
          lineaInteres,
          mensaje
        })
      });

      const data = (await response.json()) as {
        referenceId?: string;
        createdAt?: string;
        error?: string;
      };

      if (!response.ok) {
        setErrorMsg(data.error || 'Verifica los campos ingresados e intenta de nuevo.');
        return;
      }

      setReceipt({
        referenceId: data.referenceId || 'CM-2026-0001',
        createdAt: data.createdAt || new Date().toISOString()
      });
      setNombre('');
      setEmpresa('');
      setCorreo('');
      setTelefono('');
      setMensaje('');
    } catch {
      setErrorMsg('No fue posible conectar con el servidor Node.js. Intenta nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Context Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-sm font-medium text-[#1B5E3A] mb-2">
                Canales Mayoristas y Alianzas B2B
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#132219] text-balance">
                Contacto directo con Cañamo del Meta S.A.S. ZOMAC.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#3B4C42]">
                Para requerimientos de suministro continuo de extractos estandarizados de CBD,
                alianzas productivas o validación documental de la Resolución 0303 de 2021, envía
                tu solicitud a través de nuestro servidor Node.js.
              </p>
            </div>

            <div className="bg-[#EEF1EC] border border-[#D9E0D7] rounded-xl p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[#132219]">
                Datos Corporativos Oficiales
              </h3>
              <dl className="space-y-2 text-sm text-[#3B4C42]">
                <div>
                  <dt className="text-xs font-medium text-[#4F6357]">Razón social</dt>
                  <dd className="font-medium text-[#132219]">CAÑAMO DEL META S.A.S. ZOMAC</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-[#4F6357]">NIT</dt>
                  <dd className="font-['JetBrains_Mono'] text-[#132219] tabular-nums">
                    901.185.114-3
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-[#4F6357]">Operación Licenciada</dt>
                  <dd>Predio «LOTE DOS», San Martín, Meta · Matrícula 236-51322</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-white border border-[#D9E0D7] rounded-xl p-6 sm:p-8">
            {receipt ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#EAF3EC] text-[#1B5E3A] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-[#132219]">
                  Solicitud registrada correctamente
                </h3>
                <p className="text-sm text-[#3B4C42] max-w-md mx-auto">
                  Tu requerimiento quedó guardado en el servidor Node.js de Cañamo del Meta con el
                  radicado de referencia:
                </p>
                <div className="inline-block font-['JetBrains_Mono'] text-base font-medium text-[#132219] bg-[#F7F8F6] border border-[#D9E0D7] rounded-lg px-4 py-2 tabular-nums">
                  {receipt.referenceId}
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setReceipt(null)}
                    className="px-4 py-2.5 text-sm font-medium text-[#132219] bg-[#EAEFE8] hover:bg-[#DDE4DA] rounded-lg transition-colors cursor-pointer"
                  >
                    Enviar otra solicitud
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-nombre"
                      className="block text-sm font-medium text-[#132219] mb-1.5"
                    >
                      Nombre completo
                    </label>
                    <input
                      id="contact-nombre"
                      type="text"
                      required
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Nombre y apellido"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F7F8F6] border border-[#CFD7CD] rounded-lg text-[#132219] focus:outline-none focus:bg-white focus:border-[#1B5E3A]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-empresa"
                      className="block text-sm font-medium text-[#132219] mb-1.5"
                    >
                      Empresa u organización
                    </label>
                    <input
                      id="contact-empresa"
                      type="text"
                      required
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      placeholder="Laboratorio o distribuidor"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F7F8F6] border border-[#CFD7CD] rounded-lg text-[#132219] focus:outline-none focus:bg-white focus:border-[#1B5E3A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-correo"
                      className="block text-sm font-medium text-[#132219] mb-1.5"
                    >
                      Correo corporativo
                    </label>
                    <input
                      id="contact-correo"
                      type="email"
                      required
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      placeholder="nombre@empresa.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F7F8F6] border border-[#CFD7CD] rounded-lg text-[#132219] focus:outline-none focus:bg-white focus:border-[#1B5E3A]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-telefono"
                      className="block text-sm font-medium text-[#132219] mb-1.5"
                    >
                      Teléfono / WhatsApp (opcional)
                    </label>
                    <input
                      id="contact-telefono"
                      type="tel"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="+57 300 000 0000"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F7F8F6] border border-[#CFD7CD] rounded-lg text-[#132219] focus:outline-none focus:bg-white focus:border-[#1B5E3A]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-linea"
                    className="block text-sm font-medium text-[#132219] mb-1.5"
                  >
                    Línea o servicio de interés
                  </label>
                  <select
                    id="contact-linea"
                    value={lineaInteres}
                    onChange={(e) => setLineaInteres(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F8F6] border border-[#CFD7CD] rounded-lg text-[#132219] focus:outline-none focus:bg-white focus:border-[#1B5E3A]"
                  >
                    {INTEREST_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-mensaje"
                    className="block text-sm font-medium text-[#132219] mb-1.5"
                  >
                    Detalle del requerimiento
                  </label>
                  <textarea
                    id="contact-mensaje"
                    rows={4}
                    required
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Indícanos volumen requerido, perfil de CBD, mercado de destino o consulta sobre la licencia..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F8F6] border border-[#CFD7CD] rounded-lg text-[#132219] focus:outline-none focus:bg-white focus:border-[#1B5E3A]"
                  />
                </div>

                {errorMsg && (
                  <p role="alert" className="text-sm font-medium text-[#8C2D2D]">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-[#1B5E3A] rounded-lg hover:bg-[#14472B] disabled:opacity-60 transition-colors duration-150 cursor-pointer"
                >
                  {submitting ? 'Enviando solicitud...' : 'Enviar Solicitud B2B'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

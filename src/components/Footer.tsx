export default function Footer() {
  return (
    <footer className="bg-[#132219] text-[#D0DBD3] py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-8 border-b border-[#263E2F]">
          <div className="max-w-md space-y-4">
            <a
              href="#inicio"
              aria-label="Cañamo del Meta - Volver al inicio"
              className="inline-flex items-center bg-[#F7F8F6] rounded-lg px-4 py-2.5 border border-[#D9E0D7]"
            >
              <img
                src="/assets/aistudio/Logo_bota_nico_Can_amo_del_Meta1_4237d3b3.png"
                alt="Logo Cañamo del Meta S.A.S. ZOMAC"
                referrerPolicy="no-referrer"
                className="h-14 w-auto object-contain mix-blend-multiply"
              />
            </a>
            <div className="font-['Fraunces'] text-lg font-semibold text-white">
              Cañamo del Meta S.A.S. ZOMAC
            </div>
            <p className="text-sm leading-relaxed text-[#AFC2B5]">
              Proyecto agroindustrial de cannabis no psicoactivo (CBD y cáñamo) en San Martín,
              Meta. Plataforma desarrollada en Node.js y Express.
            </p>
          </div>

          <nav
            aria-label="Enlaces de pie de página"
            className="flex flex-wrap items-center gap-6 text-sm text-[#D0DBD3]"
          >
            <a href="#modelo" className="hover:text-white transition-colors">
              Modelo
            </a>
            <a href="#portafolio" className="hover:text-white transition-colors">
              Portafolio
            </a>
            <a href="#licencia" className="hover:text-white transition-colors">
              Licencia 0303
            </a>
            <a href="#predio" className="hover:text-white transition-colors">
              Predio Meta
            </a>
            <a href="#contacto" className="hover:text-white transition-colors">
              Contacto
            </a>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#91A698]">
          <p>
            Resolución 0303 del 05 de abril de 2021 — Ministerio de Justicia y del Derecho · Ley
            1787 de 2016 y Decreto 613 de 2017 · NIT 901.185.114-3.
          </p>
          <p className="whitespace-nowrap">© 2026 Cañamo del Meta S.A.S. ZOMAC</p>
        </div>
      </div>
    </footer>
  );
}

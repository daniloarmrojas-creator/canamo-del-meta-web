import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onSelectContact: () => void;
}

const NAV_LINKS = [
  { href: '#modelo', label: 'Modelo' },
  { href: '#portafolio', label: 'Portafolio' },
  { href: '#licencia', label: 'Licencia 0303' },
  { href: '#predio', label: 'Predio Meta' }
];

const LOGO_URL = '/assets/aistudio/Logo_bota_nico_Can_amo_del_Meta1_4237d3b3.png';

export default function Header({ onSelectContact }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handlePrimaryAction = () => {
    setMobileOpen(false);
    onSelectContact();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F8F6]/95 backdrop-blur-sm border-b border-[#D9E0D7]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Single brand lockup */}
        <a
          href="#inicio"
          aria-label="Cañamo del Meta - Inicio"
          className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B5E3A]"
        >
          <img
            src={LOGO_URL}
            alt="Cañamo del Meta"
            referrerPolicy="no-referrer"
            className="h-12 w-auto object-contain mix-blend-multiply"
          />
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#3E5146]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 hover:text-[#132219] hover:underline underline-offset-4 decoration-[#1B5E3A] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B5E3A]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="hidden md:flex items-center shrink-0">
          <button
            type="button"
            onClick={handlePrimaryAction}
            className="px-4 py-2 text-sm font-medium text-white bg-[#1B5E3A] rounded-lg hover:bg-[#14472B] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E3A]"
          >
            Contacto B2B
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#132219] hover:bg-[#EAEFE8] transition-colors cursor-pointer"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#D9E0D7] bg-[#F7F8F6] px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2" aria-label="Navegación móvil">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-2 text-base font-medium text-[#132219] hover:bg-[#EAEFE8] rounded-md"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={handlePrimaryAction}
            className="w-full px-4 py-3 text-sm font-medium text-white bg-[#1B5E3A] rounded-lg hover:bg-[#14472B] transition-colors cursor-pointer"
          >
            Contacto B2B
          </button>
        </div>
      )}
    </header>
  );
}

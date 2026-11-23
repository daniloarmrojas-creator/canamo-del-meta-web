import { useEffect, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import type { CatalogCategory, CatalogItem } from '../types.ts';
import ResilientImage from './ResilientImage.tsx';

interface PortfolioSectionProps {
  onRequestTechSheet: (itemTitle: string) => void;
}

const CATEGORIES: Array<{ id: CatalogCategory; label: string }> = [
  { id: 'todos', label: 'Todos' },
  { id: 'extractos', label: 'Extractos' },
  { id: 'semillas', label: 'Semillas' },
  { id: 'canamo', label: 'Cáñamo' },
  { id: 'b2b', label: 'B2B' }
];

export default function PortfolioSection({ onRequestTechSheet }: PortfolioSectionProps) {
  const [category, setCategory] = useState<CatalogCategory>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (category !== 'todos') params.set('category', category);
        if (searchTerm.trim()) params.set('q', searchTerm.trim());

        const response = await fetch(`/api/catalog?${params.toString()}`, {
          signal: controller.signal
        });
        if (!response.ok) {
          throw new Error('No fue posible consultar el portafolio desde el servidor.');
        }
        const data = (await response.json()) as { items: CatalogItem[] };
        setItems(data.items || []);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError('Ocurrió un error al cargar las líneas desde la API de Node.js.');
        }
      } finally {
        setLoading(false);
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [category, searchTerm]);

  return (
    <section id="portafolio" className="py-16 md:py-24 border-b border-[#D9E0D7]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#1B5E3A] mb-2">
              Portafolio Autorizado (Sin Flor Seca)
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#132219] text-balance">
              Líneas de derivados CBD, grano, semilla y suministro B2B.
            </h2>
          </div>

          {/* Search & Category Segmented Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#5A6E62] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar línea o modalidad..."
                aria-label="Buscar en el portafolio"
                className="w-full sm:w-64 pl-9 pr-3 py-2 text-sm bg-white border border-[#CFD7CD] rounded-lg text-[#132219] placeholder:text-[#6B7E73] focus:outline-none focus:border-[#1B5E3A]"
              />
            </div>

            <div
              role="tablist"
              aria-label="Filtrar portafolio por categoría"
              className="flex flex-wrap items-center gap-1 p-1 bg-[#EAEFE8] rounded-lg border border-[#D9E0D7]"
            >
              {CATEGORIES.map((cat) => {
                const isActive = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#132219] shadow-xs'
                        : 'text-[#4F6357] hover:text-[#132219]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* States: Loading / Error / Empty / Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white border border-[#D9E0D7] rounded-xl p-6 h-[420px] animate-pulse flex flex-col justify-between"
              >
                <div className="h-44 bg-[#EAEFE8] rounded-lg" />
                <div className="space-y-3">
                  <div className="h-4 w-1/2 bg-[#EAEFE8] rounded" />
                  <div className="h-6 w-3/4 bg-[#EAEFE8] rounded" />
                  <div className="h-16 w-full bg-[#EAEFE8] rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-white border border-[#D7B6B6] rounded-xl p-8 text-center">
            <p className="text-base font-medium text-[#7A2727] mb-3">{error}</p>
            <button
              type="button"
              onClick={() => setCategory('todos')}
              className="px-4 py-2 text-sm font-medium text-white bg-[#1B5E3A] rounded-lg hover:bg-[#14472B] cursor-pointer"
            >
              Reintentar
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white border border-[#D9E0D7] rounded-xl p-10 text-center">
            <p className="text-base font-medium text-[#132219] mb-2">
              No se encontraron líneas para tu búsqueda.
            </p>
            <p className="text-sm text-[#4F6357] mb-5">
              Prueba cambiando la categoría o limpiando el filtro de texto.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory('todos');
                setSearchTerm('');
              }}
              className="px-4 py-2 text-sm font-medium text-[#132219] bg-[#EAEFE8] rounded-lg hover:bg-[#DDE4DA] cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <article
                key={item.id}
                className="bg-white border border-[#D9E0D7] rounded-xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] bg-[#EAEFE8] border-b border-[#E4EAE2]">
                    <ResilientImage
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      fallbackTitle={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    {/* Unboxed 1-line metadata */}
                    <div className="flex items-center gap-2 text-xs text-[#4F6357] mb-2">
                      <span className="font-medium text-[#1B5E3A]">{item.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.standard}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-[#132219] mb-2.5">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-[#3B4C42] mb-5">{item.summary}</p>

                    <dl className="divide-y divide-[#EAEFE8] border-t border-[#EAEFE8]">
                      {item.specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="py-2 flex items-baseline justify-between gap-4 text-xs"
                        >
                          <dt className="text-[#5A6E62]">{spec.label}</dt>
                          <dd className="font-['JetBrains_Mono'] text-[#132219] text-right tabular-nums">
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <button
                    type="button"
                    onClick={() => onRequestTechSheet(item.title)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#132219] bg-[#F0F4EE] hover:bg-[#E2E9DF] border border-[#D9E0D7] rounded-lg transition-colors duration-150 cursor-pointer"
                  >
                    <span>Solicitar Información B2B</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

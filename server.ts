import express from 'express';
import type { Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import type {
  CatalogItem,
  FieldEvidenceRecord,
  InquiryPayload,
  InquiryRecord,
  RegulatorySectionTab
} from './src/types.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 3000);
const DATA_DIR = path.resolve(__dirname, 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: 'ext-cbd-20-1',
    code: 'CM-EXT-01',
    category: 'extractos',
    categoryLabel: 'Extractos',
    standard: 'CO2 Supercrítico · Ratio 20:1',
    title: 'Extracto de Aceite Estandarizado Rico en CBD',
    summary:
      'El 100% de la biomasa cosechada se transforma en extractos limpios mediante CO2 supercrítico, recuperando más del 95% de cannabinoides activos y terpenos naturales (efecto séquito), sin comercialización de flor seca para combustión.',
    imageUrl: '/src/assets/images/lab_extraction_gmp_1795394747760.jpg',
    imageAlt: 'Equipo de extracción botánica estandarizada para aceite rico en CBD',
    specs: [
      { label: 'Perfil dominante', value: 'Ratio 20:1 (CBD / THC)' },
      { label: 'Contenido THC', value: '< 1% (No psicoactivo)' },
      { label: 'Recuperación activa', value: '> 95% cannabinoides + terpenos' },
      { label: 'Aplicaciones', value: 'Dolor, inflamación, sueño y ansiedad' }
    ]
  },
  {
    id: 'ext-terapeutico-b2b',
    code: 'CM-EXT-02',
    category: 'extractos',
    categoryLabel: 'Extractos',
    standard: 'Modalidad 2 · Fabricación de Derivados',
    title: 'Insumo Base de CBD para Laboratorios',
    summary:
      'Concentrado botánico estandarizado de grado medicinal e industrial diseñado para formulación terapéutica y bienestar bajo estándares de trazabilidad y calidad certificada.',
    imageUrl: '/src/assets/images/lab_extraction_gmp_1795394747760.jpg',
    imageAlt: 'Frascos ámbar farmacéuticos con extracto estandarizado de CBD',
    specs: [
      { label: 'Enfoque operativo', value: '100% transformación en derivados' },
      { label: 'Flor seca combustión', value: 'Excluida del modelo comercial' },
      { label: 'Marco legal', value: 'Ley 1787/2016 · Decreto 613/2017' },
      { label: 'Canal de entrega', value: 'Laboratorios nacionales y exportación' }
    ]
  },
  {
    id: 'sem-grano-siembra',
    code: 'CM-SEM-01',
    category: 'semillas',
    categoryLabel: 'Semillas',
    standard: 'Modalidad 1 · Resolución 0303 de 2021',
    title: 'Producción de Grano y Semillas para Siembra',
    summary:
      'Selección genética orientada a cepas no psicoactivas ricas en cannabidiol adaptadas al fotoperíodo ecuatorial natural de San Martín, Meta (12 horas luz / 12 horas oscuridad los 365 días del año).',
    imageUrl: '/src/assets/images/botanical_flower_cultivation_1795394747983.jpg',
    imageAlt: 'Cultivo ecuatorial de cepas no psicoactivas ricas en CBD',
    specs: [
      { label: 'Modalidad autorizada', value: 'Grano y semillas para siembra' },
      { label: 'Ubicación predio', value: 'Lote Dos, San Martín (Meta)' },
      { label: 'Fotoperíodo natural', value: '12 h luz / 12 h oscuridad (365 d)' },
      { label: 'Altitud promedio', value: '250 m s.n.m.' }
    ]
  },
  {
    id: 'can-fines-industriales',
    code: 'CM-IND-01',
    category: 'canamo',
    categoryLabel: 'Cáñamo',
    standard: 'Modalidad 3 · Fines Industriales',
    title: 'Biomasa y Derivados de Cáñamo Industrial',
    summary:
      'Producción sostenible al aire libre y bajo invernadero sin iluminación artificial masiva ni climatización intensiva, reduciendo la huella de carbono y el consumo energético e hídrico.',
    imageUrl: '/src/assets/images/hemp_industrial_fiber_1795394747521.jpg',
    imageAlt: 'Fibras naturales y aceite botánico de cáñamo industrial colombiano',
    specs: [
      { label: 'Clasificación', value: 'Cannabis no psicoactivo (THC < 1%)' },
      { label: 'Costo ecuatorial', value: 'Proyectado < 0,05 USD / gramo' },
      { label: 'Comparativa indoor', value: 'Frente a 1,00–3,00 USD/g Norteamérica' },
      { label: 'Sostenibilidad', value: 'Baja huella hídrica y energética' }
    ]
  },
  {
    id: 'b2b-wholesale-escala',
    code: 'CM-B2B-01',
    category: 'b2b',
    categoryLabel: 'B2B',
    standard: 'Wholesale Corporativo · Escalamiento',
    title: 'Suministro Mayorista B2B y Alianzas Productivas',
    summary:
      'Infraestructura escalable orientada al abastecimiento continuo de grandes redes de distribución y laboratorios, con capacidad proyectada para altos volúmenes de biomasa y respaldo jurídico completo.',
    imageUrl: '/src/assets/images/hero_colombia_greenhouse_1795394747454.jpg',
    imageAlt: 'Infraestructura agrícola regulada para suministro mayorista B2B en Colombia',
    specs: [
      { label: 'Modelo comercial', value: 'Ventas B2B (Wholesale)' },
      { label: 'Proyección sectorial', value: 'Escala superior a 1.000 hectáreas' },
      { label: 'Trazabilidad', value: 'Resolución 0303 del 05/04/2021' },
      { label: 'Sociedad titular', value: 'CAÑAMO DEL META S.A.S. ZOMAC' }
    ]
  }
];

const REGULATORY_TABS: RegulatorySectionTab[] = [
  {
    id: 'resolucion-0303',
    shortTitle: 'Resolución 0303 de 2021',
    title: 'Licencia Oficial de Cultivo No Psicoactivo',
    authority: 'Ministerio de Justicia y del Derecho — Subdirección de Control y Fiscalización',
    decreeRef: 'Resolución Núm. 0303 · 05 de abril de 2021',
    summary:
      'Acto administrativo mediante el cual el Ministerio de Justicia y del Derecho otorgó formalmente a CAÑAMO DEL META S.A.S. ZOMAC la licencia de cultivo de plantas de cannabis no psicoactivo, tras verificar requisitos técnicos/jurídicos y emitir concepto favorable en visita previa el 3 de diciembre de 2020.',
    highlights: [
      'Firmada por Erika Patricia Rincón Remolina (Subdirección de Control y Fiscalización).',
      'Visita previa de control con concepto favorable realizada el 3 de diciembre de 2020.',
      'Vigencia de cinco (5) años desde ejecutoria, recertificable dentro de los 3 meses previos.',
      'Obligaciones tarifarias acreditadas: 307,27 SMLDV inicial y saldo de 112,98 SMLDV en 4 cuotas anuales de 28,245 SMLDV.'
    ],
    tableRows: [
      {
        concept: 'Autoridad Emisora',
        detail: 'Ministerio de Justicia y del Derecho — Subdirección de Control y Fiscalización de Sustancias Químicas y Estupefacientes'
      },
      {
        concept: 'Marco Legal Base',
        detail: 'Consensos ONU (UNGASS), Ley 1787 de 2016 y Decreto 613 de 2017'
      },
      {
        concept: 'Vigencia y Recertificación',
        detail: '5 años desde ejecutoria; recertificable solicitando 3 meses antes del vencimiento'
      },
      {
        concept: 'Seguimiento Tarifario',
        detail: 'Pago inicial 307,27 SMLDV; saldo 112,98 SMLDV en 4 cuotas de 28,245 SMLDV (enero, soporte en primeros 15 días de febrero)'
      }
    ]
  },
  {
    id: 'sociedad-predio',
    shortTitle: 'Sociedad y Predio',
    title: 'Titularidad Societaria e Inmueble Autorizado',
    authority: 'CAÑAMO DEL META S.A.S. ZOMAC · NIT 901.185.114-3',
    decreeRef: 'Matrícula Inmobiliaria 236-51322',
    summary:
      'La operación autorizada se encuentra radicada en el municipio de San Martín, departamento del Meta, sobre predio rural debidamente identificado e inscrito bajo contrato de arrendamiento para uso y goce agrícola.',
    highlights: [
      'Sociedad licenciataria: CAÑAMO DEL META S.A.S. ZOMAC (NIT 901.185.114-3).',
      'Representante Legal (Gerente): Héctor Alejandro Ruiz Moreno.',
      'Representante Legal Suplente: Oscar Mauricio Ruiz Cuervo.',
      'Inmueble autorizado: Predio «LOTE DOS», Vereda San Martín, Municipio de San Martín (Meta).'
    ],
    tableRows: [
      {
        concept: 'Sociedad Licenciataria',
        detail: 'CAÑAMO DEL META S.A.S. ZOMAC — NIT 901.185.114-3'
      },
      {
        concept: 'Representación Legal',
        detail: 'Gerente: Héctor Alejandro Ruiz Moreno · Suplente: Oscar Mauricio Ruiz Cuervo'
      },
      {
        concept: 'Inmueble Autorizado',
        detail: 'Predio «LOTE DOS», Vereda San Martín, Municipio de San Martín (Meta) — Matrícula 236-51322'
      },
      {
        concept: 'Titularidad del Predio',
        detail: 'Propiedad de RENACER INVERSIONES AG S.A.S. (NIT 900.807.853-5), en arrendamiento a CAÑAMO DEL META S.A.S. ZOMAC'
      }
    ]
  },
  {
    id: 'modalidades',
    shortTitle: 'Modalidades Autorizadas',
    title: 'Alcance Operativo y Enfoque Sin Flor Seca',
    authority: 'Cannabis No Psicoactivo (THC < 1%) · Fines Médicos, Científicos e Industriales',
    decreeRef: '3 Modalidades Oficiales',
    summary:
      'El proyecto concentra el 100% de su biomasa cosechada en procesos de transformación industrial para obtener extractos estandarizados ricos en CBD y derivados de cáñamo, excluyendo expresamente la venta de flor seca para combustión.',
    highlights: [
      'Modalidad 1: Producción de grano y de semillas para siembra.',
      'Modalidad 2: Fabricación de derivados estandarizados de grado medicinal e industrial.',
      'Modalidad 3: Fines industriales con variedades de cannabis no psicoactivo (THC < 1%).',
      'Perfiles genéticos de alto ratio CBD (ej. 20:1) para dolor, inflamación, sueño, ansiedad y epilepsia.'
    ],
    tableRows: [
      {
        concept: 'Modalidad 1',
        detail: 'Producción de grano y de semillas para siembra'
      },
      {
        concept: 'Modalidad 2',
        detail: 'Fabricación de derivados (100% transformación de biomasa; sin flor seca para combustión)'
      },
      {
        concept: 'Modalidad 3',
        detail: 'Fines industriales (cáñamo y cepas no psicoactivas con THC < 1%)'
      },
      {
        concept: 'Tecnología de Extracción',
        detail: 'Extracción limpia (CO2 supercrítico) con >95% recuperación de cannabinoides y terpenos'
      }
    ]
  }
];

const FIELD_EVIDENCE: FieldEvidenceRecord[] = [
  {
    id: 'indice-81',
    indexNumber: 'Índice 81',
    title: 'Infraestructura de Invernadero',
    description:
      'Estructura cubierta con polisombra y plástico agrícola equipada con sistema de ventilación lateral enrollable mediante malacate manual en el predio autorizado.',
    imageUrl: '/assets/campo/predio_1.jpg',
    capturedAt: '22 jun. 2022 · 12:32:14 p. m.',
    coordinates: '3.63215965° N, 73.344884° W',
    bearing: '231° SW',
    altitude: '250,1 m',
    location: 'San Martín, Meta'
  },
  {
    id: 'indice-79',
    indexNumber: 'Índice 79',
    title: 'Panorámica del Terreno',
    description:
      'Vista general del área despejada y nivelada del Predio «Lote Dos», colindante con zona boscosa perimetral en condiciones ecuatoriales naturales.',
    imageUrl: '/assets/campo/predio_2.jpg',
    capturedAt: '22 jun. 2022 · 12:31:28 p. m.',
    coordinates: '3.63227406° N, 73.34513388° W',
    bearing: '204° SW',
    altitude: '254,1 m',
    location: 'San Martín, Meta'
  },
  {
    id: 'indice-83',
    indexNumber: 'Índice 83',
    title: 'Lote Preparado para Expansión',
    description:
      'Detalle de la superficie del terreno agrícola nivelada y preparada para la expansión progresiva de módulos productivos de cáñamo y CBD.',
    imageUrl: '/assets/campo/predio_3.jpg',
    capturedAt: '22 jun. 2022 · 12:32:37 p. m.',
    coordinates: '3.6322436° N, 73.3447849° W',
    bearing: '170° S',
    altitude: '248,8 m',
    location: 'San Martín, Meta'
  }
];

function ensureDataDirectory(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(INQUIRIES_FILE)) {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), 'utf8');
  }
}

function readInquiries(): InquiryRecord[] {
  ensureDataDirectory();
  try {
    const raw = fs.readFileSync(INQUIRIES_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as InquiryRecord[]) : [];
  } catch {
    return [];
  }
}

function saveInquiry(record: InquiryRecord): void {
  const current = readInquiries();
  current.unshift(record);
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(current.slice(0, 100), null, 2), 'utf8');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function startServer(): Promise<void> {
  ensureDataDirectory();
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      ok: true,
      service: 'canamo-del-meta-node',
      company: 'CAÑAMO DEL META S.A.S. ZOMAC',
      nit: '901.185.114-3',
      resolution: 'Resolución 0303 de 2021',
      timestamp: new Date().toISOString()
    });
  });

  app.get('/api/catalog', (req: Request, res: Response) => {
    const category = String(req.query.category || 'todos').toLowerCase();
    const query = String(req.query.q || '').trim().toLowerCase();

    const filtered = CATALOG_ITEMS.filter((item) => {
      const matchesCategory = category === 'todos' || item.category === category;
      if (!matchesCategory) return false;
      if (!query) return true;
      const haystack = `${item.title} ${item.summary} ${item.standard} ${item.code}`.toLowerCase();
      return haystack.includes(query);
    });

    res.json({
      total: filtered.length,
      items: filtered
    });
  });

  app.get('/api/regulatory-framework', (_req: Request, res: Response) => {
    res.json({
      company: 'CAÑAMO DEL META S.A.S. ZOMAC',
      nit: '901.185.114-3',
      resolution: 'Resolución Núm. 0303 del 05 de abril de 2021',
      dossierPdfUrl:
        '/assets/aistudio/Dossier_Consolidado_-_Proyecto_Cannabis_No_Psicoactivo_y_Licencia_5794c68f.pdf',
      tabs: REGULATORY_TABS
    });
  });

  app.get('/api/field-evidence', (_req: Request, res: Response) => {
    res.json({
      property: 'Predio «LOTE DOS», Vereda San Martín, Municipio de San Martín (Meta)',
      matricula: '236-51322',
      captureDate: '22 de junio de 2022',
      records: FIELD_EVIDENCE
    });
  });

  app.get('/api/inquiries', (_req: Request, res: Response) => {
    const list = readInquiries();
    res.json({
      total: list.length,
      recent: list.slice(0, 5).map((item) => ({
        referenceId: item.referenceId,
        empresa: item.empresa,
        lineaInteres: item.lineaInteres,
        createdAt: item.createdAt
      }))
    });
  });

  app.post('/api/inquiries', (req: Request, res: Response) => {
    const body = req.body as Partial<InquiryPayload>;
    const nombre = (body.nombre || '').trim();
    const empresa = (body.empresa || '').trim();
    const correo = (body.correo || '').trim();
    const telefono = (body.telefono || '').trim();
    const lineaInteres = (body.lineaInteres || '').trim();
    const mensaje = (body.mensaje || '').trim();

    if (nombre.length < 2) {
      res.status(400).json({ error: 'Ingresa tu nombre completo (mínimo 2 caracteres).' });
      return;
    }
    if (empresa.length < 2) {
      res.status(400).json({ error: 'Ingresa el nombre de tu empresa u organización.' });
      return;
    }
    if (!isValidEmail(correo)) {
      res.status(400).json({ error: 'Ingresa un correo electrónico corporativo válido.' });
      return;
    }
    if (!lineaInteres) {
      res.status(400).json({ error: 'Selecciona una línea de interés.' });
      return;
    }
    if (mensaje.length < 10) {
      res.status(400).json({ error: 'Describe brevemente tu requerimiento (mínimo 10 caracteres).' });
      return;
    }

    const suffix = Math.floor(1000 + Math.random() * 9000);
    const record: InquiryRecord = {
      referenceId: `CM-2026-${suffix}`,
      nombre,
      empresa,
      correo,
      telefono,
      lineaInteres,
      mensaje,
      createdAt: new Date().toISOString()
    };

    saveInquiry(record);
    res.status(201).json({
      ok: true,
      referenceId: record.referenceId,
      createdAt: record.createdAt,
      message: 'Solicitud registrada correctamente en el servidor Node.js de Cañamo del Meta.'
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cañamo del Meta Node.js server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Error starting Node.js server:', err);
  process.exit(1);
});

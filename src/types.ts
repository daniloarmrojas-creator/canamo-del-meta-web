export type CatalogCategory = 'todos' | 'extractos' | 'semillas' | 'canamo' | 'b2b';

export interface CatalogItem {
  id: string;
  code: string;
  category: Exclude<CatalogCategory, 'todos'>;
  categoryLabel: string;
  standard: string;
  title: string;
  summary: string;
  imageUrl: string;
  imageAlt: string;
  specs: Array<{
    label: string;
    value: string;
  }>;
}

export interface RegulatorySectionTab {
  id: string;
  shortTitle: string;
  title: string;
  authority: string;
  decreeRef: string;
  summary: string;
  highlights: string[];
  tableRows: Array<{
    concept: string;
    detail: string;
  }>;
}

export interface FieldEvidenceRecord {
  id: string;
  indexNumber: string;
  title: string;
  description: string;
  imageUrl: string;
  capturedAt: string;
  coordinates: string;
  bearing: string;
  altitude: string;
  location: string;
}

export interface InquiryPayload {
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
  lineaInteres: string;
  mensaje: string;
}

export interface InquiryRecord extends InquiryPayload {
  referenceId: string;
  createdAt: string;
}

# 🌿 Cañamo del Meta S.A.S. ZOMAC

Plataforma web para **CAÑAMO DEL META S.A.S. ZOMAC** — Proyecto agroindustrial de cannabis no psicoactivo (CBD y cáñamo) en San Martín, Meta, Colombia.

Licencia vigente: **Resolución 0303 de 2021** expedida por el Ministerio de Justicia y del Derecho.

## Stack Tecnológico

- **Frontend:** React 19 · TypeScript · Tailwind CSS 4 · Vite 8
- **Backend:** Express (Node.js) · TypeScript
- **Despliegue:** Render (Web Service)

## Ejecutar Localmente

**Requisitos:** Node.js v20+

```bash
npm install
npm run dev
```

La app estará disponible en `http://localhost:3000`

## Despliegue en Render

1. Conectar este repositorio en [render.com](https://render.com)
2. Configurar como **Web Service**
3. Build Command: `npm install && npm run build`
4. Start Command: `NODE_ENV=production npm start`
5. Variables de entorno: `NODE_ENV=production`

## Estructura

```
├── server.ts            # Servidor Express + API endpoints
├── src/
│   ├── App.tsx          # Componente principal
│   ├── components/      # Secciones: Hero, Portafolio, Regulatorio, etc.
│   ├── assets/images/   # Imágenes del proyecto
│   └── types.ts         # Tipos TypeScript
├── public/assets/       # Assets estáticos (logo, PDF, fotos de predios)
├── render.yaml          # Configuración de Render
└── package.json
```

## Licencia

© 2026 CAÑAMO DEL META S.A.S. ZOMAC — NIT 901.185.114-3. Todos los derechos reservados.

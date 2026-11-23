# Cañamo del Meta S.A.S. ZOMAC — Sitio web

Sitio estático de una sola página (HTML + CSS + JS puro, sin dependencias ni build).

## Estructura

```
.
├── index.html
├── .nojekyll
├── .gitignore
└── img/
    ├── logo.png
    ├── favicon.png
    ├── apple-touch-icon.png
    ├── invernadero.jpg
    ├── panoramica.jpg
    └── lote.jpg
```

## Ver en local

Abrir `index.html` en el navegador, o con un servidor local:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Publicar con GitHub Pages

1. Subir el repositorio a GitHub (rama `main`).
2. En el repositorio: **Settings → Pages → Build and deployment**.
3. En **Source** elegir **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
4. El sitio queda en `https://USUARIO.github.io/NOMBRE-REPO/`.

Los enlaces a imágenes son relativos, por lo que funcionan también en subcarpetas.

## Pendientes antes de publicar

- [ ] Reemplazar `contacto@TU-DOMINIO.com` y el teléfono `+57 000 000 0000` en `index.html`.
- [ ] Confirmar con el cliente el estado actual de la licencia (Resolución 0303 de 2021, vigencia de 5 años) y ajustar el bloque "Licencia".
- [ ] Validar con el cliente las cifras proyectadas (costo < 0,05 USD/g, escala > 1.000 ha).
- [ ] Reemplazar las fotos de `img/` por versiones de mayor resolución (las extraídas del dossier son de 384×512 px).
- [ ] Conectar el formulario a un endpoint propio (hoy abre el cliente de correo con `mailto:`).
- [ ] Al tener dominio, agregar `og:image` con URL absoluta.

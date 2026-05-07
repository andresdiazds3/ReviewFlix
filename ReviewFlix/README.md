# ReviewFlix

ReviewFlix es la parte frontend del proyecto. La app esta pensada para mostrar peliculas, reseñas e interacciones de usuario, mientras que la moderacion de texto queda a cargo de una API de Python separada para detectar palabras malas.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS

## Ejecutar el frontend

Requisitos:
- Node.js 18 o superior recomendado
- npm

```bash
npm install
npm run dev
```

El servidor de desarrollo queda disponible en la URL que muestra Vite, normalmente `http://localhost:5173`.

## Integracion

El frontend consume la API de Python para validar comentarios y filtrar lenguaje ofensivo antes de mostrar o publicar el contenido.
  
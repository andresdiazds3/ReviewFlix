# ReviewFlix

ReviewFlix es una app de reseñas de peliculas enfocada en la experiencia de frontend, con una API de Python para detectar palabras malas en los textos enviados por los usuarios.

## Estructura del proyecto

- `ReviewFlix/`: frontend principal de la app.
- `ReviewFlixMLApi/`: API en Python para moderacion de contenido y deteccion de lenguaje ofensivo.

## Tecnologias

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### API de ML
- Python
- Modelo o pipeline de moderacion de texto
- Endpoint para validar comentarios antes de publicarlos

## Como ejecutar el proyecto

### Frontend
Requisitos:
- Node.js 18 o superior recomendado
- npm

```bash
cd ReviewFlix
npm install
npm run dev
```

El frontend queda disponible en la URL que muestra Vite, normalmente `http://localhost:5173`.

### API de Python
La API vive en su propio proyecto dentro de `ReviewFlixMLApi/`.

1. Instalar las dependencias de Python del proyecto.
2. Levantar el servidor de la API.
3. Conectar el frontend con el endpoint de moderacion para revisar comentarios antes de publicarlos.

## Objetivo actual

El foco del proyecto esta en:
- navegar peliculas y mostrar informacion desde el frontend;
- moderar comentarios con la API de Python para bloquear o marcar palabras malas.

# Wishlist — Amigo Secreto 2026

Landing page editorial para uma wishlist de amigo secreto, feita em React, Vite, GSAP/ScrollTrigger e Lenis.

## Executar

```bash
npm install
npm run dev
```

A versão alternativa abre em `/`. A versão editorial original abre em `/versao-editorial.html`.

## Conteúdo

Os 11 produtos, links externos e textos alternativos ficam em `src/data.js`. O Termogênico Abelhinha e o Diuretik Black estão destacados juntos como o combo desejado. As fotos usadas na página estão em `public/images/products` e também estão referenciadas no catálogo estático de `index.html`, para manter as imagens e os links disponíveis quando o JavaScript não carregar.

Os cartões usam carregamento tardio de imagens e dimensões reservadas. GSAP/ScrollTrigger cuida das animações de entrada e Lenis do scroll suave, com suporte a `prefers-reduced-motion`.

A segunda proposta reaproveita os mesmos dados e imagens, mas tem ponto de entrada e estilos próprios em `alternativa.html`, `src/alternative.jsx` e `src/alternative.css`.

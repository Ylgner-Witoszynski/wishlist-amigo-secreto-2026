import React, { useRef } from "react";
import { createRoot } from "react-dom/client";
import { Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Clock3, Pencil, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { categories, products } from "./data";
import "./alternative.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const categoryIcons = { activity: Activity, pencil: Pencil, clock: Clock3, sparkles: Sparkles };
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function AlternativeCard({ product, category }) {
  return (
    <article className="alt-product" data-alt-card>
      <a className={`alt-product__image alt-product__image--${product.imageFit}`} href={product.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${product.title} no site de origem`}>
        <img src={product.image} alt={product.alt} width="1200" height="1300" loading="lazy" decoding="async" />
        <span className="alt-product__id mono">{product.id}<span> / 11</span></span>
        <span className="alt-product__note">{product.note}</span>
        <span className="alt-product__external" aria-hidden="true"><ArrowUpRight size={17} strokeWidth={1.5} /></span>
      </a>
      <div className="alt-product__info">
        <div className="alt-product__eyebrow mono"><span>{category.label}</span><span>W/{product.id}</span></div>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <a className="alt-product__button" href={product.url} target="_blank" rel="noopener noreferrer" aria-label={`Ver ${product.title} no site de origem`}>
          <span>Ver produto</span><ArrowUpRight size={16} strokeWidth={1.6} />
        </a>
      </div>
    </article>
  );
}

function AlternativePage() {
  const pageRef = useRef(null);

  useGSAP(() => {
    if (reducedMotion) return;

    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro.fromTo(".alt-header, .alt-hero__index", { y: -12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.08 }, 0)
      .fromTo(".alt-hero__line span", { yPercent: 112, rotate: 2 }, { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.1, ease: "power4.out" }, 0.1)
      .fromTo(".alt-hero__sub, .alt-hero__cta", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1 }, 0.5)
      .fromTo(".alt-hero__image", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "power3.inOut" }, 0.2)
      .fromTo(".alt-hero__sticker", { scale: 0.75, rotate: 18, autoAlpha: 0 }, { scale: 1, rotate: -8, autoAlpha: 1, duration: 0.55 }, 0.95);

    gsap.to(".alt-progress", { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.2 } });
    gsap.utils.toArray(".alt-reveal", pageRef.current).forEach((element) => {
      gsap.fromTo(element, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } });
    });
    gsap.utils.toArray("[data-alt-card]", pageRef.current).forEach((card, index) => {
      const media = card.querySelector(".alt-product__image");
      const info = card.querySelector(".alt-product__info");
      gsap.fromTo(media, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "power3.inOut", delay: (index % 3) * 0.08, scrollTrigger: { trigger: card, start: "top 84%", once: true } });
      gsap.fromTo(info, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, delay: 0.12 + (index % 3) * 0.08, scrollTrigger: { trigger: card, start: "top 82%", once: true } });
    });
    gsap.utils.toArray(".alt-category__rule", pageRef.current).forEach((rule) => gsap.fromTo(rule, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 0.8, ease: "power2.inOut", scrollTrigger: { trigger: rule, start: "top 92%", once: true } }));
    gsap.fromTo(".alt-footer__title", { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, scrollTrigger: { trigger: ".alt-footer", start: "top 78%", once: true } });
  }, { scope: pageRef });

  return (
    <div className="alt-site" ref={pageRef}>
      <div className="alt-progress" aria-hidden="true" />
      <header className="alt-header">
        <a className="alt-mark" href="#topo" aria-label="Wishlist — voltar ao início"><span>W</span><small>arquivo pessoal</small></a>
        <nav className="alt-nav" aria-label="Categorias da wishlist">
          {categories.map((category) => <a key={category.id} href={`#${category.id}`}>{category.index}<span>{category.label}</span></a>)}
        </nav>
        <a className="alt-version" href="./versao-editorial.html" aria-label="Abrir a versão editorial original">V.01 <ArrowUpRight size={14} /></a>
      </header>

      <main>
        <section className="alt-hero" id="topo" aria-labelledby="alt-title">
          <div className="alt-hero__index mono"><span>AMIGO SECRETO</span><span>EDIÇÃO 2026 · 11 PEÇAS</span></div>
          <div className="alt-hero__layout">
            <div className="alt-hero__copy">
              <p className="alt-hero__kicker mono"><span className="alt-live-dot" /> LISTA DE DESEJOS / 001</p>
              <h1 id="alt-title"><span className="alt-hero__line"><span>Minha</span></span><span className="alt-hero__line alt-hero__line--last"><span>Wishlist<span className="alt-lime">.</span></span></span></h1>
              <p className="alt-hero__sub">Pequenas coisas que fariam meu amigo secreto ainda mais especial.</p>
              <a className="alt-hero__cta" href="#colecao"><span>Explorar os 11 itens</span><ArrowRight size={18} /></a>
            </div>
            <div className="alt-hero__visual">
              <div className="alt-hero__image"><img src="./images/products/kaiak-masculino.jpg" alt="Frasco do perfume Kaiak Masculino, 100 ml" width="1200" height="1200" fetchPriority="high" /></div>
              <div className="alt-hero__sticker" aria-hidden="true"><span>feito</span><span>para</span><b>surpreender</b><i>✳</i></div>
              <div className="alt-hero__caption mono"><span>OBJETO Nº 09</span><span>FRESCO / AQUÁTICO</span></div>
            </div>
          </div>
          <a className="alt-scroll mono" href="#colecao"><span>DESÇA PARA DESCOBRIR</span><ArrowDownRight size={16} /></a>
          <span className="alt-hero__asterisk" aria-hidden="true">✳</span>
        </section>

        <section className="alt-manifesto" aria-label="Sobre a wishlist">
          <span className="mono">NOTA 01 — UMA LISTA PESSOAL</span>
          <p className="alt-manifesto__text alt-reveal">Uma coleção pequena de <em>coisas boas</em> — para deixar a escolha mais fácil e a surpresa mais gostosa.</p>
          <div className="alt-manifesto__side mono"><span>11 OBJETOS</span><span>04 CAPÍTULOS</span><span>2026</span></div>
        </section>

        <section className="alt-collection" id="colecao" aria-labelledby="alt-collection-title">
          <div className="alt-collection__intro alt-reveal">
            <span className="mono">02 — A SELEÇÃO</span>
            <h2 id="alt-collection-title">Coisas que<br /><em>fazem sentido.</em></h2>
            <p>Quatro capítulos, onze vontades e um presente escolhido com carinho.</p>
          </div>
          {categories.map((category) => {
            const Icon = categoryIcons[category.icon];
            const categoryProducts = products.filter((product) => product.category === category.id);
            return (
              <section className={`alt-category alt-category--${category.id}`} id={category.id} key={category.id} aria-labelledby={`alt-${category.id}-title`}>
                <header className="alt-category__header alt-reveal">
                  <div className="alt-category__id mono"><Icon size={16} strokeWidth={1.6} aria-hidden="true" />{category.index}<span>/04</span></div>
                  <h2 id={`alt-${category.id}-title`}>{category.label}<i>.</i></h2>
                  <p>{category.note}</p>
                  <span className="alt-category__count mono">{String(categoryProducts.length).padStart(2, "0")} ITENS</span>
                  <span className="alt-category__rule" aria-hidden="true" />
                </header>
                <div className={`alt-category__grid alt-category__grid--${categoryProducts.length}`}>
                  {categoryProducts.map((product) => <AlternativeCard key={product.id} product={product} category={category} />)}
                </div>
              </section>
            );
          })}
        </section>

        <footer className="alt-footer">
          <div className="alt-footer__top mono"><span>FIM DA LISTA / 11 DE 11</span><a href="#topo">VOLTAR AO TOPO <ArrowUpRight size={14} /></a></div>
          <p className="mono">COM CARINHO, SEMPRE.</p>
          <h2 className="alt-footer__title">Obrigado por fazer<br />parte <em>desse momento.</em></h2>
          <div className="alt-footer__bottom"><p>Uma pequena seleção de coisas que eu adoraria receber neste amigo secreto.</p><span>Wishlist <i>—</i> 2026</span><b aria-hidden="true">✳</b></div>
        </footer>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<React.StrictMode><AlternativePage /></React.StrictMode>);

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Activity, Clock3, Pencil, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { categories, products } from "./data";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const categoryIcons = { activity: Activity, pencil: Pencil, clock: Clock3, sparkles: Sparkles };
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function SmoothScroll() {
  useEffect(() => {
    if (reducedMotion) return undefined;
    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.12,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.92,
    });
    const onScroll = () => ScrollTrigger.update();
    const onTick = (time) => lenis.raf(time * 1000);
    lenis.on("scroll", onScroll);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);
  return null;
}

function ProductCard({ product }) {
  const [imageReady, setImageReady] = useState(false);
  return (
    <article className={`product-card product-card--${product.tone}`} data-product={product.id}>
      <a className="product-card__image-wrap product-card__image-link" href={product.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${product.title} no site de origem`}>
        <img
          className={`product-card__image product-card__image--${product.imageFit}${imageReady ? " is-ready" : ""}`}
          src={product.image}
          alt={product.alt}
          width="1200"
          height="1500"
          loading="lazy"
          decoding="async"
          onLoad={() => setImageReady(true)}
        />
        <div className="product-card__image-shade" aria-hidden="true" />
        <span className="product-card__index">{product.id} <span>/ 11</span></span>
        <span className="product-card__note">{product.note}</span>
        <span className="product-card__corner" aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.3} /></span>
      </a>
      <div className="product-card__meta">
        <div className="product-card__copy">
          <p className="eyebrow product-card__category">{categories.find((category) => category.id === product.category)?.label}</p>
          <h3>{product.title}</h3>
          <p className="product-card__description">{product.description}</p>
          <a className="product-card__link" href={product.url} target="_blank" rel="noopener noreferrer" aria-label={`Ver ${product.title} no site de origem`}>
            <span>Ver produto</span><ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
        <span className="product-card__number" aria-hidden="true">{product.id}</span>
      </div>
    </article>
  );
}

function Catalog({ activeCategory, setActiveCategory }) {
  const catalogRef = useRef(null);
  const filteredProducts = useMemo(() => activeCategory === "all" ? products : products.filter((product) => product.category === activeCategory), [activeCategory]);

  useGSAP(() => {
    if (reducedMotion) return;
    const cards = gsap.utils.toArray(".product-card", catalogRef.current);
    cards.forEach((card, index) => {
      const image = card.querySelector(".product-card__image-wrap");
      const copy = card.querySelector(".product-card__meta");
      gsap.fromTo(image, { clipPath: "inset(0 0 100% 0 round 2px)" }, {
        clipPath: "inset(0 0 0% 0 round 2px)", duration: 0.95, ease: "power3.inOut", delay: index % 2 ? 0.08 : 0,
        scrollTrigger: { trigger: card, start: "top 86%", once: true },
      });
      gsap.fromTo(copy, { y: 22, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: 0.7, ease: "power2.out", delay: index % 2 ? 0.2 : 0.12,
        scrollTrigger: { trigger: card, start: "top 84%", once: true },
      });
    });
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, { scope: catalogRef, dependencies: [activeCategory], revertOnUpdate: true });

  return (
    <section className="catalog" id="catalogo" ref={catalogRef} aria-labelledby="catalog-title">
      <div className="catalog__intro">
        <div className="catalog__intro-label reveal-on-scroll">
          <span className="eyebrow">A seleção · 2026</span>
          <span className="catalog__rule" aria-hidden="true" />
          <span className="mono">11 objetos / 04 capítulos</span>
        </div>
        <div className="catalog__intro-copy">
          <p className="eyebrow reveal-on-scroll">Uma coleção pessoal</p>
          <h2 id="catalog-title" className="display-title reveal-on-scroll">Presentes com<br /><em>intenção.</em></h2>
          <p className="catalog__intro-text reveal-on-scroll">Algumas coisas que me fazem bem — reunidas aqui, com carinho e sem pressa.</p>
        </div>
        <div className="catalog__filter" role="group" aria-label="Filtrar por categoria">
          <button className={activeCategory === "all" ? "is-active" : ""} onClick={() => setActiveCategory("all")} aria-pressed={activeCategory === "all"}>Tudo <span>11</span></button>
          {categories.map((category) => {
            const count = products.filter((item) => item.category === category.id).length;
            return <button key={category.id} className={activeCategory === category.id ? "is-active" : ""} onClick={() => setActiveCategory(category.id)} aria-pressed={activeCategory === category.id}>{category.label} <span>{String(count).padStart(2, "0")}</span></button>;
          })}
        </div>
      </div>

      {categories.map((category, sectionIndex) => {
        const sectionProducts = filteredProducts.filter((product) => product.category === category.id);
        if (!sectionProducts.length) return null;
        const Icon = categoryIcons[category.icon];
        return (
          <section key={category.id} className={`chapter chapter--${category.id}`} aria-labelledby={`chapter-${category.id}`}>
            <div className="chapter__head">
              <div className="chapter__number mono">{category.index} <span>— 04</span></div>
              <div className="chapter__title-block">
                <div className="chapter__title-line"><Icon size={17} strokeWidth={1.4} aria-hidden="true" /><span className="eyebrow">Capítulo {category.index}</span><span className="chapter__line" aria-hidden="true" /></div>
                <h3 id={`chapter-${category.id}`}>{category.label}<span className="chapter__dot">.</span></h3>
              </div>
              <p className="chapter__note">{category.note}</p>
              <span className="chapter__count mono">{String(sectionProducts.length).padStart(2, "0")} peças</span>
            </div>
            <div className={`product-grid ${sectionProducts.length === 2 ? "product-grid--two" : ""} ${sectionIndex % 2 ? "product-grid--offset" : ""}`}>
              {sectionProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </section>
        );
      })}
    </section>
  );
}

function App() {
  const rootRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("all");

  useGSAP(() => {
    if (reducedMotion) return;
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro.fromTo(".hero__topline, .hero__index, .hero__edition", { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.62, stagger: 0.08 }, 0.05)
      .fromTo(".hero__word", { yPercent: 115, rotate: 1.5 }, { yPercent: 0, rotate: 0, duration: 1.05, stagger: 0.12, ease: "power4.out" }, 0.15)
      .fromTo(".hero__subtitle, .hero__cta", { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.13 }, 0.62)
      .fromTo(".hero-art__frame", { clipPath: "inset(0 0 100% 0 round 180px 180px 4px 4px)" }, { clipPath: "inset(0 0 0% 0 round 180px 180px 4px 4px)", duration: 1.15, ease: "power3.inOut" }, 0.25)
      .fromTo(".hero-art__stamp, .hero-art__caption", { scale: 0.9, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.6, stagger: 0.08 }, 0.96)
      .fromTo(".hero__scroll", { y: -8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, 1.12);

    gsap.to(".scroll-progress", { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.25 } });
    gsap.utils.toArray(".reveal-on-scroll").forEach((element) => {
      gsap.fromTo(element, { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.75, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } });
    });
    gsap.utils.toArray(".chapter__line").forEach((line) => gsap.fromTo(line, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.9, ease: "power2.inOut", scrollTrigger: { trigger: line, start: "top 90%", once: true } }));
    gsap.fromTo(".closing__title", { y: 28, rotate: -1.2, autoAlpha: 0 }, { y: 0, rotate: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".closing", start: "top 74%", once: true } });
    gsap.fromTo(".closing__bottom", { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, delay: 0.18, scrollTrigger: { trigger: ".closing", start: "top 70%", once: true } });

    gsap.to(".hero-art__photo", { yPercent: 9, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  }, { scope: rootRef });

  return (
    <div className="site-shell" ref={rootRef}>
      <SmoothScroll />
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header">
        <a className="wordmark" href="#inicio" aria-label="Wishlist — voltar ao início"><span className="wordmark__symbol">w</span><span>arquivo de desejos</span></a>
        <span className="site-header__edition mono">BR · 2026</span>
        <a className="header-link" href="#catalogo"><span>Explorar seleção</span><ArrowDownRight size={17} strokeWidth={1.4} /></a>
      </header>

      <main>
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero__grid" aria-hidden="true" />
          <div className="hero__content">
            <div className="hero__topline"><span className="eyebrow">Uma lista para um momento especial</span><span className="hero__topline-dot" /></div>
            <div className="hero__title-wrap">
              <span className="hero__index mono">01 <span>/ 04</span></span>
              <h1 id="hero-title" className="hero__title"><span className="title-line"><span className="hero__word">Minha</span></span><span className="title-line title-line--last"><span className="hero__word">Wishlist<span className="hero__period">.</span></span></span></h1>
            </div>
            <p className="hero__subtitle">Pequenas coisas que fariam meu amigo secreto ainda mais especial.</p>
            <a className="hero__cta text-link" href="#catalogo"><span>Conhecer os desejos</span><span className="text-link__arrow"><ArrowRight size={16} strokeWidth={1.5} /></span></a>
          </div>

          <div className="hero-art" aria-label="Uma composição editorial com o perfume Kaiak Masculino, que faz parte da wishlist">
            <div className="hero-art__orbit hero-art__orbit--one" aria-hidden="true" />
            <div className="hero-art__orbit hero-art__orbit--two" aria-hidden="true" />
            <div className="hero-art__frame"><img className="hero-art__photo" src="./images/products/kaiak-masculino.jpg" alt="Frasco do perfume Kaiak Masculino, 100 ml" fetchPriority="high" width="1200" height="1200" /></div>
            <div className="hero-art__stamp"><span>uma</span><span>pequena</span><span>seleção</span><b>✳</b></div>
            <div className="hero-art__caption mono"><span>FIG. 01</span><span>COISAS QUE FAZEM BEM</span></div>
            <span className="hero-art__vertical mono">COLEÇÃO PESSOAL · 2026</span>
          </div>

          <div className="hero__edition mono">11 itens <span>·</span> 4 capítulos</div>
          <a className="hero__scroll mono" href="#catalogo"><span>Deslize para descobrir</span><span className="hero__scroll-track"><ArrowDown size={15} strokeWidth={1.3} /></span></a>
          <span className="hero__cross hero__cross--a" aria-hidden="true">+</span>
          <span className="hero__cross hero__cross--b" aria-hidden="true">+</span>
        </section>

        <section className="manifesto" aria-label="Sobre esta wishlist">
          <div className="manifesto__side mono"><span>NOTA DE ABERTURA</span><span>02 — 04</span></div>
          <div className="manifesto__copy">
            <p className="eyebrow reveal-on-scroll">Mais do que uma lista</p>
            <p className="manifesto__statement reveal-on-scroll">São pequenas <em>vontades</em>, reunidas com afeto — para facilitar a escolha e deixar a surpresa ainda mais gostosa.</p>
          </div>
          <div className="manifesto__mark" aria-hidden="true"><span>feito</span><i>à mão</i><b>✳</b></div>
        </section>

        <Catalog activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        <section className="closing" aria-labelledby="closing-title">
          <div className="closing__ornament" aria-hidden="true"><span /><span /><span /></div>
          <p className="eyebrow">Com carinho, sempre.</p>
          <h2 id="closing-title" className="closing__title">Obrigado por fazer<br />parte <em>desse momento.</em></h2>
          <p className="closing__subtitle">Uma pequena seleção de coisas que eu adoraria receber neste amigo secreto.</p>
          <div className="closing__bottom"><span className="closing__signature">Wishlist <span>—</span> 2026</span><a className="closing__top mono" href="#inicio">Voltar ao início <ArrowUpRight size={14} /></a><span className="closing__flower" aria-hidden="true">✳</span></div>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);

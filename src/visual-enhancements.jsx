import { useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function SmoothScroll() {
  useEffect(() => {
    if (reducedMotion) return undefined;

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.08,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.94,
    });
    const syncScrollTrigger = () => ScrollTrigger.update();
    let frameId = 0;
    const raf = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    lenis.on("scroll", syncScrollTrigger);
    frameId = window.requestAnimationFrame(raf);
    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.off("scroll", syncScrollTrigger);
      lenis.destroy();
    };
  }, []);

  return null;
}

export function SpringPieceCount() {
  const { count } = useSpring({
    from: { count: 0 },
    to: { count: 11 },
    config: { tension: 115, friction: 22 },
    immediate: reducedMotion,
  });

  return <animated.span aria-label="11 peças">{count.to((value) => String(Math.round(value)).padStart(2, "0"))}</animated.span>;
}

export function AnimeOrbit() {
  const pathRef = useRef(null);

  useEffect(() => {
    if (reducedMotion || !pathRef.current) return undefined;
    let animation;
    let cancelled = false;

    import("animejs").then(({ animate }) => {
      if (cancelled || !pathRef.current) return;
      const path = pathRef.current;
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      animation = animate(path, {
        strokeDashoffset: [length, 0],
        duration: 1150,
        delay: 550,
        ease: "inOutSine",
      });
    }).catch(() => {});

    return () => {
      cancelled = true;
      animation?.cancel();
    };
  }, []);

  return (
    <svg className="alt-hero__orbit" viewBox="0 0 180 180" aria-hidden="true">
      <circle ref={pathRef} cx="90" cy="90" r="78" fill="none" />
    </svg>
  );
}

export function HeroDepthObject() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host || reducedMotion || window.matchMedia("(max-width: 720px)").matches) return undefined;

    let disposed = false;
    let renderer;
    let mesh;
    let geometry;
    let material;
    let resizeObserver;
    let intersectionObserver;

    const initialize = async () => {
      try {
        const THREE = await import("three");
        if (disposed) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 20);
        camera.position.z = 3.8;
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        geometry = new THREE.IcosahedronGeometry(0.88, 1);
        material = new THREE.MeshBasicMaterial({ color: 0x777d5b, wireframe: true, transparent: true, opacity: 0.68 });
        mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.set(0.24, 0.52, -0.1);
        scene.add(mesh);

        const render = () => {
          const { width, height } = canvas.getBoundingClientRect();
          if (!width || !height) return;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        };
        const onPointerMove = (event) => {
          const bounds = host.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          mesh.rotation.y = 0.52 + x * 0.36;
          mesh.rotation.x = 0.24 - y * 0.3;
          renderer.render(scene, camera);
        };
        const onPointerLeave = () => {
          mesh.rotation.set(0.24, 0.52, -0.1);
          renderer.render(scene, camera);
        };

        render();
        host.addEventListener("pointermove", onPointerMove, { passive: true });
        host.addEventListener("pointerleave", onPointerLeave, { passive: true });
        if ("ResizeObserver" in window) {
          resizeObserver = new ResizeObserver(render);
          resizeObserver.observe(host);
        } else {
          window.addEventListener("resize", render, { passive: true });
        }

        cleanupListeners = () => {
          host.removeEventListener("pointermove", onPointerMove);
          host.removeEventListener("pointerleave", onPointerLeave);
          window.removeEventListener("resize", render);
        };
      } catch {
        canvas.hidden = true;
      }
    };

    let cleanupListeners = () => {};
    if ("IntersectionObserver" in window) {
      intersectionObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          intersectionObserver.disconnect();
          initialize();
        }
      }, { rootMargin: "120px" });
      intersectionObserver.observe(host);
    } else {
      initialize();
    }

    return () => {
      disposed = true;
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      cleanupListeners();
      geometry?.dispose();
      material?.dispose();
      renderer?.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="alt-hero__depth" aria-hidden="true" />;
}

const sparkleAnimation = {
  v: "5.7.4",
  fr: 24,
  ip: 0,
  op: 42,
  w: 120,
  h: 120,
  nm: "Wishlist sparkle",
  ddd: 0,
  assets: [],
  layers: [{
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "Four point star",
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 1, k: [{ t: 0, s: [-18], e: [18], i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] } }, { t: 42, s: [18] }] },
      p: { a: 0, k: [60, 60, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 1, k: [{ t: 0, s: [72, 72, 100], e: [100, 100, 100], i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] } }, { t: 21, s: [100, 100, 100], e: [72, 72, 100], i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] } }, { t: 42, s: [72, 72, 100] }] },
    },
    ao: 0,
    shapes: [{
      ty: "gr",
      nm: "Star",
      it: [
        { ind: 0, ty: "sh", ix: 1, ks: { a: 0, k: { i: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], v: [[0, -42], [9, -9], [42, 0], [9, 9], [0, 42], [-9, 9], [-42, 0], [-9, -9]], c: true } }, nm: "Star path" },
        { ty: "fl", c: { a: 0, k: [0.788, 0.78, 0.478, 1] }, o: { a: 0, k: 100 }, r: 1, bm: 0, nm: "Olive fill" },
        { ty: "tr", p: { a: 0, k: [60, 60, 0] }, a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 }, nm: "Transform" },
      ],
    }],
    ip: 0,
    op: 42,
    st: 0,
    bm: 0,
  }],
  markers: [],
};

export function FooterSparkle() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return undefined;
    let animation;
    let disposed = false;
    let intersectionObserver;

    const play = async () => {
      try {
        const { default: lottie } = await import("lottie-web/build/player/esm/lottie_light.min.js");
        if (disposed || animation) return;
        animation = lottie.loadAnimation({ container, renderer: "svg", loop: false, autoplay: false, animationData: sparkleAnimation });
        animation.addEventListener("DOMLoaded", () => {
          container.classList.add("is-loaded");
          animation.play();
        });
      } catch {
        // The static sparkle remains visible if the optional animation cannot load.
      }
    };

    if ("IntersectionObserver" in window) {
      intersectionObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          intersectionObserver.disconnect();
          play();
        }
      }, { threshold: 0.1 });
      intersectionObserver.observe(container);
    } else {
      play();
    }

    return () => {
      disposed = true;
      intersectionObserver?.disconnect();
      animation?.destroy();
    };
  }, []);

  return <span ref={containerRef} className="alt-lottie-mark" aria-hidden="true"><span className="alt-lottie-mark__fallback">✳</span></span>;
}

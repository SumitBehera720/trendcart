import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const PROMO_TEXTS = [
  "🚚 FAST DOMESTIC SHIPPING (3-5 DAYS) ACROSS INDIA",
  "💳 SECURE PAYMENTS VIA UPI, DEBIT CARD & COD",
  "🔄 EASY 7-DAY RETURN AND REFUND POLICY",
  "✨ SHOP SMART, LIVE BETTER WITH TRENDCART"
];

// Premium fashion & lifestyle imagery from Unsplash
const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=90&w=1920&auto=format&fit=crop",
    label: "NEW SEASON",
    accent: "rgba(139,92,246,0.6)",
  },
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=90&w=1920&auto=format&fit=crop",
    label: "LUXURY EDIT",
    accent: "rgba(6,182,212,0.5)",
  },
  {
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=90&w=1920&auto=format&fit=crop",
    label: "CURATED PICKS",
    accent: "rgba(251,113,133,0.45)",
  },
  {
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=90&w=1920&auto=format&fit=crop",
    label: "STYLE ICONS",
    accent: "rgba(250,204,21,0.3)",
  },
];

export default function Hero({ onExploreClick, startAnimation }) {
  const heroRef = useRef(null);
  const [promoIndex, setPromoIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [prevSlideIndex, setPrevSlideIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // GSAP Parallax on content
    gsap.to('.hero-content', {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Promo rotating ticker
    const promoInterval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % PROMO_TEXTS.length);
    }, 4000);

    // Slide transitions
    const slideInterval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setPrevSlideIndex(slideIndex);
        setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
        setIsTransitioning(false);
      }, 800);
    }, 5000);

    return () => {
      clearInterval(promoInterval);
      clearInterval(slideInterval);
    };
  }, [slideIndex]);

  const current = HERO_SLIDES[slideIndex];

  return (
    <section className="hero-sec" id="hero" ref={heroRef}>

      {/* === CINEMATIC BACKGROUND === */}
      <div className="hero-slides-container">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide ${i === slideIndex ? 'active' : ''} ${i === prevSlideIndex ? 'prev' : ''}`}
          >
            <img
              src={slide.image}
              alt={slide.label}
              className="hero-slide-img"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* === LAYERED OVERLAYS === */}
      {/* Base dark vignette */}
      <div className="hero-overlay-base" />
      {/* Gradient sweep from bottom */}
      <div className="hero-overlay-gradient" />
      {/* Dynamic color tint from current slide */}
      <div
        className="hero-overlay-tint"
        style={{ background: `radial-gradient(ellipse at 70% 50%, ${current.accent} 0%, transparent 65%)` }}
      />
      {/* Diagonal scan-line texture */}
      <div className="hero-scanlines" />

      {/* === FLOATING ORBS / PARTICLES === */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* === SLIDE DOTS INDICATOR === */}
      <div className="hero-slide-dots">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === slideIndex ? 'active' : ''}`}
            onClick={() => { setPrevSlideIndex(slideIndex); setSlideIndex(i); }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* === SLIDE LABEL === */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slideIndex}
          className="hero-slide-label"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="hero-slide-label-text">{current.label}</span>
          <div className="hero-slide-label-line" />
        </motion.div>
      </AnimatePresence>

      {/* === MAIN CONTENT === */}
      <div className="hero-content">
        {/* Animated Promo Banner */}
        <div className="hero-promo-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={promoIndex}
              initial={{ y: 16, opacity: 0 }}
              animate={startAnimation ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="mono hero-promo-pill"
            >
              {PROMO_TEXTS[promoIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mono hero-pretitle"
        >
          TRENDCART // CURATED QUALITY
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hero-title"
        >
          <span className="hero-title-line">SHOP</span>
          <span className="hero-title-line hero-title-gradient">SMART.</span>
          <span className="hero-title-line hero-title-outline">LIVE BETTER.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hero-description"
        >
          Explore TrendCart's selection of premium apparel, high-fidelity audio equipment, and elegant accessories. Crafted for modern lifestyles and daily utility.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="hero-actions"
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button
            className="btn-primary hero-btn-main"
            onClick={onExploreClick}
          >
            <Sparkles size={16} />
            Explore Catalog
          </button>
          <button
            className="hero-btn-outline"
            onClick={onExploreClick}
          >
            View Lookbook <ArrowDown size={14} />
          </button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="hero-stats"
        >
          {[
            { val: '10K+', label: 'Products' },
            { val: '4.9★', label: 'Rating' },
            { val: '50K+', label: 'Customers' },
            { val: '24h', label: 'Support' },
          ].map((s) => (
            <div key={s.label} className="hero-stat-item">
              <span className="hero-stat-val">{s.val}</span>
              <span className="hero-stat-label">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="scroll-indicator"
        onClick={onExploreClick}
        style={{ cursor: 'pointer' }}
      >
        <span className="mono scroll-indicator-text" style={{ letterSpacing: '2px', color: 'var(--text-grey)' }}>SCROLL TO DISCOVER</span>
        <div className="scroll-indicator-line" style={{ background: 'linear-gradient(180deg, var(--accent) 0%, transparent 100%)' }} />
      </motion.div>
    </section>
  );
}

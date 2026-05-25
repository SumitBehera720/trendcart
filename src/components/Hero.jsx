import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const PROMO_TEXTS = [
  "🚚 FAST DOMESTIC SHIPPING (3-5 DAYS) ACROSS INDIA",
  "💳 SECURE PAYMENTS VIA UPI, DEBIT CARD & COD",
  "🔄 EASY 7-DAY RETURN AND REFUND POLICY",
  "✨ SHOP SMART, LIVE BETTER WITH TRENDCART"
];

export default function Hero({ onExploreClick }) {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const [promoIndex, setPromoIndex] = useState(0);

  useEffect(() => {
    // GSAP Parallax
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Promo rotating ticker
    const interval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % PROMO_TEXTS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-sec" id="hero" ref={heroRef} style={{ background: '#050508' }}>
      {/* Background blobs for premium glassmorphism vibe */}
      <div className="glow-blob blob-purple" style={{ opacity: 0.25 }}></div>
      <div className="glow-blob blob-cyan" style={{ opacity: 0.25 }}></div>

      <div className="hero-bg-wrapper" ref={bgRef}>
        <video 
          autoPlay
          loop
          muted
          playsInline
          className="hero-bg"
          poster="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600"
        >
          <source src="https://cdn.shopify.com/videos/c/o/v/3bf4a509620e4e53aa454c856a432f1e.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-overlay" style={{ background: 'linear-gradient(180deg, rgba(5,5,8,0.5) 0%, rgba(5,5,8,0.3) 50%, rgba(5,5,8,1) 100%)' }}></div>
      
      <div className="hero-content">
        {/* Animated Promo Banner */}
        <div style={{ overflow: 'hidden', height: '24px', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
          <motion.div
            key={promoIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="mono"
            style={{ 
              fontSize: '0.75rem', 
              color: 'var(--accent-raw)', 
              fontWeight: 700, 
              letterSpacing: '1px',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              padding: '4px 16px',
              borderRadius: '20px',
              backgroundColor: 'rgba(6, 182, 212, 0.05)',
              backdropFilter: 'blur(4px)'
            }}
          >
            {PROMO_TEXTS[promoIndex]}
          </motion.div>
        </div>

        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mono hero-pretitle"
          style={{ color: 'var(--text-grey)' }}
        >
          TRENDCART // CURATED QUALITY
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="hero-title"
          style={{ letterSpacing: '-1px' }}
        >
          SHOP SMART<br />LIVE BETTER
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="hero-description"
        >
          Explore TrendCart's selection of premium apparel, high-fidelity audio equipment, and elegant accessories. Crafted for modern lifestyles and daily utility.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="hero-actions"
        >
          <button 
            className="btn-primary" 
            onClick={onExploreClick}
            style={{ 
              background: 'var(--accent-gradient)', 
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              boxShadow: 'var(--glow-shadow)'
            }}
          >
            Explore Catalog <ArrowDown size={16} />
          </button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="scroll-indicator" 
        onClick={onExploreClick} 
        style={{ cursor: 'pointer' }}
      >
        <span className="mono scroll-indicator-text" style={{ letterSpacing: '2px', color: 'var(--text-grey)' }}>SCROLL TO DISCOVER</span>
        <div className="scroll-indicator-line" style={{ background: 'linear-gradient(180deg, var(--accent) 0%, transparent 100%)' }}></div>
      </motion.div>
    </section>
  );
}

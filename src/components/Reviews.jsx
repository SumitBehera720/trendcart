import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Aravind Sharma',
    location: 'Mumbai, MH',
    rating: 5,
    text: '“Absoutely stunning quality. The Premium Cotton T-Shirt feels extremely comfortable and durable. The courier arrived in just 2 days. Secure UPI checkout was seamless!”',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150'
  },
  {
    name: 'Priya Patel',
    location: 'Ahmedabad, GJ',
    rating: 5,
    text: '“I was hesitant to buy the handbag at first, but the quality of the vegan leather exceeded all my expectations. The gold hardware gives it a super luxury feel!”',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150'
  },
  {
    name: 'Rohan Mehta',
    location: 'Bangalore, KA',
    rating: 5,
    text: '“The High-Fidelity Wireless Earbuds have deep bass and great noise cancelation. Batter lasts forever. Fast delivery and premium glass box packaging.”',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150'
  }
];

export default function Reviews() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="reviews-sec" style={{ padding: '100px 0', background: 'var(--bg-dark)', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
      <div className="container" style={{ position: 'relative' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="mono" style={{ color: 'var(--accent-raw)' }}>HEARD FROM REBELS</span>
          <h2 style={{ fontSize: '2.2rem', marginTop: '10px', letterSpacing: '-1px' }}>CUSTOMER REVIEWS</h2>
        </div>

        <div style={{ maxWidth: '700px', margin: '0 auto', minHeight: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
            >
              {/* Star Rating */}
              <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                {[...Array(REVIEWS[index].rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--accent-raw)" color="var(--accent-raw)" />
                ))}
              </div>

              {/* Review Text */}
              <p style={{ fontSize: '1.25rem', lineHeight: '1.7', color: 'var(--text-light)', fontStyle: 'italic', fontWeight: 300 }}>
                {REVIEWS[index].text}
              </p>

              {/* Customer Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '10px' }}>
                <img 
                  src={REVIEWS[index].avatar} 
                  alt={REVIEWS[index].name} 
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} 
                />
                <div style={{ textAlign: 'left' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-light)', margin: 0 }}>{REVIEWS[index].name}</h4>
                  <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-grey)' }}>{REVIEWS[index].location}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '40px', justifyContent: 'center', zIndex: 10 }}>
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setIndex(idx)}
                style={{
                  width: index === idx ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: index === idx ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.15)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    name: 'CLOTHING',
    tagline: 'Premium apparel designed for modern comfort.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600',
    id: 'clothing'
  },
  {
    name: 'ELECTRONICS',
    tagline: 'High-fidelity audio & modern essentials.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600',
    id: 'electronics'
  },
  {
    name: 'ACCESSORIES',
    tagline: 'Elegant accents crafted for daily utility.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600',
    id: 'accessories'
  }
];

export default function FeaturedCategories({ onCategorySelect }) {
  return (
    <section className="categories-sec" style={{ padding: '80px 0', background: 'var(--bg-dark)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="mono" style={{ color: 'var(--accent-raw)' }}>CURATED EDITS</span>
          <h2 style={{ fontSize: '2.2rem', marginTop: '10px', letterSpacing: '-1px' }}>FEATURED COLLECTIONS</h2>
          <p style={{ maxWidth: '500px', margin: '12px auto 0', color: 'var(--text-grey)', fontSize: '0.95rem' }}>
            Discover our collection of handpicked essentials tailored for your dynamic lifestyle.
          </p>
        </div>

        <div className="categories-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onClick={() => onCategorySelect(cat.id)}
              className="category-card"
              style={{
                position: 'relative',
                height: '420px',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}
            >
              <div 
                className="category-image"
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${cat.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
              {/* Overlay gradient */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, rgba(5,5,8,0.1) 0%, rgba(5,5,8,0.85) 100%)',
                zIndex: 1
              }} />

              {/* Text info */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '30px',
                zIndex: 2
              }}>
                <span className="mono" style={{ color: 'var(--accent-raw)', fontSize: '0.75rem', fontWeight: 700 }}>
                  EXPLORE {cat.name}
                </span>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--text-light)', marginTop: '8px', marginBottom: '8px' }}>
                  {cat.name}
                </h3>
                <p style={{ color: 'var(--text-grey)', fontSize: '0.85rem', lineHeight: 1.4 }}>
                  {cat.tagline}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

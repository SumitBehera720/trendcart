import { motion } from 'framer-motion';

const IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400',
    likes: '1.2k',
    comments: '48'
  },
  {
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400',
    likes: '942',
    comments: '31'
  },
  {
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400',
    likes: '2.1k',
    comments: '112'
  },
  {
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400',
    likes: '1.8k',
    comments: '93'
  }
];

export default function InstagramGallery() {
  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/", "_blank");
  };

  return (
    <section className="social-sec" style={{ padding: '80px 0', background: 'var(--bg-dark)', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
      <div className="container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="mono" style={{ color: 'var(--accent-raw)' }}>JOIN OUR BRAND IDENTITY</span>
            <h2 style={{ fontSize: '2rem', marginTop: '10px', letterSpacing: '-1px' }}>INSTAGRAM STORIES</h2>
          </div>
          <button 
            className="btn-secondary" 
            onClick={handleInstagramClick}
            style={{ padding: '10px 20px', fontSize: '0.75rem' }}
          >
            @TRENDCART_OFFICIAL
          </button>
        </div>

        <div className="social-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {IMAGES.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="social-card"
              onClick={handleInstagramClick}
              style={{
                position: 'relative',
                aspectRatio: '1',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              <div 
                className="social-image"
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${img.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.5s ease'
                }}
              />
              {/* Overlay with Likes and Comments */}
              <div 
                className="social-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(5,5,8,0.7)',
                  opacity: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '20px',
                  zIndex: 2,
                  transition: 'opacity 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-light)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                  <span>❤️</span> {img.likes}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-light)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                  <span>💬</span> {img.comments}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

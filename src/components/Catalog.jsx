import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { products as productsApi } from '../services/api';

export default function Catalog({ onProductClick, activeTab, setActiveTab, wishlist = [], onToggleWishlist }) {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Sidebar filter states
  const [priceFilter, setPriceFilter] = useState('all'); // 'all' | 'under500' | '500to1000' | 'over1000'
  const [ratingFilter, setRatingFilter] = useState('all'); // 'all' | '4plus' | '5star'
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await productsApi.getAll(activeTab);
        // Map API keys to expected local keys if needed, since details and sizes might be strings
        const mapped = res.data.map(p => ({
          ...p,
          details: typeof p.details === 'string' ? JSON.parse(p.details) : p.details,
          sizes: typeof p.sizes === 'string' ? JSON.parse(p.sizes) : p.sizes,
          images: typeof p.images === 'string' ? JSON.parse(p.images) : p.images,
          hoverImage: p.hover_image || p.hoverImage,
          rating: p.rating || (p.id === 'TC-CLO-001' ? 4.5 : p.id === 'TC-ELE-002' ? 4.8 : 5.0)
        }));
        setProductsList(mapped);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [activeTab]);

  const filteredProducts = productsList.filter(product => {
    // Price filter
    if (priceFilter === 'under500' && product.price >= 500) return false;
    if (priceFilter === '500to1000' && (product.price < 500 || product.price > 1000)) return false;
    if (priceFilter === 'over1000' && product.price <= 1000) return false;
    
    // Rating filter
    const r = product.rating || 5;
    if (ratingFilter === '4plus' && r < 4.0) return false;
    if (ratingFilter === '5star' && r < 5.0) return false;
    
    return true;
  });

  return (
    <section className="catalog-sec" id="catalog">
      <div className="container">
        
        <div className="catalog-header">
          <div className="catalog-title-wrapper">
            <span className="mono" style={{ color: 'var(--accent-raw)' }}>FEATURED SECTIONS</span>
            <h2 className="catalog-title">OUR PRODUCTS</h2>
            <p>Curated lifestyle essentials engineered for durability and style.</p>
          </div>
          
          {/* Mobile Filter Toggle */}
          <button 
            className="btn-secondary menu-toggle-btn mono" 
            onClick={() => setIsSidebarOpenMobile(!isSidebarOpenMobile)}
            style={{ display: 'none', gap: '8px', alignItems: 'center', fontSize: '0.75rem', padding: '10px 20px', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <SlidersHorizontal size={14} /> FILTERS
          </button>
        </div>

        <div className="shop-layout">
          {/* Left Sidebar Filter Section */}
          <div className={`shop-sidebar glass-panel ${isSidebarOpenMobile ? 'open-mobile' : ''}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
              <span className="mono" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-light)' }}>REFINE BY</span>
              <button 
                onClick={() => { setPriceFilter('all'); setRatingFilter('all'); }} 
                className="mono" 
                style={{ fontSize: '0.65rem', color: 'var(--accent-raw)', cursor: 'pointer', background: 'none', border: 'none', textDecoration: 'underline' }}
              >
                RESET ALL
              </button>
            </div>

            {/* Category selection */}
            <div style={{ marginBottom: '24px' }}>
              <h4 className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 700 }}>CATEGORIES</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['all', 'clothing', 'electronics', 'accessories'].map(tab => (
                  <button 
                    key={tab}
                    className={`sidebar-filter-link mono ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      textAlign: 'left',
                      fontSize: '0.75rem',
                      padding: '6px 0',
                      color: activeTab === tab ? 'var(--text-light)' : 'var(--text-grey)',
                      transition: 'var(--transition-quick)',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      borderLeft: activeTab === tab ? '2px solid var(--accent-raw)' : '2px solid transparent',
                      paddingLeft: activeTab === tab ? '10px' : '0'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Price range selection */}
            <div style={{ marginBottom: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
              <h4 className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 700 }}>PRICE RANGE</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'All Prices', val: 'all' },
                  { label: 'Under ₹500', val: 'under500' },
                  { label: '₹500 - ₹1,000', val: '500to1000' },
                  { label: 'Over ₹1,000', val: 'over1000' }
                ].map(opt => (
                  <label key={opt.val} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-grey)', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="price-filter" 
                      checked={priceFilter === opt.val}
                      onChange={() => setPriceFilter(opt.val)}
                      style={{ accentColor: 'var(--accent-raw)' }}
                    />
                    <span style={{ color: priceFilter === opt.val ? '#fff' : 'inherit' }}>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating range selection */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
              <h4 className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 700 }}>RATING</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'All Ratings', val: 'all' },
                  { label: '4★ & Above', val: '4plus' },
                  { label: '5★ Only', val: '5star' }
                ].map(opt => (
                  <label key={opt.val} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-grey)', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="rating-filter" 
                      checked={ratingFilter === opt.val}
                      onChange={() => setRatingFilter(opt.val)}
                      style={{ accentColor: 'var(--accent-raw)' }}
                    />
                    <span style={{ color: ratingFilter === opt.val ? '#fff' : 'inherit', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Product Grid */}
          <div className="shop-grid-container">
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', color: 'var(--text-grey)', fontFamily: 'var(--font-mono)' }}>
                LOADING CURATED CATALOG...
              </div>
            ) : filteredProducts.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '300px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                NO ITEMS MATCHING CURRENT SIDEBAR FILTERS
                <button 
                  className="btn-secondary" 
                  onClick={() => { setPriceFilter('all'); setRatingFilter('all'); }}
                  style={{ marginTop: '16px', padding: '8px 16px', fontSize: '0.7rem' }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div layout className="products-grid">
                <AnimatePresence>
                  {filteredProducts.map((product, index) => {
                    const isWishlisted = wishlist.some(item => item.id === product.id);
                    return (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        key={product.id}
                        className="product-card"
                      >
                        <div className="product-image-container">
                          {product.badge && <span className="product-card-badge">{product.badge}</span>}
                          
                          {/* Wishlist Heart Button */}
                          <button 
                            className="wishlist-heart-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleWishlist(product);
                            }}
                            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                            style={{
                              position: 'absolute',
                              top: '15px',
                              right: '15px',
                              zIndex: 12,
                              backgroundColor: 'rgba(5,5,8,0.6)',
                              backdropFilter: 'blur(4px)',
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: isWishlisted ? '#f43f5e' : 'var(--text-light)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              transition: 'all 0.3s ease',
                              cursor: 'pointer'
                            }}
                          >
                            <Heart size={16} fill={isWishlisted ? '#f43f5e' : 'none'} />
                          </button>

                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="product-image"
                            loading="lazy"
                          />
                          {product.hoverImage && (
                            <img 
                              src={product.hoverImage} 
                              alt={`${product.name} alternate view`} 
                              className="product-image-hover" 
                              loading="lazy"
                            />
                          )}
                          <div className="product-card-overlay">
                            <button 
                              className="product-quick-btn mono"
                              onClick={() => onProductClick(product)}
                            >
                              Quick Details
                            </button>
                          </div>
                        </div>
                        
                        <div className="product-info" onClick={() => onProductClick(product)} style={{ cursor: 'pointer' }}>
                          <div className="product-meta">
                            <span className="product-tag">{product.tagline}</span>
                            <h3 className="product-name">{product.name}</h3>
                            
                            {/* Star rating preview */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
                              <div style={{ display: 'flex', gap: '2px' }}>
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={10} 
                                    fill={i < Math.floor(product.rating || 5) ? 'var(--accent-raw)' : 'none'} 
                                    color={i < Math.floor(product.rating || 5) ? 'var(--accent-raw)' : 'var(--text-muted)'} 
                                  />
                                ))}
                              </div>
                              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                                ({product.rating || 5.0})
                              </span>
                            </div>
                          </div>
                          <div className="product-price">
                            ₹{product.price.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

import { useState } from 'react';
import { MessageSquare, Mail, Phone, MapPin, Check } from 'lucide-react';

export default function Footer({ onCategoryClick, onStoryClick, onTrackClick }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/", "_blank");
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919876543210?text=Hi%20TrendCart%20Support,%20I'd%20like%20to%20inquire%20about%20your%20products.", "_blank");
  };

  const handleEmailClick = (emailAddr) => {
    window.location.href = `mailto:${emailAddr}`;
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 3500);
  };

  return (
    <footer className="site-footer" style={{ borderTop: 'var(--glass-border)', background: 'linear-gradient(180deg, rgba(13,13,21,0) 0%, rgba(5,5,8,1) 100%)' }}>
      <div className="container">
        <div className="footer-grid">
          
          {/* Brand Column */}
          <div className="footer-brand">
            <div>
              <div className="footer-logo-text" style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>🛍️ TrendCart</div>
              <div className="mono" style={{ color: 'var(--accent-raw)', fontSize: '0.65rem', letterSpacing: '2px', marginTop: '4px' }}>
                Shop Smart, Live Better
              </div>
            </div>
            <p className="footer-desc">
              TrendCart is your premium destination for curated lifestyle essentials. We connect you with high-quality items designed to elevate your daily routine at affordable values.
            </p>
            <div className="footer-socials">
              <button onClick={handleInstagramClick} className="social-link" title="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </button>
              <button onClick={handleWhatsAppClick} className="social-link" title="WhatsApp Chat">
                <MessageSquare size={18} />
              </button>
            </div>
          </div>

          {/* Quicklinks */}
          <div>
            <h3 className="footer-column-title">EXPLORE</h3>
            <ul className="footer-links">
              <li><button onClick={() => onCategoryClick('all')} className="footer-link">ALL PRODUCTS</button></li>
              <li><button onClick={() => onCategoryClick('clothing')} className="footer-link">CLOTHING</button></li>
              <li><button onClick={() => onCategoryClick('electronics')} className="footer-link">ELECTRONICS</button></li>
              <li><button onClick={() => onCategoryClick('accessories')} className="footer-link">ACCESSORIES</button></li>
              <li><button onClick={onStoryClick} className="footer-link">ABOUT US</button></li>
              <li><button onClick={onTrackClick} className="footer-link">TRACK ORDER</button></li>
            </ul>
          </div>

          {/* Info & Shipping Zones */}
          <div>
            <h3 className="footer-column-title">POLICIES</h3>
            <ul className="footer-links">
              <li className="footer-link" style={{ color: 'var(--text-light)', cursor: 'default' }}>
                🔄 RETURN WITHIN 7 DAYS
                <div style={{ fontSize: '0.75rem', color: 'var(--text-grey)', marginTop: '4px' }}>Return items within 7 days of receipt for an easy, secure refund.</div>
              </li>
              <li className="footer-link" style={{ color: 'var(--text-light)', cursor: 'default' }}>
                🛡️ SECURE PAYMENTS
                <div style={{ fontSize: '0.75rem', color: 'var(--text-grey)', marginTop: '4px' }}>Simulated payments with UPI, Debit Card & Cash on Delivery.</div>
              </li>
              <li className="footer-link" style={{ color: 'var(--text-light)', cursor: 'default' }}>
                🚚 FAST DELIVERY
                <div style={{ fontSize: '0.75rem', color: 'var(--text-grey)', marginTop: '4px' }}>Dispatched in 24 hours. Delivery takes 3–5 business days.</div>
              </li>
            </ul>
          </div>

          {/* Contact Us Form & Info */}
          <div className="footer-newsletter">
            <h3 className="footer-column-title">CONTACT US</h3>
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ 
                  color: '#22c55e', 
                  fontSize: '0.8rem', 
                  padding: '12px', 
                  border: '1px solid rgba(34, 197, 94, 0.2)', 
                  backgroundColor: 'rgba(34, 197, 94, 0.05)', 
                  borderRadius: '4px', 
                  marginBottom: '15px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                <Check size={14} /> MESSAGE SENT SUCCESSFULLY!
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="newsletter-input" 
                  placeholder="YOUR NAME" 
                  required
                  style={{ width: '100%', marginBottom: 0 }}
                />
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="newsletter-input" 
                  placeholder="YOUR EMAIL" 
                  required
                  style={{ width: '100%', marginBottom: 0 }}
                />
                <textarea 
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="newsletter-input" 
                  placeholder="YOUR MESSAGE" 
                  required
                  rows={2}
                  style={{ width: '100%', resize: 'none', marginBottom: 0, fontFamily: 'inherit', padding: '10px 14px' }}
                />
                <button type="submit" className="newsletter-submit mono" style={{ width: '100%' }}>
                  SEND MESSAGE
                </button>
              </form>
            )}

            {/* Direct Contact info details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px', fontSize: '0.8rem' }}>
              <div 
                onClick={() => handleEmailClick('support@trendcart.com')} 
                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-grey)' }}
                className="footer-link"
              >
                <Mail size={12} /> support@trendcart.com
              </div>
              <div 
                onClick={handleWhatsAppClick} 
                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-grey)' }}
                className="footer-link"
              >
                <Phone size={12} /> +91 98765 43210
              </div>
              <div 
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-grey)', cursor: 'default' }}
                className="footer-link"
              >
                <MapPin size={12} /> Sangli, Maharashtra, India
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright and Payment integrations */}
        <div className="footer-bottom" style={{ borderTop: 'var(--glass-border)', marginTop: '60px', paddingTop: '30px' }}>
          <div>
            © {new Date().getFullYear()} TRENDCART. ALL RIGHTS RESERVED.
            <div style={{ marginTop: '6px', fontSize: '0.75rem', color: 'var(--text-grey)' }}>
              Designed & Developed by <a href="https://qubnixtechnology.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-raw)', textDecoration: 'underline', fontWeight: 600 }}>Qubnix Technology</a>
            </div>
          </div>
          <div className="footer-bottom-links">
            <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>SECURE PAYMENTS BY RAZORPAY CHECKOUT</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section className="newsletter-sec" style={{ padding: '80px 0', background: 'linear-gradient(180deg, var(--bg-dark) 0%, rgba(13,13,21,0.6) 100%)', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
      <div className="container">
        <div className="glass-panel" style={{ padding: '50px', borderRadius: '12px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          
          <AnimatePresence mode="wait">
            {!subscribed ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <span className="mono" style={{ color: 'var(--accent-raw)' }}>JOIN THE MOVEMENT</span>
                <h2 style={{ fontSize: '2rem', marginTop: '10px', marginBottom: '14px', letterSpacing: '-1px' }}>
                  GET 10% OFF YOUR FIRST ORDER
                </h2>
                <p style={{ color: 'var(--text-grey)', maxWidth: '500px', margin: '0 auto 30px', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Subscribe to our premium catalog updates, exclusive releases, and high-fidelity curation announcements.
                </p>

                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px', maxWidth: '500px', margin: '0 auto', flexWrap: 'wrap' }}>
                  <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
                    <input 
                      type="email" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="ENTER YOUR EMAIL ADDRESS"
                      required
                      className="newsletter-input"
                      style={{
                        width: '100%',
                        height: '48px',
                        background: 'var(--bg-input)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '4px',
                        padding: '0 20px 0 46px',
                        color: 'var(--text-light)',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-mono)'
                      }}
                    />
                    <Mail size={14} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  </div>
                  <button 
                    type="submit" 
                    className="btn-primary"
                    style={{
                      height: '48px',
                      padding: '0 30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--accent-gradient)',
                      color: '#ffffff',
                      border: 'none',
                      boxShadow: 'var(--glow-shadow)',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    SUBSCRIBE
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(34, 197, 94, 0.05)',
                  border: '1px solid rgba(34, 197, 94, 0.25)',
                  color: '#22c55e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Check size={28} />
                </div>
                
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-light)', marginBottom: '8px' }}>
                    YOU ARE ON THE LIST!
                  </h3>
                  <p style={{ color: 'var(--text-grey)', fontSize: '0.85rem', maxWidth: '400px', margin: '0 auto 20px', lineHeight: 1.5 }}>
                    Thank you for subscribing. Use the exclusive coupon code below at checkout to redeem your 10% discount:
                  </p>
                  
                  <div style={{
                    background: 'rgba(6, 182, 212, 0.04)',
                    border: '1px dashed rgba(6, 182, 212, 0.3)',
                    padding: '16px 28px',
                    borderRadius: '4px',
                    fontSize: '1.1rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent-raw)',
                    fontWeight: 700,
                    letterSpacing: '3px',
                    display: 'inline-block',
                    boxShadow: '0 0 15px rgba(6, 182, 212, 0.1)'
                  }}>
                    TREND10
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}

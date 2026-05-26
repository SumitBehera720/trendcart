import { motion } from 'framer-motion';
import { Truck, ShieldCheck, RefreshCw, Award } from 'lucide-react';

const FEATURES = [
  {
    icon: Truck,
    title: 'FAST DELIVERY',
    desc: 'Dispatched in 24 hours. Express transit takes 3-5 days all across India.'
  },
  {
    icon: ShieldCheck,
    title: 'SECURE PAYMENT',
    desc: 'Encrypted Razorpay checkout supporting UPI, card payments & COD.'
  },
  {
    icon: RefreshCw,
    title: 'EASY RETURNS',
    desc: 'Not satisfied? Initiate a return and secure a refund within 7 days.'
  },
  {
    icon: Award,
    title: 'PREMIUM QUALITY',
    desc: 'Every item is handpicked and curated to ensure superior daily utility.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="features-sec" style={{ padding: '80px 0', background: 'radial-gradient(circle at center, rgba(13,13,21,0.2) 0%, rgba(5,5,8,1) 100%)', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px' }}>
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel feature-card"
                style={{
                  padding: '30px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(6, 182, 212, 0.05)',
                  border: '1px solid rgba(6, 182, 212, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-raw)',
                  boxShadow: '0 0 15px rgba(6, 182, 212, 0.1)'
                }}>
                  <Icon size={24} />
                </div>
                
                <div>
                  <h3 className="mono" style={{ fontSize: '0.85rem', color: 'var(--text-light)', letterSpacing: '1.5px', marginBottom: '8px' }}>
                    {feat.title}
                  </h3>
                  <p style={{ color: 'var(--text-grey)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

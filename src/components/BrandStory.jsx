import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left content reveal
      gsap.fromTo(leftRef.current.children, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );

      // Right image reveal with slight parallax
      gsap.fromTo(rightRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section className="story-sec" id="story" ref={sectionRef} style={{ background: '#050508' }}>
      <div className="container">
        <div className="story-grid">
          
          <div className="story-left" ref={leftRef}>
            <div className="story-title-group">
              <span className="mono story-subtitle" style={{ color: 'var(--accent-raw)' }}>ABOUT US</span>
              <h2 className="story-title" style={{ letterSpacing: '-1px' }}>SHOPPING REDEFINED FOR MODERN LIVING</h2>
            </div>
            
            <p className="story-body">
              TrendCart is built on a simple promise: Shop Smart, Live Better. We connect you to carefully curated products that add immediate value, combining sleek design with daily utility.
            </p>
            
            <p className="story-quote" style={{ borderColor: 'var(--accent)' }}>
              "We believe that high-quality lifestyle essentials should be accessible, reliable, and beautifully designed."
            </p>
            
            <p className="story-body" style={{ color: 'var(--text-grey)' }}>
              From highly breathable t-shirts and noise-reducing earbuds to elegant faux leather handbags, every TrendCart item is vetted for durability. We deliver an exceptional shopping experience backed by instant UPI payments, expedited shipping, and direct support.
            </p>

            <div className="story-highlight-box">
              <div className="highlight-item">
                <span className="highlight-num" style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>3-5d</span>
                <span className="highlight-label">FAST SHIPPING</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-num" style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>7d</span>
                <span className="highlight-label">EASY RETURNS</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-num" style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>100%</span>
                <span className="highlight-label">SECURE GATEWAY</span>
              </div>
            </div>
          </div>
          
          <div className="story-right" ref={rightRef}>
            <div className="story-image-wrapper" style={{ border: 'var(--glass-border)', boxShadow: '0 10px 40px rgba(0,0,0,0.6)' }}>
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800" 
                alt="TrendCart Retail Closeup" 
                className="story-img"
              />
              <div className="story-img-overlay"></div>
              
              <div className="story-badge" style={{ background: 'var(--text-light)', color: '#000000' }}>
                <span>SHOP SMART</span>
                <span style={{ fontSize: '0.6rem', letterSpacing: '2px', marginTop: '6px', color: 'var(--text-muted)' }}>LIVE BETTER</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

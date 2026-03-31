

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function LandingPage() {
  const navigate = useNavigate();

  // ── Dynamic stats من الباك ──────────────────────
  const [stats, setStats] = useState({
    hunters: 0,
    programs: 0,
    reports: 0
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [hRes, pRes, rRes] = await Promise.all([
          axios.get('http://localhost:5000/admin/hunters',   { withCredentials: true }),
          axios.get('http://localhost:5000/admin/programs',  { withCredentials: true }),
          axios.get('http://localhost:5000/admin/reports',   { withCredentials: true }),
        ]);
        setStats({
          hunters:  hRes.data.data?.length  || 0,
          programs: pRes.data.data?.length  || 0,
          reports:  rRes.data.data?.length  || 0,
        });
      } catch {
        // لو الـ endpoints محتاجة auth، نخلي الأرقام placeholder
        setStats({ hunters: 250, programs: 18, reports: 47 });
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []);

  // ── Counter animation ────────────────────────────
  const AnimatedNumber = ({ target, suffix = '' }) => {
    const [current, setCurrent] = useState(0);
    useEffect(() => {
      if (target === 0) return;
      const duration = 1500;
      const steps = 40;
      const increment = target / steps;
      let step = 0;
      const timer = setInterval(() => {
        step++;
        setCurrent(Math.min(Math.round(increment * step), target));
        if (step >= steps) clearInterval(timer);
      }, duration / steps);
      return () => clearInterval(timer);
    }, [target]);
    return <>{current}{suffix}</>;
  };

  // ── Styles ────────────────────────────────────────
  const s = {
    page: {
      background: '#0a0e1a',
      color: '#fff',
      fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      minHeight: '100vh'
    },
    hero: {
      padding: '96px 48px 80px',
      background: 'linear-gradient(160deg, #0a0e1a 0%, #0d1530 60%, #0a0e1a 100%)',
      position: 'relative', overflow: 'hidden'
    },
    heroBadge: {
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: 'rgba(79,142,247,0.1)',
      border: '0.5px solid rgba(79,142,247,0.3)',
      color: '#4f8ef7', fontSize: 12, padding: '6px 14px',
      borderRadius: 20, marginBottom: 28
    },
    h1: { fontSize: 54, fontWeight: 500, lineHeight: 1.1, letterSpacing: -1, marginBottom: 20 },
    heroP: { fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: 540, marginBottom: 36 },
    btnPrimary: {
      background: '#4f8ef7', color: '#fff', border: 'none',
      padding: '14px 28px', borderRadius: 8, fontSize: 15,
      fontWeight: 500, cursor: 'pointer'
    },
    btnSecondary: {
      background: 'transparent', color: 'rgba(255,255,255,0.8)',
      border: '0.5px solid rgba(255,255,255,0.2)',
      padding: '14px 28px', borderRadius: 8, fontSize: 15,
      fontWeight: 500, cursor: 'pointer'
    },
    statsGrid: {
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      borderTop: '0.5px solid rgba(255,255,255,0.08)',
      borderBottom: '0.5px solid rgba(255,255,255,0.08)',
      background: 'rgba(255,255,255,0.02)'
    },
    stat: { padding: '32px 40px', borderRight: '0.5px solid rgba(255,255,255,0.08)' },
    statNum: { fontSize: 36, fontWeight: 500, letterSpacing: -1 },
    statLabel: { fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 },
    section: { padding: '80px 48px' },
    sectionLabel: { fontSize: 12, color: '#4f8ef7', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 },
    sectionTitle: { fontSize: 34, fontWeight: 500, letterSpacing: -0.5, marginBottom: 48, maxWidth: 500 },
    cardsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 },
    card: {
      background: 'rgba(255,255,255,0.03)',
      border: '0.5px solid rgba(255,255,255,0.08)',
      padding: 32
    },
    cardIcon: {
      width: 40, height: 40, borderRadius: 8,
      background: 'rgba(79,142,247,0.1)',
      border: '0.5px solid rgba(79,142,247,0.2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginBottom: 20, fontSize: 18
    },
    cardH3: { fontSize: 16, fontWeight: 500, marginBottom: 10 },
    cardP: { fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 },
    stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 48 },
    stepNum: {
      width: 32, height: 32, borderRadius: '50%',
      background: 'rgba(79,142,247,0.1)',
      border: '0.5px solid rgba(79,142,247,0.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, color: '#4f8ef7', fontWeight: 500, marginBottom: 16
    },
    ctaSection: {
      padding: '80px 48px', textAlign: 'center',
      background: 'linear-gradient(180deg, #0a0e1a 0%, #0d1530 100%)',
      borderTop: '0.5px solid rgba(255,255,255,0.06)'
    },
    footer: {
      padding: '24px 48px',
      borderTop: '0.5px solid rgba(255,255,255,0.06)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }
  };

  return (
    <div style={s.page}>
      <Navbar isLanding={true} />

      {/* ── HERO ── */}
      <div style={s.hero}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={s.heroBadge}>
            <span style={{ width: 6, height: 6, background: '#4f8ef7', borderRadius: '50%', display: 'inline-block' }}></span>
            Crowdsourced Security Platform
          </div>
          <h1 style={s.h1}>
            Find bugs.<br />
            <span style={{ color: '#4f8ef7' }}>Get rewarded.</span><br />
            Stay secure.
          </h1>
          <p style={s.heroP}>
            Connect your company with elite security researchers.
            Discover hidden vulnerabilities before attackers do — at scale, on demand.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/register">
              <button style={s.btnPrimary}>Start a Program</button>
            </Link>
            <Link to="/register">
              <button style={s.btnSecondary}>Join as Hunter</button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── STATS (dynamic) ── */}
      <div style={s.statsGrid}>
        <div style={s.stat}>
          <div style={{ ...s.statNum, color: '#4f8ef7' }}>
            {statsLoading ? '—' : <AnimatedNumber target={stats.hunters} suffix="+" />}
          </div>
          <div style={s.statLabel}>Active hunters</div>
        </div>
        <div style={{ ...s.stat, borderRight: '0.5px solid rgba(255,255,255,0.08)' }}>
          <div style={s.statNum}>
            {statsLoading ? '—' : <AnimatedNumber target={stats.programs} />}
          </div>
          <div style={s.statLabel}>Live programs</div>
        </div>
        <div style={{ ...s.stat, borderRight: '0.5px solid rgba(255,255,255,0.08)' }}>
          <div style={s.statNum}>
            {statsLoading ? '—' : <AnimatedNumber target={stats.reports} />}
          </div>
          <div style={s.statLabel}>Accepted reports</div>
        </div>
        <div style={{ ...s.stat, borderRight: 'none' }}>
          <div style={{ ...s.statNum, color: '#4f8ef7' }}>$12K+</div>
          <div style={s.statLabel}>Paid in bounties</div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div style={{ ...s.section, background: '#080c18' }}>
        <div style={s.sectionLabel}>Platform</div>
        <div style={s.sectionTitle}>Everything you need to run a security program</div>
        <div style={s.cardsGrid}>
          {[
            {
              icon: '🔐',
              title: 'Verified hunters',
              desc: 'Every researcher is reviewed before accessing your program scope.'
            },
            {
              icon: '⚡',
              title: 'Fast triage',
              desc: 'Reports reviewed and categorized by severity within 24 hours.'
            },
            {
              icon: '💰',
              title: 'Pay on results',
              desc: 'Set your own reward tiers. Only pay for validated reports.'
            }
          ].map((f, i) => (
            <div key={i} style={s.card}>
              <div style={s.cardIcon}>{f.icon}</div>
              <h3 style={s.cardH3}>{f.title}</h3>
              <p style={s.cardP}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ ...s.section, background: '#0a0e1a' }}>
        <div style={s.sectionLabel}>How it works</div>
        <div style={s.sectionTitle}>Simple for companies. Rewarding for hunters.</div>
        <div style={s.stepsGrid}>
          {[
            { n: '1', title: 'Create your program', desc: 'Define your scope, set reward tiers for low through critical vulnerabilities, and go live in minutes.' },
            { n: '2', title: 'Hunters find bugs', desc: 'Verified security researchers test your targets and submit detailed vulnerability reports with proof.' },
            { n: '3', title: 'Review and reward', desc: 'Accept or reject reports, and reward hunters automatically. Reputation points keep quality high.' }
          ].map((step, i) => (
            <div key={i}>
              <div style={s.stepNum}>{step.n}</div>
              <h4 style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>{step.title}</h4>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={s.ctaSection}>
        <h2 style={{ fontSize: 38, fontWeight: 500, marginBottom: 16, letterSpacing: -0.5 }}>
          Ready to secure your product?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, marginBottom: 32 }}>
          Join companies and hunters already using the platform.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register">
            <button style={s.btnPrimary}>Sign up — it's free</button>
          </Link>
          <Link to="/login">
            <button style={s.btnSecondary}>Login to your account</button>
          </Link>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={s.footer}>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>© 2026 BugBounty Platform</p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>Built for real security researchers</p>
      </div>
    </div>
  );
}

export default LandingPage;


// // src/pages/LandingPage.jsx
// import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';

// function LandingPage() {
//   return (
//     <>
//       <Navbar />

//       <div className="min-vh-100 d-flex align-items-center bg-dark text-white">
//         <div className="container">
//           <div className="row justify-content-center text-center">
//             <div className="col-lg-8">
//               <h1 className="display-1 fw-bold mb-4">
//                 BugBounty
//               </h1>
//               <h2 className="display-5 mb-4 text-primary">
//                 Find Bugs • Earn Money • Secure Systems
//               </h2>
              
//               <p className="lead mb-5 fs-4 text-light">
//                 The professional platform for ethical hackers and security teams.
//               </p>

//               <div className="d-flex justify-content-center gap-4">
//                 <Link 
//                   to="/register" 
//                   className="btn btn-primary btn-lg px-5 py-3 fw-bold fs-5"
//                 >
//                   Join as Hunter
//                 </Link>
//                 <Link 
//                   to="/register" 
//                   className="btn btn-outline-light btn-lg px-5 py-3 fw-bold fs-5"
//                 >
//                   For Companies
//                 </Link>
//               </div>

//               <div className="mt-5 text-muted">
//                 Trusted by hundreds of researchers worldwide
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default LandingPage;





// import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';

// function LandingPage() {
//   return (
//     <>
//       <Navbar />

//       {/* Hero Section */}
//       <header className="min-vh-100 d-flex align-items-center bg-dark text-white">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-lg-6">
//               <h1 className="display-3 fw-bold mb-4">
//                 Find bugs.<br />
//                 Earn rewards.<br />
//                 <span className="text-primary">Secure the web.</span>
//               </h1>
//               <p className="lead text-light mb-5">
//                 Professional bug bounty platform connecting companies with ethical hackers.
//               </p>
//               <div className="d-flex gap-3">
//                 <Link to="/register" className="btn btn-primary btn-lg px-5 py-3 fw-bold">
//                   Join as Hunter
//                 </Link>
//                 <Link to="/register" className="btn btn-outline-light btn-lg px-5 py-3 fw-bold">
//                   For Companies
//                 </Link>
//               </div>
//             </div>

//             <div className="col-lg-6 text-center mt-5 mt-lg-0">
//               <img 
//                 src="https://images.unsplash.com/photo-1558494949-ef0d38d3f6b8?w=700" 
//                 alt="Bug Bounty Platform" 
//                 className="img-fluid rounded-4 shadow-lg"
//               />
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Simple Stats */}
//       <div className="py-4 bg-light">
//         <div className="container">
//           <div className="row text-center">
//             <div className="col-4">
//               <h3 className="fw-bold">250+</h3>
//               <p className="text-muted">Hunters</p>
//             </div>
//             <div className="col-4">
//               <h3 className="fw-bold">18</h3>
//               <p className="text-muted">Programs</p>
//             </div>
//             <div className="col-4">
//               <h3 className="fw-bold">$124k</h3>
//               <p className="text-muted">Paid Out</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default LandingPage;











// import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';

// function LandingPage() {
//   return (
//     <>
//       <Navbar />

//       {/* Hero Section with subtle motion */}
//       <header className="min-vh-100 d-flex align-items-center bg-dark text-white position-relative overflow-hidden">
//         <div className="container position-relative z-3">
//           <div className="row align-items-center">
//             <div className="col-lg-6">
//               <h1 className="display-3 fw-bold mb-4">
//                 Find bugs.<br />
//                 Earn rewards.<br />
//                 <span className="text-primary">Secure the web.</span>
//               </h1>
//               <p className="lead text-light mb-5 fs-5">
//                 The professional bug bounty platform connecting companies with 
//                 ethical hackers. Discover vulnerabilities, get paid, and help make the internet safer.
//               </p>

//               <div className="d-flex flex-wrap gap-3">
//                 <Link to="/register" className="btn btn-primary btn-lg px-5 py-3 fw-bold fs-5">
//                   Join as Hunter
//                 </Link>
//                 <Link to="/register" className="btn btn-outline-light btn-lg px-5 py-3 fw-bold fs-5">
//                   For Companies
//                 </Link>
//               </div>

//               <div className="mt-5 d-flex gap-5 text-muted">
//                 <div>
//                   <h4 className="fw-bold text-white">250+</h4>
//                   <small>Active Hunters</small>
//                 </div>
//                 <div>
//                   <h4 className="fw-bold text-white">18</h4>
//                   <small>Live Programs</small>
//                 </div>
//                 <div>
//                   <h4 className="fw-bold text-white">$124k</h4>
//                   <small>Paid This Month</small>
//                 </div>
//               </div>
//             </div>

//             <div className="col-lg-6 text-center mt-5 mt-lg-0">
//               <div className="bg-gradient p-4 rounded-4 shadow-lg">
//                 <img 
//                   src="https://images.unsplash.com/photo-1558494949-ef0d38d3f6b8?w=600" 
//                   alt="Bug Bounty Dashboard" 
//                   className="img-fluid rounded-3 shadow"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Background subtle elements */}
//         <div className="position-absolute top-0 end-0 opacity-10">
//           <div className="display-1 text-primary">🛡️</div>
//         </div>
//       </header>

//       {/* Trust Bar */}
//       <div className="py-3 bg-light border-bottom">
//         <div className="container">
//           <div className="text-center text-muted small">
//             Trusted by security teams at • Fintech • E-commerce • SaaS Companies
//           </div>
//         </div>
//       </div>

//       {/* How it Works */}
//       <section className="py-5">
//         <div className="container">
//           <div className="text-center mb-5">
//             <h2 className="fw-bold">How BugBounty Works</h2>
//             <p className="text-muted">Simple. Secure. Rewarding.</p>
//           </div>

//           <div className="row g-5">
//             <div className="col-md-4 text-center">
//               <div className="mb-4">
//                 <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mx-auto" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
//                   1
//                 </div>
//               </div>
//               <h5 className="fw-bold">Companies Create Programs</h5>
//               <p className="text-muted">Define scope, set rewards, and open your systems to ethical hackers.</p>
//             </div>
//             <div className="col-md-4 text-center">
//               <div className="mb-4">
//                 <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mx-auto" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
//                   2
//                 </div>
//               </div>
//               <h5 className="fw-bold">Hunters Find Vulnerabilities</h5>
//               <p className="text-muted">Test real applications, submit detailed reports, and earn money.</p>
//             </div>
//             <div className="col-md-4 text-center">
//               <div className="mb-4">
//                 <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mx-auto" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
//                   3
//                 </div>
//               </div>
//               <h5 className="fw-bold">We Handle Everything</h5>
//               <p className="text-muted">Validation, payments, and reputation system — all managed professionally.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Final */}
//       <section className="py-5 bg-dark text-white text-center">
//         <div className="container py-5">
//           <h2 className="display-5 fw-bold mb-4">Ready to make the internet safer?</h2>
//           <Link to="/register" className="btn btn-primary btn-lg px-5 py-3 fs-5 fw-bold">
//             Start Your Journey Today
//           </Link>
//         </div>
//       </section>

//       <footer className="bg-light py-5">
//         <div className="container text-center text-muted">
//           © 2026 BugBounty Platform • Built for real security researchers and companies
//         </div>
//       </footer>
//     </>
//   );
// }

// export default LandingPage;



// worked code origin 

// import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';

// function LandingPage() {
//   return (
//     <>
//       <Navbar isLanding={true} />   {/* هيفرق في الـ Navbar */}

//       {/* Hero Section */}
//       <header className="bg-dark text-white py-5">
//         <div className="container py-5">
//           <div className="row align-items-center">
//             <div className="col-lg-6">
//               <h1 className="display-4 fw-bold mb-4">
//                 Secure the future.<br />
//                 <span className="text-primary">Hunt the bugs.</span>
//               </h1>
//               <p className="lead text-light mb-5">
//                 Big Bounty is a professional platform connecting businesses with ethical hackers.
//                 Discover vulnerabilities, earn real rewards, and protect your products.
//               </p>
//               <div className="d-flex gap-3">
//                 <Link to="/register" className="btn btn-primary btn-lg px-5 fw-bold">
//                               start your journey now..
//                 </Link>
//                 <Link to="/login" className="btn btn-outline-light btn-lg px-5 fw-bold">
//                     Login   
//                 </Link>
//               </div>
//               <div className="mt-4 text-muted small">
//                     Over 250 hackers • 18 active programs • 47 accepted reports              </div>
//             </div>
//             <div className="col-lg-6 text-center">
//               <div className="bg-white text-dark rounded-4 shadow-lg p-4 d-inline-block">
//                 <div className="display-1 fw-bold text-primary">🛡️</div>
//                 <h4 className="mt-3">Bug Bounty Platform</h4>
//                 <p className="text-muted"> Professional ** fast ** safe</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Features */}
//       <section className="py-5 bg-light">
//         <div className="container">
//           <div className="text-center mb-5">
//             <h2 className="fw-bold">how we work..??</h2>
//           </div>
//           <div className="row g-4">
//             <div className="col-md-4">
//               <div className="card h-100 border-0 shadow-sm">
//                 <div className="card-body p-4 text-center">
//                   <div className="fs-1 mb-3">🏢</div>
//                   <h5 className="fw-bold">for companies</h5>
//                   <p className="text-muted">Create a bounty program, receive vulnerability reports, and only pay those who deserve it..</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="card h-100 border-0 shadow-sm">
//                 <div className="card-body p-4 text-center">
//                   <div className="fs-1 mb-3">🎯</div>
//                   <h5 className="fw-bold">for hunters</h5>
//                   <p className="text-muted">look for the bugs in the code for the companies and earn thousand of dollars..</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="card h-100 border-0 shadow-sm">
//                 <div className="card-body p-4 text-center">
//                   <div className="fs-1 mb-3">🔒</div>
//                   <h5 className="fw-bold"> security and visiabilty</h5>
//                   <p className="text-muted">    all reportes being handly reviewed  +  rapitation system +  fast bay.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-5 bg-dark text-white text-center">
//         <div className="container">
//           <h2 className="fw-bold mb-4"> Ready to start!?</h2>
//           <Link to="/register" className="btn btn-primary btn-lg px-5 py-3 fw-bold">
//              signup now – for free
//           </Link>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-light py-4">
//         <div className="container text-center text-muted small">
//           © 2026 BugBounty Platform • Made with ❤️ for real security researchers
//         </div>
//       </footer>
//     </>
//   );
// }

// export default LandingPage;
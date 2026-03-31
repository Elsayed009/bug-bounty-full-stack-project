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





import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function LandingPage() {
  return (
    <>
      <Navbar isLanding={true} />   {/* هيفرق في الـ Navbar */}

      {/* Hero Section */}
      <header className="bg-dark text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Secure the future.<br />
                <span className="text-primary">Hunt the bugs.</span>
              </h1>
              <p className="lead text-light mb-5">
                Big Bounty is a professional platform connecting businesses with ethical hackers.
                Discover vulnerabilities, earn real rewards, and protect your products.
              </p>
              <div className="d-flex gap-3">
                <Link to="/register" className="btn btn-primary btn-lg px-5 fw-bold">
                              start your journey now..
                </Link>
                <Link to="/login" className="btn btn-outline-light btn-lg px-5 fw-bold">
                    Login   
                </Link>
              </div>
              <div className="mt-4 text-muted small">
                    Over 250 hackers • 18 active programs • 47 accepted reports              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="bg-white text-dark rounded-4 shadow-lg p-4 d-inline-block">
                <div className="display-1 fw-bold text-primary">🛡️</div>
                <h4 className="mt-3">Bug Bounty Platform</h4>
                <p className="text-muted"> Professional ** fast ** safe</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">how we work..??</h2>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4 text-center">
                  <div className="fs-1 mb-3">🏢</div>
                  <h5 className="fw-bold">for companies</h5>
                  <p className="text-muted">Create a bounty program, receive vulnerability reports, and only pay those who deserve it..</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4 text-center">
                  <div className="fs-1 mb-3">🎯</div>
                  <h5 className="fw-bold">for hunters</h5>
                  <p className="text-muted">look for the bugs in the code for the companies and earn thousand of dollars..</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4 text-center">
                  <div className="fs-1 mb-3">🔒</div>
                  <h5 className="fw-bold"> security and visiabilty</h5>
                  <p className="text-muted">    all reportes being handly reviewed  +  rapitation system +  fast bay.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 bg-dark text-white text-center">
        <div className="container">
          <h2 className="fw-bold mb-4"> Ready to start!?</h2>
          <Link to="/register" className="btn btn-primary btn-lg px-5 py-3 fw-bold">
             signup now – for free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-light py-4">
        <div className="container text-center text-muted small">
          © 2026 BugBounty Platform • Made with ❤️ for real security researchers
        </div>
      </footer>
    </>
  );
}

export default LandingPage;


import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';        // ← جديد
import HunterDashboard from './pages/HunterDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CompanyReports from './pages/CompanyReports';
import ReportDetails from './pages/ReportDetails';
import CreateProgram from './pages/CreateProgram';
import CompleteCompanyProfile from './pages/CompleteCompanyProfile';
import EditProgram from './pages/EditProgram';
import HunterProfile from './pages/HunterProfile';
import SubmitReport from './pages/SubmitReport';

function App() {
  return (
    <Routes>
      {/* Public Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route path="/hunter" element={<ProtectedRoute allowedRole="hunter"><HunterDashboard /></ProtectedRoute>} />
      <Route path="/hunter/profile" element={<ProtectedRoute allowedRole="hunter"><HunterProfile /></ProtectedRoute>} />
      <Route path="/hunter/submit-report/:id" element={<ProtectedRoute allowedRole="hunter"><SubmitReport /></ProtectedRoute>} />

      <Route path="/company" element={<ProtectedRoute allowedRole="company"><CompanyDashboard /></ProtectedRoute>} />
      <Route path="/complete-profile" element={<ProtectedRoute allowedRole="company"><CompleteCompanyProfile /></ProtectedRoute>} />
      <Route path="/create-program" element={<ProtectedRoute allowedRole="company"><CreateProgram /></ProtectedRoute>} />
      <Route path="/edit-program/:id" element={<ProtectedRoute allowedRole="company"><EditProgram /></ProtectedRoute>} />
      <Route path="/programs/:id/reports" element={<ProtectedRoute allowedRole="company"><CompanyReports /></ProtectedRoute>} />
      <Route path="/report/:id" element={<ProtectedRoute allowedRole="company"><ReportDetails /></ProtectedRoute>} />

      <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;

// import { Routes, Route } from 'react-router-dom';

// // Pages
// import LandingPage from './pages/LandingPage';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import HunterDashboard from './pages/HunterDashboard';
// import CompanyDashboard from './pages/CompanyDashboard';
// import AdminDashboard from './pages/AdminDashboard';
// import ProtectedRoute from './components/ProtectedRoute';
// import CompanyReports from './pages/CompanyReports';
// import ReportDetails from './pages/ReportDetails';
// import CreateProgram from './pages/CreateProgram';
// import CompleteCompanyProfile from './pages/CompleteCompanyProfile';
// import EditProgram from './pages/EditProgram';
// import HunterProfile from './pages/HunterProfile';
// import SubmitReport from './pages/SubmitReport';

// function App() {
//   return (
//     <Routes>
//       {/* Landing Page - Root */}
//       <Route path="/" element={<LandingPage />} />

//       {/* Auth Routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* Protected Routes */}
//       <Route path="/hunter" element={
//         <ProtectedRoute allowedRole="hunter">
//           <HunterDashboard />
//         </ProtectedRoute>
//       } />

//       <Route path="/hunter/profile" element={
//         <ProtectedRoute allowedRole="hunter">
//           <HunterProfile />
//         </ProtectedRoute>
//       } />

//       <Route path="/hunter/submit-report/:id" element={
//         <ProtectedRoute allowedRole="hunter">
//           <SubmitReport />
//         </ProtectedRoute>
//       } />

//       <Route path="/company" element={
//         <ProtectedRoute allowedRole="company">
//           <CompanyDashboard />
//         </ProtectedRoute>
//       } />

//       <Route path="/complete-profile" element={
//         <ProtectedRoute allowedRole="company">
//           <CompleteCompanyProfile />
//         </ProtectedRoute>
//       } />

//       <Route path="/create-program" element={
//         <ProtectedRoute allowedRole="company">
//           <CreateProgram />
//         </ProtectedRoute>
//       } />

//       <Route path="/edit-program/:id" element={
//         <ProtectedRoute allowedRole="company">
//           <EditProgram />
//         </ProtectedRoute>
//       } />

//       <Route path="/programs/:id/reports" element={
//         <ProtectedRoute allowedRole="company">
//           <CompanyReports />
//         </ProtectedRoute>
//       } />

//       <Route path="/report/:id" element={
//         <ProtectedRoute allowedRole="company">
//           <ReportDetails />
//         </ProtectedRoute>
//       } />

//       <Route path="/admin" element={
//         <ProtectedRoute allowedRole="admin">
//           <AdminDashboard />
//         </ProtectedRoute>
//       } />
//     </Routes>
//   );
// }

// export default App;








// import { Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import LandingPage from './pages/LandingPage';        // ← جديد
// import HunterDashboard from './pages/HunterDashboard';
// import CompanyDashboard from './pages/CompanyDashboard';
// import AdminDashboard from './pages/AdminDashboard';
// import ProtectedRoute from './components/ProtectedRoute';
// import CompanyReports from './pages/CompanyReports';
// import ReportDetails from './pages/ReportDetails';
// import CreateProgram from './pages/CreateProgram';
// import CompleteCompanyProfile from './pages/CompleteCompanyProfile';
// import EditProgram from './pages/EditProgram';
// import HunterProfile from './pages/HunterProfile';
// import SubmitReport from './pages/SubmitReport';

// function App() {
//   return (
//     <Routes>
//       {/* Public Landing */}
//       <Route path="/" element={<LandingPage />} />

//       {/* Auth */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* Protected Routes */}
//       <Route path="/hunter" element={<ProtectedRoute allowedRole="hunter"><HunterDashboard /></ProtectedRoute>} />
//       <Route path="/hunter/profile" element={<ProtectedRoute allowedRole="hunter"><HunterProfile /></ProtectedRoute>} />
//       <Route path="/hunter/submit-report/:id" element={<ProtectedRoute allowedRole="hunter"><SubmitReport /></ProtectedRoute>} />

//       <Route path="/company" element={<ProtectedRoute allowedRole="company"><CompanyDashboard /></ProtectedRoute>} />
//       <Route path="/complete-profile" element={<ProtectedRoute allowedRole="company"><CompleteCompanyProfile /></ProtectedRoute>} />
//       <Route path="/create-program" element={<ProtectedRoute allowedRole="company"><CreateProgram /></ProtectedRoute>} />
//       <Route path="/edit-program/:id" element={<ProtectedRoute allowedRole="company"><EditProgram /></ProtectedRoute>} />
//       <Route path="/programs/:id/reports" element={<ProtectedRoute allowedRole="company"><CompanyReports /></ProtectedRoute>} />
//       <Route path="/report/:id" element={<ProtectedRoute allowedRole="company"><ReportDetails /></ProtectedRoute>} />

//       <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
//     </Routes>
//   );
// }

// export default App;










// import { Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import HunterDashboard from './pages/HunterDashboard';
// import CompanyDashboard from './pages/CompanyDashboard';
// import AdminDashboard from './pages/AdminDashboard';
// import ProtectedRoute from './components/ProtectedRoute';
// import CompanyReports from './pages/CompanyReports';
// import ReportDetails from './pages/ReportDetails';
// import CreateProgram from './pages/CreateProgram';
// import CompleteCompanyProfile from './pages/CompleteCompanyProfile';
// import EditProgram from './pages/EditProgram';
// import HunterProfile from './pages/HunterProfile';
// import SubmitReport from './pages/SubmitReport';

// function App() {
//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* Hunter Routes */}
//       <Route path="/hunter" element={<ProtectedRoute allowedRole="hunter"><HunterDashboard /></ProtectedRoute>} />
//       <Route path="/hunter/profile" element={<ProtectedRoute allowedRole="hunter"><HunterProfile /></ProtectedRoute>} />
//       <Route path="/hunter/submit-report/:id" element={<ProtectedRoute allowedRole="hunter"><SubmitReport /></ProtectedRoute>} />

//       {/* Company Routes */}
//       <Route path="/company" element={<ProtectedRoute allowedRole="company"><CompanyDashboard /></ProtectedRoute>} />
//       <Route path="/complete-profile" element={<ProtectedRoute allowedRole="company"><CompleteCompanyProfile /></ProtectedRoute>} />
//       <Route path="/create-program" element={<ProtectedRoute allowedRole="company"><CreateProgram /></ProtectedRoute>} />
//       <Route path="/edit-program/:id" element={<ProtectedRoute allowedRole="company"><EditProgram /></ProtectedRoute>} />
//       <Route path="/programs/:id/reports" element={<ProtectedRoute allowedRole="company"><CompanyReports /></ProtectedRoute>} />
//       <Route path="/report/:id" element={<ProtectedRoute allowedRole="company"><ReportDetails /></ProtectedRoute>} />

//       {/* Admin Route */}
//       <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
//     </Routes>
//   );
// }

// export default App;









// import { Routes, Route } from 'react-router-dom'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import HunterDashboard from './pages/HunterDashboard'
// import CompanyDashboard from './pages/CompanyDashboard'
// import AdminDashboard from './pages/AdminDashboard'
// import ProtectedRoute from './components/ProtectedRoute'
// // import ProgramReports from './pages/ProgramReports'
// import ReportDetails from './pages/ReportDetails'
// import CreateProgram from './pages/CreateProgram'
// import CompleteCompanyProfile from './pages/CompleteCompanyProfile'
// import EditProgram from './pages/EditProgram'
// import CompanyReports from './pages/CompanyReports'
// // ضيف الـ imports دول
// import HunterProfile from './pages/HunterProfile'
// import SubmitReport from './pages/SubmitReport'

// // ضيف الـ routes دول جوه Hunter routes
// function App() {
//   return (
//     <Routes>
//       {/* public routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* Hunter routes */}
//       <Route path="/hunter" element={
//         <ProtectedRoute allowedRole="hunter"><HunterDashboard /></ProtectedRoute>
//       } />

//       {/* Company routes */}
//       <Route path="/company" element={
//         <ProtectedRoute allowedRole="company"><CompanyDashboard /></ProtectedRoute>
//       } />
//       <Route path="/complete-profile" element={
//         <ProtectedRoute allowedRole="company"><CompleteCompanyProfile /></ProtectedRoute>
//       } />
//       <Route path="/create-program" element={
//         <ProtectedRoute allowedRole="company"><CreateProgram /></ProtectedRoute>
//       } />
//       <Route path="/edit-program/:id" element={
//         <ProtectedRoute allowedRole="company"><EditProgram /></ProtectedRoute>
//       } />
//       <Route path="/programs/:id/reports" element={
//         <ProtectedRoute allowedRole="company"><CompanyReports /></ProtectedRoute>
//       } />
//       <Route path="/report/:id" element={
//         <ProtectedRoute allowedRole="company"><ReportDetails /></ProtectedRoute>
//       } />

//       <Route path="/hunter/profile" element={
//         <ProtectedRoute allowedRole="hunter"><HunterProfile /></ProtectedRoute>} />
        
//       <Route path="/hunter/submit-report/:id" element={
//         <ProtectedRoute allowedRole="hunter"><SubmitReport /></ProtectedRoute>} />

//       {/* Admin routes */}
//       <Route path="/admin" element={
//         <ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>
//       } />
//     </Routes>
//   )
// }

// export default App









// import { Routes, Route } from 'react-router-dom'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import HunterDashboard from './pages/HunterDashboard'
// import CompanyDashboard from './pages/CompanyDashboard'
// import AdminDashboard from './pages/AdminDashboard'
// import ProtectedRoute from './components/ProtectedRoute'
// import ProgramReports from './pages/ProgramReports'
// import ReportDetails from './pages/ReportDetails'
// import CreateProgram from './pages/CreateProgram'
// import CompleteCompanyProfile from './pages/CompleteCompanyProfile'
// import EditProgram from './pages/EditProgram'
// import CompanyReports from './pages/CompanyReports'

// function App() {
//   return (
//     <Routes>
//       {/* public routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* Hunter routes */}
//       <Route path="/hunter" element={
//         <ProtectedRoute allowedRole="hunter"><HunterDashboard /></ProtectedRoute>
//       } />

//       {/* Company routes */}
//       <Route path="/company" element={
//         <ProtectedRoute allowedRole="company"><CompanyDashboard /></ProtectedRoute>
//       } />
//       <Route path="/complete-profile" element={
//         <ProtectedRoute allowedRole="company"><CompleteCompanyProfile /></ProtectedRoute>
//       } />
//       <Route path="/create-program" element={
//         <ProtectedRoute allowedRole="company"><CreateProgram /></ProtectedRoute>
//       } />
//       <Route path="/edit-program/:id" element={
//         <ProtectedRoute allowedRole="company"><EditProgram /></ProtectedRoute>
//       } />
//       <Route path="/programs/:id/reports" element={
//         <ProtectedRoute allowedRole="company"><CompanyReports /></ProtectedRoute>
//       } />
//       <Route path="/report/:id" element={
//         <ProtectedRoute allowedRole="company"><ReportDetails /></ProtectedRoute>
//       } />

//       {/* Admin routes */}
//       <Route path="/admin" element={
//         <ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>
//       } />
//     </Routes>
//   )
// }

// export default App


// **الشرح:**
// ```
// Routes   → حاوي كل الصفحات
// Route    → صفحة واحدة
// path     → العنوان في الـ URL
// element  → الـ Component اللي هيتعرض
// // App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Dashboard from './components/Dashboard';
// import NoticeList from './components/NoticeList';
// import CreateNotice from './components/CreateNotice';
// import EditNotice from './components/EditNotice';
// import NoticeDetails from './components/NoticeDetails';
// import Login from './components/Login';
// import ProtectedRoute from './components/ProtectedRoute';
// import Navbar from './components/Navbar';


// function App() {
//   return (
//     <Router>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="min-h-screen bg-gray-100">
//         <Navbar />
//         <div className="container mx-auto px-4 py-8">
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//             <Route path="/notices" element={<ProtectedRoute><NoticeList /></ProtectedRoute>} />
//             <Route path="/notices/create" element={<ProtectedRoute><CreateNotice /></ProtectedRoute>} />
//             <Route path="/notices/:id" element={<ProtectedRoute><NoticeDetails /></ProtectedRoute>} />
//             <Route path="/notices/:id/edit" element={<ProtectedRoute><EditNotice /></ProtectedRoute>} />
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;




















// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Dashboard from './components/Dashboard';
import NoticeList from './components/NoticeList';
import CreateNotice from './components/CreateNotice';
import EditNotice from './components/EditNotice';
import NoticeDetails from './components/NoticeDetails';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Routes (Admin Only) */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/notices" 
              element={
                <ProtectedRoute>
                  <NoticeList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/notices/create" 
              element={
                <ProtectedRoute>
                  <CreateNotice />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/notices/:id" 
              element={
                <ProtectedRoute>
                  <NoticeDetails />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/notices/:id/edit" 
              element={
                <ProtectedRoute>
                  <EditNotice />
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
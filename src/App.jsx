import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/LoginPage";
import Signup from "./components/SignUpPage";
import TimeTable from "./components/TimeTable";

import Assignment from "./pages/Assignment";
import AI from "./pages/AI";
import Students from "./pages/Students";
import Analytics from "./pages/Analytics";
import AttendancePage from "./pages/Attendance";
import SmartAttendance from "./pages/SmartAttendance";
import TestGenerator from "./pages/TestGenerator";

function Layout() {
  const location = useLocation();
  const path = location.pathname;

  // 1. Check which type of page we are currently on
  const isAuthPage = path === "/login" || path === "/signup";
  const isLandingPage = path === "/";
  // If it's not Auth and not Landing, it must be a Dashboard page (Assignment, etc.)
  const isDashboardPage = !isAuthPage && !isLandingPage; 

  // ---------------------------------------------------------
  // LAYOUT 1: LANDING PAGE (100% untouched original layout)
  // ---------------------------------------------------------
  if (isLandingPage) {
    return (
      <>
        <Header />
        <Sidebar />
        {/* Your exact original wrapper classes */}
        <div className="ml-16 mt-20 p-5"> 
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </div>
        <Footer />
      </>
    );
  }

  // ---------------------------------------------------------
  // LAYOUT 2: AUTH PAGES (Blank canvas)
  // ---------------------------------------------------------
  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    );
  }

  // ---------------------------------------------------------
  // LAYOUT 3: DASHBOARD PAGES (Assignment, Analytics, etc.)
  // ---------------------------------------------------------
  if (isDashboardPage) {
    return (
      <>
        {/* NO Header, NO Footer here. Just the Sidebar. */}
        <Sidebar />
        
        {/* We keep ml-16 so it doesn't overlap the sidebar, 
            but REMOVE mt-20 and p-5 so DashboardHeader sits perfectly at the top */}
        <div className="ml-16 bg-slate-50 min-h-screen">
          <Routes>
            <Route path="/timetable" element={<TimeTable />} />
            <Route path="/assignment" element={<Assignment />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/students" element={<Students />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/smart-attendance" element={<SmartAttendance />} />
            <Route path="/test-generator" element={<TestGenerator />} />
          </Routes>
        </div>
      </>
    );
  }

  return null;
}

// ✅ App ONLY renders Layout
function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
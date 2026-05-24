import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Main Pages
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import SystemLogs from './pages/admin/SystemLogs';
import Subscriptions from './pages/admin/Subscriptions';
import JourneyHistory from './pages/admin/JourneyHistory';

import './App.css';

function App() {
  return (
    <Routes>
      {/* Admin routes - no navbar/footer */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/logs" element={<SystemLogs />} />
      <Route path="/admin/subscriptions" element={<Subscriptions />} />
      <Route path="/admin/history" element={<JourneyHistory />} />

      {/* Main web app with navbar/footer */}
      <Route path="/" element={
        <Layout className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <Layout.Content style={{ flexGrow: 1 }}>
            <Home />
          </Layout.Content>
          <Footer />
        </Layout>
      } />
      <Route path="/features" element={
        <Layout className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <Layout.Content style={{ flexGrow: 1 }}>
            <Features />
          </Layout.Content>
          <Footer />
        </Layout>
      } />
      <Route path="/pricing" element={
        <Layout className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <Layout.Content style={{ flexGrow: 1 }}>
            <Pricing />
          </Layout.Content>
          <Footer />
        </Layout>
      } />
      <Route path="/about" element={
        <Layout className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <Layout.Content style={{ flexGrow: 1 }}>
            <About />
          </Layout.Content>
          <Footer />
        </Layout>
      } />
      <Route path="/contact" element={
        <Layout className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <Layout.Content style={{ flexGrow: 1 }}>
            <Contact />
          </Layout.Content>
          <Footer />
        </Layout>
      } />
    </Routes>
  );
}

export default App;
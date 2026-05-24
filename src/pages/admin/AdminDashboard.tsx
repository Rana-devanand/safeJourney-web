import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { signOut, getCurrentUser } from '../../lib/supabase-auth';
import { adminApi } from '../../api/adminApi';

// Custom modular components
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import MetricGrid from './components/MetricGrid';
import AnalyticsSection from './components/AnalyticsSection';
import RecentTablesSection from './components/RecentTablesSection';

// Custom Admin Stylesheet (replaces heavy Tailwind CDN script)
import './theme/admin-theme.css';

interface DashboardStats {
  totalUsers: number;
  activeJourneys: number;
  premiumUsers: number;
  totalCircles: number;
  recentUsers: any[];
  recentJourneys: any[];
  recentLogs: any[];
}

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeJourneys: 0,
    premiumUsers: 0,
    totalCircles: 0,
    recentUsers: [],
    recentJourneys: [],
    recentLogs: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        window.location.href = '/admin';
        return;
      }
      setUser(currentUser);

      // Single RPC call that fetches all stats — bypasses RLS via SECURITY DEFINER
      const stats = await adminApi.getDashboardStats();

      setStats({
        totalUsers: stats.totalUsers,
        activeJourneys: stats.activeJourneys,
        premiumUsers: stats.premiumUsers,
        totalCircles: stats.totalCircles,
        recentUsers: stats.recentUsers || [],
        recentJourneys: stats.recentJourneys || [],
        recentLogs: stats.recentLogs || [],
      });
    } catch (err: any) {
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/admin';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 36, color: '#3525cd' }} spin />} />
      </div>
    );
  }

  const adminName = user?.email ? user.email.split('@')[0] : 'Admin';

  return (
    <div className="admin-shell">
      {/* 1. Sidebar Nav */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleLogout={handleLogout}
        adminName={adminName}
      />

      {/* Main Layout Area */}
      <main className="lg:ml-[200px] d-flex flex-column transition-all duration-300 pb-5 pb-lg-0">
        <AdminHeader setSidebarOpen={setSidebarOpen} adminName={adminName} />

        {/* 3. Metrics HUD, Growth Charts, Tables Grid Container */}
        <div className="container-fluid mt-5 p-4 p-lg-5 d-flex flex-column gap-4">
          {/* Dynamic Metrics Cards */}
          <MetricGrid
            totalUsers={stats.totalUsers}
            activeJourneys={stats.activeJourneys}
            premiumUsers={stats.premiumUsers}
            totalCircles={stats.totalCircles}
          />
          <AnalyticsSection recentLogs={stats.recentLogs} loadDashboard={loadDashboard} />
          {/* <RecentTablesSection
            recentUsers={stats.recentUsers}
            recentJourneys={stats.recentJourneys}
          /> */}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

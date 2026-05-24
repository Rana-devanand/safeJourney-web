import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  handleLogout: () => void;
  adminName: string;
}

const navItems = [
  { path: '/admin/dashboard', icon: 'dashboard', label: 'Overview' },
  { path: '/admin/users', icon: 'group', label: 'Users' },
  { path: '/admin/history', icon: 'history', label: 'Journey History' },
  { path: '/admin/logs', icon: 'terminal', label: 'System Logs' },
  { path: '/admin/subscriptions', icon: 'payments', label: 'Subscriptions' },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  handleLogout,
  adminName,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
      {/* Sidebar Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <div className="admin-sidebar-logo-box">
            <span className="material-symbols-outlined fs-5" style={{ fontVariationSettings: "'FILL' 1" }}>
              security
            </span>
          </div>
          <div>
            <h3 className="fs-6 fw-bold text-primary m-0 lh-1">Safe Journey</h3>
            <h5 style={{ fontSize: '10px' }} className="text-white mt-1">Admin Console</h5>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          className="d-lg-none p-2 btn btn-link text-secondary text-decoration-none border-0"
          onClick={() => setSidebarOpen(false)}
        >
          <span className="material-symbols-outlined fs-5">close</span>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="d-flex flex-column gap-1 flex-grow-1">
        {navItems.map((item) => (
          <a
            key={item.path}
            className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            href={item.path}
            onClick={(e) => {
              e.preventDefault();
              if (item.path !== '#') {
                navigate(item.path);
              }
            }}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Sidebar Footer (Optimized to prevent bottom viewport cutting) */}
      <div className="mt-auto border-top border-secondary border-opacity-25 pt-3 pb-1 d-flex flex-column gap-2">
        <div className="d-flex flex-column gap-1">
          <a className="admin-nav-item py-2" href="#">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>settings</span>
            <span>Settings</span>
          </a>
        
        </div>
        
        <Button
          type="text"
          danger
          icon={<LogoutOutlined style={{ fontSize: 13 }} />}
          onClick={handleLogout}
          className="d-flex align-items-center justify-content-start gap-2 px-3 py-2 h-auto small fw-semibold rounded text-danger border-0 w-100 text-start bg-transparent"
        >
          Sign Out
        </Button>
        <span className="d-none">{adminName}</span>
      </div>
    </aside>
  );
};

export default AdminSidebar;
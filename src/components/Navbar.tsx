import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = location.pathname === '/' ? 'home' : location.pathname.replace('/', '');

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'features', label: 'Features', path: '/features' },
    { id: 'pricing', label: 'Pricing', path: '/pricing' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'contact', label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="ant-layout-header">
      <div className="nav-container">
        <div className="logo-text" onClick={() => navigate('/')}>
          Safe Journey
        </div>

        <ul className="nav-menu">
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </li>
          ))}
        </ul>

        <Button
          className="nav-download-btn"
          type="primary"
          shape="round"
          icon={<ArrowRightOutlined />}
          onClick={() => alert('App Store & Google Play links coming soon!')}
        >
          Download App
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
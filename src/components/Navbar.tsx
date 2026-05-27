import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowRightOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = location.pathname === '/' ? 'home' : location.pathname.replace('/', '');
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'features', label: 'Features', path: '/features' },
    { id: 'pricing', label: 'Pricing', path: '/pricing' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'contact', label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <header className="ant-layout-header">
      <div className="nav-container">
        {/* Logo */}
        <div className="logo-text" onClick={() => handleNavClick('/')}>
          Safe Journey
        </div>

        {/* Desktop Menu */}
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.path)}
            >
              {item.label}
            </li>
          ))}
        </ul>

        {/* Desktop Download Button */}
        <Button
          className="nav-download-btn"
          type="primary"
          shape="round"
          icon={<ArrowRightOutlined />}
          onClick={() => window.open('https://play.google.com/store/apps/details?id=com.foocusedai.safejourney', '_blank')}
        >
          Download App
        </Button>

        {/* Mobile Hamburger Toggle Button */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CloseOutlined style={{ fontSize: '20px' }} /> : <MenuOutlined style={{ fontSize: '20px' }} />}
        </button>
      </div>

      {/* Mobile Collapsible Glassmorphic Dropdown */}
      <div className={`mobile-nav-dropdown ${menuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-menu">
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`mobile-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.path)}
            >
              {item.label}
            </li>
          ))}
        </ul>
        <button
          className="btn mobile-download-btn fw-bold mt-2"
          onClick={() => {
            window.open('https://play.google.com/store/apps/details?id=com.foocusedai.safejourney', '_blank');
            setMenuOpen(false);
          }}
        >
          Download App <ArrowRightOutlined />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
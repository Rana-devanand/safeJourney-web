import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Typography } from 'antd';

const { Paragraph } = Typography;

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <Row gutter={[32, 32]} justify="space-between">
          {/* Safe Journey Brand Info */}
          <Col xs={24} md={8} lg={6}>
            <div style={{ textAlign: 'left' }}>
              <div className="footer-title" style={{ fontSize: '20px' }}>Safe Journey</div>
              <Paragraph className="footer-desc" style={{ fontSize: '13px' }}>
                &copy; 2026 Safe Journey. High-end safety and live GPS coordinate broadcasts for the modern traveler.
              </Paragraph>
            </div>
          </Col>

          {/* Product Links */}
          <Col xs={12} sm={8} md={4}>
            <div style={{ textAlign: 'left' }}>
              <div className="footer-col-title">Product</div>
              <ul className="footer-links">
                <li><a href="#features" onClick={() => navigate('/features')}>Features</a></li>
                <li><a href="#pricing" onClick={() => navigate('/pricing')}>Pricing</a></li>
              </ul>
            </div>
          </Col>

          {/* Company Links */}
          <Col xs={12} sm={8} md={4}>
            <div style={{ textAlign: 'left' }}>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                <li><a href="#about" onClick={() => navigate('/about')}>About Us</a></li>
                <li><a href="#contact" onClick={() => navigate('/contact')}>Contact</a></li>
              </ul>
            </div>
          </Col>

          {/* Legal Links */}
          <Col xs={24} sm={8} md={6} lg={4}>
            <div style={{ textAlign: 'left' }}>
              <div className="footer-col-title">Legal</div>
              <ul className="footer-links">
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#refund">Refund Policy</a></li>
              </ul>
            </div>
          </Col>
        </Row>

        <div className="footer-bottom">
          &copy; 2026 Safe Journey. All rights reserved. Made for the modern traveler.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
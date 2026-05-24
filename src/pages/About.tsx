import React from 'react';
import { Typography, Row, Col } from 'antd';
import { SafetyOutlined, HeartOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const About: React.FC = () => {
  return (
    <div className="premium-page-wrapper" style={{ position: 'relative', paddingBottom: '80px' }}>
      {/* Background Glowing Blobs */}
      <div className="glow-blob glow-blob-1" style={{ top: '-5%', right: '8%', opacity: 0.2 }} />
      <div className="glow-blob glow-blob-2" style={{ bottom: '5%', left: '5%', opacity: 0.15 }} />

      <section style={{ padding: '80px 24px 40px 24px', position: 'relative', zIndex: 10 }}>
        <div className="hero-container" style={{ maxWidth: '1000px', marginInline: 'auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="premium-badge" style={{ marginBottom: '20px' }}>
              <span className="badge-dot" />
              OUR STORY
            </div>
            <Title level={2} style={{ fontSize: '42px', fontWeight: 800, color: '#ffffff', marginBottom: '12px', letterSpacing: '-1.5px', lineHeight: 1.2 }}>
              About Safe Journey
            </Title>
            <Paragraph style={{ fontSize: '16px', color: '#cbd5e1', maxWidth: '600px', marginInline: 'auto', lineHeight: 1.6 }}>
              Redefining travel security and emergency dispatch systems for modern citizens.
            </Paragraph>
          </div>

          {/* Glassmorphic Narrative Block */}
          <div className="narrative-panel" style={{ marginBottom: '48px', textAlign: 'left' }}>
            <Paragraph style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.8, marginBottom: '24px' }}>
              Safe Journey was founded in 2024 with a simple, singular mission: <strong>to make sure every traveler arrives safely at their destination.</strong> We saw a massive gap between standard navigational tools and personal safety services. While maps can tell you how to get somewhere, they fail to safeguard you along the way or update your family if something goes wrong.
            </Paragraph>

            <Paragraph style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.8, marginBottom: 0 }}>
              By leveraging low-level device operating system APIs and battery-efficient GPS synchronization matrices, we developed a background location broadcast network that remains online even when networks drop, satisfying strict regulations on privacy, encryption, and local device integrity.
            </Paragraph>
          </div>

          {/* Value Cards with Circular Icons */}
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <div className="value-card value-card-blue">
                <div className="value-icon-circle value-icon-blue">
                  <SafetyOutlined style={{ fontSize: '24px' }} />
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 10px 0', color: '#ffffff', letterSpacing: '-0.2px' }}>Absolute Integrity</h4>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
                  We believe security data belongs solely to you and your circles. We never sell coordinates or run tracking scripts.
                </p>
              </div>
            </Col>

            <Col xs={24} md={8}>
              <div className="value-card value-card-pink">
                <div className="value-icon-circle value-icon-pink">
                  <HeartOutlined style={{ fontSize: '24px' }} />
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 10px 0', color: '#ffffff', letterSpacing: '-0.2px' }}>Community Driven</h4>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
                  Safe Journey is designed in collaboration with safety experts, family networks, and active solo commuters.
                </p>
              </div>
            </Col>

            <Col xs={24} md={8}>
              <div className="value-card value-card-green">
                <div className="value-icon-circle value-icon-green">
                  <SafetyCertificateOutlined style={{ fontSize: '24px' }} />
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 10px 0', color: '#ffffff', letterSpacing: '-0.2px' }}>Tech Excellence</h4>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
                  High-performance background updates, rapid SMS protocols, and robust local caching when offline.
                </p>
              </div>
            </Col>
          </Row>

        </div>
      </section>
    </div>
  );
};

export default About;
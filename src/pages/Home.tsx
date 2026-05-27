import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Row, Col, Space, Card, Steps, Statistic } from 'antd';
import { 
  CarOutlined, 
  SafetyCertificateOutlined, 
  TeamOutlined, 
  EnvironmentOutlined,
  CompassOutlined,
  ThunderboltOutlined,
  BellOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative' }}>
      {/* Dynamic Background Mesh Blobs */}
      <div className="glow-blob glow-blob-1" />
      <div className="glow-blob glow-blob-2" />

      {/* Hero Section */}
      <section className="hero-section" style={{ padding: '48px 0' }}>
        <div className="hero-container">
          <Row align="middle" justify="space-between" gutter={[48, 48]}>
            <Col xs={24} lg={12}>
              <div style={{ textAlign: 'left', paddingRight: '20px', position: 'relative', zIndex: 10 }}>
                
                {/* Premium Trust Badge */}
                <div className="premium-badge">
                  <span className="badge-dot" />
                  TRUSTED BY 10,000+ DAILY ACTIVE TRAVELERS
                </div>

                <Title level={1} className="hero-title" style={{ fontSize: '52px', lineHeight: 1.15, letterSpacing: '-1.5px', marginBottom: '20px', fontWeight: 800 }}>
                  Travel Safer With <span style={{ color: '#60a5fa' }}>Safe Journey</span>
                </Title>
                <Paragraph className="hero-description" style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '32px' }}>
                  Share live travel updates, track journeys, and keep your loved ones informed in real time. Experience peace of mind with high-end safety tools designed for the modern traveler.
                </Paragraph>
                <Space size="middle" style={{ marginTop: '4px' }}>
                  <Button 
                    className="btn-primary" 
                    type="primary" 
                    size="large"
                    style={{ height: '48px', padding: '0 28px', fontSize: '15px', borderRadius: '24px' }}
                    onClick={() => window.open('https://play.google.com/store/apps/details?id=com.foocusedai.safejourney', '_blank')}
                  >
                    Download App
                  </Button>
                  <Button 
                    className="btn-secondary" 
                    size="large"
                    style={{ height: '48px', padding: '0 28px', fontSize: '15px', borderRadius: '24px' }}
                    onClick={() => navigate('/features')}
                  >
                    Explore Features
                  </Button>
                </Space>
              </div>
            </Col>

            {/* Right smartphone mockup column */}
            <Col xs={24} lg={12} className="phone-mockup-wrapper">
              <div className="phone-mockup">
                
                <div className="phone-screen">
                  <div className="map-grid-bg" />
                  
                  <svg 
                    style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 2 }} 
                    viewBox="0 0 250 500"
                  >
                    <path d="M -10,120 L 260,150" stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
                    <path d="M -10,260 L 260,210" stroke="rgba(255,255,255,0.06)" strokeWidth="10" fill="none" />
                    <path d="M -10,380 Q 120,400 260,350" stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
                    <path d="M 50,-10 L 70,510" stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
                    <path d="M 170,-10 L 140,510" stroke="rgba(255,255,255,0.06)" strokeWidth="10" fill="none" />
                    
                    <path 
                      d="M 40,410 Q 130,310 80,210 T 180,90" 
                      stroke="url(#routeGrad)" 
                      strokeWidth="5" 
                      strokeLinecap="round" 
                      fill="none" 
                      className="animated-route" 
                    />
                    
                    <defs>
                      <linearGradient id="routeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#0056cc" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  <div className="map-route-pulse" style={{ top: '18%', left: '72%', marginLeft: '-7px', marginTop: '-7px' }} />
                  
                  <div className="status-card premium-glass" style={{ bottom: '20px', left: '16px', right: '16px', padding: '14px' }}>
                    <div className="status-icon-box" style={{ width: '36px', height: '36px', marginRight: '10px' }}>
                      <CarOutlined style={{ fontSize: '18px' }} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <h4 className="status-title">Arriving in 12 min</h4>
                      <p className="status-desc">Sharing live with Sarah</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Trust Metrics Section */}
      <section className="metrics-section">
        <div className="hero-container">
          <Row gutter={[24, 24]} justify="center">
            <Col xs={12} md={6}>
              <Card className="metric-card metric-card-blue" bordered={false}>
                <Statistic 
                  title={<span style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>GPS Update Speed</span>} 
                  value="1 min" 
                  prefix={<CompassOutlined style={{ color: '#60a5fa', marginRight: 4 }} />} 
                  valueStyle={{ fontSize: 24, fontWeight: 800, color: '#fff' }} 
                />
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card className="metric-card metric-card-green" bordered={false}>
                <Statistic 
                  title={<span style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Protected Journeys</span>} 
                  value={10000} 
                  suffix="+" 
                  prefix={<SafetyCertificateOutlined style={{ color: '#34d399', marginRight: 4 }} />} 
                  valueStyle={{ fontSize: 24, fontWeight: 800, color: '#fff' }} 
                />
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card className="metric-card metric-card-amber" bordered={false}>
                <Statistic 
                  title={<span style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Active Trust Circles</span>} 
                  value={4500} 
                  suffix="+" 
                  prefix={<TeamOutlined style={{ color: '#fbbf24', marginRight: 4 }} />} 
                  valueStyle={{ fontSize: 24, fontWeight: 800, color: '#fff' }} 
                />
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card className="metric-card metric-card-purple" bordered={false}>
                <Statistic 
                  title={<span style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Uptime Reliability</span>} 
                  value={99.9} 
                  suffix="%" 
                  prefix={<ThunderboltOutlined style={{ color: '#a78bfa', marginRight: 4 }} />} 
                  valueStyle={{ fontSize: 24, fontWeight: 800, color: '#fff' }} 
                />
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Core Safety Features Grid */}
      <section className="features-section">
        <div className="hero-container" style={{ textAlign: 'center' }}>
          <Title level={2} style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px', color: '#ffffff', letterSpacing: '-0.5px' }}>
            Engineered For Absolute Safety
          </Title>
          <Paragraph style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '48px', maxWidth: '600px', marginInline: 'auto', lineHeight: 1.6 }}>
            Built using modern location protocols and real-time network pipelines to ensure you are never disconnected.
          </Paragraph>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card className="feature-card feature-card-blue" bordered={false}>
                <div className="feature-icon-wrapper" style={{ backgroundColor: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>
                  <EnvironmentOutlined style={{ fontSize: '20px' }} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 10px 0', color: '#ffffff', letterSpacing: '-0.2px' }}>Live Tracking Links</h3>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
                  Generate lightweight secure broadcast links. Your family can view your location, battery status, and estimated arrival time on any browser without downloading any apps.
                </p>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card className="feature-card feature-card-green" bordered={false}>
                <div className="feature-icon-wrapper" style={{ backgroundColor: 'rgba(16,185,129,0.15)', color: '#34d399' }}>
                  <TeamOutlined style={{ fontSize: '20px' }} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 10px 0', color: '#ffffff', letterSpacing: '-0.2px' }}>Trust Circles</h3>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
                  Group family members, friends, or coworkers into custom Circles. Easily dispatch one-click route broadsheets, location sweeps, and quick status check-ins to specific groups.
                </p>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card className="feature-card feature-card-red" bordered={false}>
                <div className="feature-icon-wrapper" style={{ backgroundColor: 'rgba(239,68,68,0.15)', color: '#f87171' }}>
                  <BellOutlined style={{ fontSize: '20px' }} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 10px 0', color: '#ffffff', letterSpacing: '-0.2px' }}>SOS Emergency Alarms</h3>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
                  Instantly trigger high-volume sirens, silent location sweeps, and real-time push alerts to all members of your safety circles with a single, prominent home screen widget.
                </p>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* How It Works Stepper Section */}
      <section className="steps-section">
        <div className="hero-container" style={{ textAlign: 'center' }}>
          <Title level={2} style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px', color: '#ffffff', letterSpacing: '-0.5px' }}>
            Setting Up Safety is Simple
          </Title>
          <Paragraph style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '56px', maxWidth: '600px', marginInline: 'auto', lineHeight: 1.6 }}>
            Get started in under two minutes. Safe Journey handles all the complicated background geolocation sync automatically.
          </Paragraph>

          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} md={12} style={{ textAlign: 'left' }}>
              <Steps
                direction="vertical"
                current={2}
                items={[
                  {
                    title: <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>1. Set Up Your Trust Circle</span>,
                    description: <span style={{ fontSize: '14px', color: '#94a3b8' }}>Invite family, friends, or trusted guardians via custom invite links to secure your private circle.</span>,
                  },
                  {
                    title: <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>2. Start Your Live Broadcast Journey</span>,
                    description: <span style={{ fontSize: '14px', color: '#94a3b8' }}>Select your destination, choose who to share with, and start journey tracking. The app handles background location safely.</span>,
                  },
                  {
                    title: <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>3. Safe & Informed Arrival</span>,
                    description: <span style={{ fontSize: '14px', color: '#94a3b8' }}>Guardians receive custom push messages or real-time web maps. Your circle gets instantly notified when you arrive safely.</span>,
                  },
                ]}
              />
            </Col>
            
            <Col xs={24} md={12}>
              <div className="radar-sync-panel">
                <div className="radar-container">
                  <div className="radar-ping" />
                  <div className="radar-ping radar-ping-2" />
                  <div className="radar-ping radar-ping-3" />
                  <CompassOutlined style={{ fontSize: '40px', color: '#38bdf8', zIndex: 10, animation: 'spin 12s linear infinite' }} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '10px', letterSpacing: '-0.2px' }}>Continuous Location Sync</h3>
                <Paragraph style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                  Safe Journey utilizes high-frequency, battery-optimized background location services that record encrypted updates even when the device is locked, fully satisfying Android 14+ and iOS compliance.
                </Paragraph>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* CTA Box */}
      <section className="cta-section">
        <div className="hero-container">
          <Title level={2} style={{ color: '#ffffff', fontSize: '32px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.5px' }}>
            Ready for Worry-Free Travels?
          </Title>
          <Paragraph style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '40px', maxWidth: '600px', marginInline: 'auto', lineHeight: 1.6 }}>
            Download the Safe Journey mobile app today, create your free account, and get 5 free journeys instantly. Upgrade to Pro for unlimited circles and tracking.
          </Paragraph>
          <Button 
            className="btn-cta-premium"
            type="primary" 
            size="large"
            onClick={() => window.open('https://play.google.com/store/apps/details?id=com.foocusedai.safejourney', '_blank')}
          >
            Download Safe Journey App
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
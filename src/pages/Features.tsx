import React from 'react';
import { Typography, Row, Col, Card, Button } from 'antd';
import {
  CompassOutlined,
  TeamOutlined,
  BellOutlined,
  WarningOutlined,
  GlobalOutlined,
  CheckCircleFilled,
  CompassFilled
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Features: React.FC = () => {
  return (
    <div className="premium-page-wrapper" style={{ position: 'relative', paddingBottom: '80px' }}>

      {/* Background Glowing Blobs for Mesh Aesthetics */}
      <div className="glow-blob glow-blob-1" style={{ top: '-10%', right: '5%' }} />
      <div className="glow-blob glow-blob-2" style={{ bottom: '15%', left: '10%' }} />

      {/* 1. Header Section */}
      <section style={{ padding: '80px 24px 40px 24px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <div className="hero-container">
          <div className="premium-badge">
            <span className="badge-dot" />
            GEOSPATIAL SHIELDING & REAL-TIME LOGISTICS
          </div>
          <Title level={2} style={{ fontSize: '42px', fontWeight: 800, color: '#ffffff', marginBottom: '16px', letterSpacing: '-1.5px', lineHeight: 1.2 }}>
            Comprehensive Security for the Modern Traveler
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#cbd5e1', maxWidth: '700px', marginInline: 'auto', lineHeight: 1.6 }}>
            Built using battery-optimized geolocation nodes, encrypted network broadcast paths, and rapid safety alerts to ensure you are never off the radar.
          </Paragraph>
        </div>
      </section>

      {/* 2. Custom Layout Grid (Live Tracking on left, 2x2 Grid on right) */}
      <section style={{ padding: '0 24px 60px 24px', position: 'relative', zIndex: 10 }}>
        <div className="hero-container">
          <Row gutter={[32, 32]}>
            {/* LEFT COLUMN: Large Live Tracking Card */}
            <Col xs={24} lg={12}>
              <Card
                className="premium-card"
                bordered={false}
                style={{
                  height: '100%',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textAlign: 'left'
                }}
              >
                <div>
                  <div className="feature-icon-wrapper" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
                    <CompassOutlined style={{ fontSize: '22px' }} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: '0 0 10px 0', letterSpacing: '-0.2px' }}>
                    Real-Time Geolocation Broadcaster
                  </h3>
                  <Paragraph style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '24px' }}>
                    Safe Journey deploys deep operating system background geofencing models to broad-sweep your current path, dispatching live telemetry links that sync coordinates securely with minimal device battery overhead.
                  </Paragraph>
                </div>

                {/* Styled Miniature active route map within the card */}
                <div style={{
                  height: '200px',
                  backgroundColor: '#0c111d',
                  borderRadius: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }}>
                  {/* Styled Map Background Grid */}
                  <div className="map-grid-bg" style={{ opacity: 0.1 }} />

                  {/* Custom SVG Route Path matching home mockup layout */}
                  <svg
                    style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 2 }}
                    viewBox="0 0 400 200"
                  >
                    {/* Background roads */}
                    <path d="M 0,50 L 400,70 M 0,130 L 400,110 M 120,0 L 150,200 M 280,0 L 250,200" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="none" />

                    {/* The Active Live Blue Route Line */}
                    <path
                      d="M 50,160 Q 200,120 180,70 T 320,40"
                      stroke="url(#featuresRouteGrad)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                      className="animated-route"
                    />

                    <defs>
                      <linearGradient id="featuresRouteGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#0056cc" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Pulse dot aligned with endpoint (320, 40) -> (80%, 20%) */}
                  <div className="map-route-pulse" style={{ top: '20%', left: '80%', marginLeft: '-7px', marginTop: '-7px' }} />

                  {/* Floating active route overlay tag */}
                  <div className="premium-glass" style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    right: '12px',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    zIndex: 10
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="status-icon-box" style={{ width: '22px', height: '22px', marginRight: '4px' }}>
                        <CompassFilled style={{ fontSize: '11px', color: '#38bdf8' }} />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>Active Live Broadcast</span>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Live Syncing</span>
                  </div>
                </div>
              </Card>
            </Col>

            {/* RIGHT COLUMN: 2x2 Grid of standard cards styled into high-end feature-cards */}
            <Col xs={24} lg={12}>
              <Row gutter={[20, 20]}>

                {/* 1. Smart Alarms Card */}
                <Col xs={24} sm={12}>
                  <Card className="feature-card feature-card-red" bordered={false} style={{ height: '235px' }}>
                    <div className="feature-icon-wrapper" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
                      <WarningOutlined style={{ fontSize: '18px' }} />
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', margin: '0 0 8px 0', letterSpacing: '-0.1px' }}>
                      Smart Alarms
                    </h3>
                    <Paragraph style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
                      Configure emergency timers or smart proximity flags that trigger defensive, high-frequency geofencing sweep loops and prompt check-ins.
                    </Paragraph>
                  </Card>
                </Col>

                {/* 2. SOS System Card (Highlighted Urgent Card) */}
                <Col xs={24} sm={12}>
                  <Card className="feature-card feature-card-red" bordered={false} style={{ height: '235px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
                    <div className="feature-icon-wrapper" style={{ backgroundColor: '#ef4444', color: '#ffffff' }}>
                      <BellOutlined style={{ fontSize: '18px' }} />
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', margin: '0 0 8px 0', letterSpacing: '-0.1px' }}>
                      SOS Broadcaster
                    </h3>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      fontSize: '12px',
                      color: '#cbd5e1',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      fontWeight: 600
                    }}>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#ef4444' }} /> 3-Sec Emergency Alarm</li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#ef4444' }} /> Silent sweep coordinate pipeline</li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#ef4444' }} /> Automatic circle-wide notifications</li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#ef4444' }} /> Ad-Free priority safety channel</li>
                    </ul>
                  </Card>
                </Col>

                {/* 3. Geofencing Card */}
                <Col xs={24} sm={12}>
                  <Card className="feature-card feature-card-green" bordered={false} style={{ height: '235px' }}>
                    <div className="feature-icon-wrapper" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                      <GlobalOutlined style={{ fontSize: '18px' }} />
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', margin: '0 0 8px 0', letterSpacing: '-0.1px' }}>
                      Dynamic Boundaries
                    </h3>
                    <Paragraph style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
                      Set secure boundaries around frequent zones. Get immediately logged as safe when crossing into safe areas or spark circles if you stray.
                    </Paragraph>
                  </Card>
                </Col>

                {/* 4. Route Sharing Card */}
                <Col xs={24} sm={12}>
                  <Card className="feature-card feature-card-blue" bordered={false} style={{ height: '235px' }}>
                    <div className="feature-icon-wrapper" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
                      <TeamOutlined style={{ fontSize: '18px' }} />
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', margin: '0 0 8px 0', letterSpacing: '-0.1px' }}>
                      Broadsheet Web Links
                    </h3>
                    <Paragraph style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
                      Dispatch web-compatible route broadsheets. Circle contacts can check tracking records on any standard browser with zero setup.
                    </Paragraph>
                  </Card>
                </Col>

              </Row>
            </Col>
          </Row>
        </div>
      </section>

      {/* 3. Horizontal Glassmorphic HUD Metrics Bar */}
      <section style={{ padding: '20px 24px', position: 'relative', zIndex: 10 }}>
        <div className="hero-container">
          <div className="premium-glass" style={{ borderRadius: '24px', padding: '28px 24px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <Row gutter={[32, 32]} justify="center">

              <Col xs={24} md={8}>
                <div style={{ textAlign: 'left', paddingRight: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <CheckCircleFilled style={{ color: '#10b981', fontSize: '16px' }} />
                    <span style={{ fontWeight: 800, fontSize: '15px', color: '#ffffff' }}>99.9% Uptime SLA</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                    Battery optimized background location engine syncs telemetry with zero app crashes.
                  </p>
                </div>
              </Col>

              <Col xs={24} md={8}>
                <div style={{ textAlign: 'left', paddingRight: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <CheckCircleFilled style={{ color: '#38bdf8', fontSize: '16px' }} />
                    <span style={{ fontWeight: 800, fontSize: '15px', color: '#ffffff' }}>1-Min High Freq Sync</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                    Ensure immediate tracking precision by broad-sweeping coordinates to emergency lists.
                  </p>
                </div>
              </Col>

              <Col xs={24} md={8}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <CheckCircleFilled style={{ color: '#8b5cf6', fontSize: '16px' }} />
                    <span style={{ fontWeight: 800, fontSize: '15px', color: '#ffffff' }}>AES-256 Telemetry Encryption</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                    Coordinate feeds are fully encrypted. Only designated circles can decrypt path logs.
                  </p>
                </div>
              </Col>

            </Row>
          </div>
        </div>
      </section>

      {/* 4. Showcase 1: Smart Geofencing */}
      <section style={{ padding: '80px 24px', position: 'relative', zIndex: 10 }}>
        <div className="hero-container">
          <Row align="middle" gutter={[48, 48]}>

            {/* Hand holding phone screenshot mockup inside device frame */}
            <Col xs={24} md={12}>
              <div className="mockup-image-frame">
                <img
                  src="/features/Data-Science-Interface.png"
                  alt="Smart Geofencing Screenshot"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
            </Col>

            {/* Content text */}
            <Col xs={24} md={12}>
              <div style={{ textAlign: 'left', paddingLeft: '12px' }}>
                <div className="premium-badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  <span className="badge-dot" style={{ backgroundColor: '#10b981', boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.15)' }} />
                  GEOFENCING SYSTEM
                </div>
                <Title level={3} style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', marginTop: '16px', marginBottom: '16px', letterSpacing: '-0.5px' }}>
                  Smart Boundary Geofences
                </Title>
                <Paragraph style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '28px' }}>
                  Establish virtual safety perimeters around regular zones or travel destinations. The moment you enter or exit these custom boundaries, the background geolocation engine coordinates circle notifications.
                </Paragraph>

                {/* Bullets with styled checkmarks */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircleFilled style={{ color: '#60a5fa', fontSize: '16px' }} />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#cbd5e1' }}>Real-time automatic border notifications</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircleFilled style={{ color: '#60a5fa', fontSize: '16px' }} />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#cbd5e1' }}>Battery-saving location boundary sweeping</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircleFilled style={{ color: '#60a5fa', fontSize: '16px' }} />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#cbd5e1' }}>Custom boundary radius selection logs</span>
                  </div>
                </div>
              </div>
            </Col>

          </Row>
        </div>
      </section>

      {/* 5. Showcase 2: Real-time Location Sharing */}
      <section style={{ padding: '80px 24px', position: 'relative', zIndex: 10 }}>
        <div className="hero-container">
          <Row align="middle" gutter={[48, 48]}>

            {/* Content text */}
            <Col xs={{ span: 24, order: 2 }} md={{ span: 12, order: 1 }}>
              <div style={{ textAlign: 'left', paddingRight: '12px' }}>
                <div className="premium-badge" style={{ backgroundColor: 'rgba(56, 189, 248, 0.05)', borderColor: 'rgba(56, 189, 248, 0.1)', color: '#60a5fa' }}>
                  <span className="badge-dot" style={{ backgroundColor: '#60a5fa', boxShadow: '0 0 0 3px rgba(96, 165, 250, 0.15)' }} />
                  TELEMETRY SHIELD
                </div>
                <Title level={3} style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', marginTop: '16px', marginBottom: '16px', letterSpacing: '-0.5px' }}>
                  Real-time Location Broadcasts
                </Title>
                <Paragraph style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '32px' }}>
                  Securely stream live coordinate map logs to circles or temporary SMS tracking lines. Family guardians can review your coordinates, battery telemetry, and estimated arrival time on any browser with zero app installation.
                </Paragraph>

                <Button
                  type="primary"
                  size="large"
                  icon={<CompassOutlined />}
                  className="btn-primary"
                  onClick={() => alert('Launching live simulated web tracking dashboard...')}
                >
                  Explore Live Web Dashboard
                </Button>
              </div>
            </Col>

            {/* Desktop Mockup Screenshot inside device frame */}
            <Col xs={{ span: 24, order: 1 }} md={{ span: 12, order: 2 }}>
              <div className="mockup-image-frame">
                <img
                  src="/features/Financial-Dashboard.png"
                  alt="Desktop Location Sharing Mockup"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
            </Col>

          </Row>
        </div>
      </section>

    </div>
  );
};

export default Features;
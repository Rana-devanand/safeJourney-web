import React from 'react';
import { Typography, Row, Col, Card, Button } from 'antd';
import { CheckOutlined, CloseOutlined, CrownFilled, StarFilled } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Pricing: React.FC = () => {
  return (
    <div className="premium-page-wrapper" style={{ position: 'relative', paddingBottom: '80px' }}>
      {/* Background Glowing Blobs */}
      <div className="glow-blob glow-blob-1" style={{ top: '-5%', right: '10%', opacity: 0.25 }} />
      <div className="glow-blob glow-blob-2" style={{ bottom: '10%', left: '5%', opacity: 0.2 }} />

      <section style={{ padding: '80px 24px 20px 24px', position: 'relative', zIndex: 10 }}>
        <div className="hero-container" style={{ textAlign: 'center' }}>
          <div className="premium-badge" style={{ marginBottom: '20px' }}>
            <span className="badge-dot" />
            SUBSCRIPTION PLANS
          </div>
          <Title level={2} style={{ fontSize: '42px', fontWeight: 800, color: '#ffffff', marginBottom: '12px', letterSpacing: '-1.5px', lineHeight: 1.2 }}>
            Simple, Transparent Pricing
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#cbd5e1', marginBottom: '48px', maxWidth: '650px', marginInline: 'auto', lineHeight: 1.6 }}>
            Start tracking your journeys for free. Upgrade to Premium Pro for absolute peace of mind with continuous 1-minute location updates and no advertisements.
          </Paragraph>

          <Row gutter={[24, 24]} justify="center">

            {/* Free Tier */}
            <Col xs={24} md={8} lg={7}>
              <Card className="pricing-card" bordered={false} style={{ position: 'relative', overflow: 'visible' }}>
                <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#94a3b8' }}>Free</div>
                  <span className="pricing-pill pricing-pill-free">STARTER</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '4px' }}>
                  <span style={{ fontSize: '40px', fontWeight: 800, color: '#ffffff' }}>$0</span>
                  <span style={{ fontSize: '14px', color: '#94a3b8', marginLeft: '4px', fontWeight: 500 }}>/ forever</span>
                </div>
                <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px', marginTop: '8px', lineHeight: 1.5 }}>
                  Perfect for casual travelers who only need occasional live route check-ins. Ad-supported.
                </p>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px', marginBottom: '24px' }}>
                  <ul className="features-checklist">
                    <li><CheckOutlined className="check-icon" style={{ color: '#10b981' }} /> 5 Free Journey Slots</li>
                    <li><CheckOutlined className="check-icon" style={{ color: '#10b981' }} /> GPS Sync interval: 5 mins</li>
                    <li><CheckOutlined className="check-icon" style={{ color: '#10b981' }} /> Standard Live Tracking Links</li>
                    <li><CheckOutlined className="check-icon" style={{ color: '#10b981' }} /> 1 Active Safety Circle</li>
                    <li style={{ color: '#64748b' }}>
                      <CloseOutlined style={{ color: '#64748b', marginRight: '8px', fontSize: '14px' }} />
                      <span style={{ textDecoration: 'line-through' }}>Ad-Free Experience</span>
                    </li>
                    <li style={{ color: '#64748b' }}>
                      <CloseOutlined style={{ color: '#64748b', marginRight: '8px', fontSize: '14px' }} />
                      <span style={{ textDecoration: 'line-through' }}>Priority SOS Alerts</span>
                    </li>
                  </ul>
                </div>

                <Button
                  block
                  size="large"
                  className="btn-secondary"
                  onClick={() => alert('Download the app to get started for free!')}
                >
                  Get Started Free
                </Button>
              </Card>
            </Col>

            {/* Monthly Premium Pro */}
            <Col xs={24} md={8} lg={7}>
              <Card className="pricing-card pricing-card-featured" bordered={false} style={{ position: 'relative', overflow: 'visible' }}>
                {/* Best Value Pill */}
                <div style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 10
                }}>
                  <span className="pricing-pill pricing-pill-best" style={{ fontSize: '11px', padding: '6px 18px' }}>
                    <CrownFilled style={{ fontSize: '12px' }} /> HIGHLY RECOMMENDED
                  </span>
                </div>

                <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#60a5fa' }}>Pro Monthly</div>
                  <span className="pricing-pill pricing-pill-best">POPULAR</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '4px' }}>
                  <span style={{ fontSize: '40px', fontWeight: 800, color: '#ffffff' }}>$4.99</span>
                  <span style={{ fontSize: '14px', color: '#94a3b8', marginLeft: '4px', fontWeight: 500 }}>/ month</span>
                </div>
                <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px', marginTop: '8px', lineHeight: 1.5 }}>
                  For families, daily commuters, and active travelers requiring absolute safety tools.
                </p>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px', marginBottom: '24px' }}>
                  <ul className="features-checklist">
                    <li><CheckOutlined className="check-icon" style={{ color: '#60a5fa' }} /> <strong>Unlimited Journeys</strong></li>
                    <li><CheckOutlined className="check-icon" style={{ color: '#60a5fa' }} /> High-freq GPS Sync: <strong>1 min</strong></li>
                    <li><CheckOutlined className="check-icon" style={{ color: '#60a5fa' }} /> Unlimited Active Safety Circles</li>
                    <li><CheckOutlined className="check-icon" style={{ color: '#60a5fa' }} /> <strong>Ad-Free Experience</strong></li>
                    <li><CheckOutlined className="check-icon" style={{ color: '#60a5fa' }} /> Priority SOS Notifications</li>
                    <li><CheckOutlined className="check-icon" style={{ color: '#60a5fa' }} /> Premium Badge Profile</li>
                  </ul>
                </div>

                <Button
                  block
                  type="primary"
                  size="large"
                  className="btn-primary"
                  onClick={() => alert('Download app and click "Go Premium Now" in settings!')}
                >
                  <StarFilled style={{ fontSize: '14px', marginRight: '6px' }} />
                  Go Pro Monthly
                </Button>
              </Card>
            </Col>

            {/* Yearly Premium Pro (Best Value) */}
            <Col xs={24} md={8} lg={7}>
              <Card className="pricing-card" bordered={false} style={{ position: 'relative', overflow: 'visible', borderColor: '#10b981' }}>
                {/* Savings Pill */}
                <div style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 10
                }}>
                  <span className="pricing-pill" style={{
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                    fontSize: '11px',
                    padding: '6px 18px'
                  }}>
                    <CrownFilled style={{ fontSize: '12px' }} /> BEST VALUE
                  </span>
                </div>

                <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#34d399' }}>Pro Yearly</div>
                  <span className="pricing-pill" style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#34d399',
                    fontSize: '10px'
                  }}>
                    SAVE 30.8%
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '4px' }}>
                  <span style={{ fontSize: '40px', fontWeight: 800, color: '#ffffff' }}>$41.39</span>
                  <span style={{ fontSize: '14px', color: '#94a3b8', marginLeft: '4px', fontWeight: 500 }}>/ year</span>
                </div>
                <p style={{ fontSize: '13px', color: '#34d399', marginBottom: '8px', fontWeight: 700 }}>
                  <CheckOutlined style={{ marginRight: '6px' }} /> Save $18.49 vs monthly billing
                </p>
                <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px', marginTop: '4px', lineHeight: 1.5 }}>
                  Best for power users who want year-round premium protection at the lowest price.
                </p>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px', marginBottom: '24px' }}>
                  <ul className="features-checklist">
                    <li><CheckOutlined className="check-icon" style={{ color: '#10b981' }} /> <strong>Unlimited Journeys</strong></li>
                    <li><CheckOutlined className="check-icon" style={{ color: '#10b981' }} /> High-freq GPS Sync: <strong>1 min</strong></li>
                    <li><CheckOutlined className="check-icon" style={{ color: '#10b981' }} /> Unlimited Active Safety Circles</li>
                    <li><CheckOutlined className="check-icon" style={{ color: '#10b981' }} /> <strong>Ad-Free Experience</strong></li>
                    <li><CheckOutlined className="check-icon" style={{ color: '#10b981' }} /> Priority SOS Notifications</li>
                    <li><CheckOutlined className="check-icon" style={{ color: '#10b981' }} /> Premium Badge Profile</li>
                    <li><CheckOutlined className="check-icon" style={{ color: '#10b981' }} /> <strong>Exclusive Yearly Badge</strong></li>
                  </ul>
                </div>

                <Button
                  block
                  size="large"
                  style={{
                    borderRadius: '24px',
                    height: '48px',
                    fontSize: '15px',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    border: 'none',
                    color: '#ffffff',
                    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.25)'
                  }}
                  onClick={() => alert('Download app and subscribe to Yearly Premium in settings!')}
                >
                  <StarFilled style={{ fontSize: '14px', marginRight: '6px' }} />
                  Go Pro Yearly
                </Button>
              </Card>
            </Col>

          </Row>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
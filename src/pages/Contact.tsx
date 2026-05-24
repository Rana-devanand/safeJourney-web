import React, { useState } from 'react';
import { Typography, Row, Col, Form, Input, Button, message } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, SendOutlined, LoadingOutlined } from '@ant-design/icons';
import { sendContactEmail } from '../lib/supabase';

const { Title, Paragraph } = Typography;

const Contact: React.FC = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values: any) => {
    setSubmitting(true);
    try {
      const result = await sendContactEmail({
        name: values.name,
        email: values.email,
        subject: values.subject || 'General Inquiry',
        message: values.message,
      });

      if (result.success) {
        message.success({
          content: 'Thank you for reaching out! Your inquiry has been sent successfully. We will reply shortly.',
          duration: 6,
          style: { marginTop: '16px', borderRadius: '12px', fontWeight: 600 },
        });
        form.resetFields();
      } else {
        message.error({
          content: result.error || 'Failed to send message. Please try again later.',
          duration: 5,
          style: { marginTop: '16px', borderRadius: '12px', fontWeight: 600 },
        });
      }
    } catch (err) {
      message.error({
        content: 'An unexpected error occurred. Please try again.',
        duration: 5,
        style: { marginTop: '16px', borderRadius: '12px', fontWeight: 600 },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="premium-page-wrapper" style={{ position: 'relative', paddingBottom: '80px' }}>
      {/* Background Glowing Blobs */}
      <div className="glow-blob glow-blob-1" style={{ top: '-5%', right: '10%', opacity: 0.25 }} />
      <div className="glow-blob glow-blob-2" style={{ bottom: '10%', left: '5%', opacity: 0.2 }} />

      <section style={{ padding: '80px 24px 40px 24px', position: 'relative', zIndex: 10 }}>
        <div className="hero-container">

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="premium-badge" style={{ marginBottom: '20px' }}>
              <span className="badge-dot" />
              GET IN TOUCH
            </div>
            <Title level={2} style={{ fontSize: '42px', fontWeight: 800, color: '#ffffff', marginBottom: '12px', letterSpacing: '-1.5px', lineHeight: 1.2 }}>
              Let's Start a Conversation
            </Title>
            <Paragraph style={{ fontSize: '16px', color: '#cbd5e1', maxWidth: '650px', marginInline: 'auto', lineHeight: 1.6 }}>
              Have questions about integrations, corporate safety licenses, or enterprise deployment? Our team is ready to help.
            </Paragraph>
          </div>

          <Row gutter={[40, 40]} justify="center" align="stretch">
            {/* Info Card */}
            <Col xs={24} md={10} lg={8}>
              <div className="contact-form-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginBottom: '28px', letterSpacing: '-0.3px' }}>
                  Contact Information
                </h3>

                <div style={{ display: 'flex', gap: '14px', marginBottom: '24px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(59, 130, 246, 0.15)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0
                  }}>
                    <MailOutlined style={{ fontSize: '18px', color: '#60a5fa' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#cbd5e1', margin: '0 0 2px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Us</h4>
                    <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>support@safejourney.com</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', marginBottom: '24px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(59, 130, 246, 0.15)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0
                  }}>
                    <PhoneOutlined style={{ fontSize: '18px', color: '#60a5fa' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#cbd5e1', margin: '0 0 2px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Call Support</h4>
                    <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>+1 (800) 555-SAFE</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(59, 130, 246, 0.15)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0
                  }}>
                    <EnvironmentOutlined style={{ fontSize: '18px', color: '#60a5fa' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#cbd5e1', margin: '0 0 2px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Corporate HQ</h4>
                    <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>100 Pine Street, San Francisco, CA 94111</p>
                  </div>
                </div>
              </div>
            </Col>

            {/* Form Card */}
            <Col xs={24} md={12} lg={10}>
              <div className="contact-form-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginBottom: '24px', letterSpacing: '-0.3px' }}>
                  Send Us a Message
                </h3>

                <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>

                  <Form.Item
                    label="Your Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    <Input
                      placeholder="John Doe"
                      size="large"
                      style={{
                        borderRadius: '12px',
                        fontSize: '14px',
                        padding: '10px 14px',
                        border: '1.5px solid rgba(255, 255, 255, 0.1)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#e2e8f0',
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Your Email"
                    name="email"
                    rules={[
                      { required: true, type: 'email', message: 'Please enter a valid email address' },
                    ]}
                  >
                    <Input
                      placeholder="john@example.com"
                      size="large"
                      style={{
                        borderRadius: '12px',
                        fontSize: '14px',
                        padding: '10px 14px',
                        border: '1.5px solid rgba(255, 255, 255, 0.1)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#e2e8f0',
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Subject"
                    name="subject"
                  >
                    <Input
                      placeholder="e.g. Enterprise Licensing Inquiry"
                      size="large"
                      style={{
                        borderRadius: '12px',
                        fontSize: '14px',
                        padding: '10px 14px',
                        border: '1.5px solid rgba(255, 255, 255, 0.1)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#e2e8f0',
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Message"
                    name="message"
                    rules={[{ required: true, message: 'Please write your message' }]}
                  >
                    <Input.TextArea
                      rows={4}
                      placeholder="How can we help you? Tell us about your inquiry, requirements, or partnership ideas."
                      size="large"
                      style={{
                        borderRadius: '12px',
                        fontSize: '14px',
                        padding: '10px 14px',
                        border: '1.5px solid rgba(255, 255, 255, 0.1)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#e2e8f0',
                      }}
                    />
                  </Form.Item>

                  <Form.Item style={{ marginBottom: 0 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="btn-primary"
                      loading={submitting}
                      icon={submitting ? <LoadingOutlined /> : <SendOutlined />}
                      style={{
                        borderRadius: '24px',
                        height: '48px',
                        fontSize: '15px',
                        fontWeight: 700,
                        paddingInline: '32px',
                        width: '100%',
                      }}
                    >
                      {submitting ? 'Sending...' : 'Submit Request'}
                    </Button>
                  </Form.Item>

                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default Contact;
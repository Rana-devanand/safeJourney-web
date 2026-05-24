import React, { useState, useEffect, useRef } from 'react';
import { Typography, Button, message } from 'antd';
import { SafetyCertificateOutlined, LoadingOutlined } from '@ant-design/icons';
import { signInWithGoogleToken, getCurrentUser, getGoogleClientId } from '../../lib/supabase-auth';

const { Title, Paragraph } = Typography;

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, options: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

const AdminLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [gsiLoaded, setGsiLoaded] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkExistingSession();
    loadGoogleIdentityScript();
  }, []);

  const loadGoogleIdentityScript = () => {
    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setGsiLoaded(true);
      // Initialize Google Identity Services after script loads
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: getGoogleClientId(),
          callback: handleGoogleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        // Render the button if the container exists
        if (buttonRef.current) {
          window.google.accounts.id.renderButton(buttonRef.current, {
            type: 'standard',
            shape: 'pill',
            theme: 'outline',
            text: 'signin_with',
            size: 'large',
            logo_alignment: 'left',
            width: buttonRef.current.offsetWidth || 380,
          });
        }
      }
    };
    document.body.appendChild(script);
  };

  const checkExistingSession = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        window.location.href = '/admin/dashboard';
      }
    } catch (err) {
      // Not logged in
    } finally {
      setChecking(false);
    }
  };

  const handleGoogleCredentialResponse = async (response: any) => {
    setLoading(true);
    try {
      const { credential } = response;
      if (!credential) {
        throw new Error('No credential received from Google');
      }

      // Exchange Google ID token for Supabase session
      const data = await signInWithGoogleToken(credential);
      
      if (data?.user) {
        message.success('Successfully signed in! Redirecting...');
        // Short delay then redirect
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 500);
      } else {
        throw new Error('Failed to create session');
      }
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      message.error(err.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  const handleClickLogin = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    } else {
      message.warning('Google Sign-In is still loading. Please wait...');
    }
  };

  if (checking) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #090d16 0%, #101b33 45%, #0056cc 100%)',
      }}>
        <LoadingOutlined style={{ fontSize: 36, color: '#60a5fa' }} />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #090d16 0%, #101b33 45%, #0056cc 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="glow-blob glow-blob-1" style={{ opacity: 0.15 }} />
      <div className="glow-blob glow-blob-2" style={{ opacity: 0.1 }} />

      <div style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '32px',
        padding: '48px 40px',
        maxWidth: '420px',
        width: '100%',
        margin: '24px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        {/* Logo */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto 24px auto',
          boxShadow: '0 8px 24px rgba(37,99,235,0.25)',
        }}>
          <SafetyCertificateOutlined style={{ fontSize: '36px', color: '#ffffff' }} />
        </div>

        <Title level={2} style={{
          color: '#ffffff',
          fontSize: '28px',
          fontWeight: 800,
          marginBottom: '8px',
          letterSpacing: '-0.5px',
        }}>
          Admin Dashboard
        </Title>

        <Paragraph style={{
          color: '#cbd5e1',
          fontSize: '14px',
          marginBottom: '36px',
          lineHeight: 1.6,
        }}>
          Sign in with your Google account to access the Safe Journey administration panel.
        </Paragraph>

        {/* Google Sign-In Button (hidden GSI rendered button) */}
        <div ref={buttonRef} style={{ 
          display: gsiLoaded ? 'flex' : 'none',
          justifyContent: 'center', 
          marginBottom: '16px',
          borderRadius: '26px',
          overflow: 'hidden',
        }} />

        {/* Fallback button if GSI hasn't rendered yet */}
        {!gsiLoaded && (
          <Button
            onClick={handleClickLogin}
            loading={loading}
            size="large"
            style={{
              height: '52px',
              borderRadius: '26px',
              fontSize: '16px',
              fontWeight: 700,
              width: '100%',
              background: '#ffffff',
              color: '#1e293b',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: 8 }}>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </Button>
        )}

       
      </div>
    </div>
  );
};

export default AdminLogin;

import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined, ExclamationCircleOutlined, InfoCircleOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  content: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  type?: 'info' | 'danger' | 'warning' | 'success';
  loading?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'info',
  loading = false,
}) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    }
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  // Determine color and icon based on type
  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: <DeleteOutlined style={{ fontSize: 22 }} className="text-danger" />,
          btnColor: '#ef4444',
          btnHover: '#dc2626',
        };
      case 'warning':
        return {
          icon: <ExclamationCircleOutlined style={{ fontSize: 22 }} className="text-warning" />,
          btnColor: '#f59e0b',
          btnHover: '#d97706',
        };
      case 'success':
        return {
          icon: <CheckCircleOutlined style={{ fontSize: 22 }} className="text-success" />,
          btnColor: '#10b981',
          btnHover: '#059669',
        };
      case 'info':
      default:
        return {
          icon: <InfoCircleOutlined style={{ fontSize: 22, color: '#603F83' }} />,
          btnColor: '#603F83',
          btnHover: '#4e326b',
        };
    }
  };

  const { icon, btnColor } = getTypeStyles();

  return (
    <>
      {/* Modal Backdrop with Blur (Bootstrap layout styling) */}
      <div 
        className="modal-backdrop show" 
        style={{ 
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(7, 4, 13, 0.65)',
          transition: 'all 0.3s ease',
          zIndex: 1050
        }}
        onClick={loading ? undefined : onClose}
      />

      {/* Modal dialog */}
      <div 
        className="modal d-block" 
        tabIndex={-1} 
        style={{ 
          pointerEvents: 'none',
          backgroundColor: 'transparent',
          zIndex: 1060
        }}
      >
        <div 
          className="modal-dialog modal-dialog-centered" 
          style={{ 
            maxWidth: 420,
            pointerEvents: 'auto'
          }}
        >
          <div 
            className="modal-content border border-secondary border-opacity-25 rounded-4 p-4 shadow text-white" 
            style={{ 
              backgroundColor: '#181122',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5) !important'
            }}
          >
            {/* Modal Body container with Bootstrap layouts */}
            <div className="d-flex flex-column gap-3">
              {/* Header (Icon + Title) */}
              <div className="d-flex align-items-center gap-3">
                <div 
                  className="rounded-circle d-flex justify-content-center align-items-center border border-white border-opacity-10"
                  style={{
                    width: 46,
                    height: 46,
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    flexShrink: 0
                  }}
                >
                  {icon}
                </div>
                <h5 className="fw-bold m-0 lh-base text-white">
                  {title}
                </h5>
              </div>

              {/* Content Body */}
              <div 
                className="lh-lg ps-1"
                style={{ 
                  fontSize: 14,
                  color: '#cbd5e1'
                }}
              >
                {content}
              </div>

              {/* Footer Actions */}
              <div className="d-flex justify-content-end gap-2 mt-2">
                <button
                  type="button"
                  disabled={loading}
                  onClick={onClose}
                  className="btn px-3 fw-semibold d-flex align-items-center justify-content-center custom-modal-cancel-btn"
                  style={{
                    height: 40,
                    borderRadius: 10,
                    fontSize: 13,
                    transition: 'all 0.2s'
                  }}
                >
                  {cancelText}
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={loading}
                  className="btn text-white px-4 fw-semibold d-flex align-items-center justify-content-center gap-2"
                  style={{
                    height: 40,
                    borderRadius: 10,
                    fontSize: 13,
                    backgroundColor: btnColor,
                    borderColor: btnColor,
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.2s',
                  }}
                >
                  {loading ? (
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 16, color: '#ffffff' }} spin />} />
                  ) : (
                    confirmText
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomModal;

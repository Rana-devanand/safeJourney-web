import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import { getCurrentUser } from '../../../lib/supabase-auth';

interface AdminHeaderProps {
  setSidebarOpen: (open: boolean) => void;
  adminName: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ adminName, setSidebarOpen }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchUserAvatar = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser?.user_metadata) {
          const url = currentUser.user_metadata.avatar_url || currentUser.user_metadata.picture;
          if (url) {
            setAvatarUrl(url);
          }
        }
      } catch (err) {
        console.error('Error fetching admin avatar:', err);
      }
    };
    fetchUserAvatar();
  }, []);

  return (
    <header className="admin-header">
      {/* Search Bar / Menu button for mobile */}
      <div className="d-flex align-items-center gap-3 flex-grow-1">
        <button
          className="d-lg-none p-2 btn btn-link text-white text-decoration-none border-0 d-flex align-items-center justify-content-center"
          onClick={() => setSidebarOpen(true)}
          style={{ cursor: 'pointer' }}
        >
          <span className="material-symbols-outlined fs-4">menu</span>
        </button>
      </div>

      {/* Profile & Notifications */}
      <div className="d-flex align-items-center gap-3">
        {/* Profile Details */}
        <div className="d-flex align-items-center gap-3 ms-2 ps-3 border-start border-secondary-subtle">
          <div className="text-end d-none d-sm-block">
            <p className="small fw-semibold text-light text-capitalize mb-1 lh-1">
              {adminName}
            </p>
            <p className="text-light text-uppercase m-0 lh-1" style={{ fontSize: '10px', letterSpacing: '0.05em' }}>
              SUPER ADMIN
            </p>
          </div>
          
          <Avatar
            src={avatarUrl}
            size="large"
            className="border border-secondary-subtle fw-bold text-white d-flex align-items-center justify-content-center"
            style={{ 
              background: 'linear-gradient(135deg, #603F83, #8b5cf6)',
              fontSize: '14px'
            }}
          >
            {!avatarUrl && (adminName ? adminName.substring(0, 2).toUpperCase() : 'AD')}
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

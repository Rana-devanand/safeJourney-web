import React, { useState, useEffect } from 'react';
import { Tag, Input, Card, message } from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  DeleteOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { getCurrentUser, signOut } from '../../lib/supabase-auth';
import { adminApi } from '../../api/adminApi';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import CommonTable from '../../components/CommonTable';
import CustomModal from '../../components/CustomModal';
import './theme/admin-theme.css';

interface UserDeviceData {
  id: string;
  full_name: string;
  email: string;
  profile_photo?: string;
  device_id?: string;
  created_at: string;
}

const UserAvatar: React.FC<{ name: string; profilePhoto?: string }> = ({ name, profilePhoto }) => {
  const [imgError, setImgError] = React.useState(false);
  const hasPhoto = profilePhoto && profilePhoto.trim() !== '' && !imgError;

  const initials = React.useMemo(() => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'U';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + (parts[parts.length - 1]?.[0] || '')).toUpperCase().substring(0, 2);
  }, [name]);

  return (
    <div style={{
      width: 36,
      height: 36,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 700,
      fontSize: 14,
      flexShrink: 0,
      overflow: 'hidden',
      position: 'relative',
      background: hasPhoto ? 'transparent' : 'linear-gradient(135deg, #603F83, #CAD5DB)',
      color: '#ffffff',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      {hasPhoto ? (
        <img
          src={profilePhoto}
          alt={name || 'User'}
          onError={() => setImgError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        initials
      )}
    </div>
  );
};

const DeviceManagement: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState<UserDeviceData[]>([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);

  // Custom Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDeviceData | null>(null);

  useEffect(() => {
    loadData(1, 10, '');
  }, []);

  const loadData = async (
    page: number = currentPage, 
    size: number = pageSize, 
    search: string = searchText
  ) => {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        window.location.href = '/admin';
        return;
      }
      setUser(currentUser);

      const deviceData = await adminApi.getUsersWithDevices(page, size, search);
      setUsers(deviceData.users || []);
      setTotalUsers(deviceData.total || 0);
    } catch (err) {
      console.error('DeviceManagement load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
    loadData(page, size, searchText);
  };

  const handleSearchChange = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
    loadData(1, pageSize, value);
  };

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/admin';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success('Device ID copied to clipboard!');
  };

  const showUnlinkConfirm = (record: UserDeviceData) => {
    setSelectedUser(record);
    setModalOpen(true);
  };

  const executeUnlink = async () => {
    if (!selectedUser) return;
    try {
      setModalLoading(true);
      const res = await adminApi.unlinkDevice(selectedUser.id);
      if (res.success) {
        message.success(`Successfully unlinked device for ${selectedUser.full_name || selectedUser.email}`);
        setModalOpen(false);
        loadData(currentPage, pageSize, searchText);
      } else {
        message.error(res.message);
      }
    } catch (err: any) {
      message.error(err.message || 'Operation failed');
    } finally {
      setModalLoading(false);
    }
  };

  const adminName = user?.email ? user.email.split('@')[0] : 'Admin';

  const columns = [
    {
      title: 'User',
      dataIndex: 'full_name',
      key: 'user',
      width: 250,
      render: (v: string, record: UserDeviceData) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden' }}>
          <UserAvatar name={v} profilePhoto={record.profile_photo} />
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <span style={{
              fontWeight: 600,
              color: 'var(--admin-text-primary, #f1f5f9)',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}>{v || 'N/A'}</span>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>{record.email}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Device Hardware ID',
      dataIndex: 'device_id',
      key: 'device_id',
      render: (v: string) => {
        if (!v) {
          return (
            <Tag color="#475569" style={{ borderRadius: 8, fontWeight: 600, margin: 0, padding: '2px 8px' }}>
              NO DEVICE LINKED
            </Tag>
          );
        }
        return (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ 
              fontFamily: 'monospace', 
              fontSize: '12px', 
              color: '#38bdf8', 
              backgroundColor: 'rgba(56, 189, 248, 0.1)', 
              padding: '4px 8px', 
              borderRadius: '6px',
              border: '1px solid rgba(56, 189, 248, 0.2)'
            }}>
              {v}
            </span>
            <button 
              onClick={() => copyToClipboard(v)}
              style={{
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                transition: 'color 0.2s',
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#38bdf8')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
              title="Copy Device ID"
            >
              <CopyOutlined />
            </button>
          </div>
        );
      },
    },
    {
      title: 'Joined Date',
      dataIndex: 'created_at',
      key: 'joined',
      width: 160,
      render: (v: string) => new Date(v).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 180,
      render: (_: any, record: UserDeviceData) => {
        if (!record.device_id) return null;
        return (
          <span
            onClick={() => showUnlinkConfirm(record)}
            style={{
              cursor: 'pointer',
              color: '#f87171',
              fontSize: 13,
              fontWeight: 600,
              padding: '6px 12px',
              borderRadius: 8,
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
            }}
          >
            <DeleteOutlined /> Unlink Device
          </span>
        );
      },
    },
  ];

  return (
    <div className="admin-shell">
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleLogout={handleLogout}
        adminName={adminName}
      />

      <main className="lg:ml-[200px] min-h-screen flex flex-col transition-all duration-300 pb-20 lg:pb-0">
        <AdminHeader setSidebarOpen={setSidebarOpen} adminName={adminName} />

        <div className="mt-16 p-6 lg:p-8 flex flex-col gap-6">
          {/* Page Heading info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', margin: 0 }}>Device ID Management</h1>
            <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
              List, search, and unlink hardware device identifiers to allow users to log in on new devices.
            </p>
          </div>

          {/* Search & Refresh */}
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-stretch align-items-sm-center gap-3">
            <Input
              placeholder="Search users by name, email, or device ID..."
              prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
              value={searchText}
              onChange={(e) => handleSearchChange(e.target.value)}
              style={{ maxWidth: 380, borderRadius: 12, height: 42 , background : '#0b1734ff' , border : "none" }}
            />
            <button
              onClick={() => loadData(currentPage, pageSize, searchText)}
              style={{
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                color: '#603F83', fontWeight: 600, fontSize: 13,
                padding: '8px 16px', borderRadius: 10, background: 'rgba(96, 63, 131, 0.15)',
                transition: 'all 0.2s',
              }}
            >
              <ReloadOutlined /> Refresh
            </button>
          </div>

          {/* Table Container */}
          <Card
            bordered={false}
            style={{ borderRadius: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
            title={<span style={{ fontSize: 16, fontWeight: 700, color: '#e4e4e4ff' }}>Linked User Devices ({totalUsers})</span>}
          >
            <CommonTable
              size="middle"
              loading={loading}
              data={users}
              columns={columns}
              rowKey="id"
              pageSize={pageSize}
              currentPage={currentPage}
              totalCount={totalUsers}
              onPageChange={handlePageChange}
              totalText="users"
              emptyText="No users with devices found"
            />
          </Card>
        </div>
      </main>

      {/* Confirmation Modal */}
      {selectedUser && (
        <CustomModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={executeUnlink}
          title="Unlink Device Identifier"
          content={
            <span>
              Are you sure you want to decouple the linked device for{' '}
              <strong>{selectedUser.full_name || selectedUser.email}</strong>?{' '}
              <br /><br />
              This will remove the device fingerprint `<strong>{selectedUser.device_id}</strong>` from their profile, enabling them to authenticate and register on a new mobile device.
            </span>
          }
          confirmText="Yes, Unlink Device"
          type="warning"
          loading={modalLoading}
        />
      )}
    </div>
  );
};

export default DeviceManagement;

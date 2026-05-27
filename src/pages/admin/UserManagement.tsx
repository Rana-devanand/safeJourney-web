import React, { useState, useEffect } from 'react';
import { Spin, Tag, Input, Card, message } from 'antd';
import {
  LoadingOutlined,
  SearchOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  StopOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { getCurrentUser, signOut } from '../../lib/supabase-auth';
import { adminApi } from '../../api/adminApi';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import CommonTable from '../../components/CommonTable';
import CustomModal from '../../components/CustomModal';
import './theme/admin-theme.css';

interface UserData {
  id: string;
  full_name: string;
  email: string;
  phone_number?: string;
  created_at: string;
  is_premium: boolean;
  active: boolean;
  profile_photo?: string;
  device_id?: string;
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

const UserManagement: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [_, setPremiumCount] = useState(0);
  const [__, setActiveCount] = useState(0);

  // Custom Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    content: React.ReactNode;
    confirmText: string;
    type: 'info' | 'danger' | 'warning' | 'success';
    onConfirm: () => Promise<void>;
  } | null>(null);

  useEffect(() => {
    loadData(1, 10);
  }, []);

  const loadData = async (page: number = currentPage, size: number = pageSize) => {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        window.location.href = '/admin';
        return;
      }
      setUser(currentUser);

      const [usersData, stats] = await Promise.all([
        adminApi.getAllUsers(page, size),
        adminApi.getDashboardStats()
      ]);

      setUsers(usersData.users || []);
      setTotalUsers(usersData.total || 0);
      setPremiumCount(stats.premiumUsers);
      setActiveCount((usersData.users || []).filter((u: UserData) => u.active).length);
    } catch (err) {
      console.error('UserManagement load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
    loadData(page, size);
  };

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/admin';
  };

  const showToggleStatusConfirm = (record: UserData) => {
    setModalConfig({
      title: record.active ? 'Deactivate User' : 'Activate User',
      content: (
        <span>
          Are you sure you want to {record.active ? 'deactivate' : 'activate'}{' '}
          <strong>{record.full_name || record.email}</strong>?{' '}
          {record.active 
            ? 'They will be blocked from logging into the mobile application.' 
            : 'They will regain full access to all features.'}
        </span>
      ),
      confirmText: record.active ? 'Deactivate' : 'Activate',
      type: record.active ? 'warning' : 'success',
      onConfirm: async () => {
        try {
          setModalLoading(true);
          await adminApi.blockUser(record.id, record.active);
          message.success(`User ${record.active ? 'deactivated' : 'activated'} successfully`);
          setModalOpen(false);
          loadData(currentPage, pageSize);
        } catch (err: any) {
          message.error(err.message || 'Operation failed');
        } finally {
          setModalLoading(false);
        }
      }
    });
    setModalOpen(true);
  };

  const showDeleteConfirm = (record: UserData) => {
    setModalConfig({
      title: 'Permanently Delete User',
      content: (
        <span>
          Are you sure you want to permanently delete{' '}
          <strong>{record.full_name || record.email}</strong>?{' '}
          <span style={{ color: '#ef4444', fontWeight: 600 }}>
            This action is irreversible and will delete all their journeys, contacts, circles, and history.
          </span>
        </span>
      ),
      confirmText: 'Delete Permanently',
      type: 'danger',
      onConfirm: async () => {
        try {
          setModalLoading(true);
          await adminApi.deleteUser(record.id);
          message.success('User deleted successfully');
          setModalOpen(false);
          
          const isLastItemOnPage = users.length === 1 && currentPage > 1;
          const nextPage = isLastItemOnPage ? currentPage - 1 : currentPage;
          if (isLastItemOnPage) {
            setCurrentPage(nextPage);
          }
          loadData(nextPage, pageSize);
        } catch (err: any) {
          message.error(err.message || 'Delete failed');
        } finally {
          setModalLoading(false);
        }
      }
    });
    setModalOpen(true);
  };

  const filteredUsers = users.filter((u) =>
    (u.full_name || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(searchText.toLowerCase())
  );

  const adminName = user?.email ? user.email.split('@')[0] : 'Admin';

  const columns = [
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'name',
      ellipsis: true,
      sorter: (a: UserData, b: UserData) => (a.full_name || '').localeCompare(b.full_name || ''),
      render: (v: string, record: UserData) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden' }}>
          <UserAvatar name={v} profilePhoto={record.profile_photo} />
          <span style={{
            fontWeight: 600,
            color: 'var(--admin-text-primary, #f1f5f9)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>{v || 'N/A'}</span>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      responsive: ['md' as const],
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'status',
      width: 100,
      render: (v: boolean) => (
        <Tag color={v ? '#10b981' : '#ef4444'} style={{ borderRadius: 8, fontWeight: 600, margin: 0 }}>
          {v ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Device ID',
      dataIndex: 'device_id',
      key: 'device_id',
      responsive: ['lg' as const],
      render: (v: string) => v ? <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#94a3b8' }}>{v}</span> : <span style={{ color: '#64748b' }}>N/A</span>,
    },
    {
      title: 'Premium',
      dataIndex: 'is_premium',
      key: 'premium',
      width: 100,
      render: (v: boolean) => (
        <Tag color={v ? '#603F83' : '#64748b'} style={{ borderRadius: 8, fontWeight: 600, margin: 0 }}>
          {v ? 'Premium' : 'Free'}
        </Tag>
      ),
    },
    {
      title: 'Joined',
      dataIndex: 'created_at',
      key: 'joined',
      sorter: (a: UserData, b: UserData) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      render: (v: string) => new Date(v).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 140,
      render: (_: any, record: UserData) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <span
            onClick={() => showToggleStatusConfirm(record)}
            style={{
              cursor: 'pointer',
              color: record.active ? '#f87171' : '#34d399',
              fontSize: 13,
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: 6,
              background: record.active ? 'rgba(239, 68, 68, 0.12)' : 'rgba(16, 185, 129, 0.12)',
              border: `1px solid ${record.active ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
            }}
          >
            {record.active ? <><StopOutlined /></> : <><CheckCircleOutlined /></>}
          </span>
          <span
            onClick={() => showDeleteConfirm(record)}
            style={{
              cursor: 'pointer',
              color: '#f87171',
              fontSize: 13,
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: 6,
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}
          >
            <DeleteOutlined />
          </span>
        </div>
      ),
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

          {/* Search & Refresh */}
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-stretch align-items-sm-center gap-3">
            <Input
              placeholder="Search users by name or email..."
              prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ maxWidth: 380, borderRadius: 12, height: 42 , background : '#0b1734ff' , border : "none" }}
            />
            <button
              onClick={() => loadData(currentPage, pageSize)}
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

          {/* Users Table */}
          <Card
            bordered={false}
            style={{ borderRadius: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
            title={<span style={{ fontSize: 16, fontWeight: 700, color: '#e4e4e4ff' }}>All Users ({filteredUsers.length})</span>}
          >
            <CommonTable
              size="middle"
              loading={loading}
              data={filteredUsers}
              columns={columns}
              rowKey="id"
              pageSize={pageSize}
              currentPage={currentPage}
              totalCount={totalUsers}
              onPageChange={handlePageChange}
              totalText="users"
              emptyText="No users found"
            />
          </Card>
        </div>
      </main>

      {/* Reusable Custom Modal */}
      {modalConfig && (
        <CustomModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={modalConfig.onConfirm}
          title={modalConfig.title}
          content={modalConfig.content}
          confirmText={modalConfig.confirmText}
          type={modalConfig.type}
          loading={modalLoading}
        />
      )}
    </div>
  );
};

export default UserManagement;
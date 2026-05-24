import React, { useState, useEffect } from 'react';
import { Spin, Tag, Input, Row, Col, Card, Statistic, message } from 'antd';
import {
  LoadingOutlined,
  TeamOutlined,
  UserOutlined,
  DollarOutlined,
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

const UserManagement: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchText, setSearchText] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);
  const [premiumCount, setPremiumCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

   const loadData = async () => {
     try {
       const currentUser = await getCurrentUser();
       if (!currentUser) {
         window.location.href = '/admin';
         return;
       }
       setUser(currentUser);

       const [usersData, stats] = await Promise.all([
         adminApi.getAllUsers(),
         adminApi.getDashboardStats()
       ]);

       setUsers(usersData.users || []);
       setTotalUsers(usersData.total);
       setPremiumCount(stats.premiumUsers);
       setActiveCount((usersData.users || []).filter((u: UserData) => u.active).length);
     } catch (err) {
       console.error('UserManagement load error:', err);
     } finally {
       setLoading(false);
     }
   };

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/admin';
  };

   const handleToggleUserStatus = async (userId: string, currentActive: boolean) => {
     try {
       // block: true means ban/deactivate, block: false means unblock/activate
       await adminApi.blockUser(userId, !currentActive);
       message.success(`User ${currentActive ? 'deactivated' : 'activated'} successfully`);
       loadData();
     } catch (err: any) {
       message.error(err.message || 'Operation failed');
     }
   };

  const handleDeleteUser = async (userId: string) => {
    try {
      await adminApi.deleteUser(userId);
      message.success('User deleted successfully');
      loadData();
    } catch (err: any) {
      message.error(err.message || 'Delete failed');
    }
  };

  const filteredUsers = users.filter((u) =>
    (u.full_name || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 36, color: '#3525cd' }} spin />} />
      </div>
    );
  }

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
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: record.profile_photo ? `url(${record.profile_photo}) center/cover` : 'linear-gradient(135deg, #6366f1, #3b82f6)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            color: '#fff', fontWeight: 700, fontSize: 14,
            flexShrink: 0,
          }}>
            {!record.profile_photo && (v ? v.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'U')}
          </div>
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
        <Tag color={v ? '#8b5cf6' : '#64748b'} style={{ borderRadius: 8, fontWeight: 600, margin: 0 }}>
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
            onClick={() => handleToggleUserStatus(record.id, record.active)}
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
            onClick={() => handleDeleteUser(record.id)}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <Input
              placeholder="Search users by name or email..."
              prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ maxWidth: 380, borderRadius: 12, height: 42 , background : '#4c4c4cff' }}
            />
            <span
              onClick={loadData}
              style={{
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                color: '#3b82f6', fontWeight: 600, fontSize: 13,
                padding: '8px 16px', borderRadius: 10, background: '#eff6ff',
                transition: 'all 0.2s',
              }}
            >
              <ReloadOutlined /> Refresh
            </span>
          </div>

          {/* Users Table */}
          <Card
            bordered={false}
            style={{ borderRadius: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
            title={<span style={{ fontSize: 16, fontWeight: 700, color: '#e4e4e4ff' }}>All Users ({filteredUsers.length})</span>}
          >
            <CommonTable
              size="middle"
              data={filteredUsers}
              columns={columns}
              rowKey="id"
              pageSize={10}
              totalText="users"
              emptyText="No users found"
            />
          </Card>
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
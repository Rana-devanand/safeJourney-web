import React, { useState, useEffect } from 'react';
import { Spin, Card, Input } from 'antd';
import { LoadingOutlined, SearchOutlined, ReloadOutlined, EyeOutlined } from '@ant-design/icons';
import { getCurrentUser, signOut } from '../../lib/supabase-auth';
import { adminApi } from '../../api/adminApi';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import CommonTable from '../../components/CommonTable';
import CustomModal from '../../components/CustomModal';
import './theme/admin-theme.css';

interface SystemLogData {
  id: string;
  user_id?: string;
  user_name?: string;
  user_email?: string;
  action: string;
  message: string;
  created_at: string;
}

const SystemLogs: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logs, setLogs] = useState<SystemLogData[]>([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalLogs, setTotalLogs] = useState(0);

  // Custom Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<SystemLogData | null>(null);

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

      const logsData = await adminApi.getSystemLogs(page, size);
      setLogs(logsData.logs || []);
      setTotalLogs(logsData.total || 0);
    } catch (err) {
      console.error('SystemLogs load error:', err);
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

  const showLogDetails = (record: SystemLogData) => {
    setSelectedLog(record);
    setModalOpen(true);
  };

  const filteredLogs = logs.filter((log) =>
    (log.action || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (log.message || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (log.user_name || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (log.user_email || '').toLowerCase().includes(searchText.toLowerCase())
  );

  const adminName = user?.email ? user.email.split('@')[0] : 'Admin';

  const columns = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 160,
      render: (v: string) => {
        let badgeStyle = {
          background: 'rgba(96, 63, 131, 0.15)',
          color: '#c084fc',
          border: '1px solid rgba(168, 85, 247, 0.3)',
        };
        if (v.toLowerCase().includes('delete') || v.toLowerCase().includes('remove') || v.toLowerCase().includes('ban') || v.toLowerCase().includes('block')) {
          badgeStyle = {
            background: 'rgba(239, 68, 68, 0.12)',
            color: '#f87171',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          };
        } else if (v.toLowerCase().includes('create') || v.toLowerCase().includes('add') || v.toLowerCase().includes('success')) {
          badgeStyle = {
            background: 'rgba(16, 185, 129, 0.12)',
            color: '#34d399',
            border: '1px solid rgba(16, 185, 129, 0.3)',
          };
        } else if (v.toLowerCase().includes('update') || v.toLowerCase().includes('edit')) {
          badgeStyle = {
            background: 'rgba(245, 158, 11, 0.12)',
            color: '#fbbf24',
            border: '1px solid rgba(245, 158, 11, 0.3)',
          };
        }
        return (
          <span
            style={{
              display: 'inline-block',
              padding: '4px 10px',
              borderRadius: 8,
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.3px',
              ...badgeStyle
            }}
          >
            {v}
          </span>
        );
      },
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
      render: (v: string) => (
        <span style={{ color: 'var(--admin-text-primary, #f1f5f9)', fontWeight: 500 }}>
          {v}
        </span>
      ),
    },
    {
      title: 'Triggered By',
      key: 'user',
      width: 200,
      render: (_: any, record: SystemLogData) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 600, color: 'var(--admin-text-primary, #f1f5f9)' }}>
            {record.user_name || 'System'}
          </span>
          {record.user_email && (
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>
              {record.user_email}
            </span>
          )}
        </div>
      ),
    },
    {
      title: 'Timestamp',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 180,
      render: (v: string) => new Date(v).toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_: any, record: SystemLogData) => (
        <button
          onClick={() => showLogDetails(record)}
          className="btn btn-outline-secondary d-flex align-items-center justify-content-center p-2"
          style={{
            cursor: 'pointer',
            color: '#a78bfa',
            background: 'rgba(139, 92, 246, 0.12)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: 8,
            transition: 'all 0.2s',
          }}
        >
          <EyeOutlined />
        </button>
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

        {loading ? (
          <div className="flex justify-center items-center flex-1 min-h-[calc(100vh-72px)]">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 36, color: '#603F83' }} spin />} />
          </div>
        ) : (
          <div className="mt-16 p-6 lg:p-8 flex flex-col gap-6">

            {/* Search & Refresh */}
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-stretch align-items-sm-center gap-3">
              <Input
                placeholder="Search logs by action, message, or user..."
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

            {/* System Logs Table */}
            <Card
              bordered={false}
              style={{ borderRadius: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
              title={<span style={{ fontSize: 16, fontWeight: 700, color: '#e4e4e4ff' }}>System Audit Logs ({totalLogs})</span>}
            >
              <CommonTable
                size="middle"
                data={filteredLogs}
                columns={columns}
                rowKey="id"
                pageSize={pageSize}
                currentPage={currentPage}
                totalCount={totalLogs}
                onPageChange={handlePageChange}
                totalText="logs"
                emptyText="No audit logs found"
              />
            </Card>
          </div>
        )}
      </main>

      {/* Audit Log Details Modal using custom BootStrap Modal */}
      {selectedLog && (
        <CustomModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={() => setModalOpen(false)}
          title="System Log Details"
          confirmText="Done"
          cancelText="Close"
          type="info"
          content={
            <div className="d-flex flex-column gap-3 py-2">
              <div className="border-bottom border-white border-opacity-10 pb-2">
                <span className="text-secondary d-block fs-8 small">ACTION</span>
                <span className="fw-bold text-white fs-6">{selectedLog.action}</span>
              </div>
              <div className="border-bottom border-white border-opacity-10 pb-2">
                <span className="text-secondary d-block fs-8 small">MESSAGE</span>
                <p className="text-white fs-6 m-0 lh-base text-xs" style={{ whiteSpace: 'pre-wrap' }}>
                  {selectedLog.message}
                </p>
              </div>
              {selectedLog.user_id && (
                <div className="border-bottom border-white border-opacity-10 pb-2">
                  <span className="text-secondary d-block fs-8 small">TRIGGERED BY</span>
                  <div className="mt-1">
                    <span className="fw-bold text-white d-block">{selectedLog.user_name || 'N/A'}</span>
                    <span className="text-white small fs-8">{selectedLog.user_email || 'N/A'}</span>
                  </div>
                  <span className="text-primary d-block mt-1 font-monospace" style={{ fontSize: '10px' }}>
                    User ID: {selectedLog.user_id}
                  </span>
                </div>
              )}
              <div>
                <span className="text-secondary d-block fs-8 small">TIMESTAMP</span>
                <span className="text-white">
                  {new Date(selectedLog.created_at).toLocaleString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </span>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
};

export default SystemLogs;

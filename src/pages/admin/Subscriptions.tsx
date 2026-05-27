import React, { useState, useEffect } from 'react';
import { Card, Input, Tag } from 'antd';
import { SearchOutlined, ReloadOutlined, EyeOutlined, CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { getCurrentUser, signOut } from '../../lib/supabase-auth';
import { adminApi } from '../../api/adminApi';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import CommonTable from '../../components/CommonTable';
import CustomModal from '../../components/CustomModal';
import './theme/admin-theme.css';

interface SubscriptionData {
  subscription_id: string;
  user_id: string;
  user_name?: string;
  user_email?: string;
  status: string;
  plan_type: string;
  price: number;
  current_period_start: string;
  current_period_end: string;
  invoice_url?: string;
  transaction_id?: string;
  purchase_type: string;
  created_at: string;
  updated_at: string;
}

const Subscriptions: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalSubscriptions, setTotalSubscriptions] = useState(0);

  // Custom Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState<SubscriptionData | null>(null);

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

      const subData = await adminApi.getSubscriptions(page, size);
      setSubscriptions(subData.subscriptions || []);
      setTotalSubscriptions(subData.total || 0);
    } catch (err) {
      console.error('Subscriptions load error:', err);
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

  const showSubscriptionDetails = (record: SubscriptionData) => {
    setSelectedSub(record);
    setModalOpen(true);
  };

  const filteredSubscriptions = subscriptions.filter((sub) =>
    (sub.transaction_id || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (sub.user_name || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (sub.user_email || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (sub.status || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (sub.plan_type || '').toLowerCase().includes(searchText.toLowerCase())
  );

  const adminName = user?.email ? user.email.split('@')[0] : 'Admin';

  const columns = [
    {
      title: 'Subscriber',
      key: 'subscriber',
      width: 200,
      render: (_: any, record: SubscriptionData) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 600, color: 'var(--admin-text-primary, #f1f5f9)' }}>
            {record.user_name || 'N/A'}
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
      title: 'Plan',
      dataIndex: 'plan_type',
      key: 'plan_type',
      width: 140,
      render: (v: string) => (
        <Tag 
          style={{ 
            borderRadius: 8, 
            fontWeight: 700, 
            backgroundColor: v === 'yearly' ? "#004931ff" : "#001f3f",
            color : "#fff",
            textTransform: 'capitalize',
            width: '100%',
            textAlign: 'center',
            margin: 0,
            padding: '5px 0',
            display: 'block'
          }}
        >
          {v}
        </Tag>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (v: number) => (
        <span style={{ fontWeight: 700, color: '#10b981' }}>
          ${Number(v).toFixed(2)}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 220,
      render: (v: string) => {
        const val = v || '';
        const isActive = val.toLowerCase() === 'active';
        const displayStatus = val.replace(/_/g, ' ');
        return (
          <Tag 
            color={isActive ? '#10b981' : '#ef4444'} 
            style={{ 
              borderRadius: 8, 
              fontWeight: 700, 
              textTransform: 'capitalize',
              backgroundColor: isActive ? '#004931ff' : '#ef4444',
              color: '#fff',
              width: '100%',
              textAlign: 'center',
              margin: 0,
              padding: '5px 0',
              display: 'inline-flex', 
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              whiteSpace: 'nowrap'
            }}
          >
            {isActive ? <CheckCircleOutlined /> : <InfoCircleOutlined />} {displayStatus}
          </Tag>
        );
      },
    },
    {
      title: 'Period',
      key: 'period',
      width: 220,
      render: (_: any, record: SubscriptionData) => {
        const start = new Date(record.current_period_start).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' });
        const end = new Date(record.current_period_end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' });
        return (
          <span style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: 500 }}>
            {start} - {end}
          </span>
        );
      },
    },
    {
      title: 'Type',
      dataIndex: 'purchase_type',
      key: 'purchase_type',
      width: 100,
      render: (v: string) => (
        <Tag color={v === 'live' ? 'gold' : 'default'} style={{ borderRadius: 6, fontWeight: 600 }}>
          {v.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 90,
      render: (_: any, record: SubscriptionData) => (
        <button
          onClick={() => showSubscriptionDetails(record)}
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

        <div className="mt-16 p-6 lg:p-8 flex flex-col gap-6">

          {/* Search & Refresh */}
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-stretch align-items-sm-center gap-3">
            <Input
              placeholder="Search subscriptions by transaction, user, plan..."
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

          {/* Subscriptions Table */}
          <Card
            bordered={false}
            style={{ borderRadius: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
            title={<span style={{ fontSize: 16, fontWeight: 700, color: '#e4e4e4ff' }}>Subscription Transactions ({totalSubscriptions})</span>}
          >
            <CommonTable
              size="middle"
              loading={loading}
              data={filteredSubscriptions}
              columns={columns}
              rowKey="subscription_id"
              pageSize={pageSize}
              currentPage={currentPage}
              totalCount={totalSubscriptions}
              onPageChange={handlePageChange}
              totalText="subscriptions"
              emptyText="No subscriptions found"
            />
          </Card>
        </div>
      </main>

      {/* Subscription Details Modal using Custom Bootstrap Modal */}
      {selectedSub && (
        <CustomModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={() => setModalOpen(false)}
          title="Subscription Details"
          confirmText="Done"
          cancelText="Close"
          type="info"
          content={
            <div className="d-flex flex-column gap-3 py-2">
              <div className="d-flex justify-content-between border-bottom border-white border-opacity-10 pb-2">
                <div>
                  <span className="text-secondary d-block fs-8 small">PLAN TYPE</span>
                  <span className="fw-bold text-white fs-6 text-capitalize">{selectedSub.plan_type} Plan</span>
                </div>
                <div>
                  <span className="text-secondary d-block fs-8 small">AMOUNT PAID</span>
                  <span className="fw-bold text-success fs-6">${Number(selectedSub.price).toFixed(2)}</span>
                </div>
              </div>

              <div className="border-bottom border-white border-opacity-10 pb-2">
                <span className="text-secondary d-block fs-8 small">SUBSCRIBER</span>
                <span className="fw-bold text-white d-block">{selectedSub.user_name || 'N/A'}</span>
                <span className="text-muted small fs-8">{selectedSub.user_email || 'N/A'}</span>
                <span className="text-muted d-block mt-1 font-monospace" style={{ fontSize: '10px' }}>
                  User ID: {selectedSub.user_id}
                </span>
              </div>

              <div className="border-bottom border-white border-opacity-10 pb-2">
                <span className="text-secondary d-block fs-8 small">BILLING CYCLE</span>
                <div className="text-white mt-1">
                  <div>Start: <strong className="text-white">{new Date(selectedSub.current_period_start).toLocaleString()}</strong></div>
                  <div>End: <strong className="text-white">{new Date(selectedSub.current_period_end).toLocaleString()}</strong></div>
                </div>
              </div>

              <div className="border-bottom border-white border-opacity-10 pb-2">
                <span className="text-secondary d-block fs-8 small">TRANSACTION METADATA</span>
                <div className="text-white mt-1">
                  <div>Status: <span className="fw-semibold text-info text-capitalize">{selectedSub.status}</span></div>
                  <div>Transaction ID: <span className="font-monospace text-muted small">{selectedSub.transaction_id || 'N/A'}</span></div>
                  <div>Type: <span className="text-muted text-uppercase small">{selectedSub.purchase_type}</span></div>
                </div>
              </div>

              {selectedSub.invoice_url && (
                <div>
                  <span className="text-secondary d-block fs-8 small">INVOICE URL</span>
                  <a 
                    href={selectedSub.invoice_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary fw-semibold d-inline-flex align-items-center gap-1 mt-1 text-decoration-none"
                    style={{ color: '#8b5cf6' }}
                  >
                    View Billing Invoice →
                  </a>
                </div>
              )}
            </div>
          }
        />
      )}
    </div>
  );
};

export default Subscriptions;

import React, { useState, useEffect } from 'react';
import { Spin, Card, Input, Tag } from 'antd';
import { LoadingOutlined, SearchOutlined, ReloadOutlined, EyeOutlined, CheckCircleOutlined, CompassOutlined, StopOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { getCurrentUser, signOut } from '../../lib/supabase-auth';
import { adminApi } from '../../api/adminApi';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import CommonTable from '../../components/CommonTable';
import CustomModal from '../../components/CustomModal';
import './theme/admin-theme.css';

interface JourneyData {
  journey_id: string;
  user_id: string;
  user_name?: string;
  user_email?: string;
  journey_name: string;
  start_location: string;
  destination_location?: string;
  transport_mode?: string;
  start_time: string;
  end_time?: string;
  status: string;
  total_distance?: number;
  duration?: any;
  created_at: string;
}

const JourneyHistory: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [journeys, setJourneys] = useState<JourneyData[]>([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalJourneys, setTotalJourneys] = useState(0);

  // Custom Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJourney, setSelectedJourney] = useState<JourneyData | null>(null);

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

      const journeyData = await adminApi.getJourneys(page, size);
      setJourneys(journeyData.journeys || []);
      setTotalJourneys(journeyData.total || 0);
    } catch (err) {
      console.error('JourneyHistory load error:', err);
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

  const showJourneyDetails = (record: JourneyData) => {
    setSelectedJourney(record);
    setModalOpen(true);
  };

  const filteredJourneys = journeys.filter((j) =>
    (j.journey_name || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (j.user_name || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (j.user_email || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (j.start_location || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (j.destination_location || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (j.status || '').toLowerCase().includes(searchText.toLowerCase())
  );

  const adminName = user?.email ? user.email.split('@')[0] : 'Admin';

  const formatDuration = (dur: any) => {
    if (!dur) return 'N/A';
    if (typeof dur === 'object') {
      const parts = [];
      if (dur.days) parts.push(`${dur.days}d`);
      if (dur.hours) parts.push(`${dur.hours}h`);
      if (dur.minutes) parts.push(`${dur.minutes}m`);
      if (dur.seconds) parts.push(`${dur.seconds}s`);
      return parts.join(' ') || 'N/A';
    }
    return String(dur);
  };

  const getTransportIcon = (mode: string = 'other') => {
    switch (mode.toLowerCase()) {
      case 'driving':
      case 'car':
        return '🚗';
      case 'walking':
      case 'run':
        return '🚶';
      case 'bicycling':
      case 'bicycle':
      case 'bike':
        return '🚲';
      case 'transit':
      case 'bus':
      case 'train':
        return '🚌';
      case 'flight':
      case 'plane':
        return '✈️';
      default:
        return '📍';
    }
  };

  const columns = [
    {
      title: 'Explorer',
      key: 'explorer',
      width: 200,
      render: (_: any, record: JourneyData) => (
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
      title: 'Journey Name',
      dataIndex: 'journey_name',
      key: 'journey_name',
      width: 180,
      ellipsis: true,
      render: (v: string) => (
        <span style={{ fontWeight: 700, color: 'var(--admin-text-primary, #ffffff)' }}>
          {v}
        </span>
      ),
    },
    {
      title: 'Route',
      key: 'route',
      width: 250,
      render: (_: any, record: JourneyData) => {
        const routeText = record.destination_location 
          ? `${record.start_location} → ${record.destination_location}`
          : record.start_location;
        return (
          <div 
            style={{ 
              maxWidth: 230, 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap', 
              color: '#cbd5e1', 
              fontSize: '13px',
              fontWeight: 500
            }}
            title={routeText}
          >
            {record.start_location}
            {record.destination_location && (
              <span style={{ color: '#a78bfa', fontWeight: 600 }}>
                {" → "}{record.destination_location}
              </span>
            )}
          </div>
        );
      },
    },
    {
      title: 'Mode',
      dataIndex: 'transport_mode',
      key: 'transport_mode',
      width: 100,
      render: (v: string) => {
        const mode = v || 'other';
        return (
          <span style={{ fontSize: '16px' }} className="d-inline-block px-2 text-center">
            {getTransportIcon(mode)} <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'capitalize' }}>{mode}</span>
          </span>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 160,
      render: (v: string) => {
        const status = v.toLowerCase();
        let bg = '#334155'; // planned
        let icon = <ClockCircleOutlined />;
        
        if (status === 'active' || status === 'started' || status === 'progress') {
          bg = '#004931ff';
          icon = <CompassOutlined spin />;
        } else if (status === 'completed' || status === 'arrived' || status === 'success') {
          bg = '#001f3f';
          icon = <CheckCircleOutlined />;
        } else if (status === 'canceled' || status === 'cancelled' || status === 'danger') {
          bg = '#ef4444';
          icon = <StopOutlined />;
        }

        return (
          <Tag 
            style={{ 
              borderRadius: 8, 
              fontWeight: 700, 
              textTransform: 'capitalize',
              backgroundColor: bg,
              color: '#fff',
              border: 'none',
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
            {icon} {status}
          </Tag>
        );
      },
    },
    {
      title: 'Start Time',
      dataIndex: 'start_time',
      key: 'start_time',
      width: 180,
      render: (v: string) => new Date(v).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 90,
      render: (_: any, record: JourneyData) => (
        <button
          onClick={() => showJourneyDetails(record)}
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
                placeholder="Search journeys by name, user, route, or status..."
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

            {/* Journeys Table */}
            <Card
              bordered={false}
              style={{ borderRadius: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
              title={<span style={{ fontSize: 16, fontWeight: 700, color: '#e4e4e4ff' }}>User Journeys History ({totalJourneys})</span>}
            >
              <CommonTable
                size="middle"
                data={filteredJourneys}
                columns={columns}
                rowKey="journey_id"
                pageSize={pageSize}
                currentPage={currentPage}
                totalCount={totalJourneys}
                onPageChange={handlePageChange}
                totalText="journeys"
                emptyText="No journeys found"
                scroll={{ x: 1330 }}
              />
            </Card>
          </div>
        )}
      </main>

      {/* Journey Details Modal using Custom Bootstrap Modal */}
      {selectedJourney && (
        <CustomModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={() => setModalOpen(false)}
          title="Journey Overview"
          confirmText="Done"
          cancelText="Close"
          type="info"
          content={
            <div className="d-flex flex-column gap-3 py-2 text-xs">
              <div className="d-flex justify-content-between border-bottom border-white border-opacity-10 pb-2">
                <div>
                  <span className="text-secondary d-block fs-8 small">JOURNEY NAME</span>
                  <span className="fw-bold text-white fs-6">{selectedJourney.journey_name}</span>
                </div>
                <div>
                  <span className="text-secondary d-block fs-8 small">STATUS</span>
                  <span className="fw-bold text-info fs-6 text-capitalize">{selectedJourney.status}</span>
                </div>
              </div>

              <div className="border-bottom border-white border-opacity-10 pb-2">
                <span className="text-secondary d-block fs-8 small">USER / EXPLORER</span>
                <span className="fw-bold text-white d-block">{selectedJourney.user_name || 'N/A'}</span>
                <span className="text-white small fs-8">{selectedJourney.user_email || 'N/A'}</span>
                <span className="text-primary d-block mt-1 font-monospace" style={{ fontSize: '10px' }}>
                  User ID: {selectedJourney.user_id}
                </span>
              </div>

              <div className="border-bottom border-white border-opacity-10 pb-2">
                <span className="text-secondary d-block fs-8 small">ROUTE LOCATIONS</span>
                <div className="text-white mt-1">
                  <div>Start: <strong className="text-white">{selectedJourney.start_location}</strong></div>
                  {selectedJourney.destination_location && (
                    <div>Destination: <strong className="text-purple" style={{ color: '#a78bfa' }}>{selectedJourney.destination_location}</strong></div>
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-between border-bottom border-white border-opacity-10 pb-2">
                <div>
                  <span className="text-secondary d-block fs-8 small">MODE OF TRANSPORT</span>
                  <span className="text-white fs-6 text-capitalize">
                    {getTransportIcon(selectedJourney.transport_mode)} {selectedJourney.transport_mode || 'Other'}
                  </span>
                </div>
                <div>
                  <span className="text-secondary d-block fs-8 small">TOTAL DISTANCE</span>
                  <span className="fw-bold text-success fs-6">
                    {selectedJourney.total_distance !== undefined && selectedJourney.total_distance !== null
                      ? `${Number(selectedJourney.total_distance).toFixed(2)} km`
                      : 'N/A'}
                  </span>
                </div>
              </div>

              <div className="d-flex justify-content-between border-bottom border-white border-opacity-10 pb-2">
                <div>
                  <span className="text-secondary d-block fs-8 small">START TIME</span>
                  <span className="text-white">
                    {new Date(selectedJourney.start_time).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-secondary d-block fs-8 small">DURATION</span>
                  <span className="fw-bold text-white fs-6">
                    {formatDuration(selectedJourney.duration)}
                  </span>
                </div>
              </div>

              {selectedJourney.end_time && (
                <div>
                  <span className="text-secondary d-block fs-8 small">COMPLETED / END TIME</span>
                  <span className="text-white">
                    {new Date(selectedJourney.end_time).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          }
        />
      )}
    </div>
  );
};

export default JourneyHistory;

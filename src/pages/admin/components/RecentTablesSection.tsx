import React from 'react';
import { Row, Col, Table, Tag } from 'antd';
import { TeamOutlined, CompassOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface RecentTablesSectionProps {
  recentUsers: any[];
  recentJourneys: any[];
}

const RecentTablesSection: React.FC<RecentTablesSectionProps> = ({
  recentUsers,
  recentJourneys,
}) => {
  // Define columns for Recent Users
  const userColumns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'name',
      render: (text) => <span className="font-semibold text-slate-800">{text || 'N/A'}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <span className="text-slate-500">{text}</span>,
    },
    {
      title: 'Tier',
      dataIndex: 'is_premium',
      key: 'premium',
      render: (isPremium: boolean) =>
        isPremium ? (
          <Tag color="emerald" className="m-0 border-emerald-200">
            PREMIUM
          </Tag>
        ) : (
          <Tag color="default" className="m-0">
            FREE
          </Tag>
        ),
    },
    {
      title: 'Joined',
      dataIndex: 'created_at',
      key: 'created',
      render: (date) => <span className="text-slate-400">{new Date(date).toLocaleDateString()}</span>,
    },
  ];

  // Define columns for Recent Journeys
  const journeyColumns: ColumnsType<any> = [
    {
      title: 'Journey',
      dataIndex: 'journey_name',
      key: 'name',
      render: (text) => <span className="font-semibold text-slate-800">{text}</span>,
    },
    {
      title: 'Start Location',
      dataIndex: 'start_location',
      key: 'start',
      render: (text) => <span className="text-slate-500">{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={status === 'active' ? 'processing' : 'default'}
          className={`m-0 ${status === 'active' ? 'animate-pulse' : ''}`}
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      key: 'created',
      render: (date) => <span className="text-slate-400">{new Date(date).toLocaleDateString()}</span>,
    },
  ];

  return (
    <section className="mt-6">
      <Row gutter={[24, 24]}>
        {/* Recent Users Table */}
        <Col xs={24} xl={12}>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h4 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
              <TeamOutlined className="text-indigo-600" />
              Recent Users
            </h4>
            <Table
              dataSource={recentUsers}
              columns={userColumns}
              rowKey="id"
              pagination={false}
              size="middle"
              className="border border-slate-100 rounded-lg overflow-hidden"
              locale={{ emptyText: 'No users recorded yet.' }}
            />
          </div>
        </Col>

        {/* Recent Active Journeys Table */}
        <Col xs={24} xl={12}>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h4 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CompassOutlined className="text-emerald-600" />
              Recent Active Journeys
            </h4>
            <Table
              dataSource={recentJourneys}
              columns={journeyColumns}
              rowKey="id"
              pagination={false}
              size="middle"
              className="border border-slate-100 rounded-lg overflow-hidden"
              locale={{ emptyText: 'No active journeys recorded yet.' }}
            />
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default RecentTablesSection;

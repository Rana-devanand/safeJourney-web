import React from 'react';
import { RiseOutlined } from '@ant-design/icons';

interface MetricGridProps {
  totalUsers: number;
  activeJourneys: number;
  premiumUsers: number;
  totalCircles: number;
}

interface MetricItem {
  key: string;
  title: string;
  value: number;
  icon: string;
  growth: string;
  themeClass: string;
  iconBgClass: string;
  iconTextClass: string;
}

const MetricGrid: React.FC<MetricGridProps> = ({
  totalUsers,
  activeJourneys,
  premiumUsers,
  totalCircles,
}) => {
  // Define dynamic metrics dataset mapped from props
  const metrics: MetricItem[] = [
    {
      key: 'total-users',
      title: 'Total Users',
      value: totalUsers,
      icon: 'groups',
      growth: '8%',
      themeClass: 'card-indigo',
      iconBgClass: 'bg-primary bg-opacity-10',
      iconTextClass: 'text-primary',
    },
    {
      key: 'active-journeys',
      title: 'Active Journeys',
      value: activeJourneys,
      icon: 'explore',
      growth: '12%',
      themeClass: 'card-emerald',
      iconBgClass: 'bg-success bg-opacity-10',
      iconTextClass: 'text-success',
    },
    {
      key: 'premium-users',
      title: 'Premium Users',
      value: premiumUsers,
      icon: 'workspace_premium',
      growth: '18%',
      themeClass: 'card-violet',
      iconBgClass: 'bg-info bg-opacity-10',
      iconTextClass: 'text-info',
    },
    {
      key: 'safety-circles',
      title: 'Safety Circles',
      value: totalCircles,
      icon: 'group_work',
      growth: '1.5%',
      themeClass: 'card-blue',
      iconBgClass: 'bg-secondary bg-opacity-10',
      iconTextClass: 'text-secondary',
    },
  ];

  return (
    <section className="mt-2">
      <div className="row g-3">
        {metrics.map((item) => (
          <div className="col-12 col-sm-6 col-xl-3" key={item.key}>
            <div 
            className={`admin-metric-card ${item.themeClass}`} 
              style={{ padding: '14px 16px', borderRadius: '12px', height: '100%' }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-bold text-secondary text-uppercase tracking-wider user-select-none" style={{fontSize: '10px'}}>
                  {item.title}
                </span>
                <div 
                  className={`p-1 ${item.iconBgClass} ${item.iconTextClass} rounded d-flex align-items-center justify-content-center`} 
                  style={{ width: 34, height: 34 }}
                >
                  <span 
                    className="material-symbols-outlined" 
                    style={{ fontVariationSettings: "'FILL' 1", fontSize: 22 }}
                  >
                    {item.icon}
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-baseline gap-1">
                <h3 
                  className="fw-bolder m-0" 
                  style={{ fontSize: '20px' }}
                >
                  {item.value}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MetricGrid;

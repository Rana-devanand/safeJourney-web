import React from 'react';
import { Timeline, Typography } from 'antd';
import { SyncOutlined, CheckCircleOutlined, InfoCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip as ChartTooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTooltip,
  Legend
);

const { Paragraph } = Typography;

interface AnalyticsSectionProps {
  recentLogs: any[];
  loadDashboard: () => void;
}

interface ChartDataPoint {
  month: string;
  value: number;
}

const chartData: ChartDataPoint[] = [
  { month: 'JAN', value: 420 },
  { month: 'FEB', value: 580 },
  { month: 'MAR', value: 490 },
  { month: 'APR', value: 780 },
  { month: 'MAY', value: 960 },
  { month: 'JUN', value: 640 },
  { month: 'JUL', value: 810 },
  { month: 'AUG', value: 890 },
];

const   AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ recentLogs }) => {
  // Chart.js data configuration
  const data = {
    labels: chartData.map(d => d.month),
    datasets: [
      {
        data: chartData.map(d => d.value),
        backgroundColor: chartData.map(d =>
          d.month === 'MAY' ? '#3b82f6' : 'rgba(99, 102, 241, 0.15)'
        ),
        hoverBackgroundColor: chartData.map(d =>
          d.month === 'MAY' ? '#1d4ed8' : 'rgba(99, 102, 241, 0.35)'
        ),
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
        borderSkipped: false,
        barPercentage: 0.45,
        categoryPercentage: 0.8,
      },
    ],
  };

  // Chart.js options configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        titleFont: {
          family: 'Inter',
          size: 10,
          weight: 'bold' as const,
        },
        bodyFont: {
          family: 'Inter',
          size: 11,
          weight: 'bold' as const,
        },
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context: any) => ` ${context.raw} pings`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: (context: any) =>
            chartData[context.index]?.month === 'MAY' ? '#3b82f6' : '#94a3b8',
          font: {
            family: 'Inter',
            size: 10,
            weight: (context: any) =>
              chartData[context.index]?.month === 'MAY' ? 'bold' : 'normal',
          },
        },
      },
      y: {
        min: 0,
        max: 1000,
        ticks: {
          stepSize: 250,
          color: '#94a3b8',
          font: {
            family: 'Inter',
            size: 10,
          },
        },

      },
    },
  };

  return (
    <section className="mt-4">
      <div className="row g-4">
        {/* Left Side: Growth Chart Area */}
        <div className="col-12 col-xl-8">
          <div className=" rounded-3 shadow-sm h-100 d-flex flex-column justify-content-between" style={{ border: '1px solid #e2e8f0' }}>
            <div className="d-flex justify-content-between align-items-center p-4">
              <div>
                <h4 className="fs-6 fw-bold text-light m-0">User Activity Loop Over Time</h4>
                <p className="small text-secondary m-0">Monthly background geolocation pings for current fiscal year</p>
              </div>
            </div>

            {/* High-Fidelity ChartJS Interactive Chart Wrapper */}
            <div className=" rounded-bottom-3 p-4 p-lg-5" >
              <div style={{ height: 240, width: '100%', position: 'relative' }}>
                <Bar data={data} options={options} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Timeline Log Area */}
        <div className="col-12 col-xl-4">
          <div className="rounded-3 shadow-sm h-100 d-flex flex-column justify-content-between p-4" style={{ border: '1px solid #e2e8f0' }}>
            <div>
              <h4 className="fs-6 fw-bold text-light mb-4">System Logs & Activity</h4>

              <div>
                {recentLogs.length > 0 ? (
                  <Timeline
                    items={recentLogs.map((log) => {
                      let dotIcon = <InfoCircleOutlined className="text-primary" />;
                      if (log.action.toLowerCase().includes('login') || log.action.toLowerCase().includes('auth')) {
                        dotIcon = <ExclamationCircleOutlined className="text-danger" />;
                      } else if (log.action.toLowerCase().includes('premium') || log.action.toLowerCase().includes('subscribe')) {
                        dotIcon = <CheckCircleOutlined className="text-success" />;
                      } else if (log.action.toLowerCase().includes('journey')) {
                        dotIcon = <SyncOutlined spin className="text-info" />;
                      }

                      const timeStr = new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      const dateStr = new Date(log.created_at).toLocaleDateString();

                      return {
                        dot: dotIcon,
                        children: (
                          <div style={{fontSize: '12px'}}>
                            <p className="fw-bold text-light m-0">{log.action}</p>
                            <p className="text-light m-0 my-1">{log.message}</p>
                            <span className="font-monospace text-secondary" style={{fontSize: '10px'}}>{timeStr} · {dateStr}</span>
                          </div>
                        )
                      };
                    })}
                  />
                ) : (
                  <Paragraph className="text-center py-4  text-light">
                    No activity logs recorded yet.
                  </Paragraph>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;

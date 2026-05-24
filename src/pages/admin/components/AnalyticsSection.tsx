import React from 'react';
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

interface AnalyticsSectionProps {
  recentLogs: any[];
  monthlyPings: any[];
  loadDashboard: () => void;
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ monthlyPings }) => {
  // All 12 months for a complete fiscal/calendar year
  const allMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  
  // Format and merge dynamic database ping records with 12 months list
  const chartData = allMonths.map(month => {
    const dbRecord = (monthlyPings || []).find(
      (p: any) => p.month?.toUpperCase() === month
    );
    return {
      month,
      value: dbRecord ? Number(dbRecord.value) : 0
    };
  });

  // Dynamically calculate current month abbreviation to highlight it in the chart
  const currentMonthAbbr = new Date().toLocaleString('en-US', { month: 'short' }).toUpperCase();

  // Dynamically determine the ceiling of the Y axis to keep the visuals pristine
  const maxVal = Math.max(...chartData.map(d => d.value), 10);
  const roundedMax = Math.ceil(maxVal / 100) * 100;
  const stepSize = Math.max(10, Math.ceil(roundedMax / 4));

  // Chart.js data configuration
  const data = {
    labels: chartData.map(d => d.month),
    datasets: [
      {
        data: chartData.map(d => d.value),
        backgroundColor: chartData.map(d =>
          d.month === currentMonthAbbr ? '#603F83' : 'rgba(96, 63, 131, 0.15)'
        ),
        hoverBackgroundColor: chartData.map(d =>
          d.month === currentMonthAbbr ? '#4e326b' : 'rgba(96, 63, 131, 0.35)'
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
            chartData[context.index]?.month === currentMonthAbbr ? '#603F83' : '#94a3b8',
          font: {
            family: 'Inter',
            size: 10,
            weight: (context: any) =>
              chartData[context.index]?.month === currentMonthAbbr ? 'bold' : 'normal',
          },
        },
      },
      y: {
        min: 0,
        max: roundedMax,
        ticks: {
          stepSize: stepSize,
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
        {/* Growth Chart Area */}
        <div className="col-12 col-xl-12">
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
      </div>
    </section>
  );
};

export default AnalyticsSection;

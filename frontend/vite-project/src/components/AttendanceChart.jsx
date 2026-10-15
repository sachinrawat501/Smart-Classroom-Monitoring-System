import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function AttendanceChart() {
  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],

    datasets: [
      {
        label: "Attendance (%)",
        data: [78, 85, 82, 90, 87, 94],
        borderColor: "#818cf8",
        backgroundColor: "rgba(129, 140, 248, 0.15)",
        pointBackgroundColor: "#818cf8",
        pointBorderColor: "#818cf8",
        pointRadius: 4,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        enabled: true,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        max: 100,

        ticks: {
          color: "#94a3b8",
          callback: (value) => `${value}%`,
        },

        grid: {
          color: "rgba(148, 163, 184, 0.12)",
        },

        border: {
          display: false,
        },
      },

      x: {
        ticks: {
          color: "#94a3b8",
        },

        grid: {
          display: false,
        },

        border: {
          display: false,
        },
      },
    },
  };

  return (
    <section className="card">
      <div className="card-header">
        <div>
          <h2>Attendance Overview</h2>
          <p>Weekly attendance performance</p>
        </div>

        <button type="button" className="card-action">
          This Week
        </button>
      </div>

      <div className="chart-legend">
        <div className="legend-item">
          <span
            className="legend-dot"
            style={{ background: "#818cf8" }}
          ></span>

          Attendance
        </div>
      </div>

      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </section>
  );
}

export default AttendanceChart;
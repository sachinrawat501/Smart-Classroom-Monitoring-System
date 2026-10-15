import {
  AlertTriangle,
  VideoOff,
  Clock,
  CheckCircle,
} from "lucide-react";

const alerts = [
  {
    id: 1,
    title: "Camera Disconnected",
    description:
      "Computer Lab 02 camera is currently offline.",
    icon: VideoOff,
  },
  {
    id: 2,
    title: "Low Attendance",
    description:
      "Classroom 201 attendance is below the expected level.",
    icon: AlertTriangle,
  },
  {
    id: 3,
    title: "Late Check-in",
    description:
      "Some students checked in after the scheduled time.",
    icon: Clock,
  },
];

function SystemAlerts() {
  return (
    <section className="card" id="alerts">
      <div className="card-header">
        <div>
          <h2>System Alerts</h2>
          <p>Important classroom notifications</p>
        </div>

        <button type="button" className="card-action">
          View All
        </button>
      </div>

      <div className="alert-list">
        {alerts.map((alert) => {
          const Icon = alert.icon;

          return (
            <div className="alert-item" key={alert.id}>
              <div className="alert-icon">
                <Icon size={18} />
              </div>

              <div>
                <h4>{alert.title}</h4>
                <p>{alert.description}</p>
              </div>
            </div>
          );
        })}

        <div className="alert-item">
          <div
            className="alert-icon"
            style={{
              background: "#064e3b",
              color: "#6ee7b7",
            }}
          >
            <CheckCircle size={18} />
          </div>

          <div>
            <h4>System Operational</h4>
            <p>The dashboard demo is running normally.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SystemAlerts;
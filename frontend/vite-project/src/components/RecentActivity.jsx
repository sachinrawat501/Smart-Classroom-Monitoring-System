import {
  UserCheck,
  Video,
  Bell,
  ClipboardCheck,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Attendance Updated",
    description: "Computer Lab 01 attendance was recorded.",
    time: "10 min ago",
    icon: UserCheck,
  },
  {
    id: 2,
    title: "Classroom Activated",
    description: "Classroom 201 monitoring is active.",
    time: "25 min ago",
    icon: Video,
  },
  {
    id: 3,
    title: "Attendance Alert",
    description: "Some students were marked absent.",
    time: "40 min ago",
    icon: Bell,
  },
  {
    id: 4,
    title: "Report Generated",
    description: "Weekly attendance report is ready.",
    time: "1 hour ago",
    icon: ClipboardCheck,
  },
];

function RecentActivity() {
  return (
    <section className="card">
      <div className="card-header">
        <div>
          <h2>Recent Activity</h2>
          <p>Latest classroom updates</p>
        </div>

        <button type="button" className="card-action">
          View All
        </button>
      </div>

      <div className="activity-list">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div className="activity-item" key={activity.id}>
              <div className="activity-icon">
                <Icon size={18} />
              </div>

              <div className="activity-info">
                <h4>{activity.title}</h4>
                <p>{activity.description}</p>
              </div>

              <span className="activity-time">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default RecentActivity;
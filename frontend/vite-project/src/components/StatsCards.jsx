import {
  Users,
  UserCheck,
  Monitor,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Total Students",
    value: "1,240",
    change: "+12 this month",
    icon: Users,
    color: "purple",
    positive: true,
  },
  {
    title: "Present Today",
    value: "1,086",
    change: "87.6% attendance",
    icon: UserCheck,
    color: "green",
    positive: true,
  },
  {
    title: "Active Classrooms",
    value: "18",
    change: "Out of 20 classrooms",
    icon: Monitor,
    color: "blue",
    positive: true,
  },
  {
    title: "Attendance Rate",
    value: "87.6%",
    change: "+4.2% from last week",
    icon: TrendingUp,
    color: "orange",
    positive: true,
  },
];

function StatsCards() {
  return (
    <section className="stats-grid">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div className="stat-card" key={stat.title}>
            <div className="stat-card-top">
              <p className="stat-card-title">{stat.title}</p>

              <div className={`stat-icon ${stat.color}`}>
                <Icon size={21} />
              </div>
            </div>

            <h2>{stat.value}</h2>

            <div className="stat-card-footer">
              <span className={stat.positive ? "positive" : "negative"}>
                {stat.change}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default StatsCards;
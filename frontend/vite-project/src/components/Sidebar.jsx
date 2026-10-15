import {
  LayoutDashboard,
  Monitor,
  Users,
  ClipboardCheck,
  Bell,
  Settings,
  GraduationCap,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">
          <GraduationCap size={24} />
        </div>

        <div className="logo-text">
          <h2>SmartClass</h2>
          <p>Monitoring System</p>
        </div>
      </div>

      <p className="sidebar-section-title">Main Menu</p>

      <nav className="sidebar-nav">
        <a href="#dashboard" className="active">
          <LayoutDashboard size={19} />
          <span className="nav-label">Dashboard</span>
        </a>

        <a href="#classrooms">
          <Monitor size={19} />
          <span className="nav-label">Classrooms</span>
        </a>

        <a href="#attendance">
          <ClipboardCheck size={19} />
          <span className="nav-label">Attendance</span>
        </a>

        <a href="#students">
          <Users size={19} />
          <span className="nav-label">Students</span>
        </a>

        <a href="#alerts">
          <Bell size={19} />
          <span className="nav-label">Notifications</span>
        </a>

        <a href="#settings">
          <Settings size={19} />
          <span className="nav-label">Settings</span>
        </a>
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="user-avatar">AD</div>

          <div className="sidebar-user-info">
            <h4>Admin User</h4>
            <p>Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
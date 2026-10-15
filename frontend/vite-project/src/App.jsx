
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import StatsCards from "./components/StatsCards";
import ClassroomMonitoring from "./components/ClassroomMonitoring";
import AttendanceChart from "./components/AttendanceChart";
import RecentActivity from "./components/RecentActivity";
import AttendanceTable from "./components/AttendanceTable";
import SystemAlerts from "./components/SystemAlerts";
// import ClassroomCamera from "./components/ClassroomCamera";

import "./App.css";

function App() {
  return (
    <div className="app-container" id="dashboard">
      <Sidebar />

      <main className="main-content">
        <Topbar />

        <StatsCards />

        <div className="dashboard-grid">
          <ClassroomMonitoring />
          <AttendanceChart />
        </div>

        {/* Classroom Camera */}
        {/* <ClassroomCamera /> */}

        <div className="dashboard-grid">
          <RecentActivity />
          <SystemAlerts />
        </div>

        <AttendanceTable />
      </main>
    </div>
  );
}

export default App;


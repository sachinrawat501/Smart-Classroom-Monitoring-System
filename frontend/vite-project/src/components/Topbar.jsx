import { Search, Bell, CalendarDays } from "lucide-react";

function Topbar() {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="topbar">
      <div className="page-heading">
        <h1>Dashboard Overview</h1>

        <p>
          Welcome back! Here is your classroom monitoring summary.
        </p>
      </div>

      <div className="topbar-actions">
        <div className="search-box">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search anything..."
            aria-label="Search dashboard"
          />
        </div>

        <button
          type="button"
          className="icon-button"
          aria-label="Notifications"
        >
          <Bell size={19} />
        </button>

        <button
          type="button"
          className="icon-button"
          aria-label="Today's date"
          title={today}
        >
          <CalendarDays size={19} />
        </button>
      </div>
    </header>
  );
}

export default Topbar;
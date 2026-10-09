import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Bot,
  BarChart3,
  Settings,
} from "lucide-react";

function Sidebar({ setPage, page }) {
  return (
    <aside className="sidebar">

      <div className="logo">
        🚀 ProjectPilot
      </div>

      <nav>

        <button
          className={page === "dashboard" ? "active" : ""}
          onClick={() => setPage("dashboard")}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        <button
          className={page === "projects" ? "active" : ""}
          onClick={() => setPage("projects")}
        >
          <FolderKanban size={18} />
          Projects
        </button>

        <button
          className={page === "tasks" ? "active" : ""}
          onClick={() => setPage("tasks")}
        >
          <CheckSquare size={18} />
          Tasks
        </button>

        <button
          className={page === "team" ? "active" : ""}
          onClick={() => setPage("team")}
        >
          <Users size={18} />
          Team
        </button>

        <button
          className={page === "ai" ? "active" : ""}
          onClick={() => setPage("ai")}
        >
          <Bot size={18} />
          AI Assistant
        </button>



      </nav>

      <button className="settings">
        <Settings size={18} />
        Settings
      </button>

    </aside>
  );
}

export default Sidebar;
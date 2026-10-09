import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import { Search, Plus, Calendar, AlertTriangle } from "lucide-react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data || []);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
    (project.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Projects</h1>
          <p>Manage and monitor all your projects.</p>
        </div>

        <button className="primary-btn">
          <Plus size={16} />
          New Project
        </button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "22px",
        }}
      >
        <Search size={18} color="#6b7280" />

        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "300px",
            padding: "11px 13px",
            border: "1px solid #e5e7eb",
            borderRadius: "9px",
            outline: "none",
          }}
        />
      </div>

      {loading ? (
        <p>Loading projects...</p>
      ) : filteredProjects.length === 0 ? (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          <h3>No projects found</h3>
          <p>Create a project to get started.</p>
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map((project) => {
            const risk = project.risk || "Low";
            const progress = Number(project.progress) || 0;

            return (
              <div className="project-card" key={project.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <h3>{project.name || "Untitled Project"}</h3>

                  <span className={risk.toLowerCase()}>
                    {risk}
                  </span>
                </div>

                <p>
                  {project.description || "No description available."}
                </p>

                <div style={{ marginTop: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      marginBottom: "7px",
                    }}
                  >
                    <span>Progress</span>
                    <strong>{progress}%</strong>
                  </div>

                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${Math.min(Math.max(progress, 0), 100)}%`,
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "18px",
                    color: "#6b7280",
                    fontSize: "12px",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Calendar size={13} />
                    {project.deadline || "No deadline"}
                  </span>

                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <AlertTriangle size={13} />
                    {project.tasks || 0} tasks
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Projects;